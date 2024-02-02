import { MetaOAuth } from '$lib/store';
import { showMessage } from './ToastService';
import { sendLocalRequest } from './HttpsBaseRequests';

const META_API_VERSION = "v14.0";
const META_SCOPE = 'ads_read';

const GOOGLE_DEV_TOKEN = "CNGAzgNI8ZHE1q4EW0l3Pw";
const GOOGLE_SCOPE = 'https%3A//www.googleapis.com/auth/adwords';
const GOOGLE_CLIENT_ID = '521175891524-13a3d5o4091fmnha8av13mbdrf13kjah.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URL = encodeURIComponent("https://app.one-track.io/tracking/sources/google/redirect");
const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

const TIKTOK_APP_ID = '7164355019616059393';
const TIKTOK_STATE = 'onetrack_tiktok';
const TIKTOK_REDIRECT_URL = 'https%3A//app.one-track.io';
const TIKTOK_RID = '4r5uz9kna9b';

export interface GoogleCustomersResponse {
    results: {
        customer: GoogleCustomer;
        customerClient: GoogleCustomer;
    }[];
    fieldMask: string;
    requestId: string;
}
export interface GoogleCustomer {
    resourceName: string;
    id: string;
    descriptiveName: string;
    currencyCode?: string;
}

//META Requests
export async function GetFacebookToken() {
    //@ts-ignore
    FB.login(HandleFBLoginResponse, { scope: META_SCOPE });
}

export function HandleFBLoginResponse(response: any) {
    try {
        if (response.authResponse) {
            MetaOAuth.set(response.authResponse);
        } else {
            showMessage(
                "Couldn't access facebook auth",
                'User cancelled login or did not fully authorize.',
                'error'
            );
            MetaOAuth.set(null);
        }
    } catch (err) {
        console.error(err);
        showMessage(
            'Meta API access error',
            'Unable to connect to Meta API to get Ad Accounts.',
            'error'
        );
        MetaOAuth.set(null);
    }
}

export async function GetMetaAdAccountsList(accessToken: string, userId: string) {
    try {
        let accounts: any[] = [];
        let breakNext = false;
        let requestGotThrough = false;
        let url = `https://graph.facebook.com/${META_API_VERSION}/${userId}?fields=id,name,adaccounts{id,name}&access_token=${accessToken}`;

        while (!breakNext) {
            breakNext = true;
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                if (requestGotThrough) {
                    json = { adaccounts: json };
                }
                if (json.adaccounts) {
                    accounts = [
                        ...accounts,
                        ...json.adaccounts.data
                    ];
                    if (json.adaccounts.paging && json.adaccounts.paging.next) {
                        url = json.adaccounts.paging.next;
                        breakNext = false;
                    }
                }
                requestGotThrough = true;
            }
        }
        if (requestGotThrough) {
            return { accounts };
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function GetMetaLongTermAccessToken(shortTermAccessToken: string) {
    try {
        let url = "/server/meta/accessToken";
        let response = sendLocalRequest("POST", url, JSON.stringify({
            shortTermAccessToken
        }))
        return response;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
//GOOGLE Requests
export async function GetGoogleAccessToken() {
    const responseType = "code";
    const url = `${GOOGLE_AUTH_ENDPOINT}?scope=${GOOGLE_SCOPE}&include_granted_scopes=true&response_type=${responseType}&state=state_parameter_passthrough_value&redirect_uri=${GOOGLE_REDIRECT_URL}&client_id=${GOOGLE_CLIENT_ID}&access_type=offline&prompt=consent`;

    window.location.href = url;
}

export async function ExchangeGoogleAuthCodeForTokens(code: string) {
    try {
        let url = "/server/google/accessToken";
        let json = await sendLocalRequest("POST", url, JSON.stringify({
            code
        }))
        return {
            data: json,
            error: null
        }
    }
    catch (error) {
        console.error(error);
        return {
            data: null,
            error
        }
    }
}

export async function GetGoogleAdAccountsList(accessToken: string) {

    try {
        let accounts: {
            loginId: string;
            id: string;
            name: string;
        }[] = [];
        let response = await getGoogleUsersList(accessToken);
        if (!response) {
            return accounts;
        }
        let userIds = response.resourceNames;
        for (let userId of userIds) {
            var userInfo = await getGoogleUserInfo(accessToken, userId);
            if (!userInfo) {
                continue;
            }
            for (let uinfo of userInfo) {
                uinfo.results.forEach((info: any) => {
                    accounts.push({
                        loginId: info.customer.id,
                        id: info.customerClient.id,
                        name: info.customerClient.descriptiveName
                    });
                });
            }

        }
        return accounts;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getGoogleUsersList(accessToken: string) {
    let userIds = await sendRequestToGoogleAdsAPI(accessToken, "customers:listAccessibleCustomers");
    if (userIds) {
        return userIds as {
            resourceNames: string[];
        };
    }
    return null;
}

async function getGoogleUserInfo(accessToken: string, userId: string) {
    let url = `${userId}/googleAds:searchStream`;

    let data = {
        query: `SELECT
        customer_client.currency_code,
        customer_client.descriptive_name,
        customer_client.id,
        customer.id,
        customer.descriptive_name
      FROM customer_client`
    }
    let userInfo = await sendRequestToGoogleAdsAPI(accessToken, url, data, "POST");
    if (userInfo) {
        return userInfo as GoogleCustomersResponse[];
    }
    return null;
}

async function sendRequestToGoogleAdsAPI(accessToken: string, urlAppend: string, data: null | Object = null, method = "GET") {
    try {
        let headers = {
            "Content-Type": "application/json",
            "developer-token": GOOGLE_DEV_TOKEN,
            Authorization: `Bearer ${accessToken}`
        }
        let url = `https://googleads.googleapis.com/v13/${urlAppend}`;
        let requestObj: RequestInit = {
            method,
            headers
        }
        if (data) {
            requestObj.body = JSON.stringify(data);
        }
        let response = await fetch(url, requestObj);
        if (response.ok) {
            let json = await response.json();
            return json;
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

//TIKTOK Requests
export async function GetTikTokAccessToken() {
    let url = `https://ads.tiktok.com/marketing_api/auth?app_id=${TIKTOK_APP_ID}&state=${TIKTOK_STATE}&redirect_uri=${TIKTOK_REDIRECT_URL}&rid=${TIKTOK_RID}`;
    window.location.href = url;
}

export async function GetTikTokAccessTokenAndAdvertisersIds(authCode: string) {
    try {
        let url = "/server/tiktok/accessToken";
        let json = await sendLocalRequest("POST", url, JSON.stringify({
            app_id: TIKTOK_APP_ID,
            auth_code: authCode
        }));

        if (json.message == "OK") {
            return json;
        }
        return {
            data: null,
            error: json.message
        }
    }
    catch (error) {
        console.error(error);
        return {
            data: null,
            error
        }
    }
}

export async function GetTikTokAdvertisersDetails(accessToken: string, ids: string[]) {
    try {
        let url = "/server/tiktok/ad_account_details";
        let json = await sendLocalRequest("POST", url, JSON.stringify({
            accessToken,
            ids
        }))
        if (json.message == "OK") {
            return json;
        }
        return {
            data: null,
            error: json.message
        }
    }
    catch (error) {
        console.error(error);
        return {
            data: null,
            error
        }
    }
}