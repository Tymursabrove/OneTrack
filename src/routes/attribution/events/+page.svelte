<script lang="ts">
	import moment from 'moment';
	import { onMount, tick, onDestroy } from 'svelte';
	import { get, type Unsubscriber } from 'svelte/store';
	import {
		Workspace,
		CurrentRange,
		CSVExportQue,
		CurrentRangeChangedTracker,
		AttributionWindow,
		AttributionType
	} from '$lib/store';
	import { showLoader, hideLoader, sleep } from '$lib/helpers/MiscHelpers';
	import { showDataWasUpdated, showErrorMessage, showMessage } from '$lib/services/ToastService';
	import { getTimeZoneAdjustedTimestampSeconds } from '$lib/helpers/UserHelpers';
	import EventsDataGrid from '$lib/components/pages/events/EventsDataGrid.svelte';
	import EventsHeader from '$lib/components/pages/events/EventsHeader.svelte';
	import EventsAndLeadsToggle from '$lib/components/pages/events/EventsAndLeadsToggle.svelte';
	import AddNewFilterDropdown from '$lib/components/pages/events/AddNewFilterDropdown.svelte';
	import { openModal } from 'svelte-modals';
	import Icon from '$lib/components/common/Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import TooltipData from '$lib/resources/TooltipResources';
	import InfoModel from '$lib/components/layout/InfoModel.svelte';
	import { GetAttributionEvents } from '$lib/services/HtpCustomerJourneyRequests';
	import { processData } from './helpers';
	import type { CustomEventDataType, CustomEventTiles } from '$lib/types/Types';
	import { setItemInDB, getItemFromDB } from '$lib/local-packages/LocalStorage';
	import Button from '$lib/components/common/Button.svelte';

	const showFiltersDropdown = false;
	let EVENT_TYPE_LOCAL_STORAGE_ID = `events-persist-event-type-container`;

	let workspaceId: string;
	let arePurchaseEvents: boolean;
	let groups: null | CustomEventTiles[] = null;
	let processedEvents: null | CustomEventDataType[] = null;

	let unsubscribeWorkspace: Unsubscriber;
	let unsubscribeCurrentRangeChangedTracker: Unsubscriber;
	let unsubscribeAttributionWindow: Unsubscriber;
	let unsubscribeAttributionType: Unsubscriber;
	let spinReload = false;
	let nextPointer: string | null = null;
	let isFirstLoad = true;

	function handleInfoModel() {
		openModal(InfoModel, { heading: 'Events', mainHtml: TooltipData.events.page });
	}

	onMount(async () => {
		showLoader('Preparing your attributed events metrics...');
		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				workspaceId = ws.id;
				EVENT_TYPE_LOCAL_STORAGE_ID = `${workspaceId}-events-persist-event-type-container`;
				let savedValue = (await getItemFromDB(EVENT_TYPE_LOCAL_STORAGE_ID)) as boolean;
				arePurchaseEvents = savedValue ?? false;
				let range = get(CurrentRange);
				if (!range) {
					return;
				}
				await loadData(
					getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
					getTimeZoneAdjustedTimestampSeconds(range.end.unix())
				);
			} catch (err) {
				console.error(err);
				hideLoader();
			}
		});
		setupDateRangeTrackerSubscription();
		unsubscribeAttributionWindow = AttributionWindow.subscribe(resendLoadDataRequest);
		unsubscribeAttributionType = AttributionType.subscribe(resendLoadDataRequest);
	});

	onDestroy(() => {
		if (unsubscribeWorkspace) {
			unsubscribeWorkspace();
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
	});

	async function selectionCallback(val: boolean) {
		if (arePurchaseEvents === val) {
			return;
		}
		arePurchaseEvents = val;
		await setItemInDB(EVENT_TYPE_LOCAL_STORAGE_ID, val);
		let range = get(CurrentRange);
		if (!range) {
			return;
		}
		await tick();
		await loadData(
			getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
			getTimeZoneAdjustedTimestampSeconds(range.end.unix())
		);
	}

	async function loadData(startDate: number, endDate: number, isUpdate = false) {
		try {
			showLoader('Loading captured events...');
			await handleHttpResponse(startDate, endDate);
			if (isUpdate) {
				showDataWasUpdated('Attribution events are updated');
			}
		} catch (err) {
			console.error(err);
			hideLoader();
			if (groups == null || groups.length == 0) {
				showMessage('Error while fetching data', err as string, 'error', 4000);
			}
		} finally {
			hideLoader();
			if (groups == null || groups.length == 0) {
				showMessage('No Data to show', 'No captured events to show', 'error', 7000);
			}
			isFirstLoad = false;
		}
	}
	async function handleReloadDataClick() {
		try {
			spinReload = true;
			let range = get(CurrentRange);
			if (!range) {
				return;
			}

			await handleHttpResponse(range.start.unix(), range.end.unix(), true);

			showDataWasUpdated('Attribution events are updated');
		} catch (error) {
			showErrorMessage("Couldn't update the events");
		} finally {
			spinReload = false;
		}
	}
	async function handleHttpResponse(
		startDate: number,
		endDate: number,
		shouldFadeAfterResponse = false
	) {
		if (!shouldFadeAfterResponse) {
			groups = null;
			processedEvents = null;
			await tick();
		}

		let response = null;

		let eventType: 'purchase' | 'lead' = 'purchase';
		if (!arePurchaseEvents) {
			eventType = 'lead';
		}

		response = await GetAttributionEvents(
			workspaceId,
			moment.unix(startDate),
			moment.unix(endDate),
			nextPointer,
			eventType
		);
		let data = processData(response.events);
		if (shouldFadeAfterResponse) {
			groups = null;
			processedEvents = null;
			await tick();
		}
		processedEvents = data.processedData;
		groups = data.cardsSummary;
	}

	function handleCSVDownload() {
		CSVExportQue.set({
			allEventsExportSelected: true
		});
	}
	async function resendLoadDataRequest() {
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
	function setupDateRangeTrackerSubscription() {
		CurrentRangeChangedTracker.set(null);
		unsubscribeCurrentRangeChangedTracker = CurrentRangeChangedTracker.subscribe(async (range) => {
			if (!range) {
				return;
			}
			await loadData(range.start, range.end, true);
		});
	}
</script>

<div class="px-0.5 space-y-4 flex flex-col flex-1 min-h-110">
	<div class="space-y-4">
		<div class="flex flex-wrap md:flex-nowrap justify-between gap-3 w-full">
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
					<span>Events</span>

					<Icon name="info" on:click={handleInfoModel} size="small" interactive={true}/>
				</h2>
				<p class="text-xs leading-none">
					Get a comprehensive look at {arePurchaseEvents ? 'orders' : 'leads'} captured and processed
					with OneTrack Analytics engine.
				</p>
			</div>

			<div class="flex items-center w-full xs:w-auto">
				<div class="flex items-stretch flex-wrap gap-2 justify-start xs:justify-end">
					{#if showFiltersDropdown}
						<AddNewFilterDropdown />
					{/if}

					<EventsAndLeadsToggle
						{arePurchaseEvents}
						on:selectionChange={(e) => {
							selectionCallback(e.detail.isPurchaseSelected);
						}}
					/>
					<div class="flex items-stretch gap-2">
						<Button
							leftIcon="reloadIcon"
							on:click={handleReloadDataClick}
							size="small"
							action="secondary"
						/>
						<Button
							leftIcon="download"
							on:click={handleCSVDownload}
							size="small"
							action="secondary"
						/>
					</div>
				</div>
			</div>
		</div>

		{#if arePurchaseEvents}
			<EventsHeader
				groups={groups?.sort((a, b) => b.data.totalValue - a.data.totalValue)}
				{arePurchaseEvents}
			/>
		{:else}
			<EventsHeader
				groups={groups?.sort((a, b) => b.data.totalEvents - a.data.totalEvents)}
				{arePurchaseEvents}
			/>
		{/if}
	</div>

	<div class="flex flex-col flex-1 max-h-full">
		<div
			class="w-full flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 max-w-full"
		>
			<div class="rounded-3xl overflow-hidden w-full">
				<div
					class="overflow-auto w-full flex-1 rounded-3xl scrollbar scroll-card-event md:min-h-full relative z-10"
				>
					{#if processedEvents}
						<EventsDataGrid {arePurchaseEvents} data={processedEvents} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
