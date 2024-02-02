import { get as getLocalStorage, set as setLocalStorage } from '$lib/local-packages/LocalStorage';
import { get } from 'svelte/store';
import { AllWorkspace, Workspace, CurrentRange, TimeZone, RANGE_STORE_LOCAL_STORAGE_KEY } from '$lib/store';
import moment from 'moment-timezone';
import type { UserTokensContainer, WorkspaceDataType } from '$lib/types/Types';
import { GetAllWorkspace, GetConnectorsOfAWorkspace } from './HttpRequests';

const workspaceLocalStorageKey = "workspace";
const workspaceCurrencyLocalStorageKey = "workspace_currency";

export async function InitDataFlow(u: null | 'init' | UserTokensContainer) {
    try {
        if (u === null && u === 'init') {
            return;
        }
        let workspaces = await GetAllWorkspace();
        await updateWorkspaceRelatedFields(getCurrentWorkspace(workspaces), true);
        AllWorkspace.set(workspaces);
    }
    catch (err) {
        console.error(err);
    }
}

function getCurrentWorkspace(allWorkspaces: WorkspaceDataType[]) {
    if (!allWorkspaces || allWorkspaces.length == 0) {
        return null;
    }
    let workspaceIdFromLocalStorage = getLocalStorage(workspaceLocalStorageKey);
    if (!workspaceIdFromLocalStorage) {
        return allWorkspaces[0];
    }
    let foundWorkspace = allWorkspaces.find(x => x.id === workspaceIdFromLocalStorage);
    if (foundWorkspace) {
        return foundWorkspace;
    }
    return allWorkspaces[0];
}
export async function ReloadWorkspaces() {
    let workspaces = await GetAllWorkspace();
    await updateWorkspaceRelatedFields(getCurrentWorkspace(workspaces));
}
export async function updateWorkspaceRelatedFields(workspace: WorkspaceDataType | null, updateRange = false) {
    if (workspace) {
        TimeZone.set(workspace.timezone);
        //TODO: Handle "CurrencySymbol" store value here as currently we are not getting this value
        moment.tz.setDefault(workspace.timezone);
        setLocalStorage(workspaceLocalStorageKey, workspace.id);
        setLocalStorage(workspaceCurrencyLocalStorageKey, workspace.currency);
    }

    if (updateRange) {
        let storedRange = getLocalStorage(RANGE_STORE_LOCAL_STORAGE_KEY) as { start: number, end: number } | null;
        if (storedRange) {
            CurrentRange.set({ start: moment.unix(storedRange.start), end: moment.unix(storedRange.end) })
        }
        else {
            CurrentRange.set({ start: moment().subtract(7, 'days'), end: moment() })
        }
    }
    Workspace.set(workspace);
}
export async function SetWorkspaceConnectors() {
    let workspace = get(Workspace);
    if (!workspace || workspace == "init") {
        return;
    }
    let connectors = await GetConnectorsOfAWorkspace(workspace.id);
    workspace.connectors = connectors;
    Workspace.set(workspace);
}
export async function UpdateSelectedWorkspace(workspaceId: string) {
    let allWorkspaces = get(AllWorkspace);
    if (allWorkspaces) {
        let selectedWorkspace = allWorkspaces.find(x => x.id === workspaceId);
        if (selectedWorkspace) {
            await updateWorkspaceRelatedFields(selectedWorkspace);
        }
    }
}
