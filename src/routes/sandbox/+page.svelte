<script lang="ts" context="module">
	import type { Moment } from 'moment';
	import type { WorkspaceDataType } from '$lib/types/Types';
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { derived } from 'svelte/store';

	import { CurrentRange, Workspace, AttributionWindow, AttributionType } from '$lib/store';
	import { hideLoader } from '$lib/helpers/MiscHelpers';

	import DndList from './components/DndList.svelte';
	import { homeDndList1, homeDndList2, homeDndList3, homeDndList4, getChartValues } from './misc';

	import StackedAreaChart from './components/charts/StackedAreaChart.svelte';
	import PlatformSummary from './components/PlatformSummary.svelte';

	let rerenderKey = 0;

	let workspace: WorkspaceDataType;
	let currentRange: { start: Moment; end: Moment };
	let attributionWindow: number;
	let attributionType: string;

	$: isReady = rerenderKey > 0;

	onMount(async () => {
		await tick();

		const unsubscribe = derived(
			[Workspace, CurrentRange, AttributionWindow, AttributionType],
			([$Workspace, $CurrentRange, $AttributionWindow, $AttributionType]) => [
				$Workspace,
				$CurrentRange,
				$AttributionWindow,
				$AttributionType
			]
		).subscribe(([$Workspace, $CurrentRange, $AttributionWindow, $AttributionType]: any[]) => {
			if (!$Workspace?.id || !$CurrentRange || !$AttributionWindow || !$AttributionType) return;
			[currentRange, workspace, attributionWindow, attributionType] = [
				$Workspace,
				$CurrentRange,
				$AttributionWindow,
				$AttributionType
			];
			rerenderKey += 1;
			hideLoader();
		});

		return () => unsubscribe();
	});
</script>

<div class="px-0.5 space-y-5 flex flex-col flex-1">
	{#if isReady}
		{#key rerenderKey}
			<div class="headings">
				<h1>Home</h1>
				<p>Here you can find a comprehensive overview of all your connected platforms</p>
			</div>
			<DndList let:itemName setup={homeDndList1}>
				{#if itemName === 'adSpend'}
          <StackedAreaChart
            setup={{
              height: 150,
              dimension: '1h',
              groups: [{
                title: 'First Demo',
                color: 'blue',
                values: getChartValues('1h')//.map((v, i) => i > 12 ? [v[0], null] : v)
              }, {
                title: 'Second Demo',
                values: getChartValues('1h')
              }]
            }}
          />
				{:else if itemName === 'revenue'}
					chart for revenue
				{:else if itemName === 'sales'}
					chart for sales
				{:else if itemName === 'leeds'}
					chart for leeds
				{:else if itemName === 'roas'}
					chart for roas
				{:else if itemName === 'aov'}
					chart for aov
				{:else if itemName === 'cpp'}
					chart for cpp
				{:else if itemName === 'cpl'}
					chart for cpl
				{/if}
			</DndList>

			<DndList let:itemName setup={homeDndList2}>
				{#if itemName === 'conversionMetrics'}
          <StackedAreaChart
            setup={{
              height: 300,
              dimension: '1h',
              showLabels: true,
              groups: [{
                title: 'Blue',
                color: 'blue',
                values: getChartValues('1h')//.map((v, i) => i > 12 ? [v[0], null] : v)
              }, {
                title: 'Green',
                color: 'green',
                values: getChartValues('1h')//.map(v => [v[0], parseInt(v[1] / 2) || 0])
              }, {
                title: 'Violet',
                color: 'violet',
                values: getChartValues('1h')//.map(v => [v[0], parseInt(v[1] / 3) || 0])
              }, {
                title: 'Yellow',
                color: 'yellow',
                values: getChartValues('1h')//.map(v => [v[0], parseInt(v[1] / 4) || 0])
              }, {
                title: 'Red',
                color: 'red',
                values: getChartValues('1h')//.map(v => [v[0], parseInt(v[1] / 5) || 0])
              }]
            }}
          />
				{:else if itemName === 'cpsCpl'}
					chart for cpsCpl
				{/if}
			</DndList>

			<div class="headings heading-middle">
				<h1>Attribution Metrics</h1>
			</div>
			<DndList let:itemName setup={homeDndList3}>
				{#if itemName === 'currentVisitors'}
					chart for currentVisitors
				{:else if itemName === 'traffic'}
					chart for traffic
				{:else if itemName === 'uniqueTraffic'}
					chart for uniqueTraffic
				{:else if itemName === 'cvr'}
					chart for cvr
				{/if}
			</DndList>

			<DndList let:itemName setup={homeDndList4}>
				{#if itemName === 'meta'}
					<PlatformSummary
						setup={{
							platform: 'Meta',
							title: 'Ad Spend',
							value: '$10,812',
              
							rows: [
								{ title: 'ROAS', values: [2.16, 1.87] },
								{ title: 'CPP', values: ['72.42%', '11.83%'] },
								{ title: 'CPL', values: ['$12,321', '$21,321'] },
								{ title: 'Order Value', values: [2.16, 1.87] },
								{ title: 'Orders', values: ['72.42%', '11.83%'] },
								{ title: 'Leads', values: ['$42,471', '$38,187'] }
							]
						}}
					/>
				{:else if itemName === 'google'}
					platform summary for google
				{:else if itemName === 'tiktok'}
					platform summary for tiktok
				{:else if itemName === 'snapchat'}
					platform summary for snapchat
				{/if}
			</DndList>
		{/key}
	{/if}
</div>

<style lang="scss">
	.headings {
		display: flex;
		flex-direction: column;
		gap: 4px;
		&.heading-middle {
			padding-top: 20px;
		}
		h1 {
			font-size: 24px;
			font-style: normal;
			font-weight: 600;
			line-height: 20px;
		}
		p {
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
		}
	}
</style>