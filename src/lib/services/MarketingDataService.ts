
import { HeaderTypes, sendGetRequest } from '$lib/services/HttpsBaseRequests';
const defaultMetrics = {
    isDefault: true,
    adspendCum: { value: 0 },
    revenueCum: { value: 0 },
    roasCum: { value: 0 },
    traficCum: { value: 0 },
    uniqueTrafficCum: { value: 0 },
    cpoAverage: { value: 0 },
    aovAverage: { value: 0 },


};
export async function GetMarketingData(workspaceId, platformId, adTag, startUnixTime, endUnixTime) {
    let data = await sendGetRequest(
        `frontend/marketing-data/${workspaceId}/${platformId}/${adTag}?start-date=${startUnixTime}&end-date=${endUnixTime}`,
        HeaderTypes.access,
        false
    );
    return data;
}
export async function GetHomePageMetrics(workspaceId, startUnixTime, endUnixTime) {
    try {
        let data = await sendGetRequest(
            `frontend/metrics/${workspaceId}?start-date=${startUnixTime}&end-date=${endUnixTime}`
            , null, false);
        if (data.error) {
            return defaultMetrics;
        }
        return data.json;
    }
    catch (err) {
        console.error(err);
        return defaultMetrics;
    }
}