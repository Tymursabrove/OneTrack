<script lang="ts">
	import EventCardImageClick from '$lib/components/pages/analysis/customer-details/events/EventCardImageClick.svelte';
	import CustomerJourneyEvent from './events/CustomerJourneyEvent.svelte';
	import type {
		CustomerProfileEvent,
		ProfileEventIPAddressData,
		ProfileEventScreenResolutionData,
		ProfileEventUserAgentData,
		ProfileEventViewPortData
	} from '$lib/types/HttpResponsesTypes';

	const BLOCKED_EVENTS = ['attribution'];

	export let activeTab = 'Events';
	export let sortState: 'dateUp' | 'dateDown' = 'dateUp';
	export let events: CustomerProfileEvent[] = [];

	let filteredEvents: CustomerProfileEvent[] = [];

	$: {
		filterEvents(events, activeTab, sortState);
	}

	function filterEvents(
		customerEvents: CustomerProfileEvent[] = [],
		tab: string,
		sorting: 'dateUp' | 'dateDown'
	) {
		if (tab == 'Events') {
			filterUniqueEvent(customerEvents, sorting);
		} else {
			filterUniqueEvent(
				customerEvents.filter((x) => x.event == 'lead' || x.event == 'purchase'),
				sorting
			);
		}
	}

	function filterUniqueEvent(
		customerEvents: CustomerProfileEvent[],
		sorting: 'dateUp' | 'dateDown'
	) {
		let placeholder: CustomerProfileEvent[] = [];
		for (let event of customerEvents) {
			if (event.event == 'userAgent') {
				let data = event.data as ProfileEventUserAgentData;
				let found = placeholder.find((x) => x.event == 'userAgent');
				if (found) {
					let foundData = found.data as ProfileEventUserAgentData;
					if (data.device == foundData.device) {
						continue;
					}
				}
			} else if (event.event == 'screenResolution') {
				let data = event.data as ProfileEventScreenResolutionData;
				let found = placeholder.find((x) => x.event == 'screenResolution');
				if (found) {
					let foundData = found.data as ProfileEventScreenResolutionData;
					if (
						data.resolution?.height == foundData.resolution?.height &&
						data.resolution?.width == foundData.resolution?.width
					) {
						continue;
					}
				}
			} else if (event.event == 'viewPort') {
				let data = event.data as ProfileEventViewPortData;
				let found = placeholder.find((x) => x.event == 'viewPort');
				if (found) {
					let foundData = found.data as ProfileEventViewPortData;
					if (
						data.resolution?.height == foundData.resolution?.height &&
						data.resolution?.width == foundData.resolution?.width
					) {
						continue;
					}
				}
			} else if (event.event == 'ipAddress') {
				let data = event.data as ProfileEventIPAddressData;
				let found = placeholder.find((x) => x.event == 'ipAddress');
				if (found) {
					let foundData = found.data as ProfileEventIPAddressData;
					if (data.ipv4 == foundData.ipv4) {
						continue;
					}
				}
			}
			placeholder.push(event);
		}
		if (sorting == 'dateUp') {
			filteredEvents = placeholder.sort(function (a, b) {
				return b.timestampInSeconds - a.timestampInSeconds;
			});
		} else {
			filteredEvents = placeholder.sort(function (a, b) {
				return a.timestampInSeconds - b.timestampInSeconds;
			});
		}
	}
</script>

<div class="relative space-y-3">
	{#if filteredEvents.length > 0}
		{#each filteredEvents as event (event.id)}
			{#if !BLOCKED_EVENTS.includes(event.event)}
				{#if event.event == 'imageClick'}
					<EventCardImageClick {event} />
				{:else}
					<CustomerJourneyEvent {event} />
				{/if}
			{/if}
		{/each}
	{:else if activeTab == 'Events'}
		<div>No event found.</div>
	{:else}
		<div>No conversions found.</div>
	{/if}
</div>
