import type moment from 'moment';
import { writable } from 'svelte/store';
import type { CSVExportStore, ToastHolderStore, WorkspaceDataType, UserTokensContainer, GoogleSourceConnector, MetaSourceConnector, TiktokSourceConnector, DestinationConnector, ShopifySourceConnector } from '$lib/types/Types';
import { set as setLocalStorage, remove as removeLocalStorage, get as getLocalStorage } from '$lib/local-packages/LocalStorage';

export const RANGE_STORE_LOCAL_STORAGE_KEY = "current_range";
export const USER_TOKENS_STORE_LOCAL_STORAGE_KEY = "user_tokens_container_local_storage";
export const PERSIST_SESSION_LOCAL_STORAGE_KEY = "persist_login_status";
export const ATTRIBUTION_WINDOW_LOCAL_STORAGE_KEY = "persist_attribution_window_store";
export const ATTRIBUTION_TYPE_LOCAL_STORAGE_KEY = "persist_attribution_type_store";

export const UserTokenContainer = writable<UserTokensContainer | "init" | null>("init"); //value should be "init"
export const LoadingState = writable<{ show: boolean; caption: string; }>();
export const Error500 = writable<null | { error: string | unknown, url: string }>(null);
export const Customer = writable(null);
export const AllWorkspace = writable<null | WorkspaceDataType[]>(null);
export const Workspace = writable<null | "init" | WorkspaceDataType>("init");
export const MarketingData = writable(null);
export const Connectors = writable([]);
export const CurrencySymbol = writable("EUR");
export const CurrentEventsFilter = writable<string | null>(null);
export const ToastHolder = writable<ToastHolderStore | null>(null);
export const FullScreenView = writable<boolean>(false);
export const AttributionWindow = writable<number>();
export const AttributionType = writable<string>();

//OAuth stores
export const MetaOAuth = writable<null | { accessToken: string, userID: string }>(null);

//Ques
export const DeleteQue = writable<null | { type: string, id: string }>(null);
export const MultipleDeleteQue = writable<null | { type: string, id: string }[]>(null);
export const SourceConnectorsQue = writable<null | TiktokSourceConnector[] | GoogleSourceConnector[] | MetaSourceConnector[] | ShopifySourceConnector[]>(null);
export const DestinationConnectorsQue = writable<null | DestinationConnector[]>(null);

export const CSVExportQue = writable<null | CSVExportStore>(null);

//TimeZone sensitive start and end
export const CurrentRange = writable<null | { start: moment.Moment, end: moment.Moment }>(null);
export const CurrentRangeChangedTracker = writable<{ start: number, end: number } | null>(null);
export const TimeZone = writable<null | string>(null);

export function CleanDataRelatedStores() {
    MarketingData.set(null);
    MetaOAuth.set(null);
    DeleteQue.set(null);
    SourceConnectorsQue.set(null);
    DestinationConnectorsQue.set(null);
    TimeZone.set(null);
    CurrencySymbol.set("EUR");
    Connectors.set([]);
}

CurrentRange.subscribe(range => {
    if (!range) {
        return;
    }
    let unix_range = {
        start: range?.start.unix(),
        end: range?.end.unix()
    }
    setLocalStorage(RANGE_STORE_LOCAL_STORAGE_KEY, unix_range)
});

AttributionWindow.subscribe(val => {
    if (val && localStorage) {
        setLocalStorage(ATTRIBUTION_WINDOW_LOCAL_STORAGE_KEY, val);
    }
});

AttributionType.subscribe(val => {
    if (val && localStorage) {
        setLocalStorage(ATTRIBUTION_TYPE_LOCAL_STORAGE_KEY, val);
    }
});

export function enableUserTokensLocalStorage() {
    UserTokenContainer.subscribe(tokens => {
        let shouldPersist = true;
        if (!shouldPersist) {
            removeLocalStorage(USER_TOKENS_STORE_LOCAL_STORAGE_KEY);
            return;
        }
        if (tokens == "init") {
            return;
        }
        if (tokens == null) {
            removeLocalStorage(USER_TOKENS_STORE_LOCAL_STORAGE_KEY);
            return;
        }
        setLocalStorage(USER_TOKENS_STORE_LOCAL_STORAGE_KEY, tokens)
    });
}


export function InitAttributionStores() {
    AttributionType.set(getLocalStorage(ATTRIBUTION_TYPE_LOCAL_STORAGE_KEY) ?? "Last Click");
    AttributionWindow.set(getLocalStorage(ATTRIBUTION_WINDOW_LOCAL_STORAGE_KEY) ?? 14);
}