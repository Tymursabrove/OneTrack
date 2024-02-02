<script>
	import Chart from '$lib/components/charts/Chart.svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	export let field;
	export let value;
	export let period;
	export let growthRate;
	export let growth = Boolean;
	export let live = Boolean; 
	let getChartSeries = [
		{
			name: 'Meta',
			data: [
				[0, 100],
				[1, 90],
				[2, 80]
			]
		},
		 
	];

</script>

<div class="bg-bglinear-4 shadow-sidebar rounded-2xl border border-grey-4">
	<div class="2xl:px-5 p-3">
		<div class="flex flex-row-reverse items-start justify-between gap-2">
			<div class="flex gap-2">
				<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
				<Icon data={Icons.sideMenuIcon} stroke="transparent" class="w-5" />
			</div>
			<div class="flex gap-2 items-center">
				<h3 class="2xl:text-xl font-semibold truncate">{field}</h3>
				{#if live}<div class="w-2 h-2 shrink-0 rounded-full border border-white/50 bg-radial-green" />{/if}
			</div>
		</div>      
           
        <div class="flex items-end gap-2">
            <p class="text-3xl 2xl:text-4xl font-semibold">{value}</p>
            <div class="flex gap-1 items-center">
                {#if growth}
                <Icon
                    data={Icons.growthUp}
                    stroke="transparent"
                    class="w-3 text-green"
                />
                {:else}
                <Icon
                    data={Icons.growthDown}
                    stroke="transparent"
                    class="w-3 text-red"
                />
                {/if}
                <span class="text-sm font-medium {growth ? 'text-green' : 'text-red'}">{growthRate}%</span>
            </div>
        </div>
    </div>
	

	<div class="h-10 rounded-b-2xl overflow-hidden -mt-1">
		<Chart
			id="chart-card-1"
			type="area"
			height="100%"
			showGrid={false}
			showScales={false}
			sparkLine={true}
			series={getChartSeries}
			colors={['#007DF2']}
			showTooltip={false}
			border="1px"
		/>
	</div>
</div>
