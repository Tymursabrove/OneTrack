import type { SpriteIconName } from "$lib/common/SpriteSymbolsEnum"

export type TanstackTableStyling = {
    table: string,
    thead: {
        self: string,
        tr: string,
        th: {
            innerDiv: string,
            first: string,
            middle: string,
            last: string
        }
    },
    tbody: {
        self: string,
        tr: string,
        td: {
            first: string,
            middle: string,
            last: string
        }
    },
    tfoot: {
        self: string,
        tr: string,
        th: {
            first: string,
            middle:
            string,
            last: string
        }
    }
}
export type AttributionSearchItem = {
    name: string;
    state: boolean;
    id: string;
    campaignId?: string | null;
    adSetId?: string | null;
    accountId?: string | null;
}
export type FaqSection = {
    category: string;
    questions: FaqQuestion[];
}
export type FaqQuestion = {
    question: string;
    answer: string;
    open: boolean;
}
export type UserPostRequestItem = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    gender: string,
    address: {
        street: string,
        streetAlternative: string,
        streetNumber: string,
        zip: string,
        city: string,
        province: string,
        country: string,
        company: string,
        countryCode: string,
        provinceCode: string,
    }
}
export type WorkspaceDataType = {
    id: string;
    name: string;
    currency: string;
    timezone: string;
    connectors?: Array<TiktokSourceConnector | MetaSourceConnector | GoogleSourceConnector | DestinationConnector | OneTrackSourceConnector>;
    enabled: boolean;
}
export interface ConnectorDataType {
    enabled: boolean;
    id?: string;
    name: string;
    type: string;
    workspaceId?: string;
}
export interface TiktokSourceConnector extends ConnectorDataType {
    data: {
        accessToken: string;
        advertiserId: string;
    };
    type: "TikTokAdData";

}
export interface ShopifySourceConnector extends ConnectorDataType {
    data: {
        secret: string;
        host?: string;
    };
    type: "ShopifyWebhook";
}
export interface MetaSourceConnector extends ConnectorDataType {
    data: {
        accessToken: string;
        accountId: string;
    },
    type: "MetaAdData";

}
export interface GoogleSourceConnector extends ConnectorDataType {
    data: {
        customerId: string;
        loginCustomerId: string;
        refreshToken: string;
    },
    type: "GoogleAdData";
}
export interface OneTrackSourceConnector extends ConnectorDataType {
    data: {
        domain: string;
        firstParty: boolean;
    },
    type: "OneTrackPixel";

}
export interface DestinationConnector extends ConnectorDataType {
    data: {
        pixelId?: string;
        measurementId?: string;
        apiKey?: string;
        apiSecret?: string;
        postbackEnabled: boolean;
        testCode?: string;
    };
    type: "MetaPixel" | "TikTokPixel" | "GoogleAnalytics4";
}
export interface UserTokensContainer {
    idToken: string,
    refreshToken: string,
    email: string,
    accessToken: string
}
export interface utmDataItem {
    isExpanded: boolean;
    isOdd: boolean;
    logo: SpriteIconName;
    name: string;
    text: string;
    fromText: string;
    utmCode: string;
    displayUtm?: string;
}
export interface SelectionDropdownItem {
    id: string,
    state: boolean,
    name: string,
    icon: string
}
export interface CSVExportStore {
    metaCampaignsSelected?: boolean,
    metaAdSetsSelected?: boolean,
    metaAdsSelected?: boolean,
    tiktokCampaignsSelected?: boolean,
    tiktokAdSetsSelected?: boolean,
    tiktokAdsSelected?: boolean,
    googleCampaignsSelected?: boolean,
    googleAdSetsSelected?: boolean,
    googleAdsSelected?: boolean,
    allEventsExportSelected?: boolean
}
export enum LottiePlayerDirection {
    FORWARD = 1,
    REVERSE = -1
}
export interface DeleteSelectableConnectorType extends ConnectorDataType {
    selectedForDeletion: boolean;
    connectorPlatformType: "source" | "destination";
}
export interface ToastHolderStore {
    type: string,
    heading: string,
    subHeading: string | null,
    duration: number
}
export interface CustomSetting {
    id: string;
    isVisible: boolean;
    summarizer?: (data: any[], id: string) => string;
    formatter?: (cell: any) => string | undefined;
    name?: string;
}
export interface CustomEventDataType {
    timestamp?: string;
    url?: string;
    value?: number;
    currency?: string;
    orderId?: string;
    email?: string;
    phone?: string;
    oneTrackId?: string;
    isAd?: string;
    source?: string;
    campaignId?: string;
    adSetId?: string;
    adId?: string;
    category?: string;
    cardCategory?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    clickIdExists?: string;
}
export interface CustomEventTiles {
    name: string;
    data: CustomEventTilesDataType;
    graphDetailed?: {
        time: number;
        value: number;
    }[];
    graphDaily?: {
        time: number;
        value: number;
    }[];
    graphHourly?: {
        time: number;
        value: number;
    }[];
}
export interface CustomEventTilesDataType {
    adValue: number;
    organicValue: number;
    directValue: number;
    adEvents: number;
    organicEvents: number;
    directEvents: number;
    totalValue: number;
    totalEvents: number;
}
export interface EventGatewayConnectorDataType extends ConnectorDataType {
    type: "EventGateway";
}
export interface EventGatewayConnectorResponseDataType extends ConnectorDataType {
    type: "EventGateway";
    data: {
        apiKey?: string
    }
}