export function GetToatlAdSpendFromCampaigns(campaigns) {
    let total = 0;
    campaigns.forEach(cm => {
        try {
            total += Number(cm.spend);
        }
        catch (err) {
            console.log(err);
        }
    });
    return total;
}
export function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function GetTotalAdSpendFromCampaigns(campaigns) {
    return campaigns.reduce((accumulator, object) => {
        return accumulator + Number(object.spend);
    }, 0);
}

export function GetROASFromCampaigns(campaigns) {
    let numOfPurchaseEvents = 0;
    let sumOfPurchases = 0;
    campaigns.forEach(c => {
        if (!c.purchaseRoas) {
            return;
        }
        let event = c.purchaseRoas.find(x => x.actionType == "omni_purchase");
        if (!event) {
            event = c.purchaseRoas.find(x => x.actionType == "purchase");
        }
        if (!event) {
            event = c.purchaseRoas.find(x => x.actionType == "offsite_conversion.fb_pixel_purchase");
        }
        if (event) {
            numOfPurchaseEvents += 1;
            sumOfPurchases += Number(event.value);
        }
    })
    if (numOfPurchaseEvents > 0) {
        return (sumOfPurchases / numOfPurchaseEvents).toFixed(2);
    }
    return 0;
}
export function GetTotalOrderValueFromCampaigns(campaigns) {
    let sumOfOrderValues = 0;
    campaigns.forEach(c => {
        if (!c.actionValues) {
            return;
        }
        let event = c.actionValues.find(x => x.actionType == "omni_purchase");
        if (!event) {
            event = c.actionValues.find(x => x.actionType == "purchase");
        }
        if (!event) {
            event = c.actionValues.find(x => x.actionType == "offsite_conversion.fb_pixel_purchase");
        }
        if (event) {
            sumOfOrderValues += Number(event.value);
        }
    })
    return sumOfOrderValues.toFixed(2);
}
export function GetTotalNumberOfOrdersFromCampaigns(campaigns) {
    let sumOfOrders = 0;
    campaigns.forEach(c => {
        if (!c.actions) {
            return;
        }
        let event = c.actions.find(x => x.actionType == "omni_purchase");
        if (!event) {
            event = c.actions.find(x => x.actionType == "purchase");
        }
        if (!event) {
            event = c.actions.find(x => x.actionType == "offsite_conversion.fb_pixel_purchase");
        }
        if (event) {
            sumOfOrders += Number(event.value);
        }
    })
    return sumOfOrders.toFixed(0);
}
export function GetAverageOrderValueFromCampaigns(campaigns) {
    let orders = GetTotalNumberOfOrdersFromCampaigns(campaigns);
    let orderValues = GetTotalOrderValueFromCampaigns(campaigns)
    if (orders > 0 && orderValues > 0) {
        return (orderValues / orders).toFixed(2);
    }
    return 0;
}

export function GetCostPerValues(campaigns, propertyName) {
    let numOfEvents = 0;
    let sumOfValues = 0;
    campaigns.forEach(c => {
        let event = c[propertyName];
        if (event) {
            numOfEvents += 1;
            sumOfValues += Number(event);
        }
    })
    if (numOfEvents > 0) {
        return (sumOfValues / numOfEvents).toFixed(2);
    }
    return 0;
}

export function GetCPOFromCampaigns(campaigns) {
    let numOfPurchaseEvents = 0;
    let sumOfPurchases = 0;
    campaigns.forEach(c => {
        if (!c.costPerActionType) {
            return;
        }
        let event = c.costPerActionType.find(x => x.actionType == "omni_purchase");
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "purchase");
        }
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "offsite_conversion.fb_pixel_purchase");
        }
        if (event) {
            numOfPurchaseEvents += 1;
            sumOfPurchases += Number(event.value);
        }
    });
    if (numOfPurchaseEvents > 0) {
        return (sumOfPurchases / numOfPurchaseEvents).toFixed(2);
    }
    return 0;
}

export function GetCPICFromCampaigns(campaigns) {
    let numOfInitCheckoutEvents = 0;
    let sumOfICEValues = 0;
    campaigns.forEach(c => {
        if (!c.costPerActionType) {
            return;
        }
        let event = c.costPerActionType.find(x => x.actionType == "omni_initiated_checkout");
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "initiate_checkout");
        }
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "offsite_conversion.fb_pixel_initiated_checkout");
        }
        if (event) {
            numOfInitCheckoutEvents += 1;
            sumOfICEValues += Number(event.value);
        }
    });
    if (numOfInitCheckoutEvents > 0) {
        return (sumOfICEValues / numOfInitCheckoutEvents).toFixed(2);
    }
    return 0;
}

export function GetCPATCFromCampaigns(campaigns) {
    let numOfAddToCartEvents = 0;
    let sumOfATCEValues = 0;
    campaigns.forEach(c => {
        if (!c.costPerActionType) {
            return;
        }
        let event = c.costPerActionType.find(x => x.actionType == "omni_add_to_cart");
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "add_to_cart");
        }
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "offsite_conversion.fb_pixel_add_to_cart");
        }
        if (event) {
            numOfAddToCartEvents += 1;
            sumOfATCEValues += Number(event.value);
        }
    });
    if (numOfAddToCartEvents > 0) {
        return (sumOfATCEValues / numOfAddToCartEvents).toFixed(2);
    }
    return 0;
}
export function GetCountOfATCEventsFromCampaigns(campaigns) {
    let numOfAddToCartEvents = 0;
    campaigns.forEach(c => {
        if (!c.costPerActionType) {
            return;
        }
        let event = c.costPerActionType.find(x => x.actionType == "omni_add_to_cart");
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "add_to_cart");
        }
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "offsite_conversion.fb_pixel_add_to_cart");
        }
        if (event) {
            numOfAddToCartEvents += 1;
        }
    });
    return numOfAddToCartEvents
}
export function GetCountOfICEventsFromCampaigns(campaigns) {
    let numOfEvents = 0;
    campaigns.forEach(c => {
        if (!c.costPerActionType) {
            return;
        }
        let event = c.costPerActionType.find(x => x.actionType == "omni_initiated_checkout");
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "initiate_checkout");
        }
        if (!event) {
            event = c.costPerActionType.find(x => x.actionType == "offsite_conversion.fb_pixel_initiated_checkout");
        }
        if (event) {
            numOfEvents += 1;
        }
    });
    return numOfEvents
}