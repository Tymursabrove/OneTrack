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
	import { loadRowsAndColumns, tooltipFinder, Page_Intro, Tabs_Intro } from './helpers';
	import GoogleExportModel from '$lib/components/pages/google/GoogleExportModel.svelte';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import InfoModel from '$lib/components/layout/InfoModel.svelte';
	import type {
		GoogleCampaignsData,
		GoogleAdSetsData,
		GoogleAdsData
	} from '$lib/types/HttpResponsesTypes';
	import { GetLevelBasedAttribution } from '$lib/services/HttpPlatformMetricsRequests';
	import { setItemInDB, getItemFromDB } from '$lib/local-packages/LocalStorage';
	import type { GoogleAttributionDataResponse } from '$lib/types/HttpResponsesTypes';

	const loadingText = 'Preparing your Google metrics...';

	let showDataInTabularForm = true;
	//tab switching logic
	let showCampaigns = true;
	let showAdSets = false;
	let showAds = false;

	let workspaceId: string;
	let showDropDowns = false;
	let isFirstLoad = true;

	let CampaignsSource: null | GoogleCampaignsData[] = null;
	let AdSetsSource: null | GoogleAdSetsData[] = null;
	let AdsSource: null | GoogleAdsData[] = null;

	let CampaignsList: GoogleCampaignsData[] = [];
	let AdSetsList: GoogleAdSetsData[] = [];
	let AdsList: GoogleAdsData[] = [];

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

	let FILTERS_PERSIST_LOCAL_STORAGE_ID = `google-persist-filters-container`;

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
				FILTERS_PERSIST_LOCAL_STORAGE_ID = `${workspaceId}-google-persist-filters-container`;
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
			if (data.googleCampaignsSelected && CampaignsSource) {
				handleUpdatedCSVQue(loadRowsAndColumns(CampaignsSource).rows, 'google_campaigns');
				refreshQue = true;
			}
			if (data.googleAdSetsSelected && AdSetsSource) {
				handleUpdatedCSVQue(loadRowsAndColumns(AdSetsSource).rows, 'google_adsets');
				refreshQue = true;
			}
			if (data.googleAdsSelected && AdsSource) {
				handleUpdatedCSVQue(loadRowsAndColumns(AdsSource).rows, 'google_ads');
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
		openModal(GoogleExportModel, {});
	}
	function handleInfoModel() {
		openModal(InfoModel, { heading: 'Google Ads Dashboard', mainHtml: Page_Intro });
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

			const levels = ['campaign', 'adgroup', 'adgroup_ad'];
			let stats: GoogleAttributionDataResponse = {
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
					'google'
				);

				if (level == 'campaign') {
					stats.campaigns = response;
				} else if (level == 'adgroup') {
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
				showDataWasUpdated('Data has been updated');
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

	async function handleCampaigns(data: GoogleCampaignsData[]) {
		try {
			CampaignsSource = null;
			let newDistinctAccounts = [...new Set(data.map((x) => x.customerId))].map((x) => {
				let state = true;
				let savedAccount = distinctAccounts.find((y) => y.id == x);
				if (savedAccount) {
					state = savedAccount.state;
				}
				return {
					name: x,
					id: x,
					state: state
				};
			});
			distinctAccounts = newDistinctAccounts;

			let newDistinctCampaigns = data.map((x) => {
				let state = true;
				let savedCampaign = distinctCampaigns.find((y) => y.id == x.campaignId);
				if (savedCampaign) {
					state = savedCampaign.state;
				}
				return {
					name: `${x.campaignName} (${x.campaignId})`,
					state: state,
					id: x.campaignId,
					accountId: x.customerId
				};
			});

			distinctCampaigns = newDistinctCampaigns;
			renderedCampaigns = distinctCampaigns;

			data = data.sort(function (a, b) {
				return b.metrics.google.averageCost - a.metrics.google.averageCost;
			});
			CampaignsList = data;
			CampaignsSource = CampaignsList;
		} catch (err) {
			console.error(err);
		}
	}
	async function handleAdSets(data: GoogleAdSetsData[]) {
		try {
			AdSetsSource = null;
			let newDistinctAdSets = data.map((x) => {
				let state = true;
				let savedAdSet = distinctAdSets.find((y) => y.id == x.adGroupId);
				if (savedAdSet) {
					state = savedAdSet.state;
				}
				return {
					name: `${x.adGroupName} (${x.adGroupId})`,
					state: state,
					id: x.adGroupId,
					campaignId: x.campaignId
				};
			});
			distinctAdSets = newDistinctAdSets;
			renderedAdSets = distinctAdSets;
			data = data.sort(function (a, b) {
				return b.metrics.google.averageCost - a.metrics.google.averageCost;
			});
			AdSetsList = data;
			AdSetsSource = AdSetsList;
		} catch (err) {
			console.error(err);
		}
	}
	async function handleAds(data: GoogleAdsData[]) {
		try {
			AdsSource = null;
			let newDistinctAds = data.map((x) => {
				let state = true;
				let savedAd = distinctAds.find((y) => y.id == x.adId);
				if (savedAd) {
					state = savedAd.state;
				}
				return {
					name: `${x.adName ?? 'No Name'} (${x.adId})`,
					state: state,
					id: x.adId,
					campaignId: x.campaignId,
					adSetId: x.adGroupId
				};
			});
			distinctAds = newDistinctAds;
			renderedAds = distinctAds;
			data = data.sort(function (a, b) {
				return b.metrics.google.averageCost - a.metrics.google.averageCost;
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
		let filtered = AdSetsList.filter((x) => selectedAdSetIds.includes(x.adGroupId));
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
						Google - Ads Dashboard
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
					Here You can find comprehensive overview of all your google ads.
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
							title="Ad Group Name"
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
		<div class="-mb-px flex flex-wrap space-x-3 pr-20 sm:pr-54 mt-5">
			<button
				type="button"
				class="relative sm:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showCampaigns
					? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
					: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
				on:click|preventDefault={() => {
					showAdSets = false;
					showAds = false;
					showCampaigns = true;
				}}
			>
				<span
					class="text-white inline-flex items-center justify-between flex-1 gap-2 px-5 py-3 font-semibold text-sm relative z-20"
				>
					<span class="inline-flex items-center justify-start gap-2">
						<Icon data={Icons.folderIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
						<span class="hidden sm:inline-flex">Campaigns</span>
					</span>

					<div class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 flex items-center">
						<Tooltip top>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
							<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
								><Icon data={Icons.infoIcon} stroke="transparent" class="w-5 shrink-0" />
								{Tabs_Intro.campaigns}</span
							>
						</Tooltip>
					</div>
				</span>
			</button>
			<button
				type="button"
				class="relative sm:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showAdSets
					? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
					: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
				on:click|preventDefault={() => {
					showAds = false;
					showCampaigns = false;
					showAdSets = true;
				}}
			>
				<span
					class="text-white inline-flex items-center justify-between flex-1 gap-2 px-5 py-3 font-semibold text-sm relative z-20"
				>
					<span class="inline-flex items-center justify-start gap-2">
						<Icon data={Icons.fourDotsIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
						<span class="hidden sm:inline-flex">Ad Groups</span>
					</span>
					<div class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 flex items-center">
						<Tooltip top>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
							<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
								><Icon
									data={Icons.infoIcon}
									stroke="transparent"
									class="w-5 shrink-0"
								/>{Tabs_Intro.adSets}</span
							>
						</Tooltip>
					</div>
				</span>
			</button>
			<button
				type="button"
				class="relative sm:flex-1 flex before:absolute before:backdrop-blur-2.5xl before:rounded-t before:inset-0 rounded-t group after:absolute after:inset-0 after:rounded-t after:shadow-metaInside {showAds
					? 'bg-color before:bg-blue-box before:opacity-40 after:opacity-0 before:shadow-none'
					: 'before:opacity-80 before:bg-dropdown after:opacity-100 shadow-dropdown'}"
				on:click|preventDefault={() => {
					showCampaigns = false;
					showAdSets = false;
					showAds = true;
				}}
			>
				<span
					class="text-white inline-flex items-center justify-between flex-1 gap-2 px-5 py-3 font-semibold text-sm relative z-20"
				>
					<span class="inline-flex items-center justify-start gap-2">
						<Icon data={Icons.progressIcon} class="w-3 h-3 text-grey-2" stroke="transparent" />
						<span class="hidden sm:inline-flex">Ads</span>
					</span>
					<div class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 flex items-center">
						<Tooltip top>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
							<span slot="tip" class="flex gap-2 leading-tight text-xs w-60 items-start"
								><Icon
									data={Icons.infoIcon}
									stroke="transparent"
									class="w-5 shrink-0"
								/>{Tabs_Intro.ads}</span
							>
						</Tooltip>
					</div>
				</span>
			</button>

			<div class="flex items-start">
				<button
					type="button"
					on:click={handleOpen}
					class="relative flex before:absolute before:backdrop-blur-2.5xl before:rounded before:inset-0 rounded group after:absolute after:inset-0 after:rounded before:bg-dropdown after:opacity-100 after:border after:border-grey"
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
					class="relative flex before:absolute before:backdrop-blur-2.5xl before:rounded before:inset-0 rounded group after:absolute after:inset-0 after:rounded before:bg-dropdown after:opacity-100 after:border after:border-grey"
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
		<div class="flex-col flex flex-1 max-h-full">
			{#if showCampaigns}
				<GridWrapper
					Source={CampaignsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source);
					}}
					id="{workspaceId}-campaigns-google-tab"
					tabName="Campaigns"
					kpis={[]}
					{tooltipFinder}
				/>
			{:else if showAdSets}
				<GridWrapper
					Source={AdSetsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source);
					}}
					id="{workspaceId}-adsets-google-tab"
					tabName="AdSets"
					kpis={[]}
					{tooltipFinder}
				/>
			{:else}
				<GridWrapper
					id="{workspaceId}-ads-google-tab"
					Source={AdsSource}
					SourceManipulator={(source) => {
						return loadRowsAndColumns(source);
					}}
					tabName="Ads"
					kpis={[]}
					{tooltipFinder}
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
