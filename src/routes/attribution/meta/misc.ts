import type { ITableColumn } from '$lib/components/table/types'
import type { MetaCampaignsData, MetaAdSetsData, MetaAdsData } from '$lib/types/HttpResponsesTypes'

import { getTableSetups } from '$lib/components/layout/Attribution/misc'
import { getAverageExcludeZeros, getSum, getQuotient, formatCurrency } from '$lib/components/layout/Attribution/utils'

export function getSharedCols(): ITableColumn[] {
  return [{
    name: 'account_name',
    title: 'Account Name',
    info: 'Name of the Meta Ads account.',
    icon: 'meta',
    minWidth: 220,
    getValue: (row: MetaCampaignsData) => row.accountName,
  }, {
    name: 'ad_spend',
    title: 'Ad Spend',
    info: 'Total amount spent on the {table_title}',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.spend,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.spend)),
  }, {
    name: `roas`,
    title: 'ROAS',
    info: 'Return on Ad Spend, a measure of {table_title} profitability.',
    icon: 'meta',
    type: 'roas',
    getValue: (row: MetaCampaignsData) => row.metrics.meta.purchaseROAS,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.meta.purchaseValue)),
      getSum(data.map(row => row.metrics.meta.spend))
    ),
  }, {
    name: 'roas_onetrack',
    title: 'ROAS',
    info: 'Return on Ad Spend measured by OneTrack.',
    icon: 'onetrack:static',
    type: 'roas',
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.purchaseROAS,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.onetrack.purchaseValue)),
      getSum(data.map(row => row.metrics.meta.spend))
    ),
  }, {
    name: `order_value`,
    title: 'Order Value',
    info: 'Total value of orders from the {table_title}.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.purchaseValue,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.purchaseValue)),
  }, {
    name: 'order_value_onetrack',
    title: 'Order Value',
    info: 'Total value of orders from the {table_title}.',
    icon: 'onetrack:static',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.purchaseValue,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.purchaseValue)),
  }, {
    name: `orders`,
    title: 'Orders',
    info: 'Number of orders generated from the {table_title}.',
    icon: 'meta',
    getValue: (row: MetaCampaignsData) => row.metrics.meta.purchases,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.purchases), 0),
  }, {
    name: 'orders_onetrack',
    title: 'Orders',
    info: 'Number of orders generated from the {table_title}.',
    icon: 'onetrack:static',
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.purchases,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.purchases), 0),
  }, {
    name: `cpp`,
    title: 'CPP',
    info: 'Cost Per Purchase calculated by dividing ad spend by number of purchases that were measured by Meta.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.cpp,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.meta.spend)),
      getSum(data.map(row => row.metrics.meta.purchases))
    ),
  }, {
    name: 'cpp_onetrack',
    title: 'CPP',
    info: 'Cost Per Purchase calculated by dividing ad spend by number of purchases that were measured by OneTrack.',
    icon: 'onetrack:static',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.costPerPurchase,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.meta.spend)),
      getSum(data.map(row => row.metrics.onetrack.purchases))
    ),
  }, {
    name: `leads`,
    title: 'Leads',
    info: 'Number of leads generated from the {table_title}.',
    icon: 'meta',
    getValue: (row: MetaCampaignsData) => row.metrics.meta.leads,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.leads), 0),
  }, {
    name: 'leads_onetrack',
    title: 'Leads',
    info: 'Number of leads generated from the {table_title}.',
    icon: 'onetrack:static',
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.leads,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.onetrack.leads), 0),
  }, {
    name: `cpl`,
    title: 'CPL',
    info: 'Cost per Lead, ad spend divided by leads.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.costPerLead,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.meta.spend)),
      getSum(data.map(row => row.metrics.meta.leads))
    ),
  }, {
    name: 'cpl_onetrack',
    title: 'CPL',
    info: 'Cost per Lead, ad spend divided by leads.',
    icon: 'onetrack:static',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.onetrack.costPerLead,
    getSummary: (data: MetaCampaignsData[]) => getQuotient(
      getSum(data.map(row => row.metrics.meta.spend)),
      getSum(data.map(row => row.metrics.onetrack.leads))
    ),
  }, {
    name: 'cpc',
    title: 'CPC',
    info: 'Cost per Click, ad spend divided by clicks.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.cpc,
    getSummary: (data: MetaCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.meta.cpc)),
  }, {
    name: 'ctr',
    title: 'CTR',
    info: 'Click-Through Rate, percentage of clicks per impression.',
    icon: 'meta',
    display: value => `${value}%`,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.ctr,
    getSummary: (data: MetaCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.meta.ctr)),
  }, {
    name: 'cpm',
    title: 'CPM',
    info: 'Cost per 1,000 Impressions, ad spend per 1,000 views.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.cpm,
    getSummary: (data: MetaCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.meta.cpm)),
  }, {
    name: 'cpatc',
    title: 'CPATC',
    info: 'Cost per Add to Cart, ad spend divided by add to attributed cart events.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.costPerAddToCart,
    getSummary: (data: MetaCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.meta.costPerAddToCart)),
  }, {
    name: 'cpic',
    title: 'CPIC',
    info: 'Cost per Initiate Checkout, ad spend divided by attributed checkout events.',
    icon: 'meta',
    display: formatCurrency,
    getValue: (row: MetaCampaignsData) => row.metrics.meta.costPerInitiateCheckout,
    getSummary: (data: MetaCampaignsData[]) => getAverageExcludeZeros(data.map(row => row.metrics.meta.costPerInitiateCheckout)),
  }, {
    name: 'count_atc',
    title: 'Count ATC',
    info: 'Number of attributed Add to Carts from the {table_title}.',
    icon: 'meta',
    getValue: (row: MetaCampaignsData) => row.metrics.meta.addToCarts,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.addToCarts), 0),
  }, {
    name: 'count_ic',
    title: 'Count IC',
    info: 'Number of attributed Initiate Checkouts from the {table_title}.',
    icon: 'meta',
    getValue: (row: MetaCampaignsData) => row.metrics.meta.initiateCheckouts,
    getSummary: (data: MetaCampaignsData[]) => getSum(data.map(row => row.metrics.meta.initiateCheckouts), 0),
  }]
}

export function getMetaSources() {
  return {
    campaigns: {
      title: 'Campaigns',
      icon: 'folder',
      name: `campaigns`,
      insertCols: [{
        name: 'id',
        title: 'Select',
        controlsDisabled: true,
        width: 80,
        getValue: (row: MetaCampaignsData) => row.campaignId,
      }, {
        name: 'campaign_name',
        title: 'Campaign Name',
        info: 'Name of the specific marketing campaign.',
        icon: 'meta',
        minWidth: 300,
        getValue: (row: MetaCampaignsData) => row.campaignName,
      }, {
        name: 'campaign_id',
        title: 'Campaign ID',
        info: 'Unique identifier for the marketing campaign.',
        icon: 'meta',
        minWidth: 220,
        getValue: (row: MetaCampaignsData) => row.campaignId,
      }],
      insertAt: 1, // accountName, ...insertCols, ...
    },
    adSets: {
      title: 'Ad Sets',
      icon: 'four-dots',
      name: `ad_sets`,
      insertCols: [{
        name: 'id',
        title: 'Select',
        controlsDisabled: true,
        width: 80,
        getValue: (row: MetaAdSetsData) => row.adSetId,
      }, {
        name: 'ad_set_name',
        title: 'Ad Set Name',
        info: 'Name of the ad set within the campaign.',
        icon: 'meta',
        minWidth: 300,
        getValue: (row: MetaAdSetsData) => row.adSetName,
      }, {
        name: 'ad_set_id',
        title: 'Ad Set ID',
        info: 'Unique identifier for the ad set.',
        icon: 'meta',
        minWidth: 220,
        getValue: (row: MetaAdSetsData) => row.adSetId,
      }],
      insertAt: 1, // accountName, ...insertCols, ...
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
        getValue: (row: MetaAdsData) => row.adId,
      }, {
        name: 'ad_name',
        title: 'Ad Name',
        info: 'Name of the individual ad within the ad set.',
        icon: 'meta',
        minWidth: 300,
        getValue: (row: MetaAdsData) => row.adName,
      }, {
        name: 'ad_id',
        title: 'Ad ID',
        info: 'Unique identifier for the ad.',
        icon: 'meta',
        minWidth: 220,
        getValue: (row: MetaAdsData) => row.adId,
      }],
      insertAt: 1, // accountName, ...insertCols, ...
    }
  }
}

export const metaTableSetups = getTableSetups(getSharedCols, getMetaSources)
