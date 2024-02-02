<script lang="ts">
	import { openModal } from 'svelte-modals';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import BlackList from '$lib/components/pages/add-ons/bot-protection/blacklist.svelte';
	import Quickselect from '$lib/components/pages/add-ons/bot-protection/Quickselect.svelte';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	// import ChartArea from '$lib/components/charts/Chart.svelte';
	import { goto } from '$app/navigation';
	// import BlankMap from '/images/BlankMap-World.svg?url';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	// let distinctsAccounts = [];

	// export let type = 'other';
	onMount(async () => {
		await tick();
		hideLoader();
	});
	// let distinctsAccounts = [];
	const countryList = [
		{
			Name: 'County',
			id: 'country-1',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-2',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-3',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-4',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-5',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-6',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-7',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-8',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-9',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-10',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-11',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-12',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-13',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-14',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-15',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-16',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-17',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-18',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-19',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-20',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-21',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-22',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-23',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-24',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-25',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-26',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-27',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-28',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-29',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-30',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-31',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-32',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-33',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-34',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-35',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-36',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-37',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-39',
			flag: Icons.germanFlagIcon
		},
		{
			Name: 'County',
			id: 'country-40',
			flag: Icons.germanFlagIcon
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
	<div class="flex flex-wrap gap-4">
		<div class="space-y-1">
			<h2 class="text-2xl text-white leading-none font-medium flex items-center gap-2">Summary</h2>
			<p class="text-xs leading-none">This is an overview of your valid and invalid traffic</p>
		</div>
		<button
			on:click={() => {
				goto('/add-ons/bot-protection/');
			}}
			type="button"
			class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-auto px-3 2xl:px-7 p-1.5 2xl:p-2.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
		>
			<span class="relative z-10 inline-flex items-center gap-2">
				<span class="whitespace-nowrap ">Bot Protection</span>
			</span>
		</button>
	</div>

	<div class="flex flex-col lg:grid lg:grid-cols-12 gap-5 xl:gap-10">
		<div class="lg:col-span-6 xl:col-span-7 bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col flex-1" >
			<div class="relative z-10 p-5 xl:p-10 space-y-4">
				<div class="space-y-4">
					<h2 class="lg:text-xl text-white leading-snug font-medium flex items-center gap-2">
						Select the countries you want to blacklist/whitelist
					</h2>
					<div class="flex flex-col mv:grid mv:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 gap-3">
						<BlackList
							on:selectionChange={(e) => {
								selectionCallback(e.detail.isPurchaseSelected);
							}}
						/>
						<Quickselect />
					</div>
				</div>
				<div class="flex flex-col mv:grid mv:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 gap-3">
					{#each countryList as country}
						<div
							class=" relative before:bg-dropdown before:opacity-30 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown"
						>
							<div class="flex justify-between gap-3 relative z-10 py-3 px-4">
								<CheckBox
									labelClass="relative z-10 leading-snug truncate font-normal text-sm h-5 block   "
									id={country.id}
									span="before:w-4 before:h-4 relative before:border before:border-grey before:rounded-sm block after:left-1 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-6 before:absolute before:left-0 before:top-0.5"
									label={country.Name}
									classes="relative cursor-pointer truncate "
								/>
								<Icon data={country.flag} class="rounded-md w-7" color="transparent" />
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="lg:col-span-6 xl:col-span-5 space-y-5 flex flex-col flex-1">
			<div class="flex justify-between">
				<div class="space-y-1">
					<h2 class="text-2xl text-white leading-none font-medium flex items-center gap-2">
						Geo Postback Block
					</h2>
					<p class="text-xs leading-snug">This is an overview of your valid and invalid traffic</p>
				</div>
				<CheckBox
					labelClass="relative z-10 leading-none"
					label=""
					id="securityPreferences"
					classes="relative cursor-pointer"
					span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
				/>
			</div>

			<!-- World Map -->
			<div class="overflow-hidden">
				<img src="/images/BlankMap-World.svg" alt="" class="-ml-5	" />
			</div>

			<div class="pt-3 flex-1 flex flex-col">
				<div
					class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col flex-1"
				>
					<div class="relative z-10 xs:grid xs:grid-cols-12 flex flex-col xs:divide-x divide-y xs:divide-y-0  divide-grey flex-1">
						<div class="col-span-4 relative divide-y divide-grey">
							<h3 class="text-xl font-semibold py-3 px-5">Country</h3>
							<div class="space-y-3 p-4 px-5">
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
								<p class="text-sm text-white">Germany</p>
							</div>
						</div>
						<div class="col-span-8 relative divide-y divide-grey ">
							<h3 class="text-xl font-semibold py-3 px-5">Clicks</h3>
							<div class="px-5 py-4 h-110  ">
								<BarChart
									id="id-column-bot"
									height="100%"
									showGrid={false}
									showScales={true}
									sparkLine={false}
									series={[
										{
											name: 'PRODUCT A',
											data: [90, 65, 55, 45, 25, 15, 5]
										}
									]}
									showTooltip={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
