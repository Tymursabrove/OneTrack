import { sendPostRequest, sendDeleteRequest, HeaderTypes, sendPutRequest } from '$lib/services/HttpsBaseRequests';
import type { DeleteSelectableConnectorType, DestinationConnector, GoogleSourceConnector, MetaSourceConnector, ShopifySourceConnector, TiktokSourceConnector } from '$lib/types/Types';
export async function CreateConnector(workspaceId: string, obj: GoogleSourceConnector | MetaSourceConnector | TiktokSourceConnector | DestinationConnector | ShopifySourceConnector) {
    let res = await sendPostRequest(`workspaces/${workspaceId}/connectors`, obj, HeaderTypes.access);
    return res;
}
export async function UpdateConnector(workspaceId: string, obj: DeleteSelectableConnectorType | DestinationConnector) {
    let clone = structuredClone(obj);
    delete clone.id;
    if (Object.hasOwn(clone, "workspaceId")) {
        delete clone["workspaceId"];
    }
    let res = await sendPutRequest(`workspaces/${workspaceId}/connectors/${obj.id}`, clone, HeaderTypes.access);
    return res;
}
export async function DeleteConnector(workspaceId: string, connectorId: string) {
    let res = await sendDeleteRequest(`workspaces/${workspaceId}/connectors/${connectorId}`, HeaderTypes.access);
    return res;
}