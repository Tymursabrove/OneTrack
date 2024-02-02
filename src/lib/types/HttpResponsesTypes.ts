export interface AttributionAccountData {
    accountID: string;
    accountName: string;
}
interface MetaAttributionData {
    addToCarts: number;
    addToCartValue: number;
    costPerAddToCart: number;
    initiateCheckouts: number;
    initiateCheckoutValue: number;
    costPerInitiateCheckout: number;
    leads: number;
    costPerLead: number;
    purchases: number;
    purchaseValue: number;
    purchaseROAS: number;
    cpp: number;
    clicks: number;
    costPerUniqueClick: number;
    cpc: number;
    cpm: number;
    ctr: number;
    frequency: number;
    impressions: number;
    reach: number;
    socialSpend: number;
    spend: number;
}
export interface oneTrackAttributionData {
    leads: number;
    costPerLead: number;
    purchases: number;
    purchaseValue: number;
    purchaseROAS: number;
    costPerPurchase: number;
    averagePurchaseValue: number;
}
export interface oneTrackProcessedAttributionData {
    ot_leads: number;
    ot_costPerLead: number;
    ot_purchases: number;
    ot_purchaseValue: number;
    ot_purchaseROAS: number;
    ot_costPerPurchase: number;
    ot_averagePurchaseValue: number;
}
export interface MetaCampaignsData {
    id?: number; // TODO: ask backend to return ids
    accountCurrency: string;
    accountId: string;
    accountName: string;
    campaignId: string;
    campaignName: string;
    dateStart: Date;
    dateStop: Date;
    objective: string;
    optimizationGoal: string;
    metrics: {
        meta: MetaAttributionData;
        onetrack: oneTrackAttributionData;
    };
}
export interface MetaAdSetsData extends MetaCampaignsData {
    adSetId: string;
    adSetName: string;
}
export interface MetaAdsData extends MetaAdSetsData {
    adId: string;
    adName: string;

};
export interface MetaAttributionDataResponse {
    campaigns: MetaCampaignsData[];
    adSets: MetaAdSetsData[];
    ads: MetaAdsData[];
}
export interface TikTokAttributionData {
    completePayment: number;
    completePaymentRate: number;
    totalCompletePaymentRate: number;
    completePaymentROAS: number;
    costPerCompletePayment: number;
    valuePerCompletePayment: number;
    userRegistration: number;
    userRegistrationRate: number;
    costPerUserRegistration: number;
    totalUserRegistrationValue: number;
    valuePerUserRegistration: number;
    conversion: number;
    conversionRate: number;
    costPerConversion: number;
    realTimeConversion: number;
    realTimeConversionRate: number;
    realTimeCostPerConversion: number;
    clicks: number;
    cpc: number;
    ctr: number;
    addBilling: number;
    addBillingRate: number;
    costPerAddBilling: number;
    engagedView: number;
    engagedView15s: number;
    engagements: number;
    engagementRate: number;
    likes: number;
    follows: number;
    comments: number;
    shares: number;
    form: number;
    formRate: number;
    costPerForm: number;
    frequency: number;
    impressions: number;
    grossImpressions: number;
    cpm: number;
    costPer1000Reached: number;
    landingPageViewRate: number;
    totalLandingPageView: number;
    costPerLandingPageView: number;
    pageviewRate: number;
    costPerPageview: number;
    totalPageview: number;
    videoViewsP25: number;
    videoViewsP50: number;
    videoViewsP75: number;
    videoViewsP100: number;
    videoWatched2s: number;
    videoWatched6s: number;
    averageVideoPlayPerUser: number;
    profileVisits: number;
    profileVisitsRate: number;
    webEventAddToCart: number;
    webEventAddToCartRate: number;
    totalWebEventAddToCartValue: number;
    costPerWebEventAddToCart: number;
    valuePerWebEventAddToCart: number;
    initiateCheckout: number;
    initiateCheckoutRate: number;
    costPerInitiateCheckout: number;
    totalInitiateCheckoutValue: number;
    valuePerInitiateCheckout: number;
    onWebOrder: number;
    onWebOrderRate: number;
    costPerOnWebOrder: number;
    totalOnWebOrderValue: number;
    valuePerOnWebOrder: number;
    reach: number;
    spend: number;
}
export interface TikTokCampaignsData {
    advertiserId: string;
    campaignName: string;
    campaignId: string;
    dateStart: Date;
    dateStop: Date;
    currency: string;
    objectiveType: string;
    campaignBudget?: number;
    campaignDedicateType: string;
    metrics: {
        tiktok: TikTokAttributionData;
        onetrack: oneTrackAttributionData;
    };
}
export interface TikTokAdSetsData extends TikTokCampaignsData {
    adGroupName: string;
    adGroupId: string;
    adSetId: string;
    adSetName: string;
    placementType: string;
    pricingCategory: string;
    bidStrategy: string;
    adGroupBudget?: number;
    promotionType: string;
}
export interface TikTokAdsData extends TikTokAdSetsData {
    adName: string;
    adId: string;
};
export interface TikTokAttributionDataResponse {
    campaigns: TikTokCampaignsData[];
    adSets: TikTokAdSetsData[];
    ads: TikTokAdsData[];
}
export interface GoogleAttributionData {
    absoluteTopImpressionPercentage: number;
    allConversions: number;
    allConversionsValue: number;
    averageCost: number;
    averageCpc: number;
    averageCpe: number;
    averageCpm: number;
    averageCpv: number;
    averageCpl: number;
    averageTimeOnSite: number;
    bounceRate: number;
    clicks: number;
    costMicros: number;
    ctr: number;
    engagementRate: number;
    engagements: number;
    impressions: number;
    invalidClickRate: number;
    invalidClicks: number;
    searchAbsoluteTopImpressionShare: number;
    searchImpressionShare: number;
    searchRankLostImpressionShare: number;
    searchTopImpressionShare: number;
    topImpressionPercentage: number;
    videoViewRate: number;
    videoViews: number;
    viewThroughConversions: number;
    videoQuartileP100Rate: number;
    videoQuartileP25Rate: number;
    videoQuartileP50Rate: number;
    videoQuartileP75Rate: number;
    pageViewConversions: number;
    pageViewConversionsByDate: number;
    pageViewConversionRate: number;
    addToCartConversions: number;
    addToCartConversionsByDate: number;
    addToCartConversionRate: number;
    purchaseConversions: number;
    purchaseConversionsByDate: number;
    purchaseConversionRate: number;
    roasMicros: number;
    purchaseConversionsValue: number;
    purchaseConversionsValueByDate: number;
    valuePerConversionPurchase: number;
    initiateCheckoutConversions: number;
    initiateCheckoutConversionsByDate: number;
    initiateCheckoutConversionRate: number;
    signUpConversions: number;
    signUpConversionsByDate: number;
    signUpConversionRate: number;
    leadConversions: number;
    leadConversionsByDate: number;
    leadConversionRate: number;
    subscribeConversions: number;
    subscribeConversionsByDate: number;
    subscribeConversionRate: number;
}
export interface GoogleCampaignsData {
    campaignId: string;
    campaignName: string;
    currency: string;
    customerId: string;
    dateStart: Date;
    dateStop: Date;
    metrics: {
        google: GoogleAttributionData;
        onetrack: oneTrackAttributionData;
    };
}
export interface GoogleAdSetsData extends GoogleCampaignsData {
    adGroupId: string;
    adGroupName: string;
    adSetId: string;
    adSetName: string;
}
export interface GoogleAdsData extends GoogleAdSetsData {
    adId: string;
    adName: string;
}
export interface GoogleAttributionDataResponse {
    campaigns: GoogleCampaignsData[];
    adSets: GoogleAdSetsData[];
    ads: GoogleAdsData[];
}
export interface CustomerProfileSummary {
    onetrackId: string;
    email?: string;
    phone?: string;
    ipAddress: string;
}
export interface CustomerProfileDetails {
    onetrackId: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    street?: string;
    streetAddition?: string;
    streetNumber?: string;
    city?: string;
    province?: string;
    country?: string;
    ipAddress?: string;
    userAgent?: string;
}
export interface CustomerProfileEvent {
    event: "userAgent" |
    "viewPort" |
    "ipAddress" |
    "pageView" |
    "screenResolution" |
    "attribution" |
    "purchase" |
    "lead" |
    "imageClick" |
    "name" |
    "email" |
    "phone" |
    "gender" |
    "birthday" |
    "address" |
    "buttonClick" |
    "addToCart" |
    "viewItem" |
    "textClick" |
    "checkout";

    idempotencyKey: string;
    clientSideId?: string;
    clientSideTimestamp?: number;
    timeOnPage?: number;
    timestamp: Date;
    timestampInSeconds: number;
    timestampFormatted: string
    id: string;
    visitorId: string;
    workspaceId: string;
    source: string;
    connectorId: string;
    sessionId: string;

    data: ProfileEventUserAgentData |
    ProfileEventIPAddressData |
    ProfileEventPageViewData |
    ProfileEventViewPortData |
    ProfileEventScreenResolutionData |
    ProfileEventImageClickData |
    ProfileEventButtonClickData |
    ProfileEventPersonalData |
    ProfileEventLeadData;
}
export interface ProfileEventUserAgentData {
    name?: string;
    os?: string;
    osVersion?: string;
    device?: string;
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
    bot?: boolean;
    raw?: string;
}
export interface ProfileEventIPAddressData {
    ipv4?: string;
    ipv6?: string;
}
export interface ProfileEventPageViewData {
    pageInfo: {
        url: string;
        title?: string;
    };
    referrer: string;
}
export interface ProfileEventViewPortData {
    resolution?: {
        width?: string;
        height?: string;
    };
}
export interface ProfileEventScreenResolutionData {
    resolution?: {
        width?: string;
        height?: string;
    };
}
export interface ProfileEventAttributionData {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    adId?: string;
    adSetId?: string;
    campaignId?: string;
    fbclid?: string;
}
export interface ProfileEventImageClickData extends ClickData {
}
export interface ProfileEventButtonClickData extends ClickData {
}
export interface ProfileEventLeadData {
    pageInfo: {
        url?: string;
        title?: string;
    };
}
export interface ProfileEventPersonalData {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    address?: string;
    country?: string;
    street?: string;
    streetNumber?: string;
    zip?: string;
    city?: string;
    birthday?: string;
}
export interface ProfileEventAddToCartData {
    value?: number;
    currency?: string;
    pageInfo?: {
        url?: string;
        title?: string;
    };
    info?: CartInfo
}
export interface ProfileEventPurchaseData {
    value?: number;
    currency?: string;
    quantity?: number;
    pageInfo?: {
        url?: string;
        title?: string;
    };
    info?: CartInfo
}
interface CartInfo {
    cartToken?: string;
    items?: CartItem[];
}
export interface CartItem {
    productId?: string;
    productName?: string;
    position?: number;
    categories?: string[];
    price?: number;
    currency?: string;
    quantity?: number;
    brand?: string;
    variantId?: string;
    variant?: string;
    sku?: string;
    imageUrl?: string;
}
interface ClickData {
    info?: {
        link?: string;
        text?: string;
    };
    pageInfo?: {
        url?: string;
        title?: string;
    };
}

export interface EventData {
    target?: eventDataTarget;
    profile?: eventDataProfile;
    attributions?: eventDataAttribution[];
    timestampInNumber: number
}
export interface eventDataTarget {
    event?: string;
    idempotencyKey?: string;
    clientSideId?: string;
    clientSideTimestamp?: number;
    timeOnPage?: number;
    timestamp?: string;
    id?: string;
    visitorId?: string;
    workspaceId?: string;
    source?: string;
    connectorId?: string;
    sessionId?: string;
    data?: {
        value?: string;
        currency?: string;
        quantity?: number;
        pageInfo?: {
            url?: string;
            title?: string;
        };
        info?: {
            items?: {
                productId?: string;
                productName?: string;
                currency?: string;
                quantity?: number;
                brand?: string;
                variantId?: string;
                sku?: string;
                imageUrl?: string;
                price?: number;
                variant?: string;
            }[];
            tax?: number;
            checkoutToken?: string;
            cartToken?: string;
            transactionId?: string;
            orderId?: string;
            shipping?: {}[];
        };
    };
}
export interface eventDataProfile {
    onetrackId?: string;
    email?: string;
    phone?: string;
    ipAddress?: string;
}
export interface eventDataAttribution {
    weight?: number;
    event?: eventDataAttributionEvent;
}
export interface eventDataAttributionEvent {
    event?: string;
    idempotencyKey?: string;
    timestamp?: string;
    id?: string;
    visitorId?: string;
    workspaceId?: string;
    source?: string;
    connectorId?: string;
    sessionId?: string;
    data?: eventDataAttributionEventData;
}
export interface eventDataAttributionEventData {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    campaignId?: string;
    adId?: string;
    adSetId?: string;
    referrerGroup?: string;
    gclid?: string;
    source?: string;
    clickId?: string;
}
