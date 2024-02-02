<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { Connectors } from '$lib/store';
	import { TransformCurrencyValue, percentageFormatter } from '$lib/helpers/MiscHelpers';
	import { fade } from 'svelte/transition';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';

	const tHead = [
		{
			name: 'Platform',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Ad spend',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Revenue',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'ROAS',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Orders',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'AOV',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CLV',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CTR',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CPC',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CPATC',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CPIC',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CPO',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'CPM',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Status',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		}
	];
</script>

<div class="overflow-auto on-hover-scroll w-full flex-1 rounded-3xl max-h-screen relative z-20">
	<table class="min-w-full border-collapse text-center">
		<thead
			class="sticky before:absolute before:bg-dropdown before:shadow-glass before:opacity-60 before:inset-0 before:backdrop-blur-2.5xl after:h-px after:bg-grey after:absolute after:inset-x-0 after:bottom-0 before:rounded-t-3xl rounded-t-3xl"
		>
			<tr class="relative z-10"
				><th colspan="14" class="text-left text-xl font-semibold pt-3 px-5">Platform Dashboard</th
				></tr
			>
			<tr class="relative z-10">
				{#each tHead as heading, i}
					<th class="p-2 text-sm text-white font-semibold  group">
						<div
							class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 flex items-center justify-center"
						>
							<Tooltip top>
								<div class="flex justify-center">
									<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
								</div>
								<span slot="tip" class="flex gap-2 leading-tight text-sm"
									><Icon data={Icons.infoIcon} stroke="transparent" class="w-5 shrink-0" />
									{heading.name}</span
								>
							</Tooltip>
						</div>
						<div class="flex gap-1.5 justify-center">
							{heading.name}
							<Icon
								data={Icons.triangleSymbolIcon}
								stroke="transparent"
								class="w-2.5 text-grey-2"
							/>
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-grey relative z-10">
			{#each $Connectors as row}
				<tr>
					<td class="text-sm font-medium text-white p-4 whitespace-nowrap" align="center">
						<div
							class="relative before:absolute before:bg-dropdown before:shadow-glass before:opacity-60 before:inset-0 before:backdrop-blur-2.5xl before:rounded-full rounded-full border border-grey w-10 h-10 flex justify-center items-center"
						>
							<div class="relative z-10">
								{#if row.platform == 'meta'}
									<Icon data={Icons.meta} class="w-5" stroke="transparent" />
								{:else if row.platform == 'google'}
									<Icon data={Icons.google} class="w-5" stroke="transparent" />
								{/if}
							</div>
						</div>
					</td>
					<td class="p-2 text-sm text-white whitespace-nowrap">
						{`${TransformCurrencyValue(row.adSpendTotal, 2, true)}`}
					</td>
					<td class="p-2 text-sm text-white whitespace-nowrap">N/A</td>
					<td class="p-2 text-sm text-white whitespace-nowrap">{`${row.roas}`} </td>
					<td class="p-2 text-sm text-white whitespace-nowrap">{`${row.orders}`}</td>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.averageOrderValue, 2, true)}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap">N/A</td>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${percentageFormatter((Number(row.ctr) - 1).toFixed(2))}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.cpc, 2, true)}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.cpatc, 2, true)}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.cpic, 2, true)}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.cpo, 2, true)}`}</td
					>
					<td class="p-2 text-sm text-white whitespace-nowrap"
						>{`${TransformCurrencyValue(row.cpm, 2, true)}`}</td
					>

					<td class="p-2 text-sm text-white whitespace-nowrap">
						{#if row.platform == 'meta'}
							<div
								class="relative inline-flex items-center justify-center rounded-full  text-white min-w-24 p-1 text-sm font-semibold hover:after:opacity-100 after:rounded-full after:bg-radial-green-2  after:inset-0  after:absolute"
							>
								<span class="relative z-10 uppercase drop-shadow-md text-shadow-1">good</span>
							</div>
						{:else if row.platform == 'google'}
							<div
								class="relative inline-flex items-center justify-center rounded-full  text-white min-w-24 p-1 text-sm font-semibold hover:after:opacity-100 after:rounded-full after:bg-radial-yellow  after:inset-0  after:absolute"
							>
								<span class="relative z-10 uppercase drop-shadow-md text-shadow-1">Okay</span>
							</div>
						{:else}
							<div
								class="relative inline-flex items-center justify-center rounded-full  text-white min-w-24 p-1 text-sm font-semibold hover:after:opacity-100 after:rounded-full after:bg-radial-red  after:inset-0  after:absolute"
							>
								<span class="relative z-10 uppercase drop-shadow-md text-shadow-1">Poor</span>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
