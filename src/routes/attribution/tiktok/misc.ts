import type { ITableColumn } from '$lib/components/table/types';
import type { TikTokCampaignsData, TikTokAdSetsData, TikTokAdsData } from '$lib/types/HttpResponsesTypes';

import { getTableSetups } from '$lib/components/layout/Attribution/misc';
import { getAverageExcludeZeros, getSum, getQuotient, formatCurrency } from '$lib/components/layout/Attribution/utils';

const tooltipTexts = {
  "spend": "This metric shows the total amount spent on the ad campaign. It is crucial for advertisers to track their spending to ensure they are within budget and to evaluate the cost-effectiveness of their campaigns.",
  "completePaymentROAS": "This metric represents the revenue generated per dollar spent on advertising. It is essential to monitor ROAS to determine the effectiveness of an ad campaign and optimize it for better results.",
  "impressions": "The total number of times the ad was shown to users. It is important to track impressions to understand the ad’s reach and the potential audience size.",
  "clicks": "The total number of times users clicked on the ad. This metric is vital to measure the ad’s ability to drive user engagement and interest.",
  "ctr": "Click-through rate (CTR) is the ratio of clicks to impressions. A high CTR indicates that the ad is resonating well with the target audience and can lead to better conversions.",
  "conversions": "The total number of desired actions (e.g., sales, sign-ups) taken by users after interacting with the ad. Conversions are crucial to track as they indicate the ad’s ability to drive desired outcomes.",
  "conversionRate": "The percentage of users who completed a conversion after clicking on the ad. This metric helps evaluate the effectiveness of the ad in driving desired user actions.",
  "cpm": "Cost per thousand (CPM) impressions indicates the cost of reaching 1,000 users. This metric is essential for understanding the overall cost efficiency of an ad campaign.",
  "cpc": "Cost per click (CPC) measures the cost of each click on the ad. Tracking CPC can help advertisers optimize their ad campaigns for better cost-efficiency.",
  "costPerConversion": "This metric reveals the cost of each conversion, allowing advertisers to understand the effectiveness of their ad campaigns in driving results while staying within budget.",
  "frequency": "The average number of times each user was exposed to the ad. Frequency is important to monitor as excessive ad exposure can lead to ad fatigue and diminishing returns.",
  "reach": "The total number of unique users who saw the ad. Reach is essential for understanding the ad’s ability to penetrate the target audience.",
  "ixVideoViewsP100": "The number of times the ad’s video was viewed to completion. This metric helps measure the ad’s ability to capture and retain user attention.",
  "engagement_rate": "The percentage of users who engaged with the ad (e.g., clicks, likes, comments, shares). A high engagement rate indicates that the ad is resonating well with the target audience.",
  "costPer1000Reached": "The cost of reaching 1,000 unique users. This metric is important for evaluating the cost efficiency of an ad campaign in terms of audience reach.",
  "landingPageViewRate": "The percentage of users who visited the landing page after clicking on the ad. This metric is important to gauge the effectiveness of the ad in driving users to the intended destination.",
  "averageVideoPlayPerUser": "This metric shows the average duration of video play for each user. It helps to measure user engagement and interest in the ad content.",
  "profileVisitsRate": "The percentage of users who visited the advertiser’s profile after engaging with the ad. This metric indicates the ad’s ability to generate interest in the brand.",
  "shares": "The total number of times users shared the ad. Shares are important to track as they indicate that users found the ad content worth sharing, increasing organic reach.",
  "realTimeConversionRate": "The real-time conversion rate helps advertisers"
};

function getTooltipText(id: string): string | null {
  let key = id as keyof typeof tooltipTexts;
  let text = tooltipTexts[key];
  return text;
}

export function getSharedCols(): ITableColumn[] {
  return [
    {
      name: 'account_name',
      title: 'Account Name',
      info: 'Name of the TikTok Ads account.',
      icon: 'tiktok',
      minWidth: 220,
      getValue: (row: TikTokCampaignsData) => row.advertiserId,
    },
    {
      name: 'spend',
      title: 'Spend',
      info: getTooltipText("spend") ?? "Spend",
      icon: 'tiktok',
      display: formatCurrency,
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.spend,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.spend), 0),
    },
    {
      name: 'cpl',
      title: 'CPL',
      info: getTooltipText("cpl") ?? "CPL",
      icon: 'tiktok',
      display: formatCurrency,
      getValue: (row: TikTokCampaignsData) => {
        return row.metrics.tiktok.form == 0 ? 0 : (row.metrics.tiktok.spend / row.metrics.tiktok.form)
      },
      getSummary: (data: TikTokCampaignsData[]) => {
        let totalCost = Number(getSum(data.map(x => x.metrics.tiktok.spend)));
        let totalLeads = Number(getSum(data.map(x => x.metrics.tiktok.form)));
        if (totalCost == 0 || totalLeads == 0) {
          return "0";
        }
        return (totalCost / totalLeads).toFixed(2);
      }
    },
    {
      name: 'ot_cpl',
      title: 'CPL',
      info: getTooltipText("cpl") ?? "CPL",
      icon: 'onetrack:static',
      display: formatCurrency,
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.costPerLead,
      getSummary: (data: TikTokCampaignsData[]) => {
        let totalCost = Number(getSum(data.map(x => x.metrics.tiktok.spend)));
        let totalLeads = Number(getSum(data.map(x => x.metrics.onetrack.leads)));
        if (totalCost == 0 || totalLeads == 0) {
          return "0";
        }
        return (totalCost / totalLeads).toFixed(2);
      },
    },
    {
      name: 'complete_payment',
      title: 'Complete Payment',
      info: getTooltipText("completePayment") ?? "Complete Payment",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.completePayment,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.completePayment), 0),
    },
    {
      name: 'ot_complete_payment',
      title: 'Complete Payment',
      info: getTooltipText("completePayment") ?? "Complete Payment",
      icon: 'onetrack:static',
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.purchases,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.purchases), 0),
    },
    {
      name: 'cost_per_complete_payment',
      title: 'Cost Per Complete Payment',
      info: getTooltipText("costPerCompletePayment") ?? "Cost Per Complete Payment",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.costPerCompletePayment,
      display: formatCurrency,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.costPerCompletePayment), 0),
    },
    {
      name: 'ot_cost_per_complete_payment',
      title: 'Cost Per Complete Payment',
      info: getTooltipText("costPerCompletePayment") ?? "Cost Per Complete Payment",
      icon: 'onetrack:static',
      display: formatCurrency,
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.costPerPurchase,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.costPerPurchase), 0),
    },
    {
      name: 'value_per_complete_payment',
      title: 'Value Per Complete Payment',
      info: getTooltipText("valuePerCompletePayment") ?? "Value Per Complete Payment",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.valuePerCompletePayment,
      display: formatCurrency,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.valuePerCompletePayment), 0),
    },
    {
      name: 'ot_value_per_complete_payment',
      title: 'Value Per Complete Payment',
      info: getTooltipText("valuePerCompletePayment") ?? "Value Per Complete Payment",
      icon: 'onetrack:static',
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.averagePurchaseValue,
      display: formatCurrency,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.averagePurchaseValue), 0),
    },
    {
      name: 'complete_payment_ROAS',
      title: 'Complete Payment ROAS',
      info: getTooltipText("completePaymentROAS") ?? "Complete Payment ROAS",
      icon: 'tiktok',
      type: 'roas',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.completePaymentROAS,
      getSummary: (data: TikTokCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.tiktok.completePaymentROAS)),
    },
    {
      name: 'ot_complete_payment_ROAS',
      title: 'Complete Payment ROAS',
      info: getTooltipText("completePaymentROAS") ?? "Complete Payment ROAS",
      icon: 'onetrack:static',
      type: 'roas',
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.purchaseROAS,
      getSummary: (data: TikTokCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.onetrack.purchaseROAS)),
    },
    {
      name: 'form',
      title: 'Leads',
      info: getTooltipText("form") ?? "Form",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.form,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.form), 0),
    },
    {
      name: 'ot_form',
      title: 'Leads',
      info: getTooltipText("form") ?? "Form",
      icon: 'onetrack:static',
      getValue: (row: TikTokCampaignsData) => row.metrics.onetrack.leads,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.leads), 0),
    },
    {
      name: 'impressions',
      title: 'Impressions',
      info: getTooltipText("impressions") ?? "Impressions",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.impressions,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.impressions), 0),
    },
    {
      name: 'clicks',
      title: 'Clicks',
      info: getTooltipText("clicks") ?? "Clicks",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.clicks,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.clicks), 0),
    },
    {
      name: 'ctr',
      title: 'CTR',
      info: getTooltipText("ctr") ?? "CTR",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.ctr,
      getSummary: (data: TikTokCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.tiktok.ctr)),
    },
    {
      name: 'conversions',
      title: 'Conversions',
      info: getTooltipText("conversions") ?? "Conversions",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.conversion,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.conversion), 0),
    },
    {
      name: 'conversionRate',
      title: 'Conversion Rate',
      info: getTooltipText("conversionRate") ?? "Conversion Rate",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.conversionRate,
      getSummary: (data: TikTokCampaignsData[]) => getSum(data.map(row => row.metrics.tiktok.conversionRate), 0),
    },
    {
      name: 'cpm',
      title: 'CPM',
      info: getTooltipText("cpm") ?? "CPM",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.cpm,
    },
    {
      name: 'cpc',
      title: 'CPC',
      info: getTooltipText("cpc") ?? "CPC",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.cpc,
    },
    {
      name: 'cost_per_conversion',
      title: 'Cost Per Conversion',
      info: getTooltipText("costPerConversion") ?? "Cost Per Conversion",
      icon: 'tiktok',
      display: formatCurrency,
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.costPerConversion,
    },
    {
      name: 'frequency',
      title: 'Frequency',
      info: getTooltipText("frequency") ?? "Frequency",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.frequency,
    },
    {
      name: 'reach',
      title: 'Reach',
      info: getTooltipText("reach") ?? "Reach",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.reach,
    },
    {
      name: 'engagement_rate',
      title: 'Engagement Rate',
      info: getTooltipText("engagement_rate") ?? "Engagement Rate",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.engagementRate,
    },
    {
      name: 'landingPageViewRate',
      title: 'Landing Page View Rate',
      info: getTooltipText("landingPageViewRate") ?? "Landing Page View Rate",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.landingPageViewRate,
    },
    {
      name: 'averageVideoPlayPerUser',
      title: 'Average Video Play Per User',
      info: getTooltipText("averageVideoPlayPerUser") ?? "Average Video Play Per User",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.averageVideoPlayPerUser,
    },
    {
      name: 'profileVisitsRate',
      title: 'Profile Visits Rate',
      info: getTooltipText("profileVisitsRate") ?? "Profile Visits Rate",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.profileVisitsRate,
    },
    {
      name: 'shares',
      title: 'Shares',
      info: getTooltipText("shares") ?? "Shares",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.shares,
    },
    {
      name: 'realTimeConversionRate',
      title: 'Real Time Conversion Rate',
      info: getTooltipText("realTimeConversionRate") ?? "Real Time Conversion Rate",
      icon: 'tiktok',
      getValue: (row: TikTokCampaignsData) => row.metrics.tiktok.realTimeConversionRate,
    },
  ]
}

export function getMetaSources() {
  return {
    campaigns: {
      title: 'Campaigns',
      icon: 'folder',
      name: `campaigns`,
      insertCols: [
        {
          name: 'id',
          title: 'Select',
          controlsDisabled: true,
          width: 80,
          getValue: (row: TikTokCampaignsData) => row.campaignId,
        }, {
          name: 'campaign_name',
          title: 'Campaign Name',
          info: 'Name of the specific marketing campaign.',
          icon: 'tiktok',
          minWidth: 300,
          getValue: (row: TikTokCampaignsData) => row.campaignName,
        }, {
          name: 'campaign_id',
          title: 'Campaign ID',
          info: 'Unique identifier for the marketing campaign.',
          icon: 'tiktok',
          minWidth: 220,
          getValue: (row: TikTokCampaignsData) => row.campaignId,
        }],
      insertAt: 2, // id, accountName, ...insertCols, ...
    },
    adSets: {
      title: 'Ad Group',
      icon: 'four-dots',
      name: `ad_sets`,
      insertCols: [
        {
          name: 'id',
          title: 'Select',
          controlsDisabled: true,
          width: 80,
          getValue: (row: TikTokAdSetsData) => row.adGroupId,
        }, {
          name: 'ad_set_name',
          title: 'Ad Set Name',
          info: 'Name of the ad set within the campaign.',
          icon: 'tiktok',
          minWidth: 300,
          getValue: (row: TikTokAdSetsData) => row.adGroupName,
        }, {
          name: 'ad_set_id',
          title: 'Ad Set ID',
          info: 'Unique identifier for the ad set.',
          icon: 'tiktok',
          minWidth: 220,
          getValue: (row: TikTokAdSetsData) => row.adGroupId,
        }],
      insertAt: 2, // id, accountName, ...insertCols, ...
    },
    ads: {
      title: 'Ads',
      icon: 'graphic-progression',
      name: `ads`,
      insertCols: [{
        name: 'id',
        title: 'Select',
        controlsDisabled: true,
        width: 80,
        getValue: (row: TikTokAdsData) => row.adId,
      },
      {
        name: 'ad_name',
        title: 'Ad Name',
        info: 'Name of the individual ad within the ad set.',
        icon: 'meta',
        minWidth: 300,
        getValue: (row: TikTokAdsData) => row.adName,
      }, {
        name: 'ad_id',
        title: 'Ad ID',
        info: 'Unique identifier for the ad.',
        icon: 'meta',
        minWidth: 220,
        getValue: (row: TikTokAdsData) => row.adId,
      }],
      insertAt: 2, // id, accountName, ...insertCols, ...
    }
  }
}

export const TableSetups = getTableSetups(getSharedCols, getMetaSources)
