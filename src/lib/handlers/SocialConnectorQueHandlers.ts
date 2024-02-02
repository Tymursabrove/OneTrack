import { CreateConnector } from '../services/HttpConnectorsRequests';
import { ReloadWorkspaces } from '$lib/services/WorkspaceService';
import { Workspace, DestinationConnectorsQue, SourceConnectorsQue } from '$lib/store';
import { get, type Writable } from 'svelte/store';
import type { DestinationConnector, GoogleSourceConnector, MetaSourceConnector, ShopifySourceConnector, TiktokSourceConnector } from '$lib/types/Types';
export function InitConnectorHandler() {
    SourceConnectorsQue.subscribe(async (ac) => {
        if (!ac) {
            return;
        }
        await CreateSocialConnectors(ac, SourceConnectorsQue);
    });
    DestinationConnectorsQue.subscribe(async (ac) => {
        if (!ac) {
            return;
        }
        await CreateSocialConnectors(ac, DestinationConnectorsQue);
    });
}

async function CreateSocialConnectors(
    accounts: GoogleSourceConnector[] | MetaSourceConnector[] | TiktokSourceConnector[] | DestinationConnector[] | ShopifySourceConnector[],
    store: Writable<GoogleSourceConnector[] | MetaSourceConnector[] | TiktokSourceConnector[] | DestinationConnector[] | ShopifySourceConnector[] | null>) {

    let workspace = get(Workspace);
    if (!workspace || workspace == "init") {
        return;
    }
    for (let ac of accounts) {
        await CreateConnector(workspace.id, ac);
        await ReloadWorkspaces();
    };
    if (store) {
        store.set(null);
    }
}