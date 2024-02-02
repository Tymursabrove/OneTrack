<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons, getIconByName } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import { showMessage } from '$lib/services/ToastService';
	import { CurrentEventsFilter } from '$lib/store';
	import { createEventDispatcher } from 'svelte';
	import type { CustomEventTiles } from '$lib/types/Types';
	import { currencyCustomSymbolFormatter } from '$lib/helpers/MiscHelpers';

	const dispatch = createEventDispatcher();
	const AVAILABLE_ATTRIBUTION_PAGES = ['meta'];

	export let data: CustomEventTiles;
	export let id: string;
	export let arePurchaseEvents: boolean;

	function gotoAttributionPage(pageName: string) {
		if (AVAILABLE_ATTRIBUTION_PAGES.some((x) => x == pageName)) {
			goto(`/attribution/${pageName}`);
			return;
		}
		showMessage(
			`"${pageName[0].toUpperCase()}${pageName.slice(
				1,
				pageName.length
			)}" attribution details page is being developed. It will be available soon.`,
			'',
			'info'
		);
	}
	function handleSingleClick(filter: string) {
		dispatch('filter', {
			filter
		});
	}
	function getChartSeries() {
		let graph =
			data.graphDaily && data.graphDaily?.length > 2
				? data.graphDaily?.map((x) => {
						return [x.time, x.value];
				  })
				: data.graphHourly?.map((x) => {
						return [x.time, x.value];
				  });
		if (!graph) {
			graph = [[0, 0]];
		}
		if (graph.length == 1) {
			graph = [[0, 0], ...graph];
		}
		return [
			{
				name: data.name,
				data: graph
			}
		];
	}
</script>

<div
	class="w-48 shrink-0 bg-transparent relative rounded-xl border border-grey-4 before:shadow-sidebar before:backdrop-blur-md before:rounded-xl before:absolute before:inset-0 before:bg-bglinear-5 before:ease-in-out before:duration-500 ease-in-out duration-500"
	class:before:shadow-glow-blue={$CurrentEventsFilter == data.name}
>
	<div class="relative z-10 overflow-hidden flex flex-col rounded-xl">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="p-3 pb-0 flex-1 space-y-1.5 cursor-pointer"
			on:dblclick={() => {
				gotoAttributionPage(data.name);
			}}
			on:click={() => {
				handleSingleClick(data.name);
			}}
		>
			<div class="flex justify-between">
				<p class="text-sm font-bold text-white flex gap-2 capitalize">
					<Icon
						data={getIconByName(data.name) ?? Icons.targetIcon}
						stroke="transparent"
						class="text-white w-4 h-4"
					/><span class="tracking-wider">{data.name}</span>
				</p>
				{#if AVAILABLE_ATTRIBUTION_PAGES.includes(data.name)}
					<div
						on:click={() => {
							gotoAttributionPage(data.name);
						}}
					>
						<Icon data={Icons.redirectOut} stroke="transparent" class="w-4" />
					</div>
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-1 py-1">
				<div class="flex flex-col gap-1">
					<p class="text-sm font-light leading-none">Paid Rev.</p>
					<p class="font-bold text-sm text-left leading-none">
						{currencyCustomSymbolFormatter(data.data.adValue, 'EUR')}
					</p>
				</div>
				<div class="flex flex-col gap-1">
					<p class="text-sm font-light leading-none">Org. Rev.</p>
					<p class="font-bold text-sm text-left leading-none">
						{currencyCustomSymbolFormatter(data.data.organicValue, 'EUR')}
					</p>
				</div>
			</div>

			{#if arePurchaseEvents}
				<div class="rounded-full flex items-stretch h-2 bg-radial-blue overflow-hidden w-full">
					<span
						class="bg-radial-purple block"
						style="width:{(data.data.adValue / data.data.totalValue) * 100}%"
					/>
				</div>
			{:else}
				<div class="rounded-full flex items-stretch h-2 bg-radial-blue overflow-hidden w-full">
					<span
						class="bg-radial-purple block"
						style="width:{(data.data.adEvents / data.data.totalEvents) * 100}%"
					/>
				</div>
			{/if}

			<div class="grid grid-cols-2 gap-1 py-1">
				<div class="space-y-1">
					<p class="text-sm font-light leading-none">
						Paid {arePurchaseEvents ? 'Orders' : 'Leads'}
					</p>
					<p class="font-bold text-sm text-left leading-none">{data.data.adEvents}</p>
				</div>
				<div class="space-y-1">
					<p class="text-sm font-light leading-none">
						Org. {arePurchaseEvents ? 'Orders' : 'Leads'}
					</p>
					<p class="font-bold text-sm text-left leading-none">
						{data.data.organicEvents}
					</p>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-1 pt-1 pb-2">
				<div class="space-y-1">
					<p class="text-sm font-light leading-none">Total Rev.</p>
					<p class="font-bold text-sm text-left leading-none">
						{currencyCustomSymbolFormatter(data.data.totalValue, 'EUR')}
					</p>
				</div>
				<div class="space-y-1">
					<p class="text-sm font-light leading-none">
						Total {arePurchaseEvents ? 'Orders' : 'Leads'}
					</p>
					<p class="font-bold text-sm text-left leading-none">{data.data.totalEvents}</p>
				</div>
			</div>
		</div>
		<!-- Area Chart will be here -->
		<div class="h-10 rounded-b overlfow-hidden -mt-1">
			<Chart
				id="chart-card-{id}"
				type="area"
				height="100%"
				showGrid={false}
				showScales={false}
				sparkLine={true}
				series={getChartSeries()}
				colors={['#007DF2']}
				showTooltip={false}
				border="1px"
			/>
		</div>
	</div>
</div>
