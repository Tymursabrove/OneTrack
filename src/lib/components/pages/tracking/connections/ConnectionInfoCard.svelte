<script lang="ts">
	import { Icons, getIconByName } from '$lib/resources/IconResources';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import NewIcon from '$lib/components/common/Icon.svelte';
	import { showErrorMessage, showMessage } from '$lib/services/ToastService';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import type { DeleteSelectableConnectorType, DestinationConnector } from '$lib/types/Types';
	import Modal from '$lib/components/layout/DeleteModel.svelte';
	import UpdateSourceConnectorNameModal from './add/destination/UpdateSourceConnectorNameModal.svelte';
	import UpdateDestinationConnectorModal from './add/destination/UpdateDestinationConnectorModal.svelte';
	import { closeModal, openModal } from 'svelte-modals';
	import { DeleteQue, Workspace } from '$lib/store';
	import { createEventDispatcher } from 'svelte';
	import { UpdateConnector } from '$lib/services/HttpConnectorsRequests';
	import { get } from 'svelte/store';
	import UpdateShopifySourceConnector from './add/source/UpdateShopifySourceConnector.svelte';
	import UpdateGoogleDestinationConnector from './add/destination/UpdateGoogleDestinationConnector.svelte';
	import Switch from '$lib/components/common/Switch.svelte';

	const dispatch = createEventDispatcher();
	const validSocialIcons = ['tiktok', 'meta', 'onetrack', 'shopify'];
	export let connector: DeleteSelectableConnectorType | null = null;

	const handleOpenDeleteModal = (id: string) => {
		DeleteQue.set({ type: 'meta-connector', id });
		openModal(Modal, {});
	};
	function handleControlClick(e: MouseEvent) {
		if (e.ctrlKey || e.metaKey) {
			if (connector) {
				connector.selectedForDeletion = !connector.selectedForDeletion;
				dispatch('selected', connector);
			}
		}
	}
	function getPlatformIcon() {
		if (connector?.type.toLowerCase().startsWith('google')) {
			if (connector.connectorPlatformType == 'destination') {
				return Icons.ga4;
			}
			return Icons.googleAdsIcon;
		}
		for (let social of validSocialIcons) {
			if (connector?.type.toLowerCase().startsWith(social)) {
				return getIconByName(social);
			}
		}
		return Icons.worldWideWebIcon;
	}
	async function handleEnablingConnector(e: boolean) {
		let workspace = get(Workspace);
		if (!workspace || workspace == 'init') {
			return;
		}
		if (!connector) {
			return;
		}
		connector.enabled = e;
		let response = await UpdateConnector(workspace.id, connector);
		if (response.error) {
			showErrorMessage(`Failed to ${e ? 'enable' : 'disable'} connector`);
			connector.enabled = !e;
			return;
		}
		showMessage(`Successfully ${e ? 'enabled' : 'disabled'} connector`, '', 'success');
	}
	async function handleSettingsClick() {
		closeModal();
		if (connector?.type == 'ShopifyWebhook') {
			openModal(UpdateShopifySourceConnector, {
				connector: connector
			});
			return;
		}
		if (connector?.type == 'GoogleAnalytics4') {
			openModal(UpdateGoogleDestinationConnector, {
				connector: connector as any as DestinationConnector
			});
			return;
		}
		if (connector?.connectorPlatformType == 'source') {
			openModal(UpdateSourceConnectorNameModal, {
				connector,
				name: structuredClone(connector?.name)
			});
			return;
		}
		openModal(UpdateDestinationConnectorModal, {
			title: connector?.type == 'MetaPixel' ? 'Meta' : 'TikTok',
			connector: connector as any as DestinationConnector,
			icon: getPlatformIcon()
		});
	}
</script>

<svelte:head>
	<style>
		[data-tooltip]:before {
			content: attr(data-tooltip) !important;
		}
	</style>
</svelte:head>
<!-- {#if connector != null} -->
{#if connector}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="relative rounded-3xl flex items-stretch group">
		<div
			class="relative w-full rounded-3xl z-10 flex flex-col p-3 2xl:px-5 2xl:py-4 ease-in-out duration-300 border border-grey-4 after:ease-in-out after:duration-500 after:absolute after:backdrop-blur-md after:rounded-3xl after:shadow-glass-dropdown after:inset-0 before:absolute before:inset-0 before:rounded-3xl before:ease-in-out before:duration-500 before:backdrop-blur-2.5xl before:bg-gradient-to-r before:from-grey-5/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 group-hover:translate-x-6 {connector.selectedForDeletion
				? 'after:bg-radial-red after:opacity-70'
				: 'after:bg-grey-5 after:opacity-10'}"
			on:click={handleControlClick}
		>
			<div class="space-y-2 flex-1 flex flex-col relative z-10">
				<div class="flex flex-1 flex-wrap flex-row-reverse justify-between items-start gap-2">
					<div class="flex items-center flex-row-reverse flex-nowrap gap-1.5 shrink-0">
						<!-- Delete Button -->
						<NewIcon
							name="cross"
							size="small"
							style="cursor:pointer;"
							class="rounded-full {connector.selectedForDeletion
								? 'hover:bg-white hover:text-red text-white'
								: 'hover:bg-red hover:text-white text-red'}"
							on:click={() => {
								if (connector && connector.id) {
									handleOpenDeleteModal(connector.id);
								}
							}}
						/>

						<div class="flex items-center gap-1.5">
							<NewIcon
								name="setting-solid"
								size="small"
								style="cursor:pointer;"
								on:click={handleSettingsClick}
							/>

							<Tooltip>
								<NewIcon
									name={connector.enabled ? 'check' : 'loading'}
									class="{connector.enabled
										? 'bg-radial-green-3'
										: 'bg-grey hover:animate-spin-slow'} rounded-full p-1 "
									interactive={true}
									size="small"
								/>
								<svelte:fragment slot="content">
									{connector.enabled ? 'Successful' : 'Pending'}
								</svelte:fragment>
							</Tooltip>
						</div>
					</div>
					<div class="flex gap-3 items-start flex-1">
						<Icon
							data={getPlatformIcon()}
							class="shrink-0 w-9 h-9"
							stroke="transparent"
							color="currentColor"
						/>

						<div class="space-y-1.5">
							<h2 class="text-sm font-semibold">{connector.name}</h2>
							<p class="text-xs leading-none">{connector.id}</p>
						</div>
					</div>
				</div>
				<div class="flex justify-between gap-2 pl-12">
					{#if connector.selectedForDeletion}
						<p class="flex-1 font-semibold text-white">
							{connector.enabled ? 'Active' : 'Inactive'}
						</p>
					{:else}
						<p
							class="flex-1 font-semibold text-transparent bg-clip-text {connector.enabled
								? 'bg-radial-green'
								: 'bg-radial-red'}"
						>
							{connector.enabled ? 'Active' : 'Inactive'}
						</p>
					{/if}
					<Switch
						name="checkbox-for-card-{connector.id}"
						bind:value={connector.enabled}
						on:change={(e) => {
							handleEnablingConnector(e.detail);
						}}
					/>
				</div>
			</div>
		</div>

		<div
			class="absolute inset-y-0 left-0 leading-none rounded-3xl pr-2 pl-12 flex justify-center items-center text-center font-medium drop-shadow-lg p-1 text-xs text-white rotate-180 text-mixed writing-rl shadow-metaInside ease-in-out duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full
			{connector.connectorPlatformType == 'source' ? 'bg-purple-box-2' : 'bg-green-box'}"
		>
			{connector.connectorPlatformType == 'source' ? 'Source' : 'Destination'}
		</div>
	</div>
{/if}
