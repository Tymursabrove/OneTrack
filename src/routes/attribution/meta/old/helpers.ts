import { GetColumnDefinition } from '$lib/helpers/TableHelpers';
import {
	currencyFormatter,
	percentageSymbolFormatter,
	getAverage,
	getSum,
	noFormatter,
	getSumRaw
} from '$lib/helpers/MiscHelpers';

export interface MetaRowData {
	accountName: string;
	campaignName: string;
	campaignId: string;
	adSetName?: string;
	adSetId?: string;
	adName?: string;
	adId?: string;
	adSpend: number;
	ROAS: number;
	orderValue: number;
	orders: number;
	CPP: number;
	leads: number;
	CPL: number;
	CPC: number;
	CTR: number;
	CPM: number;
	CPATC: number;
	CPIC: number;
	ATCs: number;
	ICs: number;
	ot_leads: number;
	ot_costPerLead: number;
	ot_purchases: number;
	ot_purchaseValue: number;
	ot_purchaseROAS: number;
	ot_costPerPurchase: number;
	ot_averagePurchaseValue: number;
}

import type { MetaAdSetsData, MetaAdsData, MetaCampaignsData } from '$lib/types/HttpResponsesTypes';
export enum GridDataTypes {
	campaigns,
	adsets,
	ads
}
export function loadRowsAndColumns(
	source: MetaCampaignsData[] | MetaAdSetsData[] | MetaAdsData[],
	gridType: GridDataTypes
) {
	//Filters out the ads or ad sets which are not active any longer (have no account Id and account name)
	source = source.filter((x) => x.accountName);

	let data: MetaRowData[] = [];
	let GridTypeNamePrefixer = 'Campaign';
	let GridTypePropertyPrefixer = 'campaign';
	if (gridType === GridDataTypes.adsets) {
		GridTypeNamePrefixer = 'Ad Set';
		GridTypePropertyPrefixer = 'adSet';
	}
	if (gridType === GridDataTypes.ads) {
		GridTypeNamePrefixer = 'Ad';
		GridTypePropertyPrefixer = 'ad';
		source = source as MetaAdsData[];
	}
	source.forEach((row) => {
		let obj: MetaRowData = {
			accountName: row.accountName,
			campaignId: row.campaignId,
			campaignName: row.campaignName,
			adSetId: '',
			adSetName: '',
			adId: '',
			adName: '',
			adSpend: row.metrics.meta.spend,
			ROAS: row.metrics.meta.purchaseROAS,
			orderValue: row.metrics.meta.purchaseValue,
			orders: row.metrics.meta.purchases,
			CPP: row.metrics.meta.purchases == 0 ? 0 : (row.metrics.meta.spend / row.metrics.meta.purchases),
			leads: row.metrics.meta.leads,
			CPL: row.metrics.meta.leads == 0 ? 0 : (row.metrics.meta.spend / row.metrics.meta.leads),
			CPC: row.metrics.meta.cpc,
			CTR: row.metrics.meta.ctr,
			CPM: row.metrics.meta.cpm,
			CPATC: row.metrics.meta.costPerAddToCart,
			CPIC: row.metrics.meta.costPerInitiateCheckout,
			ATCs: row.metrics.meta.addToCarts,
			ICs: row.metrics.meta.initiateCheckouts,
			ot_leads: row.metrics.onetrack.leads,
			ot_costPerLead: row.metrics.onetrack.costPerLead,
			ot_purchases: row.metrics.onetrack.purchases,
			ot_purchaseValue: row.metrics.onetrack.purchaseValue,
			ot_purchaseROAS: row.metrics.onetrack.purchaseROAS,
			ot_costPerPurchase: row.metrics.onetrack.costPerPurchase,
			ot_averagePurchaseValue: row.metrics.onetrack.averagePurchaseValue
		};

		if (gridType === GridDataTypes.adsets) {
			let newRow = row as MetaAdSetsData;
			obj.adSetName = newRow.adSetName;
			obj.adSetId = newRow.adSetId;
		} else {
			let newRow = row as MetaAdsData;
			obj.adSetName = newRow.adSetName;
			obj.adSetId = newRow.adSetId;
			obj.adName = newRow.adName;
			obj.adId = newRow.adId;
		}
		data.push(obj);
	});
	let metaSummaryRoas =
		getSumRaw(source.map((x) => x.metrics.meta.purchaseValue)) /
		getSumRaw(source.map((x) => x.metrics.meta.spend));
	let oneTrackSummaryRoas =
		getSumRaw(source.map((x) => x.metrics.onetrack.purchaseValue)) /
		getSumRaw(source.map((x) => x.metrics.meta.spend));

	const TotalAdSpend = getSumRaw(source.map((x) => x.metrics.meta.spend));
	const TotalLeads = getSumRaw(source.map((x) => x.metrics.meta.leads));
	const TotalOneTrackLeads = getSumRaw(source.map((x) => x.metrics.onetrack.leads));

	const AverageCPL = TotalLeads == 0 ? 0 : Number(TotalAdSpend) / Number(TotalLeads);
	const AverageOneTrackCPL = TotalOneTrackLeads == 0 ? 0 : Number(TotalAdSpend) / Number(TotalOneTrackLeads);

	let columns = [
		GetColumnDefinition(
			'accountName',
			'Account Name',
			'meta',
			`Summary (${source.length})`,
			noFormatter,
			true
		),
		GetColumnDefinition(`${GridTypePropertyPrefixer}Name`, `${GridTypeNamePrefixer} Name`, 'meta'),
		GetColumnDefinition(`${GridTypePropertyPrefixer}Id`, `${GridTypeNamePrefixer} ID`, 'meta'),
		GetColumnDefinition('adSpend', 'Ad Spend', 'meta', TotalAdSpend, currencyFormatter),
		GetColumnDefinition('ROAS', 'ROAS', 'meta', metaSummaryRoas.toFixed(2)),
		GetColumnDefinition('ot_purchaseROAS', 'ROAS', 'onetrack', oneTrackSummaryRoas.toFixed(2)),
		GetColumnDefinition(
			'orderValue',
			'Order Value',
			'meta',
			getSum(source.map((x) => x.metrics.meta.purchaseValue)),
			currencyFormatter
		),
		GetColumnDefinition(
			'ot_purchaseValue',
			'Order Value',
			'onetrack',
			getSum(source.map((x) => x.metrics.onetrack.purchaseValue)),
			currencyFormatter
		),
		GetColumnDefinition(
			'orders',
			'Orders',
			'meta',
			getSum(
				source.map((x) => x.metrics.meta.purchases),
				0
			)
		),
		GetColumnDefinition(
			'ot_purchases',
			'Orders',
			'onetrack',
			getSum(
				source.map((x) => x.metrics.onetrack.purchases),
				0
			)
		),
		GetColumnDefinition(
			'CPP',
			'CPP',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.cpp),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition(
			'ot_costPerPurchase',
			'CPP',
			'onetrack',
			getAverage(
				source.map((x) => x.metrics.onetrack.costPerPurchase),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition('leads', 'Leads', 'meta', TotalLeads),
		GetColumnDefinition(
			'ot_leads',
			'Leads',
			'onetrack',
			getSum(
				source.map((x) => x.metrics.onetrack.leads),
				0
			)
		),

		GetColumnDefinition('CPL', 'CPL', 'meta', AverageCPL, currencyFormatter),
		GetColumnDefinition(
			'ot_costPerLead',
			'CPL',
			'onetrack',
			AverageOneTrackCPL,
			currencyFormatter
		),

		GetColumnDefinition(
			'CPC',
			'CPC',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.cpc),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition(
			'CTR',
			'CTR',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.ctr),
				2
			),
			percentageSymbolFormatter
		),
		GetColumnDefinition(
			'CPM',
			'CPM',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.cpm),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition(
			'CPATC',
			'CPATC',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.costPerAddToCart),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition(
			'CPIC',
			'CPIC',
			'meta',
			getAverage(
				source.map((x) => x.metrics.meta.costPerInitiateCheckout),
				2
			),
			currencyFormatter
		),
		GetColumnDefinition(
			'ATCs',
			'Count ATC',
			'meta',
			getSum(
				source.map((x) => x.metrics.meta.addToCarts),
				0
			)
		),
		GetColumnDefinition(
			'ICs',
			'Count IC',
			'meta',
			getSum(
				source.map((x) => x.metrics.meta.initiateCheckouts),
				0
			),
			noFormatter,
			false,
			true
		)
	];
	return { rows: data, columns };
}
