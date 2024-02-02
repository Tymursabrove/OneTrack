<script lang="ts">
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, onDestroy } from 'svelte';
	import { Workspace } from '$lib/store';
	import { openModal } from 'svelte-modals';
	import Icon from '$lib/components/common/Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import CreateDestinationConnectorModal from '$lib/components/pages/tracking/connections/add/destination/CreateDestinationConnectorModal.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { goto } from '$app/navigation';
	import CreateGoogleDestinationConnectorModal from '$lib/components/pages/tracking/connections/add/destination/CreateGoogleDestinationConnectorModal.svelte';
	import AddAuthBase from '$lib/components/pages/tracking/connections/add/AddAuthBase.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';

	type platformItem = {
		name: string;
		modal: any;
		type: string;
		tags: string[];
		icon: SpriteIconName;
		connectorType?: 'MetaPixel' | 'TikTokPixel' | 'GoogleAnalytics4';
		isNew?: boolean;
	};
	const filters = ['', 'Ad Platform', 'E-Commerce', 'E-Mail', 'Website Builder', 'CRM'];
	const platforms: platformItem[] = [
		{
			name: 'Meta',
			modal: CreateDestinationConnectorModal,
			type: 'Ad Platform',
			icon: 'meta',
			tags: ['meta', 'ads', 'facebook', 'instagram'],
			connectorType: 'MetaPixel'
		},
		{
			name: 'TikTok',
			modal: CreateDestinationConnectorModal,
			type: 'Ad Platform',
			icon: 'TikTok_Logo_2',
			tags: ['tik', 'tok', 'tiktok ads'],
			connectorType: 'TikTokPixel'
		},
		{
			name: 'Google Analytics 4',
			modal: CreateGoogleDestinationConnectorModal,
			type: 'Ad Platform',
			icon: 'ga4',
			tags: ['google', 'gAds', 'google ads'],
			connectorType: 'GoogleAnalytics4',
			isNew: true
		}
	];

	let list: platformItem[] = platforms;
	let endSubscription: Unsubscriber;
	let currentFilter = '';

	onMount(() => {
		endSubscription = Workspace.subscribe(async (ws) => {
			try {
				if (!ws) {
					return;
				}
			} catch (err) {
				console.error(err);
			} finally {
				hideLoader();
			}
		});
	});
	onDestroy(() => {
		if (endSubscription) {
			endSubscription();
		}
	});
	function runFilter(filter: string) {
		currentFilter = filter;
		if (filter == '') {
			list = platforms;
		} else {
			list = platforms.filter((x) => x.type == currentFilter);
		}
	}
	function runSearch(term: string) {
		term = term.toLowerCase();
		if (!term || term == '') {
			list = platforms;
		} else {
			list = platforms.filter(
				(x) => x.name.toLowerCase().includes(term) || x.tags.some((y) => y.toLowerCase() == term)
			);
		}
	}
	function handleInputEvent(e: any) {
		const target = e.target as HTMLInputElement;
		runSearch(target.value);
	}
	function onClickHandler(e: platformItem) {
		openModal(e.modal, { icon: e.icon, title: e.name, connectorType: e.connectorType });
	}
</script>

<main class="max-w-screen-xl mx-auto w-full flex flex-col space-y-4 xl:px-5 flex-1">
	<div class="shrink-0 flex items-center">
		<Button
			on:click={() => {
				goto('/tracking/connections');
			}}
			text="Back to Connections"
			leftIcon="angleLeft"
			action="secondary"
		/>
	</div>
	<!-- Top Section -->
	<div class="space-y-5">
		<div class="space-y-3">
			<div class="relative w-full flex flex-col sm:flex-row items-center flex-wrap gap-3 md:gap-9">
				<h1 class="text-xl text-white leading-none font-medium flex gap-1 flex-1 max-w-sm">
					Connect a new destination
				</h1>
				<div class="flex-1 flex justify-start w-full">
					<div class="relative w-full sm:max-w-md xl:pr-11 flex items-center">
						<label for="search" class="sr-only">Search</label>
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-12 hidden xs:flex items-center justify-center z-10"
						>
							<Icon name="search" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
						>
							<input
								class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 xs:pl-10 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="search"
								id="search"
								placeholder="Search"
								name="search"
								on:input={handleInputEvent}
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="flex md:flex-nowrap flex-wrap gap-1.5 sm:gap-3">
				{#each filters as filter}
					<Button
						action={currentFilter == filter ? 'primary' : 'secondary'}
						text={`${filter == '' ? 'All' : filter}`}
						on:click={() => {
							runFilter(filter);
						}}
					/>
				{/each}
			</div>
		</div>

		<div
			class="xl:grid-cols-5 md:grid-cols-4 xs:grid-cols-3 mv:grid-cols-2 mv:grid flex flex-col xs:gap-5 gap-3"
		>
			{#each list as platform (platform.name)}
				<AddAuthBase
					name={platform.name}
					iconString={platform.icon}
					onClickHandler={() => {
						onClickHandler(platform);
					}}
				/>
			{/each}
		</div>
	</div>
</main>
