import fetch from 'node-fetch';
import { countries, country } from './countryCodesHelper.js';
import parseUA from 'ua-parser-js';

const TIKTOK_ACCESS_TOKEN_URL = "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/";
const PROTECTED_AREA_ADMIN_PASSWORD = process.env.PROTECTED_AREA_ADMIN_PASSWORD || "PleaseShowMeOnboardingPage";
const META_APP_ID = '458032785911064';
const META_CLIENT_SECRET = 'c28a8952bd6b115236a705f799e98fd0';
const GOOGLE_CLIENT_ID = '521175891524-13a3d5o4091fmnha8av13mbdrf13kjah.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REDIRECT_URL = "https://app.one-track.io/tracking/sources/google/redirect";

export async function handleTitTokAccessTokenPOST(req, res) {
    try {
        const headers = {
            "Content-Type": "application/json",
        }
        const data = {
            secret: process.env.TIKTOK_SECRET || "02d1924cf61e90c59b6d4c1a0a265c1263a55f0d",
            app_id: req.body.app_id,
            auth_code: req.body.auth_code
        }

        let requestObj = {
            method: "POST",
            headers
        }
        if (data) {
            requestObj.body = JSON.stringify(data);
        }
        let response = await fetch(TIKTOK_ACCESS_TOKEN_URL, requestObj);
        if (response.ok) {
            let json = await response.json();
            return res.json(json);
        }
        res.status(401).json({ error: "auth_code is in-valid" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}

export async function handleTitTokAdvertiserDetailsGET(req, res) {
    try {
        const headers = {
            "Access-Token": req.body.accessToken
        }

        let adv_ids = '';
        let first = true;
        for (let adv_id of req.body.ids) {
            if (first) {
                adv_ids = `"${adv_id}"`;
                first = false;
                continue;
            }
            adv_ids = `${adv_ids},"${adv_id}"`;
        }
        let url = `https://business-api.tiktok.com/open_api/v1.3/advertiser/info/?advertiser_ids=[${adv_ids}]&fields=["name","timezone","advertiser_id"]`;
        let requestObj = {
            method: "GET",
            headers
        }
        let response = await fetch(url, requestObj);
        if (response.ok) {
            let json = await response.json();
            return res.json(json);
        }
        res.status(response.status).json({ error: "invalid request" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}

export async function handleAdminPasswordCheck(req, res) {
    try {
        res.json({ check: req.body.password == PROTECTED_AREA_ADMIN_PASSWORD });
    }
    catch (error) {
        console.error(error);
        res.json({ check: false });
    }
}

export async function handleMetaLongTermAccessTokenPOST(req, res) {
    try {
        let url = `https://graph.facebook.com/v16.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_CLIENT_SECRET}&fb_exchange_token=${req.body.shortTermAccessToken}`;
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            return res.json(json);
        }
        res.status(response.status).json({ error: "invalid request" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}

export async function handleCountryNamesListGET(req, res) {
    try {
        res.json({ data: countries });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}

export async function handleCountryDetailGET(req, res) {
    try {
        res.json(country(req.query.country));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}

export async function handleGoogleRefreshTokensPOST(req, res) {
    const code = req.body.code;
    try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URL,
                grant_type: "authorization_code",
            }),
        });
        if (response.ok) {
            const json = await response.json();
            res.json(
                {
                    error: false,
                    ...json
                }
            );
        }
        else {
            res.json({
                error: true
            })
        }

    } catch (error) {
        console.error("Token exchange error:", error);
        res.json({
            error: true
        })
    }
}
export async function handleUAAgentDetailsPOST(req, res) {
    try {
        let ua = req.body.ua;
        let parser = parseUA(ua);
        res.json({ data: parser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error, error:" + error });
    }
}