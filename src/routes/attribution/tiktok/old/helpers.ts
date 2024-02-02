import { ConvertOneTrackAttributionToProcessed, GetColumnDefinition } from '$lib/helpers/TableHelpers';
import {
    currencyFormatter,
    getSum,
    noFormatter,
    camelToSentence,
} from '$lib/helpers/MiscHelpers';
import TooltipData from '$lib/resources/TooltipResources';

import type { TikTokAdSetsData, TikTokAdsData, TikTokCampaignsData } from '$lib/types/HttpResponsesTypes';
import type { CustomSetting } from '$lib/types/Types';

export enum GridDataTypes {
    campaigns,
    adsets,
    ads
}

export const CustomColumnsSettings: CustomSetting[] = [
    {
        id: "advertiserId",
        isVisible: true,
    },
    
    {
        id: "campaignId",
        isVisible: true,
    },
    {
        id: "adGroupName",
        isVisible: true,
    },
    {
        id: "adName",
        isVisible: true,
    },
    {
        id: "spend",
        isVisible: true,
        summarizer: genericSum,
        formatter: currencyFormatter
    },
    {
        id: "cpl",
        name: "CPL",
        isVisible: true,
        summarizer: (data: any[], id: string) => {
            let totalCost = Number(getSum(data.map(x => x.spend)));
            let totalLeads = Number(getSum(data.map(x => x.form)));
            if (totalCost == 0 || totalLeads == 0) {
                return "0";
            }
            return (totalCost / totalLeads).toFixed(2);
        },
        formatter: currencyFormatter
    },
    {
        id: "ot_costPerLead",
        name: "CPL",
        isVisible: true,
        summarizer: (data: any[], id: string) => {
            let totalCost = Number(getSum(data.map(x => x.spend)));
            let totalLeads = Number(getSum(data.map(x => x.ot_leads)));
            if (totalCost == 0 || totalLeads == 0) {
                return "0";
            }
            return (totalCost / totalLeads).toFixed(2);
        },
        formatter: currencyFormatter
    },
    {
        id: "completePayment",
        isVisible: true,
        summarizer: genericSum
    },
    {
        id: "ot_purchases",
        name: camelToSentence("completePayment"),
        isVisible: true,
        summarizer: genericSum
    },
    {
        id: "costPerCompletePayment",
        isVisible: true,
        summarizer: genericSum,
        formatter: currencyFormatter
    },
    {
        id: "ot_costPerPurchase",
        name: camelToSentence("costPerCompletePayment"),
        isVisible: true,
        summarizer: genericSum,
        formatter: currencyFormatter
    },
    {
        id: "valuePerCompletePayment",
        isVisible: true,
        summarizer: genericSum,
        formatter: currencyFormatter
    },
    {
        id: "ot_averagePurchaseValue",
        name: camelToSentence("valuePerCompletePayment"),
        isVisible: true,
        summarizer: genericSum,
        formatter: currencyFormatter
    },
    {
        id: "completePaymentROAS",
        name: "Complete Payment ROAS",
        isVisible: true,
        summarizer: genericAverage,
    },
    {
        id: "ot_purchaseROAS",
        name: "Complete Payment ROAS",
        isVisible: true,
        summarizer: genericAverage,
    }, {
        id: "form",
        name: "Leads",
        isVisible: true,
        summarizer: genericSum
    },
    {
        id: "ot_leads",
        name: "Leads",
        isVisible: true,
        summarizer: genericSum
    },
    {
        id: "impressions",
        isVisible: true
    },
    {
        id: "clicks",
        isVisible: true
    },
    {
        id: "ctr",
        isVisible: true
    },
    {
        id: "conversions",
        isVisible: true
    },
    {
        id: "conversionRate",
        isVisible: true
    },
    {
        id: "cpm",
        isVisible: true
    },
    {
        id: "cpc",
        isVisible: true
    },
    {
        id: "costPerConversion",
        isVisible: true
    },
    {
        id: "frequency",
        isVisible: true
    },
    {
        id: "reach",
        isVisible: true
    },
    {
        id: "videoViewsP100",
        name: "Video Views P100",
        isVisible: true
    },
    {
        id: "engagement_rate",
        isVisible: true
    },
    {
        id: "costPer1000Reached",
        isVisible: true
    },
    {
        id: "landingPageViewRate",
        isVisible: true
    },
    {
        id: "averageVideoPlayPerUser",
        isVisible: true
    },
    {
        id: "profileVisitsRate",
        isVisible: true
    },
    {
        id: "shares",
        isVisible: true
    },
    {
        id: "realTimeConversionRate",
        isVisible: true
    }
]

function genericSum(data: any[], id: string) {
    return getSum(data.map(x => x[id]));
}
function genericAverage(data: any[], id: string) {
    return (Number(getSum(data.map(x => x[id]))) / data.length).toFixed(2);
}
export function loadRowsAndColumns(source: TikTokCampaignsData[] | TikTokAdSetsData[] | TikTokAdsData[], gridType: GridDataTypes) {
    //Filters out the ads or ad sets which are not active any longer (have no account Id and account name)
    let data: any[] = [];
    source.forEach((row) => {
        let onetrackMetrics = ConvertOneTrackAttributionToProcessed(row.metrics.onetrack);
        let obj: any = {
            ...row,
            ...row.metrics.tiktok,
            ...onetrackMetrics
        }
        delete obj.metrics;
        obj.cpl = obj.form == 0 ? 0 : (obj.spend / obj.form);
        data.push(obj);
    });
    let columns = [];
    let obj = data[0];
    for (let key in obj) {
        let icon = "tiktok";
        let formatter = noFormatter;
        let summary: null | string = null;
        let isVisible = false;
        let name = camelToSentence(key);
        let settings = CustomColumnsSettings.find(x => x.id == key);

        if (settings) {
            formatter = settings.formatter ?? noFormatter;
            if (settings.summarizer) {
                summary = settings.summarizer(data, key);
            }
            if (settings.name) {
                name = settings.name;
            }
            isVisible = settings.isVisible;
        }
        if (key.startsWith("ot_")) {
            icon = "onetrack";
        }
        let column = GetColumnDefinition(
            key,
            name,
            icon,
            summary,
            formatter
        )
        column.isVisible = isVisible;
        columns.push(column);
    }
    let sortedColumnsIds = CustomColumnsSettings.map(x => x.id);
    let settingColumns = [];
    for (let sortedColumnsId of sortedColumnsIds) {
        let obj = columns.find(x => x.id == sortedColumnsId);
        if (obj) {
            settingColumns.push(obj);
        }
    }
    let NonSettingColumns = columns.filter(x => !sortedColumnsIds.some(y => y == x.id));
    let sortedColumns = [...settingColumns, ...NonSettingColumns];
    sortedColumns[0].isFirst = true;
    sortedColumns[sortedColumns.length - 1].isLast = true;
    return { rows: data, columns: sortedColumns };
}
export let tooltipFinder = (y: string, z: string, id: string = "") => {
    try {
        let strKey = id as keyof typeof TooltipData.tiktok.updatedKPI;
        let kpi = TooltipData.tiktok.updatedKPI[strKey];
        if (!kpi) {
            return y;
        }
        return kpi
    } catch (err) {
        console.error(err);
        return y;
    }
};