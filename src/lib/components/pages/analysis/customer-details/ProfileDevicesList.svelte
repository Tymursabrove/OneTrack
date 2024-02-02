<script lang="ts">
	import DeviceCard from '$lib/components/pages/analysis/customer-details/DeviceCard.svelte';
	import type {
		CustomerProfileEvent,
		ProfileEventScreenResolutionData,
		ProfileEventUserAgentData,
		ProfileEventViewPortData
	} from '$lib/types/HttpResponsesTypes';
	import { ParseUserAgent } from '$lib/services/HttpRequests.js';
	import Loading from '$lib/components/layout/Loading.svelte';
	import { filterUniqueUserAgentEvents } from '../helpers';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';

	interface filteredEventType {
		icon: SpriteIconName;
		device: string;
		system: string;
		browser: string;
		screen: string;
		window: string;
		gpu: string;
		osVersion: string;
		browserVersion: string;
	}

	export let events: CustomerProfileEvent[] = [];

	let filteredEvents: filteredEventType[] = [];
	let showLoading = false;
	
	async function filterEvents(customerEvents: CustomerProfileEvent[]) {
		try {
			showLoading = true;
			filteredEvents = [];

			let screenResolutionEvents = customerEvents.filter((x) => x.event == 'screenResolution');
			let viewPortEvents = customerEvents.filter((x) => x.event == 'viewPort');

			customerEvents = customerEvents.filter((x) => x.event == 'userAgent');
			customerEvents = filterUniqueUserAgentEvents(customerEvents);

			for (let x of customerEvents) {
				let upperBoundTimestamp = x.timestampInSeconds + 60;
				let lowerBoundTimestamp = x.timestampInSeconds - 60;

				let screenResolutionEvent = screenResolutionEvents.find(
					(x) =>
						x.timestampInSeconds >= lowerBoundTimestamp &&
						x.timestampInSeconds <= upperBoundTimestamp
				);
				let viewPortEvent = viewPortEvents.find(
					(x) =>
						x.timestampInSeconds >= lowerBoundTimestamp &&
						x.timestampInSeconds <= upperBoundTimestamp
				);

				let data = x.data as ProfileEventUserAgentData;
				let parsedObject = await ParseUserAgent(data.raw ?? '');
				let obj:filteredEventType = {
					icon: data.mobile ? "mobile" : "desktop",
					device: data.device ?? (data.mobile ? 'Mobile' : 'Desktop'),
					system: data.os ?? '-',
					browser: parsedObject.data.browser.name ?? '-',
					screen: '-',
					window: '-',
					gpu: parsedObject.data.cpu.architecture ?? '-',
					osVersion: parsedObject.data.os.version ?? '-',
					browserVersion: parsedObject.data.engine.version ?? '-'
				};

				if (screenResolutionEvent) {
					let screenData = screenResolutionEvent.data as ProfileEventScreenResolutionData;
					obj.screen = `${screenData.resolution?.width ?? ''} x ${
						screenData.resolution?.height ?? ''
					}`;
				}
				if (viewPortEvent) {
					let viewPortData = viewPortEvent.data as ProfileEventViewPortData;
					obj.window = `${viewPortData.resolution?.width ?? ''} x ${
						viewPortData.resolution?.height ?? ''
					}`;
				}

				filteredEvents.push(obj);
			}
			filteredEvents = filteredEvents;
			showLoading = false;
		} catch (err) {
			console.error(err);
			showLoading = false;
		}
	}
	$: {
		filterEvents(events);
	}
</script>

{#if showLoading}
	<div class="flex justify-center">
		<Loading />
	</div>
{:else if filterEvents.length > 0}
	<div class="2xl:pr-5 -mt-5">
		<div class="overflow-x-auto on-hover-scroll 2xl:px-5 py-3 2xl:-mx-5">
			<div class="flex gap-3">
				{#each filteredEvents as item}
					<DeviceCard
						icon={item.icon}
						device={item.device}
						system={item.system}
						browser={item.browser}
						screen={item.screen}
						window={item.window}
						osVersion={item.osVersion}
						browserVersion={item.browserVersion}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}
