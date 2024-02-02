import { sendPostRequest, sendGetRequest, sendPutRequest, HeaderTypes, sendLocalRequest } from './HttpsBaseRequests';
import type { UserPostRequestItem, WorkspaceDataType, TiktokSourceConnector, MetaSourceConnector, GoogleSourceConnector, DestinationConnector } from '$lib/types/Types';
import { showErrorMessage } from './ToastService';
import type { Moment } from 'moment';
export async function PostNewUser(userToPost: UserPostRequestItem) {
  let response = await sendPostRequest("customers", userToPost, HeaderTypes.access);
  return response;
}
export async function GetAllWorkspace() {
  let userIdentifier = await sendGetRequest('auth/session/user', HeaderTypes.access);
  let nextPointer: null | string = null;
  let iterate = true;
  let workspaces: WorkspaceDataType[] = [];
  while (iterate) {
    iterate = false;
    let url = `customers/${userIdentifier.json.customerId}/workspaces`;
    if (nextPointer) {
      url = `${url}?next=${nextPointer}`;
    }
    let response = await sendGetRequest(url, HeaderTypes.access, false);
    if (!response.error && response.json && response.json.data) {
      let newWorkspaces = response.json.data as WorkspaceDataType[];
      workspaces = [...workspaces, ...newWorkspaces];
      if (response.json.next) {
        nextPointer = response.json.next;
        iterate = true;
      }
    }
  }
  return workspaces;
}
export async function UpdateWorkspace(workspaceId: string, workspaceName: string, updatedTimezone: string) {
  let response = await sendPutRequest(
    `workspaces/${workspaceId}`,
    {
      name: workspaceName,
      enabled: true,
      timezone: updatedTimezone
    },
    HeaderTypes.access
  );
  if (response.error) {
    showErrorMessage("Couldn't update workspace.")
    return false;
  }
  return true;
}

export async function GetConnectorsOfAWorkspace(workspaceId: string) {
  let response = await sendGetRequest(`workspaces/${workspaceId}/connectors`, HeaderTypes.access);
  if (response.error) {
    showErrorMessage("Couldn't fetch workspaces assigned to this user.")
    return [];
  }
  return response.json.data as Array<TiktokSourceConnector | MetaSourceConnector | GoogleSourceConnector | DestinationConnector>;
  ;
}
export async function GetCustomer(customerId: string) {
  let response = await sendGetRequest(`customers/${customerId}`, HeaderTypes.access);
  return response;
}
export async function ParseUserAgent(ua: string) {
  try {
    let url = "/server/useragent/parse";
    let json = await sendLocalRequest("POST", url, JSON.stringify({
      ua
    }));
    return {
      data: json.data,
      error: null
    }
  }
  catch (error) {
    console.error(error);
    return {
      data: null,
      error
    }
  }
}