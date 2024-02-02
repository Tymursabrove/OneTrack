<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons, getIconByName } from '$lib/resources/IconResources';
	import CartDropdown from '$lib/components/pages/analysis/customer-details/CartDropdown.svelte';
	import Button from '$lib/components/library/Button.svelte';
	import { clickIdMapping, isAdSource } from '../../../../../routes/attribution/events/helpers';
	import type {
		CustomerProfileEvent,
		eventDataAttributionEventData
	} from '$lib/types/HttpResponsesTypes';

	interface cardType {
		platform?: string;
		platformIcon?: string;
		bg?: string;
		showDropdown: boolean;
		cart: boolean;
		bgcolor: string;
		width: string;
		time?: string;
	}
	export let fetchedEvents: CustomerProfileEvent[] = [];

	let traffic: cardType[] = [];
	function getSourceName(attributionInfo: eventDataAttributionEventData) {
		const isAd = isAdSource(attributionInfo);
		let category = isAd ? 'ad' : 'organic';
		if (category === 'ad') {
			if (attributionInfo.utmSource) {
				return attributionInfo.utmSource.toLowerCase().trim();
			} else if (attributionInfo.clickId) {
				let key = attributionInfo.clickId.toLowerCase().trim() as keyof typeof clickIdMapping;
				return clickIdMapping[key] || '';
			}
		} else if (category === 'organic' && attributionInfo.source) {
			return attributionInfo.source.toLowerCase().trim();
		}
		return 'direct';
	}
	function filterEvents(events: CustomerProfileEvent[]) {
		const bg = 'border border-grey-4  md:border-0 md:bg-none';
		let attributionEvents = events.filter((x) => x.event == 'attribution');
		if (attributionEvents.length == 0) {
			return;
		}
		attributionEvents.forEach((event) => {
			let data = event.data as eventDataAttributionEventData;
			console.log(event.timestampInSeconds);
			let source = getSourceName(data);
			traffic.push({
				platform: source,
				platformIcon: getIconByName(source),
				bgcolor: bg + 'bg-radial-blue',
				bg: Icons.tringleBlue,
				showDropdown: false,
				cart: false,
				width: '30%'
			});
		});
		traffic = traffic;
	}
	$: {
		filterEvents(fetchedEvents);
	}
</script>

{#if traffic.length > 0}
	<div class="p-5">
		<div
			class="p-3 xs:p-5 pt-14 xs:pt-14 border border-grey-4 rounded-xl bg-bglinear-4 shadow-sidebar"
		>
			<div class="md:shadow-sidebar flex flex-row flex-wrap">
				<!-- <div
					class="flex-1 flex justify-center items-center bg-linear-blue text-sm border border-grey-4 rounded-r-md md:-ml-5 w-1/4 md:w-auto"
				>
					Direct
				</div> -->
				{#each traffic as item}
					<div
						class="relative w-1/4 md:w-auto p-2 xs:px-4 md:p-0 text-center flex justify-center {item.bgcolor}"
					>
						{#if item.cart}
							<div class="absolute -top-12 -right-2">
								{#if item.showDropdown}
									<CartDropdown />
								{/if}
								<Button
									onClickFunc={() => {
										item.showDropdown = !item.showDropdown;
									}}
									type="button"
									theme="before:bg-linear-green after:bg-linear-green-2 justify-center !px-4"
									iconLeft={Icons.cartCheck}
									iconLeftClass="h-5"
								/>
							</div>
						{/if}
						<Icon data={item.bg} stroke="transparent" class="h-8 hidden md:block" />
						<div class="xs:hidden flex items-center justify-center flex-wrap gap-1">
							<Icon data={item.platformIcon} stroke="transparent" class="h-4" />
							{#if item.time}<span
									class="shadow-timeline-badge bg-white/50 rounded-full py-0.5 px-1 text-color font-medium leading-none text-[10px]"
									>{item.time}</span
								>{/if}
						</div>
						<span
							class="md:absolute text-sm inset-0 hidden xs:flex flex-wrap gap-1 justify-center items-center"
							style="width:{item.width};"
							><span style="text-transform: capitalize;">{item.platform}</span>
							{#if item.time}<span
									class="shadow-timeline-badge bg-white/50 rounded-full py-0.5 px-2 text-color font-medium leading-none text-xs"
									>{item.time}</span
								>{/if}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
