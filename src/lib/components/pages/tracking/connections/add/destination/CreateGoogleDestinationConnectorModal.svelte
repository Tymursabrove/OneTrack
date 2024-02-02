<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/common/Icon.svelte';
	import { goto } from '$app/navigation';
	import { showErrorMessage } from '$lib/services/ToastService';
	import { DestinationConnectorsQue } from '$lib/store';
	import Button from '$lib/components/common/Button.svelte';
	import Switch from '$lib/components/common/Switch.svelte';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';

	export let isOpen: boolean;
	export let icon: SpriteIconName = 'world-wide-web';
	export let title: string = '';
	export let connectorType: 'GoogleAnalytics4';

	let accountName = '';
	let measurementId: string = '';
	let apiKey: string = '';
	let active = true;

	async function handleSaveClick() {
		if (!accountName) {
			showErrorMessage('Account name is required');
			return;
		}
		if (!measurementId) {
			showErrorMessage('Measurement Id value is required');
			return;
		}
		if (!apiKey) {
			showErrorMessage('API Secret is required');
			return;
		}
		closeModal();

		let newConnector = {
			enabled: true,
			name: accountName,
			data: {
				measurementId: measurementId,
				apiSecret: apiKey,
				postbackEnabled: active
			},
			type: connectorType
		};
		DestinationConnectorsQue.set([newConnector]);
		goto('/tracking/connections');
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex p-3 items-center justify-center"
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative z-10 transform max-h-full flex flex-col text-left transition-all py-3 sm:my-5 w-full max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:py-5 sm:py-8 space-y-7"
			>
				<div class="space-y-1 flex gap-3 px-3 sm:px-5 lg:px-10">
					<span class="shrink-0"><Icon name={icon} size="large" /></span>
					<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">{title}</h2>
				</div>
				<div class="divide-y divide-grey-4 space-y-10">
					<div class="xs:grid xs:grid-cols-2 gap-5 pt-10 first-of-type:pt-0 px-3 sm:px-5 lg:px-10">
						<div class="relative w-full flex items-center">
							<label for="account_name" class="sr-only">Name</label>
							<div
								class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									id="account_name"
									placeholder="Account Name"
									name="account_name"
									bind:value={accountName}
								/>
							</div>
						</div>
					</div>

					<div
						class="pt-8 flex flex-col xs:grid xs:grid-cols-12 gap-3 xs:items-center px-3 sm:px-5 lg:px-10"
					>
						<div class="col-span-4">
							<label for="item_value" class="text-lg font-medium">Measurement ID</label>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full col-span-8"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								id="item_value"
								placeholder="Pixel ID"
								name="item_value"
								bind:value={measurementId}
							/>
						</div>
					</div>

					<div
						class="pt-8 flex flex-col xs:grid xs:grid-cols-12 gap-3 xs:items-center px-3 sm:px-5 lg:px-10"
					>
						<div class="col-span-4">
							<label for="ConverAPIs_value" class="text-lg font-medium">API Secret</label>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full col-span-8"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								id="ConverAPIs_value"
								placeholder="Conversion API Value"
								name="ConverAPIs_value"
								bind:value={apiKey}
							/>
						</div>
					</div>

					<div class="pt-8 px-3 sm:px-5 lg:px-10 space-y-10">
						<div class="grid grid-cols-12 gap-3 items-center">
							<div class="col-span-4">
								<label for="meta-status" class="text-lg font-medium">Active</label>
							</div>
							<div class="col-span-8">
								<Switch
									bind:value={active}
									on:change={(e) => {
										active = e.detail;
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="flex gap-4 justify-end p-3 pb-0 sm:p-5 sm:pb-0 lg:px-10">
					<Button on:click={closeModal} text="Cancel" variant="error" rounded={true} action="secondary"/>
					<Button on:click={handleSaveClick} text="Save" rounded={true} />
				</div>
			</div>
		</div>
	</div>
{/if}
