import { ConvertOneTrackAttributionToProcessed, GetColumnDefinition } from '$lib/helpers/TableHelpers';
import {
    currencyFormatter,
    percentageSymbolFormatter,
    getAverage,
    getSum,
    noFormatter,
    camelToSentence,
    getSumRaw,
} from '$lib/helpers/MiscHelpers';

import type { GoogleCampaignsData, GoogleAdSetsData, GoogleAdsData } from '$lib/types/HttpResponsesTypes';
import type { CustomSetting } from '$lib/types/Types';

export const Page_Intro = `Welcome to the Google Tab, where you can view and compare all KPIs for your Campaigns, Ad Sets, and Ads as measured by both Google and OneTrack. This comprehensive table provides a holistic view of your marketing performance, helping you understand the impact of your advertising efforts across all levels of granularity.<br><br>
With the ability to filter data by Account Name, Campaign Name, Ad Group Name, and Ad Name, you can easily focus on specific segments of your advertising strategy. Applying a filter, such as on the campaign level, will only display the Ad Sets and Ads within the selected campaigns, streamlining your analysis and making it simple to pinpoint areas for optimization.<br><br>
Use the Google Tab to gain valuable insights into your marketing campaigns, and leverage the combined power of Google and OneTrack metrics to make data-driven decisions that improve your advertising results.`;
export const Tabs_Intro = {
    campaigns: "View and analyze the performance of your marketing campaigns. This section contains aggregated data for each campaign, including key performance indicators like ROAS, Order Value, and Leads.",
    adSets: "Dive deeper into each campaign's ad sets to see how they perform. The Ad Set section breaks down performance metrics by ad set, allowing you to optimize targeting and budget allocation for better results.",
    ads: "Examine the performance of individual ads within ad sets. This level of granularity helps you identify the most effective ad creatives, placements, and formats, enabling data-driven decision-making for ad optimizations."
};

export const CustomColumnsSettings: CustomSetting[] = [
    {
        id: "customerId",
        isVisible: true,
    },
    {
        id: "campaignId",
        isVisible: true
    },
    {
        id: "campaignName",
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
        id: "costMicros",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "leadConversions",
        isVisible: true
    },
    {
        id: "ot_leads",
        isVisible: true,
    },
    {
        id: "averageCpl",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "ot_costPerLead",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "roasMicros",
        isVisible: true,
    },
    {
        id: "ot_purchaseROAS",
        isVisible: true,
    },
    {
        id: "purchaseConversions",
        isVisible: true,
    },
    {
        id: "ot_purchases",
        isVisible: true,
    },
    {
        id: "purchaseConversionsValue",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "ot_purchaseValue",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "valuePerConversionPurchase",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "ot_averagePurchaseValue",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "averageCost",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "averageCpc",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "averageCpe",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "averageCpm",
        isVisible: true,
        formatter: currencyFormatter
    }, {
        id: "averageCpv",
        isVisible: true,
        formatter: currencyFormatter
    },
    {
        id: "clicks",
        isVisible: true,
    },

    {
        id: "ctr",
        isVisible: true
    },
    {
        id: "engagementRate",
        isVisible: true
    },
    {
        id: "impressions",
        isVisible: true,
    },
    {
        id: "pageViewConversions",
        isVisible: true,
    },
    {
        id: "addToCartConversions",
        isVisible: true,
    },
    {
        id: "initiateCheckoutConversions",
        isVisible: true,
    },
    {
        id: "subscribeConversions",
        isVisible: true
    },
    {
        id: "pageViewConversionRate",
        isVisible: true
    },
    {
        id: "addToCartConversionRate",
        isVisible: true
    },
    {
        id: "initiateCheckoutConversionRate",
        isVisible: true
    },
    {
        id: "leadConversionRate",
        isVisible: true
    },
    {
        id: "subscribeConversionRate",
        isVisible: true
    },
    {
        id: "videoViews",
        isVisible: true,
    },
    {
        id: "videoViewRate",
        isVisible: true
    },
    {
        id: "videoQuartileP100Rate",
        isVisible: true
    },
    {
        id: "purchaseConversionRate",
        isVisible: true
    }
]

const KPIData: {
    kpi: string;
    kpiName: string;
    definitionOfTheKPI: string;
    calculationMethod: "Sum" | "Average" | "N/A",
    customSummarizer?: (data: any[], id: string) => string
}[] = [
        {
            "kpi": "customerId",
            "kpiName": "Customer ID",
            "definitionOfTheKPI": "The ID of the customer.",
            "calculationMethod": "N/A"
        },
        {
            "kpi": "campaignId",
            "kpiName": "Campaign ID",
            "definitionOfTheKPI": "The ID of the campaign.",
            "calculationMethod": "N/A"
        },
        {
            "kpi": "campaignName",
            "kpiName": "Campaign Name",
            "definitionOfTheKPI": "The name of the campaign.",
            "calculationMethod": "N/A"
        },
        {
            "kpi": "adGroupName",
            "kpiName": "Ad Group Name",
            "definitionOfTheKPI": "The name of the ad group.",
            "calculationMethod": "N/A"
        },
        {
            "kpi": "adName",
            "kpiName": "Ad Name",
            "definitionOfTheKPI": "The name of the Ad.",
            "calculationMethod": "N/A"
        },
        {
            "kpi": "costMicros",
            "kpiName": "Cost",
            "definitionOfTheKPI": "The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "leadConversions",
            "kpiName": "Lead Conv.",
            "definitionOfTheKPI": "The sum of converted leads over the given time period. Measured by Google.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "ot_leads",
            "kpiName": "Lead Conv.",
            "definitionOfTheKPI": "The sum of converted leads over the given time period. Measured by OneTrack.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "averageCpl",
            "kpiName": "CPL",
            "definitionOfTheKPI": "The cost per lead (CPL) during this period. Measured by Google.",
            "calculationMethod": "Sum",
            customSummarizer: (data: any[], id: string) => {
                let totalCost = Number(getSum(data.map(x => x.costMicros)));
                let totalLeads = Number(getSum(data.map(x => x.leadConversions)));
                if (totalCost == 0 || totalLeads == 0) {
                    return "0";
                }
                return (totalCost / totalLeads).toFixed(2);
            }
        },
        {
            "kpi": "ot_costPerLead",
            "kpiName": "CPL",
            "definitionOfTheKPI": "The cost per lead (CPL) during this period. Measured by OneTrack.",
            "calculationMethod": "Average",
            customSummarizer: (data: any[], id: string) => {
                let totalCost = Number(getSum(data.map(x => x.costMicros)));
                let totalLeads = Number(getSum(data.map(x => x.ot_leads)));
                if (totalCost == 0 || totalLeads == 0) {
                    return "0";
                }
                return (totalCost / totalLeads).toFixed(2);
            }
        },
        {
            "kpi": "roasMicros",
            "kpiName": "ROAS",
            "definitionOfTheKPI": "The return on ad spend (ROAS) during this period.",
            "calculationMethod": "Average",
            customSummarizer: (data: any[], id: string) => {
                let totalCost = getSumRaw(data.map(x => x.costMicros));
                let totalPurchaseValue = getSumRaw(data.map(x => x.purchaseConversionsValue));
                if (totalCost == 0 || totalPurchaseValue == 0) {
                    return "0";
                }
                return (totalPurchaseValue / totalCost).toFixed(2);
            }
        },
        {
            "kpi": "ot_purchaseROAS",
            "kpiName": "ROAS",
            "definitionOfTheKPI": "The return on ad spend (ROAS) during this period. Measured by OneTrack.",
            "calculationMethod": "Average",
            customSummarizer: (data: any[], id: string) => {
                let totalCost = getSumRaw(data.map(x => x.costMicros));
                let totalPurchaseValue = getSumRaw(data.map(x => x.ot_purchaseValue));
                if (totalCost == 0 || totalPurchaseValue == 0) {
                    return "0";
                }
                return (totalPurchaseValue / totalCost).toFixed(2);
            }
        },
        {
            "kpi": "purchaseConversions",
            "kpiName": "Purchase Conv.",
            "definitionOfTheKPI": "The total number of completed purchases over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "ot_purchases",
            "kpiName": "Purchase Conv.",
            "definitionOfTheKPI": "The total number of completed purchases over the given time period. Measured by OneTrack.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "purchaseConversionsValue",
            "kpiName": "Purchase Conv. Value",
            "definitionOfTheKPI": "The total value of completed purchases over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "ot_purchaseValue",
            "kpiName": "Purchase Conv. Value",
            "definitionOfTheKPI": "The total value of completed purchases over the given time period. Measured by OneTrack.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "valuePerConversionPurchase",
            "kpiName": "Avg. Order Value (Google)",
            "definitionOfTheKPI": "The average value generated by each purchase conversion.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "ot_averagePurchaseValue",
            "kpiName": "Avg. Order Value",
            "definitionOfTheKPI": "The average value generated by each purchase conversion. Measured by OneTrack.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "ot_costPerPurchase",
            "kpiName": "CPP",
            "definitionOfTheKPI": "The cost per purchase (CPP) during this period. Measured by OneTrack.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "averageCost",
            "kpiName": "Avg. Cost",
            "definitionOfTheKPI": "The average cost per click or impression during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "averageCpc",
            "kpiName": "Avg. CPC",
            "definitionOfTheKPI": "The average cost per click during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "averageCpe",
            "kpiName": "Avg. CPE",
            "definitionOfTheKPI": "The average cost per lead conversion during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "averageCpm",
            "kpiName": "Avg. CPM",
            "definitionOfTheKPI": "The average cost per thousand impressions during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "averageCpv",
            "kpiName": "Avg. CPV",
            "definitionOfTheKPI": "The average cost per view during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "clicks",
            "kpiName": "Clicks",
            "definitionOfTheKPI": "The total number of clicks over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "ctr",
            "kpiName": "CTR",
            "definitionOfTheKPI": "The click-through rate (CTR) for the ad during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "engagementRate",
            "kpiName": "Engmt. Rate",
            "definitionOfTheKPI": "The engagement rate for the ad during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "impressions",
            "kpiName": "Impressions",
            "definitionOfTheKPI": "The total number of impressions (views) for the ad during this period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "pageViewConversions",
            "kpiName": "Page View Conv.",
            "definitionOfTheKPI": "The total number of page view conversions over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "addToCartConversions",
            "kpiName": "Add To Cart Conv.",
            "definitionOfTheKPI": "The total number of add to cart conversions over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "initiateCheckoutConversions",
            "kpiName": "Init. Checkout Conv.",
            "definitionOfTheKPI": "The total number of conversions related to initiating the checkout process over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "subscribeConversions",
            "kpiName": "Subscribe Conv.",
            "definitionOfTheKPI": "The total number of subscriptions or sign-ups over the given time period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "pageViewConversionRate",
            "kpiName": "Page View Conv. Rate",
            "definitionOfTheKPI": "The page view conversion rate for the ad during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "addToCartConversionRate",
            "kpiName": "Add To Cart Conv. Rate",
            "definitionOfTheKPI": "The conversion rate for adding items to the cart during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "initiateCheckoutConversionRate",
            "kpiName": "Init. Checkout Conv. Rt",
            "definitionOfTheKPI": "The conversion rate for initiating the checkout process during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "purchaseConversionRate",
            "kpiName": "Purchase Conv. Rate",
            "definitionOfTheKPI": "The conversion rate for completed purchases during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "leadConversionRate",
            "kpiName": "Lead Conv. Rate",
            "definitionOfTheKPI": "The conversion rate for leads during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "subscribeConversionRate",
            "kpiName": "Subscribe Conv. Rate",
            "definitionOfTheKPI": "The conversion rate for subscriptions or sign-ups during this period.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "videoViews",
            "kpiName": "Video Views",
            "definitionOfTheKPI": "The total number of video views for the ad during this period.",
            "calculationMethod": "Sum"
        },
        {
            "kpi": "videoQuartileP100Rate",
            "kpiName": "Video Q100% Rate",
            "definitionOfTheKPI": "The percentage of viewers who watched the entire video ad.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "videoQuartileP25Rate",
            "kpiName": "Video Q25% Rate",
            "definitionOfTheKPI": "The percentage of viewers who reached the 25% mark of the video ad.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "videoQuartileP50Rate",
            "kpiName": "Video Q50% Rate",
            "definitionOfTheKPI": "The percentage of viewers who reached the 50% mark (midpoint) of the video ad.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "videoQuartileP75Rate",
            "kpiName": "Video Q75% Rate",
            "definitionOfTheKPI": "The percentage of viewers who reached the 75% mark of the video ad.",
            "calculationMethod": "Average"
        },
        {
            "kpi": "videoViewRate",
            "kpiName": "Video View Rate",
            "definitionOfTheKPI": "The percentage of impressions that resulted in a video view.",
            "calculationMethod": "Average"
        }
    ]


function genericSum(data: any[], id: string) {
    return getSum(data.map(x => x[id]));
}
function genericAverage(data: any[], id: string) {
    return (Number(getSum(data.map(x => x[id]))) / data.length).toFixed(2);
}

export function loadRowsAndColumns(source: GoogleCampaignsData[] | GoogleAdSetsData[] | GoogleAdsData[]) {
    let data: any[] = [];
    source.forEach((row) => {
        let onetrackMetrics = ConvertOneTrackAttributionToProcessed(row.metrics.onetrack);
        let obj: any = {
            ...row,
            ...row.metrics.google,
            ...onetrackMetrics
        }
        delete obj.metrics;
        data.push(obj);
    });

    let columns = [];
    let obj = data[0];
    for (let key in obj) {

        let kpiData = KPIData.find(x => x.kpi == key);
        let icon = "googleAdsIcon";
        let formatter = noFormatter;
        let summary: null | string = null;
        let isVisible = false;
        let name = kpiData?.kpiName ?? camelToSentence(key);
        let settings = CustomColumnsSettings.find(x => x.id == key);

        if (kpiData?.customSummarizer) {
            summary = kpiData.customSummarizer(data, key);
        }
        else {
            if (kpiData?.calculationMethod == "Sum") {
                summary = genericSum(data, key);
            }
            else if (kpiData?.calculationMethod == "Average") {
                summary = genericAverage(data, key);
            }
        }

        if (settings) {
            formatter = settings.formatter ?? noFormatter;
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
        let kpi = KPIData.find(x => x.kpi == id);
        if (!kpi) {
            return y;
        }
        return kpi.definitionOfTheKPI;
    } catch (err) {
        console.error(err);
        return y;
    }
};