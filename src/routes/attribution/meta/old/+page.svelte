<script lang="ts">
	import moment from 'moment';
	import { onMount, tick, onDestroy } from 'svelte';
	import {
		Workspace,
		CurrentRange,
		CSVExportQue,
		CurrentRangeChangedTracker,
		AttributionWindow,
		AttributionType
	} from '$lib/store';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { get, type Unsubscriber } from 'svelte/store';
	import { showLoader, hideLoader } from '$lib/helpers/MiscHelpers';
	import { showDataWasUpdated, showMessage } from '$lib/services/ToastService';
	import { getTimeZoneAdjustedTimestampSeconds } from '$lib/helpers/UserHelpers';
	import SelectionDropDowns from '$lib/components/pages/TrackingComponents/Trackinglinks/platformPage/SelectionDropDowns.svelte';
	import GridWrapper from '$lib/components/pages/TrackingComponents/Trackinglinks/platformPage/WrapperDataGrid.svelte';
	import { handleUpdatedCSVQue } from '$lib/helpers/CSVHelpers';
	import { openModal } from 'svelte-modals';
	import { GridDataTypes, loadRowsAndColumns } from './helpers';
	import metaExportModel from '$lib/components/pages/meta/metaExportModel.svelte';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import TooltipData from '$lib/resources/TooltipResources';
	import InfoModel from '$lib/components/layout/InfoModel.svelte';
	import type {
		MetaAdSetsData,
		MetaAdsData,
		MetaCampaignsData
	} from '$lib/types/HttpResponsesTypes';
	import { GetLevelBasedAttribution } from '$lib/services/HttpPlatformMetricsRequests';
	import { getItemFromDB, setItemInDB } from '$lib/local-packages/LocalStorage';
	import type { MetaAttributionDataResponse } from '$lib/types/HttpResponsesTypes';

	const loadingText = 'Preparing your Meta metrics...';

	let listViewGridView = false;

	let showDataInTabularForm = true;

	//tab switching logic
	let showCampaigns = true;
	let showAdSets = false;
	let showAds = false;

	let workspaceId: string;
	let showDropDowns = false;
	let isFirstLoad = true;

	let CampaignsSource: null | MetaCampaignsData[] = null;
	let AdSetsSource: null | MetaAdSetsData[] = null;
	let AdsSource: null | MetaAdsData[] = null;

	let CampaignsList: MetaCampaignsData[] = [];
	let AdSetsList: MetaAdSetsData[] = [];
	let AdsList: MetaAdsData[] = [];

	let distinctAccounts: { name: string; state: boolean; id: string }[] = [];
	let distinctCampaigns: { name: string; state: boolean; id: string; accountId: string }[] = [];
	let distinctAdSets: { name: string; state: boolean; id: string; campaignId: string }[] = [];
	let distinctAds: {
		name: string;
		state: boolean;
		id: string;
		campaignId: string;
		adSetId: string;
	}[] = [];

	let renderedCampaigns: { name: string; state: boolean; id: string; accountId: string }[] = [];
	let renderedAdSets: { name: string; state: boolean; id: string; campaignId: string }[] = [];
	let renderedAds: {
		name: string;
		state: boolean;
		id: string;
		campaignId: string;
		adSetId: string;
	}[] = [];

	let unsubscribeWorkspace: Unsubscriber;
	let unsubscribeCSVQue: Unsubscriber;
	let unsubscribeCurrentRangeChangedTracker: Unsubscriber;
	let unsubscribeAttributionWindow: Unsubscriber;
	let unsubscribeAttributionType: Unsubscriber;

	let FILTERS_PERSIST_LOCAL_STORAGE_ID = `meta-persist-filters-container`;

	onMount(async () => {
		showLoader(loadingText);
		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				workspaceId = ws.id;
				FILTERS_PERSIST_LOCAL_STORAGE_ID = `${workspaceId}-meta-persist-filters-container`;
				let range = get(CurrentRange);
				if (range) {
					await loadData(
						getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
						getTimeZoneAdjustedTimestampSeconds(range.end.unix())
					);
				}
				hideLoader();
			} catch (err) {
				console.error(err);
				hideLoader();
			}
		});

		setupDateRangeTrackerSubscription();

		unsubscribeCSVQue = CSVExportQue.subscribe((data) => {
			if (!data) {
				return;
			}
			let refreshQue = false;
			if (data.metaCampaignsSelected && CampaignsSource) {
				handleUpdatedCSVQue(
					loadRowsAndColumns(CampaignsSource, GridDataTypes.campaigns).rows,
					'meta_campaigns'
				);
				refreshQue = true;
			}
			if (data.metaAdSetsSelected && AdSetsSource) {
				handleUpdatedCSVQue(
					loadRowsAndColumns(AdSetsSource, GridDataTypes.adsets).rows,
					'meta_adsets'
				);
				refreshQue = true;
			}
			if (data.metaAdsSelected && AdsSource) {
				handleUpdatedCSVQue(loadRowsAndColumns(AdsSource, GridDataTypes.ads).rows, 'meta_ads');
				refreshQue = true;
			}
			if (refreshQue) {
				CSVExportQue.set(null);
			}
		});

		unsubscribeAttributionWindow = AttributionWindow.subscribe(resendLoadDataRequest);
		unsubscribeAttributionType = AttributionType.subscribe(resendLoadDataRequest);
	});

	onDestroy(() => {
		if (unsubscribeWorkspace) {
			unsubscribeWorkspace();
		}
		if (unsubscribeCSVQue) {
			unsubscribeCSVQue();
		}
		if (unsubscribeCurrentRangeChangedTracker) {
			unsubscribeCurrentRangeChangedTracker();
		}
		if (unsubscribeAttributionWindow) {
			unsubscribeAttributionWindow();
		}
		if (unsubscribeAttributionType) {
			unsubscribeAttributionType();
		}
		saveFilters();
	});

	async function saveFilters() {
		let obj = {
			accounts: distinctAccounts,
			campaigns: distinctCampaigns,
			adSets: distinctAdSets,
			ads: distinctAds,
			timestamp: moment().unix()
		};
		await setItemInDB(FILTERS_PERSIST_LOCAL_STORAGE_ID, obj);
	}

	function setupDateRangeTrackerSubscription() {
		CurrentRangeChangedTracker.set(null);
		unsubscribeCurrentRangeChangedTracker = CurrentRangeChangedTracker.subscribe(async (range) => {
			if (!range) {
				return;
			}
			await loadData(range.start, range.end, true);
		});
	}

	async function handleSavedFilters() {
		let savedFilters: any = await getItemFromDB(FILTERS_PERSIST_LOCAL_STORAGE_ID);
		if (!savedFilters || !savedFilters.timestamp) {
			return;
		}
		let upperBoundTimestamp = moment.unix(savedFilters.timestamp).add(45, 'minutes').unix();
		let currentTimestamp = moment().unix();
		if (currentTimestamp >= upperBoundTimestamp) {
			return;
		}
		if (savedFilters) {
			distinctAccounts = savedFilters.accounts;
			distinctCampaigns = savedFilters.campaigns;
			distinctAdSets = savedFilters.adSets;
			distinctAds = savedFilters.ads;
		}
	}

	function handleOpen() {
		openModal(metaExportModel, {});
	}
	function handleInfoModel() {
		openModal(InfoModel, { heading: 'Meta Ads Dashboard', mainHtml: TooltipData.meta.page });
	}
	function cleanPreviousPlaceholders() {
		renderedCampaigns = [];
		renderedAdSets = [];
		renderedAds = [];
		distinctAccounts = [];
		distinctCampaigns = [];
		distinctAdSets = [];
		distinctAds = [];
	}
	async function loadData(startDate: number, endDate: number, isUpdate = false) {
		try {
			if (!isUpdate) {
				showLoader(loadingText);
			} else {
				showLoader('Updating marketing data...');
			}
			cleanPreviousPlaceholders();

			const levels = ['campaign', 'adset', 'ad'];
			let stats: MetaAttributionDataResponse = {
				campaigns: [],
				adSets: [],
				ads: []
			};

			for (let level of levels) {
				let response = await GetLevelBasedAttribution(
					workspaceId,
					moment.unix(startDate),
					moment.unix(endDate),
					level,
					'meta'
				);

				if (level == 'campaign') {
					stats.campaigns = response;
				} else if (level == 'adset') {
					stats.adSets = response;
				} else {
					stats.ads = response;
				}

				if (!stats.campaigns || !stats.adSets || !stats.ads) {
					showMessage(
						'Processing error',
						'Available data for selected range is not compatible. Please contact support.',
						'error',
						5000
					);
					CampaignsSource = [];
					AdSetsSource = [];
					AdsSource = [];
					return;
				}

				showDropDowns = false;
				await handleSavedFilters();
				let campDataHandler = handleCampaigns(stats.campaigns);
				let adsetDataHandler = handleAdSets(stats.adSets);
				let adsDataHandler = handleAds(stats.ads);
				await Promise.all([campDataHandler, adsetDataHandler, adsDataHandler]);
			}

			if (isUpdate) {
				showDataWasUpdated('Marketing data has been updated');
			}
		} catch (err) {
			console.error(err);
		} finally {
			hideLoader();
			showDropDowns = true;
			isFirstLoad = false;
		}
	}

	async function resendLoadDataRequest(value: any) {
		if (isFirstLoad) {
			return;
		}
		let range = get(CurrentRange);
		if (range) {
			await loadData(
				getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
				getTimeZoneAdjustedTimestampSeconds(range.end.unix())
			);
		}
	}
	async function handleCampaigns(data: MetaCampaignsData[]) {
		try {
			CampaignsSource = null;
			let accountsData = data.map((x) => {
				return { id: x.accountId, name: x.accountName };
			});

			let newDistinctAccounts = [...new Set(data.map((x) => x.accountId))].map((x) => {
				let state = true;
				let saved = distinctAccounts.find((y) => y.id == x);
				if (saved) {
					state = saved.state;
				}
				return {
					name: accountsData.find((y) => y.id == x)?.name || '',
					id: x,
					state
				};
			});
			distinctAccounts = newDistinctAccounts;

			let newDistinctCampaigns = data.map((x) => {
				let state = true;
				let saved = distinctCampaigns.find((y) => y.id == x.campaignId);
				if (saved) {
					state = saved.state;
				}
				return {
					name: `${x.campaignName} (${x.campaignId})`,
					state,
					id: x.campaignId,
					accountId: x.accountId
				};
			});
			distinctCampaigns = newDistinctCampaigns;
			renderedCampaigns = distinctCampaigns;

			data = data.sort(function (a, b) {
				return b.metrics.meta.spend - a.metrics.meta.spend;
			});

			CampaignsList = data;
			CampaignsSource = CampaignsList;
		} catch (err) {
			console.error(err);
		}
	}
	async function handleAdSets(data: MetaAdSetsData[]) {
		try {
			AdSetsSource = null;

			let newDistinctAdSets = data.map((x) => {
				let state = true;
				let saved = distinctAdSets.find((y) => y.id == x.adSetId);
				if (saved) {
					state = saved.state;
				}
				return {
					name: `${x.adSetName} (${x.adSetId})`,
					state,
					id: x.adSetId,
					campaignId: x.campaignId
				};
			});
			distinctAdSets = newDistinctAdSets;
			renderedAdSets = distinctAdSets;

			data = data.sort(function (a, b) {
				return b.metrics.meta.spend - a.metrics.meta.spend;
			});

			AdSetsList = data;
			AdSetsSource = AdSetsList;
		} catch (err) {
			console.error(err);
		}
	}
	async function handleAds(data: MetaAdsData[]) {
		try {
			AdsSource = null;

			let newDistinctAds = data.map((x) => {
				let state = true;
				let saved = distinctAds.find((y) => y.id == x.adId);
				if (saved) {
					state = saved.state;
				}
				return {
					name: `${x.adName} (${x.adId})`,
					state,
					id: x.adId,
					campaignId: x.campaignId,
					adSetId: x.adSetId
				};
			});
			distinctAds = newDistinctAds;
			renderedAds = distinctAds;

			data = data.sort(function (a, b) {
				return b.metrics.meta.spend - a.metrics.meta.spend;
			});

			AdsList = data;
			AdsSource = AdsList;
			filterCampaigns();
		} catch (err) {
			console.error(err);
		}
	}
	async function filterCampaigns() {
		for (let campaign of distinctCampaigns) {
			let cmpData = renderedCampaigns.find((x) => x.id == campaign.id);
			if (cmpData) {
				campaign.state = cmpData.state;
			}
		}
		CampaignsSource = null;
		await tick();
		let selectedAccountIds = distinctAccounts.filter((x) => x.state).map((x) => x.id);
		renderedCampaigns = distinctCampaigns.filter((x) => selectedAccountIds.includes(x.accountId));
		let selectedCampaignIds = renderedCampaigns.filter((x) => x.state).map((x) => x.id);
		let filteredCampaigns = CampaignsList.filter((x) => selectedCampaignIds.includes(x.campaignId));
		CampaignsSource = filteredCampaigns;
		filterAdSets();
	}
	async function filterAdSets() {
		for (let adset of distinctAdSets) {
			let adsetData = renderedAdSets.find((x) => x.id == adset.id);
			if (adsetData) {
				adset.state = adsetData.state;
			}
		}
		AdSetsSource = null;
		await tick();
		let selectedCampaignIds = renderedCampaigns.filter((x) => x.state).map((x) => x.id);
		renderedAdSets = distinctAdSets.filter((x) => selectedCampaignIds.includes(x.campaignId));
		let selectedAdSetIds = renderedAdSets.filter((x) => x.state).map((x) => x.id);
		let filtered = AdSetsList.filter((x) => selectedAdSetIds.includes(x.adSetId));
		AdSetsSource = filtered;
		filterAds();
	}
	async function filterAds() {
		for (let ad of distinctAds) {
			let adData = renderedAds.find((x) => x.id == ad.id);
			if (adData) {
				ad.state = adData.state;
			}
		}
		AdsSource = null;
		await tick();
		let selectedAdSetIds = renderedAdSets.filter((x) => x.state).map((x) => x.id);
		renderedAds = distinctAds.filter((x) => selectedAdSetIds.includes(x.adSetId));
		let selectedAdIds = renderedAds.filter((x) => x.state).map((x) => x.id);
		let filtered = AdsList.filter((x) => selectedAdIds.includes(x.adId));
		AdsSource = filtered;
		await saveFilters();
		hideLoader();
	}

	function handleAllSelection(
		event: { detail: boolean },
		list: { name: string; id: string; state: boolean }[]
	) {
		for (let elm of list) {
			elm.state = event.detail;
		}
	}
</script>

<div class="px-0.5 flex flex-col flex-1 gap-3 min-h-110">
	<div class="flex flex-wrap justify-between gap-3 w-full relative">
		<div class="flex flex-col gap-3 w-full">
			<div class="space-y-1 group">
				<div class="flex gap-2 items-center">
					<h2 class="text-xl text-white leading-none font-medium flex gap-1">
						Meta - Ads Dashboard
					</h2>

					<div
						class="opacity-0 group-hover:opacity-100 invisible group-hover:visible ease-in-out duration-500 relative"
					>
						<button
							type="button"
							on:click={handleInfoModel}
							class="leading-none relative flex items-center justify-end ease-in-out duration-300 cursor-pointer"
						>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
						</button>
					</div>
				</div>

				<p class="text-xs leading-none">
					Here You can find comprehensive overview of all your meta ads.
				</p>
			</div>
			<div class="flex flex-col sm:flex-row flex-wrap gap-2 w-full items-start">
				{#if showDropDowns}
					<div
						class="xs:grid xs:grid-cols-2 md:flex md:flex-wrap gap-2 flex-1 flex flex-col md:flex-row w-full md:w-auto"
					>
						<SelectionDropDowns
							id="account"
							title="Account Name"
							list={distinctAccounts}
							on:onSelectionChanged={() => {
								filterCampaigns();
							}}
							on:allSelectionChanged={(e) => {
								handleAllSelection(e, distinctAccounts);
								distinctAccounts = distinctAccounts;
							}}
						/>
						<SelectionDropDowns
							id="campaign"
							title="Campaign Name"
							list={renderedCampaigns}
							on:onSelectionChanged={filterCampaigns}
							on:allSelectionChanged={(e) => {
								handleAllSelection(e, renderedCampaigns);
								renderedCampaigns = renderedCampaigns;
							}}
						/>
						<SelectionDropDowns
							id="ad_set"
							title="Ad Set Name"
							list={renderedAdSets}
							on:onSelectionChanged={filterAdSets}
							on:allSelectionChanged={(e) => {
								handleAllSelection(e, renderedAdSets);
								renderedAdSets = renderedAdSets;
							}}
						/>
						<SelectionDropDowns
							id="adselection"
							title="Ad Name"
							list={renderedAds}
							on:onSelectionChanged={filterAds}
							on:allSelectionChanged={(e) => {
								handleAllSelection(e, renderedAds);
								renderedAds = renderedAds;
							}}
						/>
					</div>

					<!-- To changes view of list grid view and table view buttons currently hide -->
					{#if listViewGridView}
						<div class="flex gap-3">
							<div class="isolate inline-flex rounded shadow-sm border border-white/10 bg-white/10">
								<button
									type="button"
									class="relative inline-flex items-center rounded w-10 justify-center px-2 py-2 text-sm font-medium"
									class:active-view={showDataInTabularForm}
									class:in-active-view={!showDataInTabularForm}
									on:click={() => (showDataInTabularForm = true)}
								>
									<span class="sr-only">List View</span>
									<Icon data={Icons.listViewIcon} class="w-4 h-4 " color="currentColor" />
								</button>
								<button
									type="button"
									class="relative -ml-px inline-flex items-center rounded w-10 justify-center px-2 py-2 text-sm font-medium"
									class:active-view={!showDataInTabularForm}
									class:in-active-view={showDataInTabularForm}
									on:click={() => {
										//showDataInTabularForm = false;
										showMessage('Grid view is coming soon!', '', 'info');
									}}
								>
									<span class="sr-only">Grid View</span>
									<Icon data={Icons.gridViewIcon} class="w-4 h-4  " color="currentColor" />
								</button>
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<!-- Grid Data -->
	<div class="flex-col flex gap-6 flex-1 pt-3" class:hidden={showDataInTabularForm}>
		<div class="relative">
			<select
				class="appearance-none border border-white/10 ease-in-out duration-500 bg-white/10 text-white py-2.5 px-3 focus:bg-color block w-60 font-medium text-left placeholder-white focus:outline-none rounded-md shadow-sm focus:border-blue focus:ring-blue text-sm outline-none leading-none peer invalid:border-red invalid:text-red"
			>
				<option>Sort by: ROAS</option>
				<option>Sort by: ROAS</option>
				<option>Sort by: ROAS</option>
				<option>Sort by: ROAS</option>
			</select>
		</div>
		<!-- scroll-card-meta add this class if need scrollbar -->
		<div class="flex-1 on-hover-scroll overflow-auto">
			<div
				class="max-w-sm mx-auto sm:max-w-inherit sm:grid sm:grid-cols-2 ml:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5"
			>
				<!-- <AttributionDataCard /> -->
			</div>
		</div>
	</div>

	<!-- Table Data -->
	<div class="flex-col flex-1 max-h-full relative" class:hidden={!showDataInTabularForm}>
		<div class="-mb-px flex flex-wrap w-full flex-1 gap-2 pr-10 xs:pr-54 mt-5">
			<div class="flex flex-wrap gap-2 flex-1">
				<button
					type="button"
					class="relative md:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showCampaigns
						? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
						: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
					on:click|preventDefault={() => {
						showAdSets = false;
						showAds = false;
						showCampaigns = true;
					}}
				>
					<span
						class="text-white inline-flex items-center justify-between flex-1 gap-2 lg:px-5 p-3 font-semibold text-sm relative z-20"
					>
						<span class="inline-flex items-center justify-start gap-2">
							<Icon data={Icons.folderIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
							<span class="hidden md:inline-flex truncate">Campaigns</span>
						</span>

						<div
							class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 hidden sm:flex items-start"
						>
							<Tooltip top>
								<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
								<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
									><Icon data={Icons.infoIcon} stroke="transparent" class="w-5 shrink-0" />
									{TooltipData.meta.tabs.campaigns}</span
								>
							</Tooltip>
						</div>
					</span>
				</button>
				<button
					type="button"
					class="relative md:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showAdSets
						? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
						: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
					on:click|preventDefault={() => {
						showAds = false;
						showCampaigns = false;
						showAdSets = true;
					}}
				>
					<span
						class="text-white inline-flex items-center justify-between flex-1 gap-2 lg:px-5 p-3 font-semibold text-sm relative z-20"
					>
						<span class="inline-flex items-center justify-start gap-2">
							<Icon data={Icons.fourDotsIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
							<span class="hidden md:inline-flex truncate">Ad Sets</span>
						</span>
						<div
							class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 hidden sm:flex items-start"
						>
							<Tooltip top>
								<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
								<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
									><Icon
										data={Icons.infoIcon}
										stroke="transparent"
										class="w-5 shrink-0"
									/>{TooltipData.meta.tabs.adSets}</span
								>
							</Tooltip>
						</div>
					</span>
				</button>
				<button
					type="button"
					class="relative md:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showAds
						? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
						: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
					on:click|preventDefault={() => {
						showCampaigns = false;
						showAdSets = false;
						showAds = true;
					}}
				>
					<span
						class="text-white inline-flex items-center justify-between flex-1 gap-2 lg:px-5 p-3 font-semibold text-sm relative z-20"
					>
						<span class="inline-flex items-center justify-start gap-2">
							<Icon data={Icons.progressIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
							<span class="hidden md:inline-flex truncate">Ads</span>
						</span>
						<div
							class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 hidden sm:flex items-start"
						>
							<Tooltip top>
								<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
								<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
									><Icon
										data={Icons.infoIcon}
										stroke="transparent"
										class="w-5 shrink-0"
									/>{TooltipData.meta.tabs.ads}</span
								>
							</Tooltip>
						</div>
					</span>
				</button>
			</div>
			<div class="flex gap-2 pb-2">
				<div class="flex items-start">
					<button
						type="button"
						on:click={handleOpen}
						class="relative flex items-center justify-center border border-grey-4 rounded-md before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-blue after:opacity-0 hover:after:opacity-100 hover:before:opacity-0 hover:border-white/50"
					>
						<span
							class="text-white inline-flex items-center justify-start p-2.5 font-semibold text-sm relative z-10"
						>
							<Icon data={Icons.download} class="w-5 h-4" stroke="transparent" />
							<span class="sr-only">Download/Export</span>
						</span>
					</button>
				</div>
				<div class="flex items-start">
					<button
						type="button"
						on:click={async () => {
							let range = get(CurrentRange);
							if (range) {
								await loadData(
									getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
									getTimeZoneAdjustedTimestampSeconds(range.end.unix()),
									true
								);
							}
						}}
						class="relative flex items-center justify-center border border-grey-4 rounded-md before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-blue after:opacity-0 hover:after:opacity-100 hover:before:opacity-0 hover:border-white/50"
					>
						<span
							class="text-white inline-flex items-center justify-start p-2.5 font-semibold text-sm relative z-10"
						>
							<Icon data={Icons.halfCircleReloadIcon} class="w-5 h-4" stroke="transparent" />
							<span class="sr-only">Reload</span>
						</span>
					</button>
				</div>
			</div>
		</div>
		<div class="flex-col flex flex-1 max-h-full">
			{#if showCampaigns}
				<GridWrapper
					Source={CampaignsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source, GridDataTypes.campaigns);
					}}
					id="{workspaceId}-campaigns-meta-tab"
					tabName="Campaigns"
					kpis={TooltipData.meta.kpis}
				/>
			{:else if showAdSets}
				<GridWrapper
					Source={AdSetsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source, GridDataTypes.adsets);
					}}
					id="{workspaceId}-adsets-meta-tab"
					tabName="AdSets"
					kpis={TooltipData.meta.kpis}
				/>
			{:else}
				<GridWrapper
					id="{workspaceId}-ads-meta-tab"
					Source={AdsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source, GridDataTypes.ads);
					}}
					tabName="Ads"
					kpis={TooltipData.meta.kpis}
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.active-view {
		@apply bg-white/20 text-white/70;
	}
	.in-active-view {
		@apply text-white/20;
	}
</style>
