<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import { showErrorMessage, showMessage } from '$lib/services/ToastService';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import type { DestinationConnector } from '$lib/types/Types';
	import { UpdateConnector } from '$lib/services/HttpConnectorsRequests';
	import { Workspace } from '$lib/store';
	import { get } from 'svelte/store';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';

	export let isOpen: boolean;
	export let icon: string = Icons.worldWideWebIcon;
	export let title: string = '';
	export let connector: DestinationConnector;

	async function handleSaveClick() {
		if (!connector.name) {
			showErrorMessage('Account name is required');
			return;
		}
		if (!connector.data.pixelId) {
			showErrorMessage('Pixel Id value is required');
			return;
		}
		if (!connector.data.apiKey) {
			showErrorMessage('Conversion API value is required');
			return;
		}
		if (!connector.data.testCode) {
			connector.data.testCode = '';
		}
		showMessage(`Updating connector...`, '', 'info');
		let workspace = get(Workspace);
		if (!workspace || workspace == 'init') {
			return;
		}
		let response = await UpdateConnector(workspace.id, connector);
		if (response.error) {
			showErrorMessage(`Failed to update connector`);
			return;
		}
		await ReloadWorkspaces();
		showMessage(`Successfully updated connector`, '', 'success');
		closeModal();
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
			class="relative z-10 transform max-h-full flex flex-col text-left transition-all p-3 sm:my-5 w-full max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:py-5 sm:py-8 space-y-7"
			>
				<div class="space-y-1 flex gap-3 px-3 sm:px-5 lg:px-10">
					<span class="shrink-0"><Icon data={icon} stroke="transparent" class="w-10" /></span>
					<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">{title}</h2>
				</div>
				<div class="divide-y divide-grey space-y-10">
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
									bind:value={connector.name}
								/>
							</div>
						</div>
					</div>

					<div
						class="pt-8 flex flex-col xs:grid xs:grid-cols-12 gap-3 xs:items-center px-3 sm:px-5 lg:px-10"
					>
						<div class="col-span-4">
							<label for="item_value" class="text-lg font-medium">Pixel</label>
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
								bind:value={connector.data.pixelId}
							/>
						</div>
					</div>

					<div
						class="pt-8 flex flex-col xs:grid xs:grid-cols-12 gap-3 xs:items-center px-3 sm:px-5 lg:px-10"
					>
						<div class="col-span-4">
							<label for="ConverAPIs_value" class="text-lg font-medium">Conversion API</label>
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
								bind:value={connector.data.apiKey}
							/>
						</div>
					</div>

					<div class="pt-8 px-3 sm:px-5 lg:px-10 space-y-10">
						<div class="flex flex-col xs:grid xs:grid-cols-12 gap-3 xs:items-center">
							<div class="col-span-4">
								<label for="test_code" class="text-lg font-medium">Test Code</label>
							</div>
							<div
								class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full col-span-8"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									placeholder="Test Code"
									bind:value={connector.data.testCode}
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
									id="meta-status"
									checked={connector.enabled}
									onChange={(e) => {
										connector.enabled = e;
									}}
									classes="relative cursor-pointer"
									span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="flex gap-4 justify-end p-3 pb-0 sm:p-5 sm:pb-0 lg:px-10">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>

					<button
						on:click={handleSaveClick}
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Save</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
