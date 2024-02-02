<script lang="ts">
	import { openModal } from 'svelte-modals';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import DatePicker from '$lib/components/layout/DatePicker.svelte';
	import { goto } from '$app/navigation';
	import DownloadPDFModel from '$lib/components/pages/add-ons/bot-protection/DownloadPDFModel.svelte';
	import Platforms from '$lib/components/pages/add-ons/bot-protection/Platforms.svelte';
	import DonutChart from '$lib/components/charts/BotDonutChart.svelte';
	import ColumnChart from '$lib/components/charts/ColumnChart.svelte';
	import PlaceholderDataGrid from '$lib/components/placeholders/PlaceholderDataGrid.svelte';
	 
	// let distinctsAccounts = [];

	function DownloadPDFModellOpen() {
		openModal(DownloadPDFModel, {});
	}

	let chartLabels = ['Valid Traffic', 'Invalid Traffic'];
	let chartValues = [85, 15];
 
	// export let type = 'other';
	onMount(async () => {
	 
		await tick();
		hideLoader();
	});
	// let distinctsAccounts = [];
	const topBox = [
		{
			name: 'Cleaner Traffic',
			value: '24%',
			time: 'today'
		},
		{
			name: 'Money saved',
			value: '$2,100',
			time: 'today'
		},
		{
			name: 'Clicks saved',
			value: '1,345',
			time: 'today'
		}
	];

	const froudBox = [
		{
			name: 'Fraud threats',
			valueDesktop: '70%',
			colorsDesktop: 'bg-purple-box border-purple',
			valueMobile: '30%',
			colorsMobile: 'bg-blue-box-2 border-blue-3'
		},
		{
			name: 'Fraud threats',
			valueDesktop: '60%',
			colorsDesktop: 'bg-purple-box border-purple',
			valueMobile: '40%',
			colorsMobile: 'bg-blue-box-2 border-blue-3'
		}
	];

	const series = [
		{
			name: 'Meta',
			data: [
				[0, 10],
				[1, 20],
				[2, 30],
				[3, 40],
				[4, 50],
				[5, 60]
			]
		}
	];


 
	 
</script>

<main class="px-0.5 space-y-5 flex flex-col flex-1 ">
 
		<div class="flex flex-wrap md:flex-nowrap items-center gap-3 w-full">
			<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
				<span class="whitespace-nowrap">Profit Tracker</span>
			</h2>
			<Platforms />
			<button
				on:click={() => {
					goto('/add-ons/bot-protection/geo-block');
				}}
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-auto px-5 2xl:px-10  p-2.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
			>
				<span class="relative z-10 inline-flex items-center gap-2">
					<span class="whitespace-nowrap ">Geo Block</span>
				</span>
			</button>
			<!-- </div>
			<div class="flex flex-wrap items-center justify-end gap-3 xl:gap-5 ml-auto"> -->
			<button
				on:click={DownloadPDFModellOpen}
				class="ml-auto relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue xl:min-w-24 h-10 w-10 xl:w-auto xl:px-5 py-2.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0 shrink-0"
				>
				<span class="relative z-10 inline-flex items-center gap-1">
					<span class="text-xl leading-none"
						><Icon data={Icons.download} class="w-5 h-4" stroke="transparent" /></span
					><span class="whitespace-nowrap hidden xl:inline-block">Download PDF</span>
				</span>
			</button>
		</div>
 

	<div class="flex flex-col xs:grid gap-5 xs:grid-cols-12 ">
		{#each topBox as box}
			<div
				class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col col-span-6 sm:col-span-4 xlg:col-span-4 xl:col-span-2 "
			>
				<div class="relative z-10 space-y-8 p-5 pb-10 ">
					<p class="text-lg font-semibold text-left leading-none">{box.name}</p>
					<div class="space-y-0.5">
						<h3 class="text-3xl font-bold text-center leading-none">{box.value}</h3>
						<p class="text-sm font-semibold text-center">{box.time}</p>
					</div>
				</div>
			</div>
		{/each}
		{#each froudBox as box}
			<div
				class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-3  "
			>
				<div class="relative z-10 space-y-8 p-5 pb-10 ">
					<p class="text-lg font-semibold text-left leading-none">{box.name}</p>
					<div class="flex-1 space-y-2">
						<div class="flex ">
							<span class="text-left text-sm font-semibold" style="width: {box.valueDesktop}"
								>{box.valueDesktop} Desktop</span
							>
							<span class="text-left text-sm font-semibold">{box.valueMobile} Mobile</span>
						</div>
						<div class="rounded-md flex shadow-dropdown h-10 overflow-hidden">
							<span
								class="h-full border rounded-l-md block {box.colorsDesktop}"
								style="width: {box.valueDesktop}"
							/>
							<span
								class="h-full block border  border-l-0 rounded-r-md {box.colorsMobile}"
								style="width: {box.valueMobile}"
							/>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Summary</h2>
		<p class="text-xs leading-none">This is an overview of your valid and invalid traffic</p>
	</div>

	<div class="md:grid md:grid-cols-12 gap-5 flex flex-col">
		<div
			class="md:col-span-5 ml:col-span-4 2xl:col-span-3 bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col "
		>


		<div id="doughnutChart" class="chart"></div>


			<div class="relative z-10 space-y-8 p-5 ">
				
				<DonutChart
					id="summeryDonut"					 
					series={chartValues}
					labels={chartLabels}
					 
				/>
				 
					
				<div
				class="absolute top-[116px] right-[131px] bg-radial-circle-inside w-32 h-32 rounded-full shadow-circle hidden justify-center items-center text-white inside-circle "
			>
				 <p class="text-2xl font-semibold text-center">Total Traffic</p>
			</div>


			</div>
		</div>
		<div
			class="md:col-span-7 ml:col-span-8 2xl:col-span-9 rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col "
		>
			<div class="relative z-10 xl:h-full space-y-8 p-2 sm:p-5 h-96 ">
				<ColumnChart
					id="id-column-bot"
					height="100%"
					showGrid={false}
					showScales={true}
					sparkLine={false}
					series={[
						{
							name: 'PRODUCT A',
							data: [44, 55, 41, 67, 22, 43, 23, 45, 54, 45,  ]
						},
						{
							name: 'PRODUCT B',
							data: [13, 23, 20, 8, 13, 27, 23, 45, 54, 45, ]
						},
						// {
						// 	name: 'PRODUCT C',
						// 	data: [11, 17, 15, 15, 21, 14, 23, 45, 54, 45, 3, 22, 12, 34, 55, 65, 44]
						// },
						// {
						// 	name: 'PRODUCT D',
						// 	data: [21, 7, 25, 13, 22, 8, 23, 45, 54, 45, 3, 22, 12, 34, 55, 65, 44]
						// }
					]}
					showTooltip={false}
				/>
			</div>
		</div>
	</div>

	<div class="flex flex-col flex-1  max-h-full">
		<div
			class="w-full flex-1 overflow-hidden bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 max-w-full"
		>
			<div class="overflow-auto max-w-full flex-1 max-h-96 relative z-20 on-hover-scroll">
				<PlaceholderDataGrid noOfRows={35} />
			</div>
		</div>
	</div>
</main>
