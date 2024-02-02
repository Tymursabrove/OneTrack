<script lang="ts">
	import { showLoader, hideLoader } from '$lib/helpers/MiscHelpers';
	import { Workspace } from '$lib/store';
	import { onMount } from 'svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import DatePicker from '$lib/components/layout/DatePicker.svelte';
	export let id: string = 'chart';

	let workspaceId: null | string = null;
	let uniqueCustomers = [];
	let searchQuery = '';
	let customers = [];
	let showBanner = false;
	onMount(async () => {
		showLoader('Crafting customer insights...');
		Workspace.subscribe(async (ws) => {
			try {
				if (!ws || ws == 'init') {
					return;
				}

				workspaceId = ws.id;
				//await loadData();
			} catch (err) {
				console.error(err);
			} finally {
				hideLoader();
			}
		});
	});

	const overviewcards = [
		{
			title: 'Ad Spend',
			value: '$2,100',
			time: 'today'
		},
		{
			title: 'Revenue/Leads',
			value: '$2,100',
			time: 'today'
		},
		{
			title: 'ROAS',
			value: '2.97',
			time: 'today'
		},
		{
			title: 'CLV',
			value: '$2,100',
			time: 'today'
		}
	];

	const CHART_SERIES = [
		{
			name: 'CHART_SERIES',
			data: [
				[0, 20],
				[1, 40],
				[2, 60],
				[3, 50],
				[4, 55],
				[5, 70],
				[6, 20],
				[7, 10]
			]
		}
	];

	const CHART_EARN = [
		{
			name: 'CHART_EARN',
			data: [
				[0, 0],
				[1, 0],
				[2, 10],
				[3, 20],
				[4, 30],
				[5, 40],
				[6, 40],
				[7, 45]
			]
		}
	];
</script>

<div class="flex-1 space-y-10 pt-5">
	<div class="space-y-5">
		<div class="flex justify-between gap-4">
			<div class="space-y-1">
				<h2 class="text-lg md:text-xl text-white leading-none font-medium flex gap-1">Overview</h2>
				<p class="text-xs leading-none">overview with your most important metrics</p>
			</div>
		</div>
		<!-- Overview Cards -->
		<div class="flex flex-col mv:grid mv:grid-cols-2 md:grid-cols-4 gap-2 xl:gap-5">
			{#each overviewcards as card}
				<div
					class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
				>
					<div class="relative z-10 p-5 xl:px-7 space-y-4">
						<h3 class="xl:text-lg font-semibold leading-none">{card.title}</h3>
						<div class="space-y-2 text-center">
							<p class="leading-none xl:leading-none text-3xl xl:text-5xl font-bold">
								{card.value}
							</p>
							<p class="leading-none font-semibold">{card.time}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="space-y-5">
		<div class="space-y-1">
			<h2 class="text-lg md:text-xl text-white leading-none font-medium flex gap-1">
				Time until Purchase
			</h2>
			<p class="text-xs leading-none">amount of purchases over time</p>
		</div>
		<div
			class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
		>
			<div class="relative z-10">
				<div class="absolute inset-x-0 z-10 flex justify-end pt-5 pr-10">
					<h2 class="text-3xl xl:text-4xl text-white leading-none font-bold">11 Days</h2>
				</div>
				<div class="flex-1 rounded-b-3xl overflow-hidden h-40 sm:h-60 xl:h-80">
					<Chart
						id="chart-card-3-{id}"
						type="area"
						height="100%"
						showGrid={true}
						showScales={true}
						sparkLine={true}
						series={CHART_SERIES}
						colors={['#A221E1']}
						showTooltip={false}
						border="1px"
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="space-y-5">
		<div class="space-y-1">
			<h2 class="text-lg md:text-xl text-white leading-none font-medium flex gap-1">
				Money earned over time
			</h2>
			<p class="text-xs leading-none">amount of money earned over time</p>
		</div>
		<div
			class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
		>
			<div class="relative z-10">
				<div class="absolute inset-x-0 z-10 flex justify-end pt-5 pr-10">
					<h2 class="text-3xl xl:text-4xl text-white leading-none font-bold">$1100</h2>
				</div>
				<div class="flex-1 rounded-b-3xl overflow-hidden h-40 sm:h-60 xl:h-80">
					<Chart
						id="chart-card-5-{id}"
						type="area"
						height="100%"
						showGrid={true}
						showScales={true}
						sparkLine={true}
						series={CHART_EARN}
						colors={['#A221E1']}
						showTooltip={false}
						border="1px"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
