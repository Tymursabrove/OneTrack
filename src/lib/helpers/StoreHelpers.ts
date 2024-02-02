import {
	GetTotalAdSpendFromCampaigns,
	GetROASFromCampaigns,
	GetTotalOrderValueFromCampaigns,
	GetTotalNumberOfOrdersFromCampaigns,
	GetAverageOrderValueFromCampaigns,
	GetCostPerValues,
	GetCPOFromCampaigns,
	GetCPICFromCampaigns,
	GetCPATCFromCampaigns
} from './StatsHelpers';
import { Connectors } from '$lib/store';

export function UpdateConnectorsStore(workspace, campaigns) {
	let connectors = [];
	Connectors.set([]);
	let Platforms = [...new Set(workspace.connectors.filter((x) => x.platform).map((x) => x.platform))];
	Platforms.forEach((pltfrm) => {
		let actIds = workspace.connectors.filter((x) => x.platform == pltfrm).map((x) => x.accountId);
		let cmpns = campaigns.filter((x) => actIds.includes(x.accountId));

		connectors.push({
			name: pltfrm,
			platform: pltfrm,
			id: `id-platform-${pltfrm}`,
			campaigns: cmpns,
			adSpendTotal: GetTotalAdSpendFromCampaigns(cmpns),
			roas: GetROASFromCampaigns(cmpns),
			attribution: 2,
			orderValue: GetTotalOrderValueFromCampaigns(cmpns),
			orders: GetTotalNumberOfOrdersFromCampaigns(cmpns),
			averageOrderValue: GetAverageOrderValueFromCampaigns(cmpns),
			cpc: GetCostPerValues(cmpns, 'cpc'),
			cpm: GetCostPerValues(cmpns, 'cpm'),
			cpp: GetCostPerValues(cmpns, 'cpp'),
			ctr: GetCostPerValues(cmpns, 'ctr'),
			cpo: GetCPOFromCampaigns(cmpns),
			cpic: GetCPICFromCampaigns(cmpns),
			cpatc: GetCPATCFromCampaigns(cmpns)
		});
		Connectors.set(connectors);
	});
}
