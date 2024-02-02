import type { Moment } from 'moment';
import type {
    CustomerProfileDetails,
    CustomerProfileEvent,
    CustomerProfileSummary,
    EventData

} from '$lib/types/HttpResponsesTypes';
import { HeaderTypes, sendGetRequest } from './HttpsBaseRequests';
import moment from 'moment';
import { getAttributionTypeValue } from '$lib/helpers/UserHelpers';
import { get } from 'svelte/store';
import { AttributionType, AttributionWindow } from '$lib/store';

export async function GetCustomersProfilesList(workspaceId: string, startDate: Moment, endDate: Moment, nextPointer: null | string, eventType: "lead" | "purchase") {
    let url = `workspaces/${workspaceId}/tabs/profiling/summary?event_type=${eventType}&start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`;
    if (nextPointer) {
        url = `${url}&next=${nextPointer}`;
    }
    let response = await sendGetRequest(url, HeaderTypes.access, false);
    let profiles = response.error || !response.json || !response.json.data ? [] : response.json.data as CustomerProfileSummary[]
    if (!response.error && response.json && response.json.next) {
        nextPointer = response.json.next;
    }
    else {
        nextPointer = null;
    }
    return {
        profiles,
        nextPointer
    }
}
export async function GetAllCustomersProfilesList(workspaceId: string, startDate: Moment, endDate: Moment, eventType: "lead" | "purchase") {
    let nextPointer: null | string = null;
    let iterate = true;
    let profiles: CustomerProfileSummary[] = [];
    while (iterate) {
        iterate = false;
        let url = `workspaces/${workspaceId}/tabs/profiling/summary?event_type=${eventType}&start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`;
        if (nextPointer) {
            url = `${url}&next=${nextPointer}`;
        }
        let response = await sendGetRequest(url, HeaderTypes.access, false);
        if (!response.error && response.json && response.json.data) {
            let newProfiles = response.json.data as CustomerProfileSummary[];
            profiles = [...profiles, ...newProfiles];
            if (response.json.next) {
                nextPointer = response.json.next;
                iterate = true;
            }
        }
    }
    return profiles;
}
export async function GetCustomersProfileDetails(workspaceId: string, profileId: string) {
    let url = `workspaces/${workspaceId}/tabs/profiling/profile?super_id=${profileId}`;
    let response = await sendGetRequest(url, HeaderTypes.access, false);
    return response.error ? null : response.json as CustomerProfileDetails;
}
export async function GetCustomersProfileEvents(workspaceId: string, profileId: string, startDate: Moment, endDate: Moment) {

    let nextPointer: null | string = null;
    let iterate = true;
    let events: CustomerProfileEvent[] = [];
    while (iterate) {
        iterate = false;
        let url = `workspaces/${workspaceId}/tabs/profiling/events?super_id=${profileId}&start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`;
        if (nextPointer) {
            url = `${url}&next=${nextPointer}`;
        }
        let response = await sendGetRequest(url, HeaderTypes.access, false);
        if (!response.error && response.json && response.json.data) {
            let newEvents = response.json.data as CustomerProfileEvent[];
            events = [...events, ...newEvents];
            if (response.json.next) {
                nextPointer = response.json.next;
                iterate = true;
            }
        }
    }
    events = events.map(x => {
        let d = moment(x.timestamp);
        x.timestampInSeconds = d.unix();
        x.timestampFormatted = d.format('YYYY-MM-DD HH:mm:ss');
        return x;
    })
    return events;
}
export async function GetAttributionEvents(workspaceId: string, startDate: Moment, endDate: Moment, nextPointer: null | string, eventType: "lead" | "purchase") {
    let attributionModel = getAttributionTypeValue(get(AttributionType));
    let attributionWindow = `${get(AttributionWindow)}d`;
    let url = `workspaces/${workspaceId}/tabs/events?event_type=${eventType}&start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}&attribution_model=${attributionModel}&attribution_window=${attributionWindow}`;
    if (nextPointer) {
        url = `${url}&next=${nextPointer}`;
    }
    let response = await sendGetRequest(url, HeaderTypes.access, false);
    let events = response.error || !response.json || !response.json.events ? [] : response.json.events as EventData[]
    if (!response.error && response.json && response.json.next) {
        nextPointer = response.json.next;
    }
    else {
        nextPointer = null;
    }
    events = events.map(x => {
        x.timestampInNumber = new Date(x.target?.timestamp ?? "").getTime();
        return x;
    });
    events = events.sort((a, b) => b.timestampInNumber - a.timestampInNumber);
    return {
        events,
        nextPointer
    }
}