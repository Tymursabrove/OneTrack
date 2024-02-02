<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import {
		showCopiedToClipboardToast,
		showErrorMessage,
		showMessage
	} from '$lib/services/ToastService';
	import { SourceConnectorsQue, Workspace } from '$lib/store';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { OneTrackSourceConnector } from '$lib/types/Types';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';
	import { UpdateConnector } from '$lib/services/HttpConnectorsRequests';
	export let isOpen = true;

	let webhookUrl: string | null = null;
	export let connector: any;

	async function handleSubmit() {
		let workspace = get(Workspace);
		if (!workspace || workspace == 'init') {
			return;
		}
		if (!connector.name) {
			showErrorMessage('Connector name is required');
			return;
		}
		if (!connector.data.secret) {
			showErrorMessage('Signature is required');
			return;
		}
		connector.data.secret = connector.data.secret.trim();
		showMessage(`Updating connector...`, '', 'info');
		let response = await UpdateConnector(workspace.id, connector);
		if (response.error) {
			showErrorMessage(`Failed to update connector`);
			return;
		}
		await ReloadWorkspaces();
		showMessage(`Successfully updated connector`, '', 'success');
		closeModal();
		gotoSourcesPage();
	}
	function gotoSourcesPage() {
		goto('/tracking/connections');
	}
</script>

{#if isOpen}
	{#if connector}
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
				class="relative z-10 transform max-h-full flex flex-col text-left transition-all p-3 sm:my-5 w-full max-w-4xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
			>
				<div
					class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform md:p-5 space-y-7"
				>
					<div class="space-y-7">
						<div class="flex gap-4 items-center">
							<Icon data={Icons.shopify} stroke="transparent" class="w-10 shrink-0" />
							<div class="space-y-2">
								<h2 class="text-xl text-white leading-none font-medium flex gap-1">Shopify</h2>
								<p class="text-sm leading-none">Update shopify webhook connector.</p>
							</div>
						</div>

						<div class="relative w-full flex items-center">
							<label
								for="store_name"
								class="md:text-lg font-semibold leading-none shrink-0 w-28 md:w-40"
								>Store Name</label
							>
							<div
								class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
							>
								<input
									class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									bind:value={connector.name}
									placeholder="Enter your Shopify Store Name here"
								/>
							</div>
						</div>

						<!-- <div class="relative w-full flex items-center gap-5">
							<div
								class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
							>
								<input
									class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full text-blue placeholder-blue font-semibold"
									type="url"
									bind:value={connector.data.host}
									placeholder="https:www.domain.com/webhook"
								/>
							</div>

							<button
								type="button"
								on:click={async () => {
									await navigator.clipboard.writeText(webhookUrl ?? '');
									showCopiedToClipboardToast();
								}}
								class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
								><span class="relative z-10 leading-none">
									<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-8" />
								</span></button
							>
						</div> -->

						<div class="relative w-full flex items-center">
							<label
								for="webhook_signature"
								class="md:text-lg font-semibold leading-none shrink-0 w-28 md:w-60"
								>Webhook Signature</label
							>
							<div
								class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
							>
								<input
									class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									placeholder="Enter the Signature from Shopify here"
									bind:value={connector.data.secret}
								/>
							</div>
						</div>

						<div class="grid grid-cols-12 gap-3 items-center">
							<div class="col-span-4">
								<label for="meta-status" class="text-lg font-medium">Active</label>
							</div>
							<div class="col-span-8">
								<CheckBox
									labelClass="relative z-10 leading-none"
									label=""
									checked={connector.enabled}
									onChange={(e) => {
										connector.enabled = e;
									}}
									id="meta-status"
									classes="relative cursor-pointer"
									span="w-11 h-6 bg-white/10 flex border border-grey-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px after:shadow-checkbox after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-grey after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-white/20"
								/>
							</div>
						</div>
					</div>

					<div class="flex gap-4 justify-end">
						<button
							type="button"
							on:click={closeModal}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none">Cancel</span></button
						>

						<button
							type="button"
							on:click={handleSubmit}
							class="relative inline-flex items-center justify-center rounded-full border-0 text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							><span class="relative z-10 leading-none">Save</span></button
						>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}
