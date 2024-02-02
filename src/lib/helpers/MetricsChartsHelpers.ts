import { getTimeZoneOffsetInSeconds } from '$lib/helpers/MiscHelpers';
function getFormattedDate(date) {
    let offset = getTimeZoneOffsetInSeconds();
    date = date - (60 * offset);
    return date * 1000;
}
export function GetSeriesForConversionMetricsChart(metrics) {
    let adSpendData = [];
    let revenueData = [];
    let roasData = [];
    metrics.adspend.forEach(x => {
        adSpendData.push([getFormattedDate(x.timestamp), Number(x.value).toFixed(2)]);
    })
    metrics.revenue.forEach(x => {
        revenueData.push([getFormattedDate(x.timestamp), Number(x.value).toFixed(2)]);
    })
    metrics.roas.forEach(x => {
        roasData.push([getFormattedDate(x.timestamp), Number(x.value).toFixed(2)]);
    })

    let data = [
        { name: "Ad Spend", data: adSpendData.sort((a, b) => { return a[0] - b[0]; }) },
        { name: "Revenue", data: revenueData.sort((a, b) => { return a[0] - b[0]; }) },
        { name: "ROAS", data: roasData.sort((a, b) => { return a[0] - b[0]; }) }
    ];
    return data;

}
export function GetSeriesForMetricsChart(data, label) {
    let seriesData = [];
    data.forEach(x => {
        seriesData.push([getFormattedDate(x.timestamp), Number(x.value).toFixed(2)]);
    })

    if (seriesData.length == 1) {
        seriesData.push([0, 0])
    }

    return [
        { name: label, data: seriesData.sort((a, b) => { return a[0] - b[0]; }) }
    ];

}