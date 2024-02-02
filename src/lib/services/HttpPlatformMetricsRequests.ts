import type { Moment } from 'moment';
import type {
    GoogleAdSetsData,
    GoogleAdsData,
    GoogleAttributionDataResponse,
    GoogleCampaignsData,
    MetaAdSetsData,
    MetaAdsData,
    MetaAttributionDataResponse,
    MetaCampaignsData,
    TikTokAdSetsData,
    TikTokAdsData,
    TikTokAttributionDataResponse,
    TikTokCampaignsData
} from '$lib/types/HttpResponsesTypes';
import { HeaderTypes, sendGetRequest } from './HttpsBaseRequests';
import { AttributionWindow, AttributionType } from '$lib/store';
import { getAttributionTypeValue } from '$lib/helpers/UserHelpers';
import { get } from 'svelte/store';

export async function GetMetaAttributionData(workspaceId: string, startDate: Moment, endDate: Moment): Promise<MetaAttributionDataResponse> {
    const platform = "meta";

    const [campaigns, adsets, ads] = await Promise.all([
        createMetricsRequest(workspaceId, startDate, endDate, "campaign", platform),
        createMetricsRequest(workspaceId, startDate, endDate, "adset", platform),
        createMetricsRequest(workspaceId, startDate, endDate, "ad", platform)
    ]);

    return {
        campaigns: campaigns.error ? [] : campaigns.json as MetaCampaignsData[],
        adSets: adsets.error ? [] : adsets.json as MetaAdSetsData[],
        ads: ads.error ? [] : ads.json as MetaAdsData[]
    }
}

export async function GetTikTokAttributionData(workspaceId: string, startDate: Moment, endDate: Moment): Promise<TikTokAttributionDataResponse> {
    const platform = "tiktok";

    const [campaigns, adsets, ads] = await Promise.all([
        createMetricsRequest(workspaceId, startDate, endDate, 'AUCTION_CAMPAIGN', platform),
        createMetricsRequest(workspaceId, startDate, endDate, 'AUCTION_ADGROUP', platform),
        createMetricsRequest(workspaceId, startDate, endDate, 'AUCTION_AD', platform)
    ]);

    let filteredAdSets = adsets.error ? [] : adsets.json as TikTokAdSetsData[];

    return {
        campaigns: campaigns.error ? [] : campaigns.json as TikTokCampaignsData[],
        adSets: filteredAdSets.map(x => { x.adSetId = x.adGroupId; x.adSetName = x.adGroupName; return x; }),
        ads: ads.error ? [] : ads.json as TikTokAdsData[]
    };
}

export async function GetGoogleAttributionData(workspaceId: string, startDate: Moment, endDate: Moment): Promise<GoogleAttributionDataResponse> {
    const platform = "google";

    const [campaigns, adsets, ads] = await Promise.all([
        createMetricsRequest(workspaceId, startDate, endDate, 'campaign', platform),
        createMetricsRequest(workspaceId, startDate, endDate, 'adgroup', platform),
        createMetricsRequest(workspaceId, startDate, endDate, 'adgroup_ad', platform)
    ]);

    let filteredAdSets = adsets.error ? [] : adsets.json as GoogleAdSetsData[];
    let filteredAds = ads.error ? [] : ads.json as GoogleAdsData[];
    return {
        campaigns: campaigns.error ? [] : campaigns.json as GoogleCampaignsData[],
        adSets: filteredAdSets.map(x => {
            x.adSetId = x.adGroupId;
            x.adSetName = x.adGroupName;
            return x;
        }),
        ads: filteredAds.map(x => {
            if (!x.adName) {
                x.adName = "Unknown";
            }
            return x;
        })
    };
}

function createMetricsRequest(workspaceId: string, startDate: Moment, endDate: Moment, level: string, platform: string) {
    const query = new URLSearchParams({
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        level,
        attribution_model: getAttributionTypeValue(get(AttributionType)),
        attribution_window: `${get(AttributionWindow)}d`,
    }).toString();

    return sendGetRequest(
        `workspaces/${workspaceId}/metrics/${platform}?${query}`,
        HeaderTypes.access
    );
}

export async function GetLevelBasedAttribution(workspaceId: string, startDate: Moment, endDate: Moment, level: string, platform: string) {
    let results = await createMetricsRequest(workspaceId, startDate, endDate, level, platform);
    return results.error ? [] : results.json;
}
