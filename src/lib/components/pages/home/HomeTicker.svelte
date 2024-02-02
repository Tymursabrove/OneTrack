<script>
	import Chart from '$lib/components/charts/Chart.svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	export let title;
	export let subtitle;
	export let field1;
	export let value1;
	export let field2;
	export let value2;
	export let field3;
	export let value3;

	const FUNNEL_CHART_SERIES_1 = [
		{
			name: 'Meta',
			data: [
				[0, 100],
				[1, 90],
				[2, 80]
			]
		},
		{
			name: 'Google',
			data: [
				[0, 90],
				[1, 80],
				[2, 70]
			]
		}
	];
</script>

<div class="bg-bglinear-4 shadow-sidebar rounded-2xl border border-grey-4 flex flex-col">
	<div class="2xl:px-5 p-3 space-y-5 flex-1">
		<div class="flex flex-row-reverse items-start justify-between gap-2">
			<div class="flex gap-2">
				<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
				<Icon data={Icons.sideMenuIcon} stroke="transparent" class="w-5" />
			</div>
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-medium flex gap-1">
					{title}
				</h2>
				<p class="text-xs leading-none">
					{subtitle}
				</p>
			</div>
		</div>
		<div class="flex flex-wrap gap-4 gap-x-14">
			{#if field1 || value1}
				<div class="space-y-0.5">
					<p class="text-3xl font-semibold leading-none">{value1}</p>
					<h3 class="font-semibold leading-none">{field1}</h3>
				</div>
			{/if}
			{#if field2 || value2}
				<div class="space-y-0.5">
					<p class="text-3xl font-semibold leading-none">{value2}</p>
					<h3 class="font-semibold leading-none">{field2}</h3>
				</div>
			{/if}
			{#if field3 || value3}
				<div class="space-y-0.5">
					<p class="text-3xl font-semibold leading-none">{value3}</p>
					<h3 class="font-semibold leading-none">{field3}</h3>
				</div>
			{/if}
		</div>
	</div>

	<div class="h-60 rounded-b-2xl overflow-hidden -mt-1">
		<Chart
			id="chart-card-{uniqueId()}"
			type="area"
			height="100%"
			showGrid={false}
			showScales={false}
			sparkLine={true}
			series={FUNNEL_CHART_SERIES_1}
			showTooltip={false}
			border="1px"
		/>
	</div>
</div>
