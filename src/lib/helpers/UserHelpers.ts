import moment from 'moment';
export function getTimeZoneAdjustedTimestampSeconds(timestamp: number) {
    let now = moment().unix();
    if (timestamp > now) {
        return now
    }
    return timestamp;
}
export function getAttributionTypeValue(source: string) {
    if (source == "First Click") {
        return "firstClick";
    }
    if (source == "Last Click") {
        return "lastClick";
    }
    return "";
}