export default {
  meta:
  {
    page: `Welcome to the Meta Tab, where you can view and compare all KPIs for your Campaigns, Ad Sets, and Ads as measured by both Facebook (Meta) and OneTrack. This comprehensive table provides a holistic view of your marketing performance, helping you understand the impact of your advertising efforts across all levels of granularity.<br><br>
    With the ability to filter data by Account Name, Campaign Name, Ad Set Name, and Ad Name, you can easily focus on specific segments of your advertising strategy. Applying a filter, such as on the campaign level, will only display the Ad Sets and Ads within the selected campaigns, streamlining your analysis and making it simple to pinpoint areas for optimization.<br><br>
    Use the Meta Tab to gain valuable insights into your marketing campaigns, and leverage the combined power of Meta and OneTrack metrics to make data-driven decisions that improve your advertising results.`,
    tabs: {
      campaigns: "View and analyze the performance of your marketing campaigns. This section contains aggregated data for each campaign, including key performance indicators like ROAS, Order Value, and Leads.",
      adSets: "Dive deeper into each campaign's ad sets to see how they perform. The Ad Set section breaks down performance metrics by ad set, allowing you to optimize targeting and budget allocation for better results.",
      ads: "Examine the performance of individual ads within ad sets. This level of granularity helps you identify the most effective ad creatives, placements, and formats, enabling data-driven decision-making for ad optimizations."
    },
    kpis: [
      {
        "KPI": "Account Name (Meta)",
        "Description": "Name of the Meta Ads account.",
      },
      {
        "KPI": "Campaign Name (Meta)",
        "Description": "Name of the specific marketing campaign.",
      },
      {
        "KPI": "Campaign ID (Meta)",
        "Description": "Unique identifier for the marketing campaign.",
      },
      {
        "KPI": "Ad set Name (Meta)",
        "Description": "Name of the ad set within the campaign.",
      },
      {
        "KPI": "Ad set ID (Meta)",
        "Description": "Unique identifier for the ad set.",
      },
      {
        "KPI": "Ad Name (Meta)",
        "Description": "Name of the individual ad within the ad set.",
      },
      {
        "KPI": "Ad ID (Meta)",
        "Description": "Unique identifier for the ad.",
      },
      {
        "KPI": "Ad Spend (Meta)",
        "Description": "Total amount spent on the {replace}.",
      },
      {
        "KPI": "ROAS (Meta)",
        "Description": "Return on Ad Spend, a measure of {replace} profitability.",

      },
      {
        "KPI": "Roas (OneTrack)",
        "Description": "Return on Ad Spend measured by OneTrack.",
      },
      {
        "KPI": "ROAS Off (Meta)",
        "Description": "Difference between ROAS (Meta) and ROAS OneTrack.",
      },
      {
        "KPI": "Order Value (Meta)",
        "Description": "Total value of orders from the {replace}.",
      },
      {
        "KPI": "Order Value (OneTrack)",
        "Description": "Total value of orders from the {replace}.",

      },
      {
        "KPI": "Orders (Meta)",
        "Description": "Number of orders generated from the {replace}.",

      },
      {
        "KPI": "Orders (OneTrack)",
        "Description": "Number of orders generated from the {replace}.",

      },
      {
        "KPI": "AOV (Meta)",
        "Description": "Average Order Value, the mean order value.",

      },
      {
        "KPI": "AOV (OneTrack)",
        "Description": "Average Order Value, the mean order value.",

      },
      {
        "KPI": "CPO (Meta)",
        "Description": "Cost per Order, ad spend divided by orders.",

      },
      {
        "KPI": "CPO (OneTrack)",
        "Description": "Cost per Order, ad spend divided by orders.",

      },
      {
        "KPI": "Leads (Meta)",
        "Description": "Number of leads generated from the {replace}.",

      },
      {
        "KPI": "Leads (OneTrack)",
        "Description": "Number of leads generated from the {replace}.",
      },
      {
        "KPI": "CPL (Meta)",
        "Description": "Cost per Lead, ad spend divided by leads.",
      },
      {
        "KPI": "CPL (OneTrack)",
        "Description": "Cost per Lead, ad spend divided by leads.",
      },
      {
        "KPI": "CPC (Meta)",
        "Description": "Cost per Click, ad spend divided by clicks.",
      },
      {
        "KPI": "CTR (Meta)",
        "Description": "Click-Through Rate, percentage of clicks per impression.",
      },
      {
        "KPI": "CPM (Meta)",
        "Description": "Cost per 1,000 Impressions, ad spend per 1,000 views.",

      },
      {
        "KPI": "CPATC (Meta)",
        "Description": "Cost per Add to Cart, ad spend divided by add to attributed cart events.",

      },
      {
        "KPI": "CPIC (Meta)",
        "Description": "Cost per Initiate Checkout, ad spend divided by attributed checkout events.",

      },
      {
        "KPI": "Count ATC (Meta)",
        "Description": "Number of attributed Add to Carts from the {replace}.",

      },
      {
        "KPI": "Count IC (Meta)",
        "Description": "Number of attributed Initiate Checkouts from the {replace}.",
      }
    ]
  },
  tiktok:
  {
    page: `Welcome to the TikTok Tab, where you can view and compare all KPIs for your Campaigns, Ad Sets, and Ads as measured by both TikTok and OneTrack. This comprehensive table provides a holistic view of your marketing performance, helping you understand the impact of your advertising efforts across all levels of granularity.<br><br>
    With the ability to filter data by Account Name, Campaign Name, Ad Set Name, and Ad Name, you can easily focus on specific segments of your advertising strategy. Applying a filter, such as on the campaign level, will only display the Ad Sets and Ads within the selected campaigns, streamlining your analysis and making it simple to pinpoint areas for optimization.<br><br>
    Use the TikTok Tab to gain valuable insights into your marketing campaigns, and leverage the combined power of TikTok and OneTrack metrics to make data-driven decisions that improve your advertising results.`,
    tabs: {
      campaigns: "View and analyze the performance of your marketing campaigns. This section contains aggregated data for each campaign, including key performance indicators like ROAS, Order Value, and Leads.",
      adSets: "Dive deeper into each campaign's ad sets to see how they perform. The Ad Set section breaks down performance metrics by ad set, allowing you to optimize targeting and budget allocation for better results.",
      ads: "Examine the performance of individual ads within ad sets. This level of granularity helps you identify the most effective ad creatives, placements, and formats, enabling data-driven decision-making for ad optimizations."
    },
    updatedKPI: {
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
    }
  },
  events: {
    page: `Welcome to the Event Details page, where you can explore and analyze purchase and lead events to better understand your marketing performance. This comprehensive view provides valuable insights into event attribution, channel distribution, and other key performance indicators.<br><br>
    <b>Table Features:</b><br>The sortable table allows you to organize data in ascending or descending order, while resizable columns let you customize the view to your needs.<br>View query parameters and attribution for each event, helping you make data-driven decisions for marketing optimization.
    <br><br><b>Pie Chart:</b><br>Visualize the distribution of different channels across all selected events, providing a clear overview of channel performance.
    <br><br><b>Event Insight Cards:</b><br>Review individual channel statistics, including Google, Meta, TikTok, and Organic, with metrics such as Ad Revenue, Platform Revenue, Ad Level %, Platform %, Event Count Ad, Event Count Platform, and Total Revenue.<br>Click on a card to filter the table, displaying only events with the corresponding KPIs.
    <br><br><b>Additional Features:</b><br>Reload values without refreshing the page using the reload button.
    <br>Download table data as a CSV file for further analysis.
    <br>Select a date range in the top right corner to adjust the scope of data displayed.
    <br>Switch between Purchase and Lead event types to analyze different aspects of your marketing performance.
    <br>Utilize the Event Details page to gain valuable insights into your marketing campaigns and leverage the various features to enhance your understanding of event attribution, channel distribution, and overall performance.`,
    kpis:
      [
        {
          "name": "Date",
          "value": "Date of the purchase or lead event.",
        },
        {
          "name": "E-mail",
          "value": "Email address associated with the purchase or lead.",

        },
        {
          "name": "OneTrack ID",
          "value": "Unique identifier assigned by OneTrack to the event.",

        },
        {
          "name": "Order ID",
          "value": "Unique identifier for the purchase (purchases only).",

        },
        {
          "name": "Campaign name",
          "value": "Name of the marketing campaign associated with the event.",

        },
        {
          "name": "Ad ID",
          "value": "Unique identifier for the ad associated with the event.",

        },
        {
          "name": "Source",
          "value": "Platform or channel where the event originated.",

        },
        {
          "name": "Term",
          "value": "Keywords or targeting parameters associated with the ad.",

        },
        {
          "name": "Medium",
          "value": "Type of traffic source (e.g., CPC, display, email, etc.).",

        },
        {
          "name": "Placement",
          "value": "Ad placement location (e.g., mobile, insta feed, etc.).",

        },
        {
          "name": "Click ID",
          "value": "Identifier for the click (e.g., fbclid, ttclid, gclid).",

        },
        {
          "name": "From",
          "value": "URL where the event occurred (e.g., https://www.google.com/).",

        },
        {
          "name": "Referrer",
          "value": "Source that referred the user to the event.",

        },
        {
          "name": "Type",
          "value": "Attribution type (e.g., ad, organic, referred, etc.).",

        },
        {
          "name": "Order Value",
          "value": "Total value of the order (for purchases only).",

        }
      ]
  },
  profileEvents: [
    {
      "event_name": "consent",
      "event_description": "This event occurs when a user agrees to the terms, often by accepting cookies or terms of service."
    },
    {
      "event_name": "search",
      "event_description": "This event triggers when a user uses a search bar or function on the website."
    },
    {
      "event_name": "checkout",
      "event_description": "This event occurs when a user reaches the checkout page to finalize a purchase."
    },
    {
      "event_name": "addToWishlist",
      "event_description": "This event triggers when a user adds an item to their wishlist on the website."
    },
    {
      "event_name": "removeFromWishlist",
      "event_description": "This event occurs when a user takes an item out of their wishlist."
    },
    {
      "event_name": "removeFromCart",
      "event_description": "This event indicates that a user has removed an item from the shopping cart."
    },
    {
      "event_name": "addToCart",
      "event_description": "This event occurs when a user adds an item to their shopping cart."
    },
    {
      "event_name": "viewCart",
      "event_description": "This event triggers when a user looks at the items in their shopping cart."
    },
    {
      "event_name": "purchase",
      "event_description": "This event occurs when a user completes a purchase on the website."
    },
    {
      "event_name": "lead",
      "event_description": "This event indicates that a user has shown interest, often by providing contact information."
    },
    {
      "event_name": "viewContent",
      "event_description": "This event occurs when a user views a piece of content, like an article or product page."
    },
    {
      "event_name": "custom",
      "event_description": "This event can be used for any action that isn't covered by standard event types."
    },
    {
      "event_name": "pageView",
      "event_description": "This event triggers when a user lands on a new page of the website."
    },
    {
      "event_name": "buttonClick",
      "event_description": "This event occurs when a user clicks on a button on the website."
    },
    {
      "event_name": "imageClick",
      "event_description": "This event triggers when a user clicks on an image on the website."
    },
    {
      "event_name": "linkClick",
      "event_description": "This event occurs when a user clicks on a hyperlink on the website."
    },
    {
      "event_name": "textClick",
      "event_description": "This event happens when a user clicks on any text element on the page."
    },
    {
      "event_name": "inputForm",
      "event_description": "This event triggers when a user interacts with a form field by entering information."
    },
    {
      "event_name": "formSubmit",
      "event_description": "This event occurs when a user submits a completed form."
    },
    {
      "event_name": "completeRegistration",
      "event_description": "This event occurs when a user successfully registers for an account or service."
    },
    {
      "event_name": "appointmentBooked",
      "event_description": "This event happens when a user books an appointment through the website."
    },
    {
      "event_name": "mediaPlay",
      "event_description": "This event triggers when a user starts playing a video or audio file on the website."
    },
    {
      "event_name": "mediaPause",
      "event_description": "This event occurs when a user pauses a video or audio file that's playing."
    },
    {
      "event_name": "screenResolution",
      "event_description": "This event captures the screen resolution of the user’s device."
    },
    {
      "event_name": "viewPort",
      "event_description": "This event captures the dimensions of the user’s browser viewing area."
    },
    {
      "event_name": "address",
      "event_description": "This event collects the address information provided by the user."
    },
    {
      "event_name": "email",
      "event_description": "This event captures the email address that the user provides."
    },
    {
      "event_name": "phone",
      "event_description": "This event captures the phone number entered by the user."
    },
    {
      "event_name": "name",
      "event_description": "This event captures the name information provided by the user."
    },
    {
      "event_name": "gender",
      "event_description": "This event collects the gender information that the user provides."
    },
    {
      "event_name": "birthday",
      "event_description": "This event captures the birthday information entered by the user."
    },
    {
      "event_name": "viewItem",
      "event_description": "This event occurs when a user views details of a specific item or product."
    },
    {
      "event_name": "subscribed",
      "event_description": "This event occurs when a user subscribes to a newsletter or service."
    },
    {
      "event_name": "error",
      "event_description": "This event indicates that an error has occurred on the website."
    },
    {
      "event_name": "emailOpened",
      "event_description": "This event occurs when a recipient opens an email sent through a marketing campaign."
    },
    {
      "event_name": "emailLinkClicked",
      "event_description": "This event triggers when a recipient clicks on a hyperlink inside a marketing email."
    },
    {
      "event_name": "emailBounced",
      "event_description": "This event indicates that an email sent to a recipient could not be delivered."
    },
    {
      "event_name": "emailUnsubscribed",
      "event_description": "This event occurs when a recipient unsubscribes from an email list."
    },
    {
      "event_name": "closingCall",
      "event_description": "This event occurs when a sales representative makes a call with the intention of closing a deal."
    },
    {
      "event_name": "phoneCall",
      "event_description": "This event triggers when a sales representative makes a call to a lead or customer."
    },
    {
      "event_name": "settingCall",
      "event_description": "This event occurs when a sales representative schedules a call with a lead or customer."
    },
    {
      "event_name": "leadConverted",
      "event_description": "This event indicates that a lead has converted into a customer."
    },
    {
      "event_name": "dealWon",
      "event_description": "This event triggers when a sales deal has been successfully closed."
    },
    {
      "event_name": "dealLost",
      "event_description": "This event occurs when a sales deal has been lost or did not go through."
    },
    {
      "event_name": "emailFollowUp",
      "event_description": "This event indicates that a follow-up email has been sent to a lead or customer."
    },
    {
      "event_name": "demoScheduled",
      "event_description": "This event occurs when a product demo has been scheduled with a lead or customer."
    },
    {
      "event_name": "demoAttended",
      "event_description": "This event indicates that a lead or customer has attended a scheduled product demo."
    },
    {
      "event_name": "customerFeedback",
      "event_description": "This event triggers when a customer provides feedback through a survey or feedback form."
    },
    {
      "event_name": "referralReceived",
      "event_description": "This event occurs when a customer refers another potential customer."
    },
    {
      "event_name": "webinarRegistration",
      "event_description": "This event occurs when a lead or customer registers for a webinar."
    },
    {
      "event_name": "webinarAttendance",
      "event_description": "This event triggers when a lead or customer attends a webinar."
    },
    {
      "event_name": "socialMediaEngagement",
      "event_description": "This event indicates that a lead or customer has engaged with a social media post (like, share, comment)."
    },
    {
      "event_name": "customerOnBoarding",
      "event_description": "This event occurs when a new customer begins the onboarding process for a product or service."
    },
    {
      "event_name": "supportTicketCreated",
      "event_description": "This event triggers when a customer creates a support ticket."
    },
    {
      "event_name": "customerRetention",
      "event_description": "This event indicates actions taken to retain an existing customer, like a renewal or upsell."
    },
    {
      "event_name": "accountCreated",
      "event_description": "This event occurs when a customer creates an account on the website or platform."
    },
    {
      "event_name": "subscriptionStarted",
      "event_description": "This event triggers when a customer starts a new subscription."
    },
    {
      "event_name": "paymentRecurring",
      "event_description": "This event occurs when a subscription fee is automatically charged on a periodic basis."
    },
    {
      "event_name": "paymentFailed",
      "event_description": "This event indicates that a payment transaction, possibly a recurring one, has failed."
    },
    {
      "event_name": "subscriptionUpgraded",
      "event_description": "This event occurs when a customer upgrades their current subscription plan."
    },
    {
      "event_name": "subscriptionDowngraded",
      "event_description": "This event triggers when a customer downgrades their current subscription plan."
    },
    {
      "event_name": "freeTrialStarted",
      "event_description": "This event occurs when a customer starts a free trial of a subscription plan."
    },
    {
      "event_name": "freeTrialEnded",
      "event_description": "This event occurs when a customer’s free trial period ends."
    },
    {
      "event_name": "couponApplied",
      "event_description": "This event occurs when a customer applies a coupon or discount code to a purchase."
    },
    {
      "event_name": "productReviewed",
      "event_description": "This event triggers when a customer leaves a review for a product."
    },
    {
      "event_name": "cartAbandoned",
      "event_description": "This event occurs when a customer adds items to their cart but does not complete the purchase."
    },
    {
      "event_name": "wishlistShared",
      "event_description": "This event occurs when a customer shares their wishlist with others."
    },
    {
      "event_name": "referralUsed",
      "event_description": "This event triggers when a new customer uses a referral code from an existing customer."
    },
    {
      "event_name": "accountDeactivation",
      "event_description": "This event occurs when a customer deactivates their account."
    },
    {
      "event_name": "subscriptionCancelled",
      "event_description": "This event triggers when a customer cancels their subscription."
    },
    {
      "event_name": "chargeback",
      "event_description": "This event occurs when a customer disputes a charge, and a refund is issued by the payment processor."
    },
    {
      "event_name": "newsletterSignup",
      "event_description": "This event occurs when a user signs up for a newsletter."
    },
    {
      "event_name": "appDownloaded",
      "event_description": "This event triggers when a customer downloads the business’s mobile app."
    },
    {
      "event_name": "productRecommendationClick",
      "event_description": "This event occurs when a customer clicks on a recommended product."
    },
    {
      "event_name": "login",
      "event_description": "This event occurs when a customer logs into their account."
    },
    {
      "event_name": "passwordReseted",
      "event_description": "This event triggers when a customer resets their account password."
    },
    {
      "event_name": "profileUpdated",
      "event_description": "This event occurs when a customer updates their account profile information."
    },
    {
      "event_name": "chatInteraction",
      "event_description": "This event occurs when a customer interacts with live chat support."
    },
    {
      "event_name": "ipAddress",
      "event_description": "This event captures the IP address of the user, which can provide information on location and network."
    },
    {
      "event_name": "userAgent",
      "event_description": "This event captures the user agent string, which contains data about the browser and system used."
    },
    {
      "event_name": "attribution",
      "event_description": "This event tracks the source or campaign that led a user to the website or product."
    }
  ]
}