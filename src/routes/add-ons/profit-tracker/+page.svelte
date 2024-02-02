<script lang="ts">
		import {openModal } from 'svelte-modals'; 
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import DatePicker from '$lib/components/layout/DatePicker.svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import Tab from '$lib/components/pages/add-ons/profit-tracker/TabProducts.svelte';
	import configrationModal from '$lib/components/pages/add-ons/profit-tracker/configrationModal.svelte';
	import BestSellers from '$lib/components/pages/add-ons/profit-tracker/BestSellers.svelte';
	import MostProfitable from '$lib/components/pages/add-ons/profit-tracker/MostProfitable.svelte';
	import LeastProfitable from '$lib/components/pages/add-ons/profit-tracker/LeastProfitable.svelte';
 

	export let id: string = 'chart';

	function configrationModalOpen() {
		 
		openModal(configrationModal, {});
	} 


	let tabItems = ['Best Sellers', 'Most Profitable', 'Least Profitable'];
	let activeItem = 'Best Sellers';
	const triggerTabChange = (event) => {
		activeItem = event.detail;
	};

	// export let type = 'other';
	onMount(async () => {
	 
		await tick();
		hideLoader();

		 
	});

	const summaries = [
		{
			title: 'Total Orders',
			value: '23'
		},
		{
			title: 'Total Sales',
			value: '$1,234.56'
		},
		{
			title: 'Ad Spend',
			value: '$1,234.56'
		},
		{
			title: 'ROAS',
			value: '3.3'
		},
		{
			title: 'CPO',
			value: '$1,234.56'
		},
		{
			title: 'Gross Profit',
			value: '$1,234.56'
		},
		{
			title: 'Gross Margin',
			value: '23%'
		}
	];
	const summariesBottom = [
		{
			title: 'Net Profit',
			value: '$1,234.56'
		},
		{
			title: 'Net Margin',
			value: '23%'
		},
		{
			title: 'Discounts',
			value: '$567.89'
		},
		{
			title: 'Transaction Fees',
			value: '$567.89'
		},
		{
			title: 'Shipping & Handling',
			value: '$567.89'
		},
		{
			title: 'Taxes',
			value: '$1,234.56'
		},
		{
			title: 'Refunds',
			value: '$567.89'
		}
	];
	// using for left side for profit section
	const profits = [
		{
			title: 'Gross Profit',
			value: '$12,345.67',
			growthRate: '2%',
			growth: false,
			bullet: 'bg-radial-blue border-blue-3',
			hint: 'Gross Margin 31.3%',
			chartID: 'profits-chart-1',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'Net Profit',
			value: '$12,345.67',
			growthRate: '2%',
			growth: true,
			bullet: 'bg-radial-purple border-purple-2',
			hint: 'Net Margin 31.3%',
			chartID: 'profits-chart-2',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		}
	];

	const overviews = [
		{
			title: 'Total Sales',
			value: '$12,345.67',
			growthRate: '2%',
			growth: true,
			hint: '',
			chartID: 'overviews-chart-1',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},

		{
			title: 'Net Profit',
			value: '$12,345.67',
			growthRate: '2%',
			growth: false,
			hint: '',
			chartID: 'overviews-chart-2',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		},
		{
			title: 'Ad Spend',
			value: '$12,345.67',
			growthRate: '2%',
			growth: true,
			hint: 'ROAS 2.2 - ROMI 0.7',
			chartID: 'overviews-chart-3',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'COGS',
			value: '$12,345.67',
			growthRate: '2%',
			growth: false,
			hint: '',
			chartID: 'overviews-chart-4',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		},
		{
			title: 'Transaction Fees',
			value: '$12,345.67',
			growthRate: '2%',
			growth: true,
			hint: '',
			chartID: 'overviews-chart-5',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'Other Expenses',
			value: '$12,345.67',
			growthRate: '2%',
			growth: false,
			hint: 'Variable $1,234.56 - Fixed $1,234.56',
			chartID: 'overviews-chart-6',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		},
		{
			title: 'Refunds',
			value: '$12,345.67',
			growthRate: '2%',
			growth: true,
			hint: '',
			chartID: 'overviews-chart-7',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'Shipping & Handling',
			value: '$12,345.67',
			growthRate: '2%',
			growth: false,
			hint: 'Shipping charged $1,234.56',
			chartID: 'overviews-chart-8',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		}
	];

	const CHART_SERIES = [
		{
			name: 'Meta',
			data: [
				[0, 100],
				[1, 90],
				[2, 80],
				[3, 100],
				[4, 90],
				[5, 80]
			]
		},
		{
			name: 'Google',
			data: [
				[0, 90],
				[1, 80],
				[2, 70],
				[3, 90],
				[4, 80],
				[5, 70]
			]
		}
	];
	const CHART_STRAIT = [
		{
			name: 'google',
			data: [
				[0, 250],
				[1, 250],
				[2, 250],
				[3, 250],
				[4, 250],
				[5, 250]
			]
		},{
			name: 'snapchat',
			data: [
				[0, 200],
				[1, 200],
				[2, 200],
				[3, 200],
				[4, 200],
				[5, 200]
			]
		},{
			name: 'linkedin',
			data: [
				[0, 150],
				[1, 150],
				[2, 150],
				[3, 150],
				[4, 150],
				[5, 150]
			]
		},{
			name: 'Meta',
			data: [
				[0, 100],
				[1, 100],
				[2, 100],
				[3, 100],
				[4, 100],
				[5, 100]
			]
		},
		{
			name: 'tiktok',
			data: [
				[0, 50],
				[1, 50],
				[2, 50],
				[3, 50],
				[4, 50],
				[5, 50]
			]
		} 
	];

	const breakdowns = [
		{
			color: 'border-purple-2 bg-purple-box-2',
			text: '23.45%'
		},
		{
			color: 'border-purple bg-purple-box',
			text: '23.45%'
		},
		{
			color: 'border-purple bg-purple-box-3',
			text: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box-3',
			text: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box-2',
			text: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box',
			text: '23.45%'
		},
		{
			color: 'border-green-3 bg-green-box',
			text: '23.45%'
		},
		{
			color: 'border-green bg-green-box-2',
			text: '23.45%'
		}
	];

	const breakdownsProfits = [
		{
			color: 'border-purple-3 bg-radial-purple-dark',
			title: 'Net Profit',
			growthRate: '23.45%'
		}
	];

	const breakdownsExpenses = [
		{
			color: 'border-purple-2 bg-radial-purple',
			title: 'Ad Spend',
			growthRate: '23.45%'
		},
		{
			color: 'border-purple bg-radial-purple-light',
			title: 'COGS',
			growthRate: '23.45%'
		},
		{
			color: 'border-blue-5 bg-radial-blue-2',
			title: 'Taxes',
			growthRate: '23.45%'
		},
		{
			color: 'border-blue-5 bg-radial-blue',
			title: 'Shipping & Handling',
			growthRate: '23.45%'
		},
		{
			color: 'border-blue-6 bg-radial-blue-light',
			title: 'Other Expenses',
			growthRate: '23.45%'
		},
		{
			color: 'border-green bg-radial-green-2',
			title: 'Transaction Fees',
			growthRate: '23.45%'
		},
		{
			color: 'border-green-2 bg-radial-green',
			title: 'Refunds',
			growthRate: '23.45%'
		}
	];

	const drilldown = [
		{
			color: 'border-purple-2 bg-purple-box-2',
			text: '23.45%'
		},
		{
			color: 'border-purple bg-purple-box',
			text: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box-3',
			text: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box-2',
			text: '23.45%'
		}
	];

	const drilldownProfits = [
		{
			color: 'border-purple-3 bg-radial-purple-dark',
			title: 'Variable Expenses',
			growthRate: '23.45%'
		},
		{
			color: 'border-purple bg-radial-purple',
			title: 'Financing',
			growthRate: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box-2',
			title: 'Website Expenses',
			growthRate: '23.45%'
		},
		{
			color: 'border-blue bg-blue-box',
			title: 'Digital Marketing',
			growthRate: '23.45%'
		}
	];



	// using for left side for profit section
	const orders = [
		{
			title: 'Total Orders',
			value: '$12,345.67',
			chartID: 'orders-chart-1',
			colors:['#007DF2'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'Average Order Value',
			value: '$12,345.67',
			chartID: 'orders-chart-2',
			colors:['#A221E1'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		}
	];

	const marketing = [
		{
			title: 'ROAS',
			value: '2.3',
			chartID: 'marketing-chart-1',
			colors:['#A221E1'],
			series: [
				{
					name: 'Meta',
					data: [
						[0, 100],
						[1, 90],
						[2, 80],
						[3, 100],
						[4, 90],
						[5, 80]
					]
				}
			]
		},
		{
			title: 'CAC',
			value: '$12,345.67',
			chartID: 'marketing-chart-2',
			colors:['#007DF2'],
			series: [
				{
					name: 'Google',
					data: [
						[0, 50],
						[1, 60],
						[2, 40],
						[3, 35],
						[4, 20],
						[5, 50]
					]
				}
			]
		}
	];
	const progresses = [
		{
			platform:'Meta',
			value:'$12,345.67',		
			growth:'65%',
			color:'bg-radial-purple',
		},
		{
			platform:'Google',
			value:'$12,345.67',		
			growth:'45%',
			color:'bg-radial-green',
		},
		{
			platform:'TikTok',
			value:'$12,345.67',		
			growth:'35%',
			color:'bg-radial-yellow',
		},
		{
			platform:'Pinterest',
			value:'$12,345.67',		
			growth:'15%',
			color:'bg-radial-red',
		},
	]

const trends = [
		{
			bullet: 'border-blue bg-radial-blue',
			title: 'ROAS',			 
		},
		{
			bullet: 'border-purple-3 bg-radial-purple',
			title: 'Meta',			 
		},
		{
			bullet: 'border-green bg-radial-green',
			title: 'Google',			 
		},
		{
			bullet: 'border-yellow bg-radial-yellow',
			title: 'Tiktok',			 
		},
		{
			bullet: 'border-red bg-radial-red',
			title: 'Pinterest',			 
		},
	];
</script>



<main class="px-0.5 space-y-5 flex flex-col flex-1 ">
	<div class="flex flex-wrap md:flex-nowrap justify-between gap-3 w-full">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
			<span>Profit Tracker</span>
		</h2>
		<div class="flex items-center justify-end gap-5">
			<button type="button" on:click={configrationModalOpen}
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-auto px-3 2xl:px-10 p-1.5 2xl:p-2.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0">
				<span class="relative z-10 inline-flex items-center gap-2">
					<span class="whitespace-nowrap ">Configuration</span>
				</span>
			</button>
		</div>
	</div>

	<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
		>
		<div class="relative z-10 p-5 space-y-3">
			<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Summary</h2>
			<div class="divide-y divide-grey space-y-3 overflow-x-auto overflow-y-hidden max-w-full ">
				<div class="divide-x divide-grey gap-y-4 gap-x-2 grid grid-cols-7 pt-3 first-of-type:pt-0 w-[1200px] xl:w-auto">
					{#each summaries as summary, i}
						<div class="space-y-1 pl-3 first-of-type:pl-0">
							<p class="text-sm leading-none">{summary.title}</p>
							<p class="text-xl 2xl:text-2xl leading-none font-bold">{summary.value}</p>
						</div>
					{/each}
				</div>
				<div class="divide-x divide-grey gap-y-4 gap-x-2 grid grid-cols-7 pt-3 first-of-type:pt-0 w-[1200px] xl:w-auto">
					{#each summariesBottom as summary, i}
						<div class="space-y-1 pl-3 first-of-type:pl-0">
							<p class="text-sm leading-none">{summary.title}</p>
							<p class="text-xl 2xl:text-2xl leading-none font-bold">{summary.value}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Profits</h2>
		<p class="text-xs leading-none">
			Track your profits at a glance and monitor your store’s progress
		</p>
	</div>

	<div class="md:grid md:grid-cols-12 gap-5 flex flex-col">
		<div class="flex flex-col xs:grid xs:grid-cols-2 md:flex md:flex-col gap-5 md:col-span-5 lg:col-span-4 2xl:col-span-3">
			{#each profits as profit}
				<div
					class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-1 flex flex-col"
					>
					<div class="relative z-10 p-5 pb-0 space-y-4 flex-col flex flex-1">
						<div class="space-y-2">
							<div class="flex gap-2">
								<span class="w-4 h-4 block border rounded-full shrink-0 {profit.bullet}" />
								<p class="leading-none font-medium">{profit.title}</p>
							</div>
							<div class="flex gap-2 items-end">
								<p class="text-xl xl:text-2xl 2xl:text-3xl leading-none font-bold">{profit.value}</p>
								<div class="flex gap-1 items-center">
									<Icon
										data={profit.growth ? Icons.growthUp : Icons.growthDown}
										stroke="transparent"
										class="w-3 {profit.growth ? 'text-green' : 'text-red'}"
									/>
									<span class="text-sm font-medium {profit.growth ? 'text-green' : 'text-red'}"
										>{profit.growthRate}</span
									>
								</div>
							</div>
							<p class="leading-none font-medium text-xs text-grey-2 -mb-2 pt-1">{profit.hint}</p>
						</div>
						<div class="flex-1 rounded-b-3xl max-h-20 -mx-5 overflow-hidden">
							<Chart
								id={profit.chartID}
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={profit.series}
								showTooltip={false}
								colors={profit.colors}
								border="1px"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col md:col-span-7 lg:col-span-8 2xl:col-span-9" >
			<div class="relative z-10 p-5 pb-0 space-y-4 flex-col flex flex-1">
				<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
					Compare Key Metrics
				</h2>
				<div class="flex-1 rounded-b-3xl overflow-hidden -mx-5">
					<Chart
						id="chart-card-3-{id}"
						type="area"
						height="100%"
						showGrid={false}
						showScales={false}
						sparkLine={true}
						series={CHART_SERIES}
						colors={['#007DF2', '#A221E1']}
						showTooltip={false}
						border="1px"
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Overview</h2>
		<p class="text-xs leading-none">Track your store’s metrics and monitor your performance</p>
	</div>
	<div class="flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-3">
		{#each overviews as overview, i}
			<div
				class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl 	before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-col flex flex-1"
				>
				<div class="relative z-10 p-5 pb-0 space-y-2 flex-col flex flex-1">
					<div class="space-y-2">
						<p class="leading-none font-medium text-sm xl:text-base">{overview.title}</p>

						<div class="flex gap-2 items-end">
							<p class="text-xl xl:text-2xl 2xl:text-3xl leading-none font-bold">{overview.value}</p>
							<div class="flex gap-1 items-center">
								<Icon
									data={overview.growth ? Icons.growthUp : Icons.growthDown}
									stroke="transparent"
									class="w-3 {overview.growth ? 'text-green' : 'text-red'}"
								/>
								<span class="text-sm font-medium {overview.growth ? 'text-green' : 'text-red'}"
									>{overview.growthRate}</span
								>
							</div>
						</div>
						<p class="leading-none font-medium text-xs text-grey-2 -mb-2 pt-1">{overview.hint}</p>
					</div>
					<div class="flex-1 rounded-b-3xl overflow-hidden flex flex-col justify-end -mx-5">
						<div class="max-h-10 xl:max-h-14 2xl:max-h-20">
							<Chart
								id={overview.chartID}
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={overview.series}
								colors={overview.colors}
								showTooltip={false}
								border="1px"
							/>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 col-span-9 flex flex-col" >
		<div class="relative z-10 p-5 flex-col flex flex-1">
			<div class="divide-y divide-grey space-y-5">
				<div class="space-y-4">
					<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
						Profit & Expenses Breakdown
					</h2>
					<div class="overflow-auto max-w-full rounded-md">
					<div class="shadow-dropdown rounded-md flex w-[1200px] xl:w-auto">
						{#each breakdowns as breakdown}
							<div class="flex-1 h-10 first-of-type:rounded-l-md last-of-type:rounded-r-md border-l-0 first-of-type:border-l border flex items-center justify-center {breakdown.color}" >
								<p class="text-sm text-white font-medium">{breakdown.text}</p>
							</div>
						{/each}
					</div>
				</div>
					<div class="flex flex-wrap gap-3">
						<div class="space-y-1 w-full md:w-auto xl:w-1/5">
							<h3 class="text-lg fonrt-semibold">Profits</h3>

							{#each breakdownsProfits as profit}
								<div class="flex items-center gap-1.5">
									<span class="w-3 h-3 block border rounded-full shrink-0 {profit.color}" />
									<p class="leading-none font-medium text-xs 2xl:text-sm">{profit.title} {profit.growthRate}</p>
								</div>
							{/each}
						</div>
						<div class="space-y-1 flex-1">
							<h3 class="text-lg fonrt-semibold">Expenses</h3>
							<div class="flex flex-wrap gap-3">
								{#each breakdownsExpenses as expense}
									<div class="flex items-center gap-1.5 2xl:w-1/5">
										<span class="w-3 h-3 block border rounded-full shrink-0 {expense.color}" />
										<p class="leading-none font-medium text-xs 2xl:text-sm">
											{expense.title}
											{expense.growthRate}
										</p>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
				<div class="space-y-4 pt-5">
					<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
						Other Expenses Drilldown
					</h2>
					
					<div class="overflow-auto max-w-full rounded-md">
						<div class="shadow-dropdown rounded-md flex w-[1200px] xl:w-auto">
							{#each drilldown as drilldown}
								<div
									class="flex-1 h-10 first-of-type:rounded-l-md last-of-type:rounded-r-md border-l-0 first-of-type:border-l border flex items-center justify-center {drilldown.color}" >
									<p class="text-sm text-white font-medium">{drilldown.text}</p>
								</div>
							{/each}
						</div>
					</div>

					<div class="flex flex-wrap gap-3">
						{#each drilldownProfits as profit}
							<div class="flex items-center gap-1.5 xl:w-1/5">
								<span class="w-3 h-3 block border rounded-full shrink-0 {profit.color}" />
								<p class="leading-none font-medium text-xs 2xl:text-sm">{profit.title} {profit.growthRate}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Products</h2>
		<p class="text-xs leading-none">See a breakdown of your most profitable procuts</p>
	</div>

	<div class="relative">
		<div class="md:absolute w-full xs:w-auto left-0 inline-flex top-0">
			<Tab {tabItems} {activeItem} on:tabChange={triggerTabChange} />
		</div>
		<div class="relative">
			{#if activeItem === 'Best Sellers'}
			<BestSellers />
			{:else if activeItem === 'Most Profitable'}
			<MostProfitable />
			{:else}
			<LeastProfitable />
			{/if}
		</div>
	</div>

	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Orders</h2>
		<p class="text-xs leading-none">
			Track your store’s order trends as well as current order amounts and their average value
		</p>
	</div>

	<div class="md:grid md:grid-cols-12 flex flex-col gap-5">
		<div class="flex flex-col xs:grid xs:grid-cols-2 md:flex md:flex-col gap-5 col-span-5 lg:col-span-4 2xl:col-span-3 md:order-2">
			{#each orders as order}
				<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-1 flex flex-col" >
					<div class="relative z-10 p-5 pb-0 space-y-4 flex-col flex flex-1">
						<div class="space-y-2">
							<p class="leading-none font-medium">{order.title}</p>
							<p class="text-xl xl:text-2xl 2xl:text-3xl leading-none font-bold">{order.value}</p>
						</div>
						<div class="flex-1 rounded-b-3xl max-h-20 -mx-5 overflow-hidden">
							
							<Chart
								id={order.chartID}
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={order.series}
								colors={order.colors}
								 
								showTooltip={false}
								border="1px"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 col-span-7 lg:col-span-8 2xl:col-span-9 flex flex-col md:order-1">
			<div class="relative z-10 p-5 pb-0 space-y-4 flex-col flex flex-1">
				<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
					Orders by day
				</h2>
					

				<div class="flex-1 rounded-b-3xl overflow-hidden -mx-5">
				 	<Chart
						id="chart-card-5-{id}"
						type="area"
						height="100%"
						showGrid={false}
						showScales={false}
						sparkLine={true}
						series={CHART_SERIES}
						colors={['#007DF2', '#A221E1']}
						showTooltip={false}
						border="1px"
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="space-y-1">
		<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">Marketing</h2>
		<p class="text-xs leading-none">Track your marketing efforts at a glance</p>
	</div>
	<div class="flex flex-col xs:grid xs:grid-cols-12 gap-5">
		<div class="flex flex-col gap-5 xs:col-span-6 xl:col-span-3">
			{#each marketing as item}
				<div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-1 flex flex-col" >
					<div class="relative z-10 p-5 pb-0 space-y-4 flex-col flex flex-1">
						<div class="space-y-3">
							<p class="leading-none font-medium text-lg">{item.title}</p>
							<p class="text-xl xl:text-2xl 2xl:text-3xl leading-none font-bold">{item.value}</p>
						</div>
						<div class="flex-1 rounded-b-3xl max-h-20 -mx-5 overflow-hidden">
							<Chart
								id={item.chartID}
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={item.series}
								colors={item.colors}
								showTooltip={false}
								border="1px"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="xs:col-span-6 xl:col-span-3 bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-1 flex flex-col" >
			<div class="relative z-10 p-5 space-y-4 flex-col flex flex-1">
				<p class="leading-none font-medium text-lg">Ad Spend</p>
				<div class="space-y-5 flex-1">
					{#each progresses as progress}			
					<div class="space-y-0.5">
						<div class="flex justify-between gap-1 items-end flex-wrap ">
							<span class="text-sm font-medium ">{progress.platform}</span>
							<span class="text-sm font-medium">{progress.value}</span>
						</div>
						<div class="w-full bg-white/30 bg-linear-2 rounded-full h-2 ">
							<div class="h-2 rounded-full {progress.color}" style="width:{progress.growth}"></div>
						</div>
					</div>			
					{/each}
				</div>
				<div class="space-y-2">
					<p class="leading-none font-medium">Total Ad Spend</p>
					<p class="text-3xl leading-none font-bold">$12,345.67</p>
				</div>
			</div>
		</div>
		<div class="xs:col-span-12 xl:col-span-6 bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex-1 flex flex-col" >
			<div class="relative z-10 space-y-4 flex-col flex flex-1">
				<div class="p-5 flex gap-y-3 gap-x-2 flex-wrap">
					<h2 class="text-xl text-white leading-none font-medium flex items-center w-full 2xl:w-1/3">
						Ad Spend Trend
					</h2>
					<div class="flex justify-between flex-wrap gap-2 flex-1">
					{#each trends as trend}
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 block border rounded-full shrink-0  {trend.bullet}"></span> <p class="leading-none font-medium text-sm">{trend.title}</p> 
						</div>
					{/each}
					</div>
				</div>
				<div class="flex-1 overflow-hidden rounded-b-3xl">
					<Chart
								id={'id'}
								type="area"
								height="100%"
								showGrid={false}
								showScales={false}
								sparkLine={true}
								series={CHART_STRAIT}
								colors={['#007DF2', '#A221E1', '#16CCAC', '#BD1616', '#F9AF35']}
								showTooltip={false}
							 
							/>
				</div>
			</div>
		</div>
	</div>
</main>
