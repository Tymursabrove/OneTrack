<script lang="ts">
	import { Icons } from '$lib/resources/IconResources';
	import HeadingTicker from '$lib/components/pages/home/HeadingTicker.svelte';
	import AttributionMetrics from '$lib/components/pages/home/AttributionMetrics.svelte';
	import HomeTicker from '$lib/components/pages/home/HomeTicker.svelte';
	import PlatformCard from '$lib/components/pages/home/PlatformCard.svelte';
	import Holder from '$lib/components/pages/home/Holder.svelte';
	import { hideLoader, showLoader } from '$lib/helpers/MiscHelpers';
	import { FullScreenView, Workspace } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { goto } from '$app/navigation';

	export let data;

	let unsubscribeWorkspace: Unsubscriber;

	onMount(async () => {
		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (!ws || ws == 'init') {
					return;
				}
				FullScreenView.set(false);
				showLoader('Preparing your insights...');
				if (data.auth_code) {
					goto(`/tracking/sources/tiktok/redirect?auth_code=${data.auth_code}`);
					return;
				}
				//TODO: Remove this when Home page is ready
				goto(`/tracking/connections`);
				return;
			} catch (err) {
				console.error(err);
				goto(`/tracking/connections`);
			}
		});
	});
	onDestroy(() => {
		if (unsubscribeWorkspace) {
			unsubscribeWorkspace();
		}
	});

	const HeadingTickers = [
		{
			field: 'Ad Spend',
			value: '$4,123',
			growth: true,
			growthRate: '20'
		},
		{
			field: 'Revenue',
			value: '$14,123',
			growth: false,
			growthRate: '-10'
		},
		{
			field: 'Sales',
			value: '4,123',
			growth: true,
			growthRate: '15'
		},
		{
			field: 'Leads',
			value: '4,123',
			growth: true,
			growthRate: '15'
		},
		{
			field: 'ROAS saved',
			value: '4,12',
			growth: false,
			growthRate: '-10'
		},
		{
			field: 'AOV',
			value: '$123',
			growth: false,
			growthRate: '-10'
		},
		{
			field: 'CPP',
			value: '$23.12',
			growth: true,
			growthRate: '20'
		},

		{
			field: 'CPL',
			value: '$23.12',
			growth: false,
			growthRate: '-10'
		}
	];

	const AMetrics = [
		{
			field: 'Current Visitors',
			value: '123',
			growth: true,
			growthRate: '4',
			live: true
		},
		{
			field: 'Traffic',
			value: '4,123',
			growth: false,
			growthRate: '4',
			live: false
		},
		{
			field: 'Unique Traffic',
			value: '4,123',
			growth: true,
			growthRate: '4',
			live: true
		},
		{
			field: 'CVR',
			value: '12.34%',
			growth: false,
			growthRate: '4',
			live: false
		}
	];

	const platforms = [
		{
			logo: Icons.meta,
			platform: 'Meta',
			label: 'Ad Spend',
			value: '$10,812',
			compare: [
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'ROAS'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'CPP'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'CPL'
				},
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'Order Value'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'Orders'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'Leads'
				}
			]
		},
		{
			logo: Icons.google,
			platform: 'Google',
			label: 'Ad Spend',
			value: '$10,812',
			compare: [
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'ROAS'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'CPP'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'CPL'
				},
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'Order Value'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'Orders'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'Leads'
				}
			]
		},
		{
			logo: Icons.tiktok,
			platform: 'Tiktok',
			label: 'Ad Spend',
			value: '$10,812',
			compare: [
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'ROAS'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'CPP'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'CPL'
				},
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'Order Value'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'Orders'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'Leads'
				}
			]
		},
		{
			logo: Icons.snapchatLogo,
			platform: 'Snapchat',
			label: 'Ad Spend',
			value: '$10,812',
			compare: [
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'ROAS'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'CPP'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'CPL'
				},
				{
					onetrack: '2.16',
					meta: '1.87',
					service: 'Order Value'
				},
				{
					onetrack: '73.27%',
					meta: '46.37%',
					service: 'Orders'
				},
				{
					onetrack: '$21,582',
					meta: '$16,348',
					service: 'Leads'
				}
			]
		}
	];
</script>

<div class="px-0.5 flex flex-col flex-1 gap-3 min-h-110">
	<div class="flex flex-wrap justify-between gap-3 w-full relative">
		<div class="flex flex-col gap-6 w-full">
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-medium flex gap-1">Home</h2>
				<p class="text-xs leading-tight">
					Here you can find a comprehensive overview of all your connected platforms
				</p>
			</div>
			<div class="flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
				{#each HeadingTickers as item}
					<HeadingTicker
						field={item.field}
						value={item.value}
						growth={item.growth}
						growthRate={item.growthRate}
					/>
				{/each}
			</div>
			<div class="flex flex-col md:grid md:grid-cols-2 gap-4 w-full">
				<HomeTicker
					title="Conversion Metrics"
					subtitle="Here are your Ad Spend, profits and ROAS over all platforms"
					value1="$25,000"
					field1="Ad Spend"
					value2="$25,000"
					field2="Revenue/Leads"
					value3="4.45"
					field3="ROAS"
				/>
				<HomeTicker
					title="CPS/CPL"
					subtitle="Here are xxx"
					value1="$25,000"
					field1="CPS"
					value2="$25,000"
					field2="CPL"
				/>
			</div>

			<div class="space-y-4">
				<h2 class="text-xl text-white leading-none font-medium flex gap-1">Attribution Metrics</h2>
				<div
					class="flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
				>
					{#each AMetrics as item}
						<AttributionMetrics
							field={item.field}
							value={item.value}
							growth={item.growth}
							growthRate={item.growthRate}
							live={item.live}
						/>
					{/each}
				</div>
			</div>

			<div class="flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
				{#each platforms as item}
					<div class="bg-bglinear-4 shadow-sidebar rounded-2xl border border-grey-4">
						<div class="2xl:px-5 p-3 space-y-3">
							<PlatformCard
								logo={item.logo}
								platform={item.platform}
								label={item.label}
								value={item.value}
							/>
							<div class="flex justify-between border-b border-grey-4 pb-3">
								<p class="text-center text-xs 2xl:text-sm px-3">Onetrack</p>
								<p class="text-center text-xs 2xl:text-sm px-3">Meta</p>
							</div>
							<div class="space-y-0.5">
								{#each item.compare as compare}
									<div
										class="flex justify-between gap-2 p-1 items-center ease-in-out duration-300 border border-transparent hover:border-grey-4 rounded-md hover:bg-bglinear-4"
									>
										<Holder theme="bg-radial-green-2" value={compare.onetrack} />
										<p class="text-xs 2xl:text-sm text-center">{compare.service}</p>
										<Holder theme="bg-radial-red" value={compare.meta} />
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
