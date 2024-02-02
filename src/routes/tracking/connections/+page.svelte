<script lang="ts">
	import AccountTypeSelectionModel from '$lib/components/pages/tracking/connections/add/AccountTypeSelectionModel.svelte';
	import ConnectionInfoCard from '$lib/components/pages/tracking/connections/ConnectionInfoCard.svelte';
	import { hideLoader, showLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, onDestroy, tick } from 'svelte';
	import { Workspace, MultipleDeleteQue } from '$lib/store';
	import { openModal } from 'svelte-modals';
	import type { Unsubscriber } from 'svelte/store';
	import type { DeleteSelectableConnectorType } from '$lib/types/Types';
	import MultipleDeleteModal from '$lib/components/layout/MultipleDeleteModal.svelte';
	import { SetWorkspaceConnectors } from '$lib/services/WorkspaceService';
	import Button from '$lib/components/common/Button.svelte';

	let endSubscription: Unsubscriber;
	let connectors: DeleteSelectableConnectorType[] = [];
	let showOnlyDestinations: boolean | null = null;

	onMount(() => {
		showLoader('Loading connectors');
		endSubscription = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				connectors = [];
				showOnlyDestinations = null;
				await tick();
				if (ws.connectors) {
					connectors = ws.connectors.map((x) => {
						return {
							...x,
							selectedForDeletion: false,
							connectorPlatformType: getPlatformType(x.type)
						};
					});
				} else {
					await SetWorkspaceConnectors();
					return;
				}
				hideLoader();
			} catch (err) {
				console.error(err);
				hideLoader();
			}
		});
	});

	onDestroy(() => {
		if (endSubscription) {
			endSubscription();
		}
	});

	function handleOpen() {
		openModal(AccountTypeSelectionModel, {});
	}

	function loadConnectors() {
		if (!$Workspace) {
			return;
		}
		if ($Workspace == 'init') {
			return;
		}
		if (!$Workspace.connectors) {
			return;
		}
		let tempConnectors = $Workspace.connectors.map((x) => {
			return {
				...x,
				selectedForDeletion: false,
				connectorPlatformType: getPlatformType(x.type)
			};
		});
		if (showOnlyDestinations == null) {
			connectors = tempConnectors;
		} else {
			connectors = tempConnectors.filter(
				(a) => (a.connectorPlatformType == 'source') != showOnlyDestinations
			);
		}
	}
	function handleDeleteConnectorsRequest() {
		const connectorsForDelete = connectors.filter((x) => x.selectedForDeletion);
		MultipleDeleteQue.set(
			connectorsForDelete.map((x) => {
				return { type: x.type ?? '', id: x.id ?? '' };
			})
		);
		openModal(MultipleDeleteModal, {});
	}
	function getPlatformType(connectorType: string): 'source' | 'destination' {
		if (
			connectorType.includes('AdData') ||
			connectorType == 'OneTrackPixel' ||
			connectorType == 'ShopifyWebhook'
		) {
			return 'source';
		}
		return 'destination';
	}
</script>

<svelte:head>
	<style>
		[data-tooltip]:before {
			content: attr(data-tooltip) !important;
		}
	</style>
</svelte:head>
<main
	class="max-w-screen-xl mx-auto w-full flex flex-col space-y-5 lg:space-y-10 xl:px-5 flex-1 relative"
>
	<!-- Top Section -->
	<div class="space-y-3">
		<h1 class="text-xl text-white leading-none font-medium flex gap-1">
			{connectors.length} connected Accounts
		</h1>
		<div class="flex justify-between flex-wrap gap-3 items-center relative">
			<div class="flex gap-1.5 sm:gap-3">
				<Button
					leftIcon="output"
					text="Sources"
					action={showOnlyDestinations != null && showOnlyDestinations == false
						? 'primary'
						: 'secondary'}
					on:click={() => {
						if (showOnlyDestinations == false) {
							showOnlyDestinations = null;
						} else {
							showOnlyDestinations = false;
						}
						loadConnectors();
					}}
				/>
				<Button
					leftIcon="input"
					text="Destinations"
					action={showOnlyDestinations != null && showOnlyDestinations == true
						? 'primary'
						: 'secondary'}
					on:click={() => {
						if (showOnlyDestinations == true) {
							showOnlyDestinations = null;
						} else {
							showOnlyDestinations = true;
						}
						loadConnectors();
					}}
				/>
			</div>
			<div class="shrink-0 flex flex-wrap items-center gap-3">
				{#if connectors.some((x) => x.selectedForDeletion)}
					<Button
						variant="error"
						on:click={handleDeleteConnectorsRequest}
						text="Delete Selected"
						leftIcon="cross"
					/>
				{/if}
				<Button on:click={handleOpen} text="Add New Account" leftIcon="plus" />
			</div>
		</div>
	</div>
	<!-- Card Section -->
	{#if connectors && connectors.length > 0}
		<div class="flex-1 space-y-20">
			{#if connectors.some((x) => x.connectorPlatformType == 'source')}
				<!-- Page Source -->
				<div class="space-y-5">
					<div class="space-y-1">
						<h2 class="text-xl text-white leading-none font-medium flex gap-1">Sources</h2>
						<p class="text-xs leading-none">these are the sources connected to this workspace</p>
					</div>
					<div
						class="flex flex-col sm:grid-cols-2 xl:grid-cols-3 sm:grid gap-y-4 gap-x-7 pr-5 xl:pr-0"
					>
						{#each connectors.filter((x) => x.connectorPlatformType == 'source') as connector}
							<ConnectionInfoCard
								{connector}
								on:selected={() => {
									connectors = connectors;
								}}
							/>
						{/each}
					</div>
				</div>
			{/if}

			{#if connectors.some((x) => x.connectorPlatformType == 'destination')}
				<!-- Page Destination -->
				<div class="space-y-5">
					<div class="space-y-1">
						<h2 class="text-xl text-white leading-none font-medium flex gap-1">Destinations</h2>
						<p class="text-xs leading-none">
							these are the destinations connected to this workspace
						</p>
					</div>
					<div
						class="flex flex-col sm:grid-cols-2 xl:grid-cols-3 sm:grid gap-y-4 gap-x-7 pr-5 xl:pr-0"
					>
						{#each connectors.filter((x) => x.connectorPlatformType == 'destination') as connector}
							<ConnectionInfoCard
								{connector}
								on:selected={() => {
									connectors = connectors;
								}}
							/>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</main>
