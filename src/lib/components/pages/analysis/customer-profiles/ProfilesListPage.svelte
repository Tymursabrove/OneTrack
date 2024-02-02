<script lang="ts">
	import { Icons } from '$lib/resources/IconResources';
	import Icon from '$lib/components/common/Icon.svelte';
	import { showErrorMessage, showMessage } from '$lib/services/ToastService';
	import { getTimeZoneAdjustedTimestampSeconds } from '$lib/helpers/UserHelpers';
	import moment from 'moment';
	import { CurrentRange, CurrentRangeChangedTracker, Workspace } from '$lib/store';
	import { get, type Unsubscriber } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { hideLoader, showLoader } from '$lib/helpers/MiscHelpers';
	import {
		GetAllCustomersProfilesList,
		GetCustomersProfilesList
	} from '$lib/services/HtpCustomerJourneyRequests';
	import Loading from '$lib/components/layout/Loading.svelte';
	import { handleUpdatedCSVQue } from '$lib/helpers/CSVHelpers';
	import SimpleProfileCard from '$lib/components/pages/analysis/customer-profiles/SimpleProfileCard.svelte';
	import type { ExtendedCustomerProfileSummary } from '../helpers';
	import { setItemInDB } from '$lib/local-packages/LocalStorage';
	import { CUSTOMERS_PROFILES_LIST_KEY } from '$lib/common/Constants.js';
	import Button from '$lib/components/common/Button.svelte';

	export let EventType: 'lead' | 'purchase' = 'lead';
	export async function reloadSendLocalDataRequest(eventType: 'lead' | 'purchase' = EventType) {
		if (!currentRange) {
			return;
		}
		await sendLoadDataRequest(eventType, currentRange.start.unix(), currentRange.end.unix());
	}
	export async function downloadEventsAsCSV() {
		try {
			if (!workspaceId) {
				throw 'workspaceId not initialized';
			}
			if (!currentRange) {
				throw 'currentRange not initialized';
			}
			showMessage('Downloading customer profiles...', '', 'info');
			let profiles = await GetAllCustomersProfilesList(
				workspaceId,
				currentRange.start,
				currentRange.end,
				EventType
			);
			handleUpdatedCSVQue(
				profiles.map((x) => {
					return {
						email: x.email ?? '',
						ipAddress: x.ipAddress
					};
				}),
				`customer_profiles`
			);
		} catch (err) {
			showErrorMessage("Couldn't download customer profiles");
		}
	}

	//TODO: Find a way later to enable these using API requests
	const showSearch = false;
	const endAreaId = 'loading-spinner';
	const intersectionObserver: IntersectionObserver = new IntersectionObserver(handleIntersection);

	let workspaceId: null | string = null;
	let nextPointer: null | string = null;
	let searchQuery = '';
	let customerProfiles: ExtendedCustomerProfileSummary[] = [];
	let currentRange: { start: moment.Moment; end: moment.Moment } | null = null;
	let unsubscribeWorkspace: Unsubscriber;
	let unsubscribeCurrentRangeChangedTracker: Unsubscriber;

	onMount(async () => {
		showLoader('Fetching customer profiles ...');
		addIntersectionObserver();
		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				currentRange = get(CurrentRange);
				if (!currentRange) {
					return;
				}
				CurrentRangeChangedTracker.set(null);
				workspaceId = ws.id;
				await sendLoadDataRequest(EventType, currentRange.start.unix(), currentRange.end.unix());
				unsubscribeCurrentRangeChangedTracker = CurrentRangeChangedTracker.subscribe(
					async (range) => {
						if (!range) {
							return;
						}
						await sendLoadDataRequest(EventType, range.start, range.end);
						currentRange = { start: moment.unix(range.start), end: moment.unix(range.end) };
					}
				);
			} catch (err) {
				console.error(err);
				hideLoader();
			}
		});
	});

	onDestroy(() => {
		if (unsubscribeWorkspace) {
			unsubscribeWorkspace();
		}
		if (unsubscribeCurrentRangeChangedTracker) {
			unsubscribeCurrentRangeChangedTracker();
		}
		removeIntersectionObserver();
	});

	async function sendLoadDataRequest(
		eventType: 'lead' | 'purchase',
		startDate: number,
		endDate: number
	) {
		nextPointer = null;
		showLoader('Fetching customer profiles ...');
		customerProfiles = [];
		await loadData(
			getTimeZoneAdjustedTimestampSeconds(startDate),
			getTimeZoneAdjustedTimestampSeconds(endDate),
			eventType
		);
		hideLoader();
	}

	function addIntersectionObserver() {
		const intersectionTarget = document.querySelector(`#${endAreaId}`);
		if (intersectionTarget) {
			intersectionObserver.observe(intersectionTarget);
		}
	}
	function removeIntersectionObserver() {
		const intersectionTarget = document.querySelector(`#${endAreaId}`);
		if (intersectionTarget) {
			intersectionObserver.unobserve(intersectionTarget);
		}
	}
	function handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.forEach(async (entry) => {
			if (entry.isIntersecting) {
				let range = get(CurrentRange);
				if (!range) {
					return;
				}
				await loadData(
					getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
					getTimeZoneAdjustedTimestampSeconds(range.end.unix()),
					EventType
				);
			}
		});
	}
	async function loadData(startDate: number, endDate: number, eventType: 'lead' | 'purchase') {
		if (!workspaceId) {
			return;
		}
		let response = await GetCustomersProfilesList(
			workspaceId,
			moment.unix(startDate),
			moment.unix(endDate),
			nextPointer,
			eventType
		);
		let newProfiles = response.profiles.map((x) => {
			return {
				...x,
				isFraud: false,
				isBot: false,
				markAsFraud: false
			};
		});
		customerProfiles = [...customerProfiles, ...newProfiles];
		nextPointer = response.nextPointer;
		await setItemInDB(
			`${CUSTOMERS_PROFILES_LIST_KEY}-${workspaceId}`,
			customerProfiles.map((x) => x.onetrackId)
		);
	}

	async function searchHandler() {
		if (searchQuery) {
			customerProfiles = customerProfiles
				.filter(
					(x) =>
						x.email?.includes(searchQuery) ||
						x.ipAddress.includes(searchQuery) ||
						x.onetrackId.includes(searchQuery)
				)
				.map((x) => {
					return {
						...x,
						isFraud: false,
						isBot: false,
						markAsFraud: false
					};
				});
		}
	}

	$: {
		reloadSendLocalDataRequest(EventType);
	}
</script>

{#if showSearch}
	<div class="relative w-full sm:w-auto max-w-md ml-auto py-5">
		<form class="flex items-stretch gap-3">
			<div class="relative w-full sm:max-w-md flex items-center">
				<label for="search" class="sr-only">Search</label>
				<div
					class="pointer-events-none absolute inset-y-0 left-0 w-10 hidden xs:flex items-center justify-center z-10"
				>
					<Icon name="search" stroke="transparent" class="w-4 h-4  text-white" />
				</div>

				<div
					class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 w-full"
				>
					<input
						class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 xs:pl-10 outline-none leading-none peer invalid:border-red invalid:text-red h-11 xs:w-80"
						bind:value={searchQuery}
						type="search"
						id="search"
						placeholder="Search"
						name="search"
					/>
				</div>
			</div>

			<div class="w-full sm:max-w-sm hidden items-stretch">
				<input
					type="search"
					bind:value={searchQuery}
					name="search"
					id="search"
					class="border border-grey flex-1 ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md shadow-sm focus:border-blue focus:ring-blue text-sm outline-none leading-none peer invalid:border-red invalid:text-red"
					placeholder="Search"
				/>
			</div>
			<Button leftIcon="search" text="Search" class="px-7" on:click={searchHandler} />
		</form>
	</div>
{/if}
<div class="flex-1" class:pt-10={!showSearch}>
	<div class="flex flex-col md:grid md:grid-cols-2 gap-5">
		{#each customerProfiles as profile}
			<SimpleProfileCard {profile} />
		{/each}
	</div>
</div>
<div id="loading-spinner" class="flex justify-center" class:hidden={nextPointer == null}>
	<Loading />
</div>
