<script lang="ts">
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, onDestroy } from 'svelte';
	import { MetaOAuth, Workspace } from '$lib/store';
	import Icon from '$lib/components/common/Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import AdAccountModal from '$lib/components/pages/tracking/connections/add/source/AdAccountSelectionModal.svelte';
	import CreateShopifySourceConnector from '$lib/components/pages/tracking/connections/add/source/CreateShopifySourceConnector.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { goto } from '$app/navigation';
	import CreateEventGatewayConnectorForm from '$lib/components/pages/tracking/connections/add/source/CreateEventGatewayConnectorForm.svelte';
	import {
		GetGoogleAccessToken,
		GetTikTokAccessToken,
		GetFacebookToken
	} from '$lib/services/OAuthService';
	import AddAuthBase from '$lib/components/pages/tracking/connections/add/AddAuthBase.svelte';
	import { openModal } from 'svelte-modals';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
	import Button from '$lib/components/common/Button.svelte';

	type platformItem = {
		name: string;
		icon: SpriteIconName;
		clickHandler: () => void;
		type: string;
		tags: string[];
	};

	const filters = ['', 'Ad Platform', 'E-Commerce', 'E-Mail', 'Website Builder', 'CRM'];
	const platforms: platformItem[] = [
		{
			name: 'Meta',
			icon: 'meta',
			clickHandler: GetFacebookToken,
			type: 'Ad Platform',
			tags: ['meta', 'ads', 'facebook', 'instagram']
		},
		{
			name: 'Google Ads',
			icon: 'google_ads',
			clickHandler: GetGoogleAccessToken,
			type: 'Ad Platform',
			tags: ['google', 'gAds', 'google ads']
		},
		{
			name: 'TikTok',
			icon: 'TikTok_Logo_2',
			clickHandler: GetTikTokAccessToken,
			type: 'Ad Platform',
			tags: ['tik', 'tok', 'tiktok ads']
		},
		{
			name: 'Shopify',
			icon: 'shopify-seeklogo.com',
			clickHandler: shopifyHandle,
			type: 'E-Commerce',
			tags: ['shop', 'shopify', 'shopify ads']
		}
	];

	let list: platformItem[] = platforms;
	let endWorkspaceSubscription: Unsubscriber;
	let endMetaOAuthSubscription: Unsubscriber;

	let currentFilter = '';

	onMount(() => {
		endWorkspaceSubscription = Workspace.subscribe(async (ws) => {
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
		endMetaOAuthSubscription = MetaOAuth.subscribe((res) => {
			if (!res) {
				return;
			}
			openModal(AdAccountModal, {});
		});
	});

	onDestroy(() => {
		if (endWorkspaceSubscription) {
			endWorkspaceSubscription();
		}
		if (endMetaOAuthSubscription) {
			endMetaOAuthSubscription();
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

	function shopifyHandle() {
		openModal(CreateShopifySourceConnector, {});
	}

	//TODO: Add zapier auth button when this is completed
	function zapierHandler() {
		openModal(CreateEventGatewayConnectorForm, { icon: Icons.zapier, title: 'Zapier' });
	}
</script>

<svelte:head>
	<script
		async
		defer
		crossorigin="anonymous"
		src="https://connect.facebook.net/en_US/sdk.js"
	></script>
	<script>
		window.fbAsyncInit = function () {
			FB.init({
				appId: '458032785911064',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v14.0'
			});
		};
	</script>
</svelte:head>
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
					Connect a new Account
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
					onClickHandler={platform.clickHandler}
				/>
			{/each}
		</div>
	</div>
</main>
