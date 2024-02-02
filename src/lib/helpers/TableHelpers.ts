import { noFormatter } from '$lib/helpers/MiscHelpers';
import type { oneTrackAttributionData, oneTrackProcessedAttributionData } from '$lib/types/HttpResponsesTypes';

export function GetColumnDefinition(id: string,
    name: string,
    iconType = "none",
    footerValue: null | undefined | string | number = null,
    formatter = noFormatter,
    isFirst = false,
    isLast = false,
    formatFooter = true) {
    return {
        accessorFn: (row) => row[id] ?? "",
        id,
        iconType,
        cell: (info) => formatter(info.getValue()),
        header: () => name,
        footer: (info) => {
            if (!formatFooter) {
                return footerValue;
            }
            return formatter(footerValue ?? 0);
        },
        sortingFn: "alphanumeric",
        isFirst,
        isLast,
        isVisible: true
    }
}
export function getThClass(header, styling) {
    if (header.column.columnDef.isFirst) {
        return styling.thead.th.first;
    }
    if (header.column.columnDef.isLast) {
        return styling.thead.th.last;
    }
    return styling.thead.th.middle;
}
export function getTdClass(cell, styling) {
    if (cell.column.columnDef.isFirst) {
        return styling.tbody.td.first;
    }
    if (cell.column.columnDef.isLast) {
        return styling.tbody.td.last;
    }
    return styling.tbody.td.middle;
}
export function getTfootClass(header, styling) {
    if (header.column.columnDef.isFirst) {
        return styling.tfoot.th.first;
    }
    if (header.column.columnDef.isLast) {
        return styling.tfoot.th.last;
    }
    return styling.tfoot.th.middle;
}
export function ConvertOneTrackAttributionToProcessed(source: oneTrackAttributionData) {
    let obj: oneTrackProcessedAttributionData = {
        ot_leads: source.leads,
        ot_costPerLead: source.costPerLead,
        ot_purchases: source.purchases,
        ot_purchaseValue: source.purchaseValue,
        ot_purchaseROAS: source.purchaseROAS,
        ot_costPerPurchase: source.costPerPurchase,
        ot_averagePurchaseValue: source.averagePurchaseValue
    }
    return obj;
}