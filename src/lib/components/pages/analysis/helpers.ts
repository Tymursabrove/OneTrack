import type { CustomerProfileEvent, CustomerProfileSummary, ProfileEventUserAgentData } from "$lib/types/HttpResponsesTypes";
import data from '$lib/resources/TooltipResources';
import { camelToSentence } from "$lib/helpers/MiscHelpers";

export function filterUniqueUserAgentEvents(customerEvents: CustomerProfileEvent[]) {
    let placeholder: CustomerProfileEvent[] = [];
    for (let event of customerEvents) {
        if (event.event == 'userAgent') {
            let data = event.data as ProfileEventUserAgentData;
            let found = placeholder.find((x) => x.event == 'userAgent');
            if (found) {
                let foundData = found.data as ProfileEventUserAgentData;
                if (data.raw == foundData.raw) {
                    continue;
                }
            }
        }
        placeholder.push(event);
    }
    return placeholder;
}
export function getProfileEventTooltipText(eventName: string) {
    return data.profileEvents.find(x => x.event_name == eventName)?.event_description ?? camelToSentence(eventName);
}
export interface ExtendedCustomerProfileSummary extends CustomerProfileSummary {
    isFraud: boolean;
    isBot: boolean;
    markAsFraud: boolean;
}