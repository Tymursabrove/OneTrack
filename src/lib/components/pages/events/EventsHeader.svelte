<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from '$lib/components/charts/DonutChart.svelte';
	import EventsHeaderCard from './EventsHeaderCard.svelte';
	import { CurrentEventsFilter } from '$lib/store';
	import type { CustomEventTiles, CustomEventTilesDataType } from '$lib/types/Types';

	export let groups: null | CustomEventTiles[] = [];
	export let arePurchaseEvents: boolean;
	let chartLabels = [' '];
	let chartValues = [0];

	let previousFilter = '';

	$: {
		createChartLabels(groups);
	}
	onMount(() => {
		createChartLabels(groups);
	});

	function handleCardFilter(e: { detail: { filter: string } }) {
		let filter = e.detail.filter;
		if (previousFilter === filter) {
			CurrentEventsFilter.set(null);
			previousFilter = '';
			return;
		}
		CurrentEventsFilter.set(filter);
		previousFilter = filter;
	}
	function createChartLabels(data: null | { name: string; data: CustomEventTilesDataType }[]) {
		if (!data) {
			return;
		}
		chartLabels = [...data.map((x) => x.name)];
		if (arePurchaseEvents) {
			chartValues = [...data.map((x) => Number(x.data.totalValue.toFixed(0)))];
		} else {
			chartValues = [...data.map((x) => x.data.totalEvents)];
		}
	}
</script>

{#if groups && groups.length > 0}
	<div class="flex flex-col md:flex-row gap-5 py-2">
		<div
			class="md:w-80 xl:max-w-sm xl:w-full bg-transparent relative p-5 rounded-xl border border-grey-4 before:shadow-sidebar before:backdrop-blur-md before:rounded-xl before:absolute before:inset-0 before:bg-bglinear-5 space-y-2 flex flex-col"
		>



		<!-- flex justify-between border-b border-grey-4 relative before:shadow-sidebar before:backdrop-blur-md before:absolute before:inset-0 before:bg-bglinear-5 -->


			<div class="relative z-10">
				<h2 class="font-semibold leading-none">Distribution</h2>
				<div class="w-full flex-1 flex items-center justify-start overflow-hidden">
					<div class="-translate-x-1/4">
						<Chart id="events-donut-chart" series={chartValues} labels={chartLabels} />
					</div>
				</div>
			</div>
		</div>
		<div
			class="w-full bg-transparent pr-2 py-1 relative rounded-xl border border-grey-4 before:shadow-sidebar before:backdrop-blur-md before:rounded-xl before:absolute before:inset-0 before:bg-bglinear-5 gap-4 grid grid-cols-12 max-w-full"
		>
			<div class="overflow-x-auto max-w-full on-hover-scroll flex-1 col-span-12 relative pr-2">
				<div class="flex gap-3 p-4 pr-0">
					{#each groups as group}
						<EventsHeaderCard
							data={group}
							id={group.name}
							on:filter={handleCardFilter}
							{arePurchaseEvents}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
