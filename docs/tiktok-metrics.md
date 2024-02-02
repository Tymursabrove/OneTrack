# API

## Rest API endpoint Documentation: GET /workspaces/{workspaceId}/metrics/tiktok

This endpoint returns metrics for TikTok ads for a specified period within a given workspace. The data returned is in JSON format.

### Request Method

```
GET
```

### Request URL

```
/workspaces/{workspaceId}/metrics/tiktok
```

### Query Parameters

| Parameter  | Type        | Required | Description                                                                                                        |
| ---------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| level      | enum        | Yes      | The level at which to retrieve metrics. Allowed values are `AUCTION_CAMPAGIN`, `AUCTION_ADGROUP`, and `AUCTION_AD` |
| start_date | string      | Yes      | The start date of the query period in the format YYYY-MM-DD                                                        |
| end_date   | string      | Yes      | The end date of the query period in the format YYYY-MM-DD                                                          |
| columns    | string list | No       | Filter by the columns that you want. Multiple values should be passed as multiple `clomuns=<value>` pairs          |

### Response

The response is a JSON object that contains an array of metrics for the specified period.

| Field                              | Type   | Description                                                                                         |
| ---------------------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| tiktok                             | object | Object containing the TikTok metrics for the specified period.                                      |
| metrics                            | array  | Array containing a single object that holds the metrics for the specified period.                   |
| addBilling                         | float  | Total billing amount from the campaign period.                                                      |
| addBillingRate                     | float  | The ratio of the total billing amount to the total spend.                                           |
| adGroupId                          | string | ID of the ad group.                                                                                 |
| adGroupName                        | string | Name of the ad group.                                                                               |
| adId                               | string | ID of the ad.                                                                                       |
| adName                             | string | Name of the ad.                                                                                     |
| adText                             | string | Text of the ad.                                                                                     |
| advertiserId                       | string | ID of the advertiser.                                                                               |
| aeoType                            | string | The type of action event optimization.                                                              |
| anchorClickRate                    | float  | The ratio of the number of anchor clicks to the number of impressions.                              |
| anchorClicks                       | int    | The number of clicks on the anchor.                                                                 |
| appPromotionType                   | string | The type of app promotion.                                                                          |
| averageVideoPlay                   | float  | The average length of time (in seconds) that a video was played.                                    |
| averageVideoPlayPerUser            | float  | The average length of time (in seconds) that a video was played per user.                           |
| avgValuePerPageview                | float  | The average value of a page view.                                                                   |
| bid                                | string | The bid used for the ad.                                                                            |
| bidStrategy                        | string | The bidding strategy used for the ad.                                                               |
| budget                             | float  | The budget for the ad group or campaign.                                                            |
| buttonClick                        | int    | The number of clicks on the button.                                                                 |
| buttonClickRate                    | float  | The ratio of the number of clicks on the button to the number of impressions.                       |
| callToAction                       | string | The call to action of the ad.                                                                       |
| campaignBudget                     | float  | The budget for the campaign.                                                                        |
| campaignDedicateType               | string | The type of campaign dedication.                                                                    |
| campaignId                         | string | The ID of the campaign.                                                                             |
| campaignName                       | string | The name of the campaign.                                                                           |
| clicks                             | int    | The number of clicks on the ad.                                                                     |
| clicksOnHashtagChallenge           | int    | The number of clicks on the hashtag challenge.                                                      |
| clicksOnMusicDisc                  | int    | The number of clicks on the music disc.                                                             |
| comments                           | int    | The number of comments on the ad.                                                                   |
| completePayment                    | int    | The number of times a payment was completed on the website after a click on the ad.                 |
| completePaymentRate                | float  | The ratio of the number of times a payment was completed to the number of clicks on the ad.         |
| completePaymentROAS                | float  | The return on ad spend for completed payments.                                                      |
| conversion                         | int    | The number of conversions.                                                                          |
| conversionRate                     | float  | The ratio of the number of conversions to the number of clicks on the ad.                           |
| costPer1000Reached                 | float  | The cost per thousand impressions.                                                                  |
| costPerAddBilling                  | float  | The cost per billing amount.                                                                        |
| costPerButtonClick                 | float  | The cost per button click.                                                                          |
| costPerCompletePayment             | float  | The cost per completed payment.                                                                     |
| costPerConversion                  | float  | The cost per conversion.                                                                            |
| costPerCustomPageEvent             | float  | The cost per custom page event.                                                                     |
| costPerDownloadStart               | float  | The cost per app download start.                                                                    |
| costPerForm                        | float  | The cost per form submission.                                                                       |
| costPerInitiateCheckout            | float  | The cost per initiate checkout.                                                                     |
| costPerLandingPageView             | float  | The cost per landing page view.                                                                     |
| costPerOnlineConsult               | float  | The cost per online consultation.                                                                   |
| costPerOnWebAddToWishlist          | float  | The cost per click on the add to wishlist button on the website.                                    |
| costPerOnWebOrder                  | float  | The cost per order on the website.                                                                  |
| costPerOnWebSubscribe              | float  | The cost per click on the subscribe button on the website.                                          |
| costPerPageEventSearch             | float  | The cost per page event search.                                                                     |
| costPerPageview                    | float  | The cost per page view.                                                                             |
| costPerProductDetailsPageBrowse    | float  | The cost per product details page browse.                                                           |
| costPerResult                      | float  | The cost per result.                                                                                |
| costPerSecondaryGoalResult         | float  | The cost per secondary goal result.                                                                 |
| costPerUserRegistration            | float  | The cost per user registration.                                                                     |
| costPerWebEventAddToCart           | float  | The cost per add to cart on the website.                                                            |
| cpc                                | float  | The cost per click.                                                                                 |
| cpm                                | float  | The cost per thousand impressions.                                                                  |
| ctr                                | float  | The click-through rate.                                                                             |
| currency                           | string | The currency used for the ad.                                                                       |
| customPageEventRate                | float  | The ratio of the number of custom page events to the number of impressions.                         |
| customPageEvents                   | int    | The number of custom page events.                                                                   |
| customPageEventsValue              | float  | The value of the custom page events.                                                                |
| date                               | string | The date of the metrics in the format YYYY-MM-DD.                                                   |
| downloadStart                      | int    | The number of app download                                                                          |
| downloadStartRate                  | float  | The ratio of the number of app download starts to the number of impressions.                        |
| dpaTargetAudienceType              | string | The type of dynamic product ad target audience.                                                     |
| duetClicks                         | int    | The number of clicks on the duet.                                                                   |
| engagedView                        | int    | The number of engaged views.                                                                        |
| engagedView15S                     | int    | The number of engaged views of at least 15 seconds.                                                 |
| engagementRate                     | float  | The ratio of the number of engaged views to the number of impressions.                              |
| engagements                        | int    | The number of engagements.                                                                          |
| follows                            | int    | The number of follows.                                                                              |
| form                               | int    | The number of form submissions.                                                                     |
| formRate                           | float  | The ratio of the number of form submissions to the number of impressions.                           |
| frequency                          | float  | The frequency of the ad.                                                                            |
| grossImpressions                   | int    | The total number of times the ad was displayed, including duplicate views by the same user.         |
| impressions                        | int    | The number of times the ad was displayed to unique users.                                           |
| initiateCheckout                   | int    | The number of times an initiate checkout action was taken after a click on the ad.                  |
| initiateCheckoutRate               | float  | The ratio of the number of times an initiate checkout action was taken to the number of clicks.     |
| ixAverageVideoPlay                 | float  | The average percentage of the video viewed.                                                         |
| ixPageDurationAvg                  | float  | The average duration of time spent on the page.                                                     |
| ixPageViewrateAvg                  | float  | The average view rate of the page.                                                                  |
| ixVideoViews                       | int    | The number of video views.                                                                          |
| ixVideoViewsP100                   | int    | The number of video views to completion.                                                            |
| ixVideoViewsP25                    | int    | The number of video views to 25%.                                                                   |
| ixVideoViewsP50                    | int    | The number of video views to 50%.                                                                   |
| ixVideoViewsP75                    | int    | The number of video views to 75%.                                                                   |
| landingPageViewRate                | float  | The ratio of the number of landing page views to the number of impressions.                         |
| likes                              | int    | The number of likes.                                                                                |
| mobileAppId                        | string | The ID of the mobile app.                                                                           |
| objectiveType                      | string | The objective type of the ad.                                                                       |
| onlineConsult                      | int    | The number of online consultations.                                                                 |
| onlineConsultRate                  | float  | The ratio of the number of online consultations to the number of impressions.                       |
| onWebAddToWishlist                 | int    | The number of times the add to wishlist button was clicked on the website.                          |
| onWebAddToWishlistPerClick         | float  | The ratio of the number of times the add to wishlist button was clicked to the number of clicks.    |
| onWebOrder                         | int    | The number of orders on the website.                                                                |
| onWebOrderRate                     | float  | The ratio of the number of orders on the website to the number of impressions.                      |
| onWebSubscribe                     | int    | The number of clicks on the subscribe button on the website.                                        |
| onWebSubscribePerClick             | float  | The ratio of the number of clicks on the subscribe button on the website to the number of clicks.   |
| optStatus                          | string | The status of optimization.                                                                         |
| pageEventSearch                    | int    | The number of page event searches.                                                                  |
| pageEventSearchRate                | float  | The ratio of the number of page event searches to the number of impressions.                        |
| pageviewRate                       | float  | The ratio of the number of page views to the number of impressions.                                 |
| placementType                      | string | The type of placement.                                                                              |
| pricingCategory                    | string | The pricing category of the ad.                                                                     |
| productDetailsPageBrowse           | int    | The number of times the product details page was browsed.                                           |
| productDetailsPageBrowseRate       | float  | The ratio of the number of times the product details page was browsed to the number of impressions. |
| profileVisits                      | int    | The number of profile visits.                                                                       |
| profileVisitsRate                  | float  | The ratio of the number of profile visits to the number of impressions.                             |
| promotionType                      | string | The promotion type of the ad.                                                                       |
| reach                              | int    | The number of people who saw the ad.                                                                |
| realTimeConversion                 | int    | The number of conversions in real-time.                                                             |
| realTimeConversionRate             | float  | The ratio of the number of convch5t671qjbbr3586u690                                                 |
| resultRate                         | float  | The ratio of the number of results to the number of clicks.                                         |
| secondaryGoalResult                | int    | The number of secondary goal results.                                                               |
| secondaryGoalResultRate            | float  | The ratio of the number of secondary goal results to the number of clicks.                          |
| shares                             | int    | The number of shares.                                                                               |
| smartTarget                        | string | The type of smart target.                                                                           |
| soundUsageClicks                   | int    | The number of clicks on the sound usage.                                                            |
| spend                              | float  | The amount of money spent on the ad.                                                                |
| splitTest                          | string | The split test status.                                                                              |
| stitchClicks                       | int    | The number of clicks on the stitch.                                                                 |
| totalAddBillingValue               | float  | The total billing amount.                                                                           |
| totalButtonClickValue              | float  | The total value of the button clicks.                                                               |
| totalCompletePaymentRate           | float  | The total rate of completed payments.                                                               |
| totalDownloadStartValue            | float  | The total value of app download starts.                                                             |
| totalFormValue                     | float  | The total value of form submissions.                                                                |
| totalInitiateCheckoutValue         | float  | The total value of initiate checkout actions.                                                       |
| totalLandingPageView               | int    | The total number of landing page views.                                                             |
| totalOnlineConsultValue            | float  | The total value of online                                                                           |
| totalOnWebAddToWishlistValue       | float  | The total value of add to wishlist actions on the website.                                          |
| totalOnWebOrderValue               | float  | The total value of orders on the website.                                                           |
| totalOnWebSubscribeValue           | float  | The total value of clicks on the subscribe button on the website.                                   |
| totalPageEventSearchValue          | float  | The total value of page event searches.                                                             |
| totalPageview                      | int    | The total number of page views.                                                                     |
| totalProductDetailsPageBrowseValue | float  | The total value of product details page browses.                                                    |
| totalUserRegistrationValue         | float  | The total value of user registrations.                                                              |
| totalValuePerPageview              | float  | The total value per page view.                                                                      |
| totalWebEventAddToCartValue        | float  | The total value of add to cart actions on the website.                                              |
| ttAppId                            | string | The ID of the TikTok app.                                                                           |
| ttAppName                          | string | The name of the TikTok app.                                                                         |
| userRegistration                   | int    | The number of user registrations.                                                                   |
| userRegistrationRate               | float  | The ratio of the number of user registrations to the number of impressions.                         |
| valuePerAddBilling                 | float  | The value per billing.                                                                              |
| valuePerButtonClick                | float  | The value per button click.                                                                         |
| valuePerCompletePayment            | float  | The value per completed payment.                                                                    |
| valuePerCustomPageEvent            | float  | The value per custom page event.                                                                    |
| valuePerDownloadStart              | float  | The value per app download start.                                                                   |
| valuePerForm                       | float  | The value per form submission.                                                                      |
| valuePerInitiateCheckout           | float  | The value per initiate checkout action.                                                             |
| valuePerOnlineConsult              | float  | The value per online consultation.                                                                  |
| valuePerOnWebAddToWishlist         | float  | The value per add to wishlist action on the website.                                                |
| valuePerOnWebOrder                 | float  | The value per order on the website.                                                                 |
| valuePerOnWebSubscribe             | float  | The value per click on the subscribe button on the website.                                         |
| valuePerPageEventSearch            | float  | The value per page event search.                                                                    |
| valuePerProductDetailsPageBrowse   | float  | The value per product details page browse.                                                          |
| valuePerUserRegistration           | float  | The value per user registration.                                                                    |
| valuePerWebEventAddToCart          | float  | The value per add to cart action on the website.                                                    |
| videoPlayActions                   | int    | The number of times the video was played.                                                           |
| videoViewsP100                     | int    | The number of times the video was viewed to completion.                                             |
| videoViewsP25                      | int    | The number of times the video was viewed to 25%.                                                    |
| videoViewsP50                      | int    | The number of times the video was viewed to 50%.                                                    |
| videoViewsP75                      | int    | The number of times the video was viewed to 75%.                                                    |
| videoWatched2S                     | int    | The number of times the video was watched for at least 2 seconds.                                   |
| videoWatched6S                     | int    | The number of times the video was watched for at least                                              |
| webEventAddToCart                  | int    | The number of add to cart actions on the website.                                                   |
| webEventAddToCartRate              | float  | The ratio of the number of add to cart actions on the website to the number of clicks.              |

### Response

The response of this API endpoint returns a JSON object with a single field "metrics" that contains an array of metrics objects, each object contains the TikTok metrics for a specific level of the ad campaign hierarchy specified in the request.

Each metrics object has the following fields:

- `tiktok`: a nested object that contains the TikTok-specific metrics for the ad campaign hierarchy level specified in the request.
- `onetrack`: comming soon

If no metrics are available for the specified query parameters, the response will be an empty JSON object `{}`.

### Example

Here is an example request and response for this API endpoint:

**Request:**

```
GET https://staging.app-api.dev.one-track.io/workspaces/ch5t671qjbbr3586u690/metrics/tiktok?level=AUCTION_CAMPAGIN&start_date=2023-04-07&end_date=2023-04-14
```

**Response:**

```json
{
  "metrics": [
    {
      "tiktok": {
        "addBilling": 0,
        "addBillingRate": 0,
        "adGroupId": "",
        "adGroupName": "",
        "adId": "",
        "adName": "",
        "adText": "",
        "advertiserId": "7148069283799597058",
        "aeoType": "",
        "anchorClickRate": 0,
        "anchorClicks": 0,
        "appPromotionType": "",
        "averageVideoPlay": 0,
        "averageVideoPlayPerUser": 0,
        "avgValuePerPageview": 0,
        "bid": "",
        "bidStrategy": "",
        "budget": 0,
        "buttonClick": 0,
        "buttonClickRate": 0,
        "callToAction": "",
        "campaignBudget": 0,
        "campaignDedicateType": "Regular Campaign",
        "campaignId": "1761081907893249",
        "campaignName": "DRA // LUYL 2023-04 // Testing // ABO // Cold",
        "clicks": 0,
        "clicksOnHashtagChallenge": 0,
        "clicksOnMusicDisc": 0,
        "comments": 0,
        "completePayment": 0,
        "completePaymentRate": 0,
        "completePaymentROAS": 0,
        "conversion": 0,
        "conversionRate": 0,
        "costPer1000Reached": 0,
        "costPerAddBilling": 0,
        "costPerButtonClick": 0,
        "costPerCompletePayment": 0,
        "costPerConversion": 0,
        "costPerCustomPageEvent": 0,
        "costPerDownloadStart": 0,
        "costPerForm": 0,
        "costPerInitiateCheckout": 0,
        "costPerLandingPageView": 0,
        "costPerOnlineConsult": 0,
        "costPerOnWebAddToWishlist": 0,
        "costPerOnWebOrder": 0,
        "costPerOnWebSubscribe": 0,
        "costPerPageEventSearch": 0,
        "costPerPageview": 0,
        "costPerProductDetailsPageBrowse": 0,
        "costPerResult": 0,
        "costPerSecondaryGoalResult": 0,
        "costPerUserRegistration": 0,
        "costPerWebEventAddToCart": 0,
        "cpc": 0,
        "cpm": 0,
        "ctr": 0,
        "currency": "EUR",
        "customPageEventRate": 0,
        "customPageEvents": 0,
        "customPageEventsValue": 0,
        "date": "2023-04-20",
        "downloadStart": 0,
        "downloadStartRate": 0,
        "dpaTargetAudienceType": "",
        "duetClicks": 0,
        "engagedView": 0,
        "engagedView15S": 0,
        "engagementRate": 0,
        "engagements": 0,
        "follows": 0,
        "form": 0,
        "formRate": 0,
        "frequency": 0,
        "grossImpressions": 0,
        "impressions": 0,
        "initiateCheckout": 0,
        "initiateCheckoutRate": 0,
        "ixAverageVideoPlay": 0,
        "ixPageDurationAvg": 0,
        "ixPageViewrateAvg": 0,
        "ixVideoViews": 0,
        "ixVideoViewsP100": 0,
        "ixVideoViewsP25": 0,
        "ixVideoViewsP50": 0,
        "ixVideoViewsP75": 0,
        "landingPageViewRate": 0,
        "likes": 0,
        "mobileAppId": "",
        "objectiveType": "Website conversions",
        "onlineConsult": 0,
        "onlineConsultRate": 0,
        "onWebAddToWishlist": 0,
        "onWebAddToWishlistPerClick": 0,
        "onWebOrder": 0,
        "onWebOrderRate": 0,
        "onWebSubscribe": 0,
        "onWebSubscribePerClick": 0,
        "optStatus": "",
        "pageEventSearch": 0,
        "pageEventSearchRate": 0,
        "pageviewRate": 0,
        "placementType": "",
        "pricingCategory": "",
        "productDetailsPageBrowse": 0,
        "productDetailsPageBrowseRate": 0,
        "profileVisits": 0,
        "profileVisitsRate": 0,
        "promotionType": "",
        "reach": 0,
        "realTimeConversion": 0,
        "realTimeConversionRate": 0,
        "realTimeCostPerConversion": 0,
        "realTimeCostPerResult": 0,
        "realTimeResult": 0,
        "realTimeResultRate": 0,
        "result": 0,
        "resultRate": 0,
        "secondaryGoalResult": 0,
        "secondaryGoalResultRate": 0,
        "shares": 0,
        "smartTarget": "",
        "soundUsageClicks": 0,
        "spend": 0,
        "splitTest": "OFF",
        "stitchClicks": 0,
        "totalAddBillingValue": 0,
        "totalButtonClickValue": 0,
        "totalCompletePaymentRate": 0,
        "totalDownloadStartValue": 0,
        "totalFormValue": 0,
        "totalInitiateCheckoutValue": 0,
        "totalLandingPageView": 0,
        "totalOnlineConsultValue": 0,
        "totalOnWebAddToWishlistValue": 0,
        "totalOnWebOrderValue": 0,
        "totalOnWebSubscribeValue": 0,
        "totalPageEventSearchValue": 0,
        "totalPageview": 0,
        "totalProductDetailsPageBrowseValue": 0,
        "totalUserRegistrationValue": 0,
        "totalValuePerPageview": 0,
        "totalWebEventAddToCartValue": 0,
        "ttAppId": "",
        "ttAppName": "",
        "userRegistration": 0,
        "userRegistrationRate": 0,
        "valuePerAddBilling": 0,
        "valuePerButtonClick": 0,
        "valuePerCompletePayment": 0,
        "valuePerCustomPageEvent": 0,
        "valuePerDownloadStart": 0,
        "valuePerForm": 0,
        "valuePerInitiateCheckout": 0,
        "valuePerOnlineConsult": 0,
        "valuePerOnWebAddToWishlist": 0,
        "valuePerOnWebOrder": 0,
        "valuePerOnWebSubscribe": 0,
        "valuePerPageEventSearch": 0,
        "valuePerProductDetailsPageBrowse": 0,
        "valuePerUserRegistration": 0,
        "valuePerWebEventAddToCart": 0,
        "videoPlayActions": 0,
        "videoViewsP100": 0,
        "videoViewsP25": 0,
        "videoViewsP50": 0,
        "videoViewsP75": 0,
        "videoWatched2S": 0,
        "videoWatched6S": 0,
        "webEventAddToCart": 0,
        "webEventAddToCartRate": 0
      }
    }
  ]
}
```

