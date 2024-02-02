<script lang="ts">
	import moment from 'moment';
	import Icon from '$lib/components/common/Icon.svelte';
	import Tab from '$lib/components/pages/analysis/customer-details/TabDetail.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { CurrentRange, Workspace } from '$lib/store';
	import { openModal } from 'svelte-modals';
	import { get, type Unsubscriber } from 'svelte/store';
	import { showLoader, hideLoader } from '$lib/helpers/MiscHelpers';
	import MarkAsFraudModal from '$lib/components/pages/analysis/customer-details/MarkAsFraudModal.svelte';
	import RadioButtonDropdown from '$lib/components/library/dropdowns/RadioButtonDropdown.svelte';
	import TimelineView from '$lib/components/pages/analysis/customer-details/TimelineView.svelte';
	import { fly } from 'svelte/transition';
	import PersonalInfoCard from '$lib/components/pages/analysis/customer-details/PersonalInfoCard.svelte';
	import ProfileDevicesList from '$lib/components/pages/analysis/customer-details/ProfileDevicesList.svelte';
	import { getTimeZoneAdjustedTimestampSeconds } from '$lib/helpers/UserHelpers.js';
	import {
		GetCustomersProfileEvents,
		GetCustomersProfilesList
	} from '$lib/services/HtpCustomerJourneyRequests.js';
	import type {
		CustomerProfileDetails,
		CustomerProfileEvent
	} from '$lib/types/HttpResponsesTypes.js';
	import ProfileEventsTab from '$lib/components/pages/analysis/customer-details/ProfileEventsTab.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { showMessage } from '$lib/services/ToastService.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		getItemFromDB,
		get as getLocalStorage,
		setItemInDB
	} from '$lib/local-packages/LocalStorage.js';
	import {
		CUSTOMERS_PROFILES_LIST_KEY,
		CUSTOMER_PROFILES_EVENT_TYPE_LOCAL_STORAGE_KEY
	} from '$lib/common/Constants.js';

	export let data;

	const tabItems = ['Events', 'Conversions'];

	//TODO: Handle these when API is available
	const showSocials = false;
	const showTimeline = false;

	let { profile_id } = data;
	let markAsFraud = false;
	let activeTab = 'Events';
	let userEvents: CustomerProfileEvent[] = [];
	let workspaceId: null | string = null;
	let unsubscribeWorkspace: Unsubscriber;
	let profileDetails: CustomerProfileDetails | null = null;
	let eventSortingState: 'dateUp' | 'dateDown' = 'dateUp';
	onMount(async () => {
		showLoader('Fetching profile details');

		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				if (!profile_id) {
					return;
				}
				workspaceId = ws.id;
				let range = get(CurrentRange);
				if (!range) {
					return;
				}
				workspaceId = ws.id;
				await loadEvents(
					getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
					getTimeZoneAdjustedTimestampSeconds(range.end.unix()),
					profile_id
				);
				hideLoader();
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
	});
	async function loadEvents(startDate: number, endDate: number, profileId: string) {
		if (!workspaceId) {
			return;
		}
		userEvents = await GetCustomersProfileEvents(
			workspaceId,
			profileId,
			moment.unix(startDate),
			moment.unix(endDate)
		);
	}
	function markAsFraudOpen() {
		showMessage('This service will be available soon', '', 'info');
		markAsFraud = !markAsFraud;
		return;
		openModal(MarkAsFraudModal, {});
	}
	function triggerTabChange(event: { detail: string }) {
		activeTab = event.detail;
	}
	function handleProfileDataLoad(e: { detail: CustomerProfileDetails }) {
		profileDetails = e.detail;
	}
	async function userNavigation(direction: 'previous' | 'next') {
		let idToNavigate = profile_id;
		let customerIds: string[] = [];
		let storageKey = `${CUSTOMERS_PROFILES_LIST_KEY}-${workspaceId}`;
		let storedIds = await getItemFromDB(storageKey);
		if (!storedIds || !Array.isArray(storedIds) || storedIds.length == 0) {
			if (!workspaceId) {
				return;
			}
			let range = get(CurrentRange);
			if (!range) {
				return;
			}
			let response = await GetCustomersProfilesList(
				workspaceId,
				range.start,
				range.end,
				null,
				getLocalStorage(CUSTOMER_PROFILES_EVENT_TYPE_LOCAL_STORAGE_KEY) ??
					('lead' as 'lead' | 'purchase')
			);
			customerIds = response.profiles.map((x) => x.onetrackId);
			await setItemInDB(storageKey, customerIds);
		} else {
			customerIds = storedIds as string[];
		}
		let currentIndex = customerIds?.findIndex((x) => x == idToNavigate);
		if (direction == 'next') {
			if (currentIndex == customerIds.length - 1) {
				return;
			}
			idToNavigate = customerIds[currentIndex + 1];
		} else {
			if (currentIndex == 0) {
				return;
			}
			idToNavigate = customerIds[currentIndex - 1];
		}
		await gotoDetailsPage(idToNavigate);
	}
	async function gotoDetailsPage(id: string) {
		try {
			let range = get(CurrentRange);
			if (!range) {
				return;
			}
			showLoader('Fetching profile details');
			goto(`/analysis/customer-details?id=${id}`);
			profile_id = id;
			await loadEvents(
				getTimeZoneAdjustedTimestampSeconds(range.start.unix()),
				getTimeZoneAdjustedTimestampSeconds(range.end.unix()),
				profile_id
			);
			hideLoader();
		} catch (err) {
			hideLoader();
		}
	}
</script>

<main class="px-0.5 space-y-4 flex flex-col flex-1">
	<div class="space-y-6">
		<p class="text-sm font-semibold leading-none">
			<a
				href="/analysis/customer-profiles"
				class="text-blue leading-none hover:text-blue-200 ease-in-out duration-300"
				>Back to Customer Overview</a
			>
		</p>
	</div>

	<div class="flex flex-col">
		<div class="flex flex-col md:flex-row justify-between items-center gap-y-2 gap-x-5">
			<div class="flex order-2 md:order-1">
				<Button
					role="button"
					action="secondary"
					title="previous"
					leftIcon="angleLeft"
					on:click={async () => {
						await userNavigation('previous');
					}}
				/>

				<div
					class="border border-grey-4 border-b-0 rounded-t-xl bg-bglinear-4 relative backdrop-blur-md -mx-3 p-2 pl-4 flex flex-wrap md:flex-nowrap gap-2 justify-between xs:w-80 xl:w-96"
				>
					<div class="flex gap-3 items-center">
						<div
							class="w-10 h-10 overflow-hidden rounded-full flex justify-center items-center text-white relative"
						>
							<!-- {#if (photo)} -->
							<!-- <img
										src="/images/profile-photo.png"
										class="object-cover aspect-square "
										alt="face user"
									/> -->
							<!-- {:else} -->
							<Icon name="avtar-woman" size="big" />
							<!-- {/if} -->
						</div>
						<div class="space-y-0.5">
							<div class="flex items-center gap-2">
								<h2
									class="text-white text-sm leading-tight font-medium capitalize max-w-[9rem] truncate"
									title={`${profileDetails?.firstName ?? ''} ${profileDetails?.lastName ?? ''}`}
								>
									{profileDetails?.firstName ?? ''}
									{profileDetails?.lastName ?? ''}
									{!profileDetails?.firstName && !profileDetails?.lastName
										? profileDetails?.email
										: ''}
								</h2>
								<div class="relative">
									<button
										class="flex items-center justify-center shrink-0 p-0.5 text-white ease-in-out duration-300 hover:bg-white/10 rounded-full w-5 h-5"
										on:click={() => {
											markAsFraud = !markAsFraud;
										}}
									>
										<Icon name="setting-solid" size="small" />
									</button>
									{#if markAsFraud}
										<div class="absolute right-0 p-1.5 bottom-full mt-1" transition:fly>
											<button
												class="cursor-pointer flex items-center justify-start rounded-md ease-in-out duration-300 text-white outline-none leading-none text-sm py-2.5 px-3 border border-grey-4 bg-bglinear-4 backdrop-blur-md bg-color shadow-sidebar"
												on:click={markAsFraudOpen}
											>
												<span class="relative z-10 whitespace-nowrap">Mark as fraud</span>
											</button>
										</div>
									{/if}
								</div>
							</div>
							<p class="text-xs text-grey w-40 truncate" title={profileDetails?.email}>
								{profileDetails?.email ?? 'N/A'}
							</p>
						</div>
					</div>

					{#if showSocials}
						<div class="flex justify-end gap-0.5 items-center">
							<a
								href="/#"
								class="ease-in-out duration-300 hover:bg-blue w-6 h-6 rounded inline-flex justify-center items-center"
							>
								<Icon name="linkedin-logo" size="small" /></a
							>
							<a
								href="/#"
								class="ease-in-out duration-300 hover:bg-blue-700 w-6 h-6 rounded inline-flex justify-center items-center"
							>
								<Icon name="meta-black" size="small" /></a
							>
							<a
								href="/#"
								class="ease-in-out duration-300 hover:bg-ig w-6 h-6 rounded inline-flex justify-center items-center"
								><Icon size="small" name="meta" /></a
							>
						</div>
					{/if}
				</div>

				<Button
					role="button"
					action="secondary"
					title="next"
					leftIcon="angleRight"
					on:click={async () => {
						await userNavigation('next');
					}}
				/>
			</div>

			<div class="flex flex-wrap justify-between gap-1.5 xs:gap-3 order-1 md:order-2">
				<Tab {tabItems} activeItem={activeTab} on:tabChange={triggerTabChange} />
				<div class="max-w-full xl:w-40">
					<RadioButtonDropdown
						id="event-type-setting-toggle-selection-dropdown"
						title="Sort By"
						list={[
							{
								id: 'dateUp',
								state: true,
								name: 'Descending'
							},
							{
								id: 'dateDown',
								state: false,
								name: 'Ascending'
							}
						]}
						on:selectionChange={(e) => {
							eventSortingState = e.detail.changedItem.id;
						}}
					/>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col relative flex-1 border border-grey-4 bg-bglinear-4 rounded-b-xl md:rounded-tr-xl"
		>
			{#if showTimeline}
				<TimelineView fetchedEvents={userEvents} />
			{/if}
			<div
				class="md:grid md:grid-cols-12 relative z-10 flex-1 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue {showTimeline
					? ''
					: 'pt-5'}"
			>
				<div class="p-5 pt-0 space-y-2 md:col-span-7 xl:col-span-6">
					<div
						class="overflow-auto on-hover-scroll -mx-3 p-3 pt-0 2xl:-mx-5 2xl:p-5 2xl:pt-0 2xl:pr-4 {showTimeline
							? 'md:max-h-[calc(100vh-23.5rem)]'
							: 'md:max-h-[calc(100vh-15.5rem)]'}"
					>
						<ProfileEventsTab {activeTab} events={userEvents} sortState={eventSortingState} />
					</div>
				</div>

				<div class="p-5 md:col-span-5 xl:col-span-6 flex flex-col">
					<ProfileDevicesList events={userEvents} />
					<div
						class="overflow-auto on-hover-scroll flex flex-col flex-1 px-5 -mx-5 py-2 {showTimeline
							? 'md:max-h-[calc(100vh-36rem)]'
							: 'md:max-h-[calc(100vh-28rem)]'}"
					>
						<PersonalInfoCard {profile_id} on:data_load={handleProfileDataLoad} />
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
