import {
    percentageSymbolFormatter,
    getSum,
    TransformCurrencyValue
} from '$lib/helpers/MiscHelpers';
import { CurrentRange } from '$lib/store';
import { get } from 'svelte/store';

const referredTypesForCards = [
    "klaviyo",
    "google",
    "meta",
    "pinterest",
    "tiktok",
    "bing",
    "outbrain",
    "taboola",
    "omnisend",
    "awin"
]
const subRefererTypes = [
    {
        main: "meta",
        sub: [
            "igshopping",
            "ig",
            "insta",
            "instagram",
            "facebook",
            "fb"
        ]
    },
    {
        main: "google",
        sub: [
            "youtube"
        ]
    }
]
export const defaultGridStyling = {
    table: 'min-w-full border-collapse ',
    thead: {
        self: 'sticky top-0 z-20 bg-color before:absolute before:bg-dropdown before:shadow-glass before:opacity-80 after:h-px after:bg-grey after:absolute after:inset-x-0 after:bottom-0',
        tr: 'relative z-30 bg-glass-straight',
        th: {
            innerDiv: 'overflow-auto resize-x pb-4 pt-4 px-2 ',
            first: 'text-left text-sm font-semibold text-white',
            middle: ' border-l border-grey text-left text-sm font-semibold text-white before:absolute before:inset-y-0 before:w-px before:bg-grey before:-left-px relative',
            last: ' border-l border-grey relative text-left text-sm font-semibold before:absolute before:inset-y-0 before:w-px before:bg-grey before:-left-px relative'
        }
    },
    tbody: {
        self: 'divide-y divide-grey',
        tr: 'hover:bg-color',
        td: {
            first: 'text-sm font-medium text-white py-2 px-2 break-word',
            middle:
                ' border-l border-grey py-2 px-2 text-sm text-white break-word',
            last: ' border-l border-grey relative py-2 px-2 text-sm font-medium break-word'
        }
    },
    tfoot: {
        self: 'bottom-0 sticky bg-color before:absolute before:bg-dropdown before:shadow-glass before:opacity-80 before:inset-0 before:backdrop-blur-2.5xl after:h-px after:bg-grey after:absolute after:inset-x-0 after:top-0',
        tr: 'sticky relative z-10 ',
        th: {
            first: 'sticky py-2 px-2 text-left text-sm font-semibold text-white ',
            middle:
                'sticky border-l border-grey py-2 px-2 text-left text-sm font-semibold text-white before:absolute before:inset-y-0 before:w-px before:bg-grey before:-left-px relative',
            last: 'sticky border-l border-grey relative py-2 px-2 text-left text-sm font-semibold before:absolute before:inset-y-0 before:w-px before:bg-grey before:-left-px relative'
        }
    }
};
export function ExtractEventTypesAndStats(data: any, arePurchaseEvents: boolean) {
    if (!data) {
        return null;
    }

    let subRefTypesConcat: string[] = []
    subRefererTypes.map(y => y.sub).forEach(x => {
        subRefTypesConcat = [...subRefTypesConcat, ...x];
    });

    data = flattenEventsData(data, arePurchaseEvents);

    let typeGroupNames = [...new Set(data.map((t) => t?.type).filter(Boolean))].filter((x) => x != 'ad');

    let adGroupNames = [...new Set(data.filter((x) => x.type == 'ad').map((x) => x.source))].filter(
        (x) => !DoesExistInAWordArray([...subRefTypesConcat], x)
    );

    //Ad groups processing
    let adGroups = adGroupNames.map((x) => {
        let subRefTypesForThisAdType = subRefererTypes.find(y => y.main == x)?.sub || [];
        if (subRefTypesForThisAdType.length > 0) {
            return {
                name: x,
                adSource: data.filter((t) => t.type == 'ad' && (t.source == x || DoesExistInAWordArray(subRefTypesForThisAdType, t.source))),
                otherSource: [],
                referredSource: [],
                source: [],
                type: "ad"
            };
        }
        else {
            return {
                name: x,
                adSource: data.filter((t) => t.type == 'ad' && t.source == x),
                otherSource: [],
                referredSource: [],
                source: [],
                type: "ad"
            };
        }
    });


    let typeGroups = typeGroupNames.map((x) => {
        if (x == "other") {
            return {
                name: x,
                source: data.filter((t) => t.type && t.type == x && (t.clickId === undefined || t.clickId === null || t.clickId.length == 0)),
                type: x
            }
        }
        if (x == "refered") {
            return {
                name: x,
                source: data.filter((t) => t.type && t.type == x && !DoesExistInAWordArray(
                    [...referredTypesForCards, ...subRefTypesConcat],
                    t.referer
                )),
                type: "other"
            }

        }
        let source = data.filter((t) => t.type && t.type == x);
        return {
            name: x,
            source,
            type: "other"
        };
    });

    typeGroups.push({
        name: 'Unattributed',
        source: data.filter((x) => x.isAttributed == false),
        type: "other"
    });

    referredTypesForCards.forEach(r => {
        let subTypes = subRefererTypes.find(x => x.main == r)?.sub ?? []
        let adTypeForThisReferredType = adGroups.findIndex(x => x.name == r);
        if (adTypeForThisReferredType != -1) {
            adGroups[adTypeForThisReferredType].referredSource = data.filter((t) => t.type && t.type == "refered" && DoesExistInAWordArray(
                [r, ...subTypes],
                t.referer
            ))
        }
        else {
            typeGroups.push({
                name: r,
                source: data.filter((t) => t.type && t.type == "refered" && DoesExistInAWordArray(
                    [r, ...subTypes],
                    t.referer
                )),
                type: "other",
                filter: `${r}-refered`
            })
        }

    })

    let metaAdType = adGroups.findIndex(x => x.name == "meta");
    if (metaAdType != -1) {
        adGroups[metaAdType].otherSource = data.filter((t) => t.type && t.type == "other" && t.clickId !== undefined && t.clickId !== null && t.clickId.length > 0)
    }
    else {
        typeGroups.push(
            {
                name: 'meta',
                source: data.filter((t) => t.type && t.type == "other" && t.clickId !== undefined && t.clickId !== null && t.clickId.length > 0),
                type: "other",
                filter: "meta-platform"
            }
        );
    }

    let groups = [...adGroups, ...typeGroups]


    groups = TransformData(groups, arePurchaseEvents);
    groups = groups.map(g => {

        let obj = { ...g, filter: g.name };
        if (g.filter) {
            obj.filter = g.filter;
        }
        obj.source = g.source.map(x => { return { ...x, filter: obj.filter } });
        return obj;
    })
    return { groups: groups.filter(x => x.source.length > 0) }

}
function TransformData(list, arePurchaseEvents) {
    let range = get(CurrentRange);
    let rangeDiff = Number(range?.end.diff(range.start, 'days'));
    for (let item of list) {
        if (item.type == "ad") {
            item.adCount = item.adSource.length;
            item.adRevenue = TransformCurrencyValue(getSum(item.adSource.map((x) => x.orderValue)));
            item.otherCount = item.referredSource.length + item.otherSource.length;
            item.otherRevenue = TransformCurrencyValue(
                getSum(
                    [
                        ...item.referredSource.map((x) => x.orderValue),
                        ...item.otherSource.map((x) => x.orderValue),
                    ]
                ));
            item.source = [...item.adSource, ...item.referredSource, ...item.otherSource]
            item.source = item.source.sort(function (a, b) {
                return a.timestamp - b.timestamp;
            });
            item.totalCount = item.source.length;
            item.totalRevenueInNumber = getSum(item.source.map((x) => x.orderValue));
            item.totalRevenue = TransformCurrencyValue(item.totalRevenueInNumber);
        }
        else {
            item.adCount = 0;
            item.adRevenue = TransformCurrencyValue(0);
            item.totalCount = item.otherCount = item.source.length;
            item.totalRevenueInNumber = getSum(item.source.map((x) => x.orderValue));
            item.totalRevenue = item.otherRevenue = TransformCurrencyValue(item.totalRevenueInNumber);
        }
        item.adPercentage = percentageSymbolFormatter((item.adCount / item.totalCount) * 100);
        let chartData = [];
        item.source.forEach((g) => {
            let td = new Date(g.timestamp);
            let date;
            if (rangeDiff < 4) {
                date = new Date(td.getFullYear(), td.getMonth(), td.getDate(), td.getHours());
            } else {
                date = new Date(td.getFullYear(), td.getMonth(), td.getDate());
            }
            if (arePurchaseEvents) {
                chartData.push({
                    day: date.valueOf(),
                    order: g.orderValue
                });
            } else {
                chartData.push({ day: date.valueOf(), order: 1 });
            }
        });
        let chartCleanedData = [];
        [...new Set(chartData.map((x) => x.day))].forEach((d) => {
            chartCleanedData.push([
                d,
                Number(getSum(chartData.filter((x) => x.day == d).map((x) => x.order)))
            ]);
        });
        if (chartCleanedData.length == 1) {
            chartCleanedData = [[0, 0], ...chartCleanedData];
        }
        item.chartSeries = [
            {
                name: item.name,
                data: chartCleanedData
            }
        ];
    }
    return list;
}
function DoesExistInAWordArray(list: string[], term: string) {
    term = term.toLowerCase();
    let response = list.filter(x => term.includes(x));
    return response.length != 0;
}
function flattenEventsData(data: any[], arePurchaseEvents: boolean) {
    if (arePurchaseEvents) {
        data = data.sort(function (a, b) {
            return a.purchase.timestamp - b.purchase.timestamp;
        });
    } else {
        data = data.sort(function (a, b) {
            return a.lead.timestamp - b.lead.timestamp;
        });
    }
    return data.map((x) => {
        let isAttributed = true;
        if (!x.purchase) {
            x.purchase = {};
        }
        if (!x.touchpoints || Object.keys(x.touchpoints[0]).length === 0) {
            isAttributed = false;
            x.touchpoints = [{}];
        }
        if (arePurchaseEvents) {
            return {
                ...x.purchase,
                ...x.touchpoints[0],
                isAttributed
            };
        } else {
            return {
                ...x.lead,
                ...x.touchpoints[0],
                isAttributed
            };
        }
    });
}