<script lang="ts">
	import { Workspace } from '$lib/store';
	import { openModal } from 'svelte-modals';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import DatePicker from '$lib/components/layout/DatePicker.svelte';
	import SelectionDropDown from '$lib/components/pages/TrackingComponents/Trackinglinks/SelectionDropDown.svelte';
	import AddNewPageModel from '$lib/components/pages/TrackingComponents/Trackinglinks/AddNewPageModel.svelte';
	import EditModel from '$lib/components/pages/TrackingComponents/Trackinglinks/EditModel.svelte';
	import { fade } from 'svelte/transition';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';

	let last = 'right-4';
	let first = 'left-4';

	let toolTip = false;
	function newPageModelOpen() {
		openModal(AddNewPageModel, {});
	}
	function EditModelOpen() {
		openModal(EditModel, {});
	}

	let unsub;
	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});

	const list = [
		{
			id: 'item-1',
			state: true,
			name: 'campaign 1'
		},
		{
			id: 'item-2',
			state: false,
			name: 'meta'
		},
		{
			id: 'item-3',
			state: false,
			name: 'beauty product'
		},
		{
			id: 'item-4',
			state: false,
			name: 'snapchat'
		},
		{
			id: 'item-5',
			state: false,
			name: 'age targeted'
		},
		{
			id: 'item-6',
			state: false,
			name: 'skin care'
		}
	];

	let tHead = [
		{
			name: 'Name',
			colWidth: 'w-[9%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Platforms',
			colWidth: 'w-[10%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Original URL & OneTrack URL',
			colWidth: 'w-[14%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Tags',
			colWidth: 'w-[16%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'ATC',
			colWidth: 'w-[7%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Initiate Checkout',
			colWidth: 'w-[10%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Purchase',
			colWidth: 'w-[10%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Lead',
			colWidth: 'w-[7%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Purchase value',
			colWidth: 'w-[10%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		},
		{
			name: 'Actions',
			colWidth: 'w-[7%]',
			toolTips: false,
			tooltipData: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
		}
	];
	let tbody = [
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.snapchatLogo }
			],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'campaign' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.taboolaLogo }
			],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'meta' }, { tag: 'snapchat' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.outbrainLogo }
			],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'beauty product' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.linkedInLogo }
			],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'snapchat' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [{ icons: Icons.meta }, { icons: Icons.google }, { icons: Icons.tiktok }],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'age-targeted' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.snapchatLogo }
			],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'skin care' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [{ icons: Icons.meta }, { icons: Icons.google }],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'campaign' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [{ icons: Icons.meta }, { icons: Icons.google }, { icons: Icons.tiktok }],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'meta' }, { tag: 'snapchat' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [{ icons: Icons.meta }, { icons: Icons.google }, { icons: Icons.tiktok }],
			urls: [{ url: 'example-one.com' }, { url: 'example-one.com' }],
			tags: [{ tag: 'Google' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		},
		{
			name: 'name one',
			platforms: [
				{ icons: Icons.meta },
				{ icons: Icons.google },
				{ icons: Icons.tiktok },
				{ icons: Icons.snapchatLogo }
			],
			urls: [
				{ url: 'example-onesddasdadsdsadadadsasdasasdasdasdas.com' },
				{ url: 'example-one.com' }
			],
			tags: [{ tag: 'Tabola' }],
			atc: '???',
			Checkout: '???',
			Purchase: '???',
			Lead: '???',
			PurchaseValue: '???'
		}
	];
</script>

<main class="px-0.5 w-full flex flex-col gap-y-10 flex-1">
	<div class="flex flex-wrap md:flex-nowrap justify-between gap-3 w-full">
		<div class="flex-1">
			<h1 class="text-xl text-white leading-none font-semibold flex gap-1">Trackinglinks</h1>
		</div>

		<div class="flex gap-5">
			<div class="w-60">
				<SelectionDropDown
					id="allTags"
					title="-All Tags-"
					{list}
					mainIcon={Icons.targetIcon}
					on:selectionChange={(e) => {}}
				/>
			</div>

			<button
				on:click={newPageModelOpen}
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-28 w-10 sm:w-auto sm:px-3 2xl:px-7 p-1.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0 shrink-0"
			>
				<span class="relative z-10 inline-flex items-center gap-1">
					<Icon data={Icons.plus} stroke="transparent" class="w-3" /><span
						class="whitespace-nowrap hidden sm:inline">Add new page</span
					>
				</span>
			</button>
		</div>
	</div>

	<div class="relative">
		<div class="hidden xl:flex items-stretch px-4 md:px-6">
			{#each tHead as heading, i}
				<div
					class="text-xs 2xl:text-sm font-semibold flex items-stretch shrink-0 px-1 group {heading.colWidth}"
				>
					<span
						class="py-2 p-3 w-11/12 items-end inline-flex bg-table-heading rounded-tl-md border-l border-blue relative after:bg-table-top-bdr after:h-px after:left-1 after:absolute after:w-full after:top-0 before:w-4 before:h-full before:rounded-tl-md before:absolute before:top-0 before:left-0 before:border-l before:border-t before:border-blue gap-2"
						><span class="inline-flex leading-tight">{heading.name}</span>

						<div
							class="group-hover:opacity-100 opacity-0 ease-in-out duration-300 flex items-center"
						>
							<Tooltip top>
								<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
								<span slot="tip" class="flex gap-2 leading-tight text-xs"
									><Icon
										data={Icons.infoIcon}
										stroke="transparent"
										class="w-5 shrink-0"
									/>{heading.tooltipData}</span
								>
							</Tooltip>
						</div>
					</span>
				</div>
			{/each}
		</div>
		<div class="space-y-4">
			{#each tbody as tItems}
				<div
					class="relative rounded-3xl ease-in-out duration-500 before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 hover:ring-1 hover:ring-blue"
				>
					<div
						class="flex flex-wrap items-stretch xl:flex-nowrap gap-y-4 p-4 md:px-6 justify-between xl:justify-start w-full relative z-10 xl:items-center"
					>
						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 md:pr-2 xl:px-1 mv:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[9%]"
						>
							<p class="text-xs text-grey-2 xl:hidden">Name</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3"><span>{tItems.name}</span></div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 md:px-2 xl:px-1 mv:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[9%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Platforms</p>
							<div class="flex flex-wrap items-center gap-1 xl:pr-1">
								{#each tItems.platforms as platform}
									<button
										type="button"
										class="relative before:absolute before:bg-dropdown shadow-glass-2 before:opacity-60 before:inset-0 before:backdrop-blur-2.5xl before:rounded-full rounded-full ring-1 ring-grey/80 hover:ring-blue hover:shadow-glow-blue w-7 h-7 flex justify-center items-center shrink-0"
									>
										<div class="relative z-10">
											<Icon data={platform.icons} class="w-4" stroke="transparent" />
										</div>
									</button>
								{/each}
							</div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 md:px-2 xl:px-1 mv:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[14%]"
						>
							<p class="text-xs text-grey-2 xl:hidden truncate">Original URL & OneTrack URL</p>
							<div class="flex flex-col gap-0.5 xl:w-4/5 xl:px-3">
								{#each tItems.urls as url}
									<a
										href={url.url}
										target="_blank"
										class="inline-block leading-none hover:text-blue-200 ease-in-out duration-300 truncate"
										title={url.url}>{url.url}</a
									>
								{/each}
							</div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 md:px-2 xl:px-1 mv:w-1/2 sm:w-1/3 md:w-1/4 xl:w-[17%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Tags</p>
							<div class="flex items-center gap-2 xl:w-11/12 xl:px-3">
								<div class="flex flex-wrap items-center gap-1">
									{#each tItems.tags as tag}
										<p
											class="inline-flex items-center rounded-full bg-blue-box py-0.5 pr-1.5 pl-3 text-xs font-medium leading-none text-white gap-1"
										>
											<span>{tag.tag}</span>
											<button
												class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1"
											>
												<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
											>
										</p>
									{/each}
								</div>
							</div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 xl:w-[7%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">ATC</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3"><span>{tItems.atc}</span></div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 xl:w-[10%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Initiate Checkout</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3">
								<span>{tItems.Checkout}</span>
							</div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 xl:w-[10%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Purchase</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3">
								<span>{tItems.Purchase}</span>
							</div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 xl:w-[7%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Lead</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3"><span>{tItems.Lead}</span></div>
						</div>

						<div
							class="text-xs md:text-sm font-medium shrink-0 flex flex-col gap-y-2 px-1 xl:w-[10%]"
						>
							<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Purchase Value</p>
							<div class="flex items-center gap-2 xl:w-4/5 xl:px-3">
								<span>{tItems.PurchaseValue}</span>
							</div>
						</div>

						<div class="shrink-0 flex flex-col gap-y-2 px-1 xl:w-[7%]">
							<div class="flex items-center gap-1 xl:w-4/5 xl:px-3">
								<button
									on:click={EditModelOpen}
									class="flex items-center justify-center shrink-0 p-0.5 text-white ease-in-out duration-300 hover:bg-green hover:text-white rounded-full w-8 h-8"
									><span class="relative z-10 leading-none">
										<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" /></span
									></button
								>
								<button
									type="button"
									class="flex items-center justify-center shrink-0 p-0.5 text-red ease-in-out duration-300 hover:bg-red hover:text-white rounded-full w-8 h-8"
								>
									<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 " />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex justify-end">
			<div class="max-w-40 flex gap-3 md:mr-40">
				<div class="text-xs 2xl:text-sm font-semibold flex items-stretch shrink-0 px-1 flex-1">
					<span
						class="py-2 p-3 pr-5 items-end inline-flex bg-table-heading rounded-bl-md border-l border-blue relative after:bg-table-top-bdr after:h-px after:left-1 after:absolute after:w-full after:bottom-0 before:w-4 before:h-full before:rounded-bl-md before:absolute before:top-0 before:left-0 before:border-l before:border-b before:border-blue"
						><span class="inline-flex leading-tight">Total</span></span
					>
				</div>
				<div class="text-xs 2xl:text-sm font-semibold flex items-stretch shrink-0 px-1 flex-1">
					<span
						class="py-2 p-3 pr-5 items-end inline-flex bg-table-heading rounded-bl-md border-l border-blue relative after:bg-table-top-bdr after:h-px after:left-1 after:absolute after:w-full after:bottom-0 before:w-4 before:h-full before:rounded-bl-md before:absolute before:top-0 before:left-0 before:border-l before:border-b before:border-blue"
						><span class="inline-flex leading-tight">$123.45</span></span
					>
				</div>
			</div>
		</div>
	</div>
</main>
