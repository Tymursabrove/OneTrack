<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import type { DeleteSelectableConnectorType } from '$lib/types/Types';
	import { showErrorMessage, showMessage } from '$lib/services/ToastService';
	import { Workspace } from '$lib/store';
	import { get } from 'svelte/store';
	import { UpdateConnector } from '$lib/services/HttpConnectorsRequests';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';

	export let isOpen = false;
	export let name = '';
	export let connector: DeleteSelectableConnectorType;

	async function handleSubmit() {
		let workspace = get(Workspace);
		if (!workspace || workspace == 'init') {
			return;
		}
		if (!connector) {
			return;
		}
		if (!connector.name) {
			showErrorMessage('Name can not be set empty');
			return;
		}
		showMessage(`Updating connector...`, '', 'info');
		let response = await UpdateConnector(workspace.id, connector);
		if (response.error) {
			showErrorMessage(`Failed to update connector`);
			return;
		}
		await ReloadWorkspaces();
		showMessage(`Successfully updated connector`, '', 'success');
		closeModal();
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
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
		<div class="flex flex-col max-h-screen relative z-10 w-full gap-2 mv:gap-0 max-w-lg flex-1 p-3">
			<div
				class="flex-1 flex flex-col text-left w-full max-h-full rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
			>
				<div
					class="relative overflow-auto max-w-full on-hover-scroll flex flex-col max-h-[30rem] p-5 xl:p-8 h-[calc(100vh-5rem)]"
				>
					<div class="space-y-7 flex-1">
						<h2 class="text-2xl text-white text-center leading-none font-semibold">
							{name} Settings
						</h2>
						<div
							class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								placeholder="Name"
								bind:value={connector.name}
							/>
						</div>
						<div class="space-y-3">
							<p class="sm:text-lg text-white font-medium">{name} Tokens</p>
							<button
								type="button"
								on:click={() => {
									showMessage('Enabling token will be available soon.', '', 'info');
								}}
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
								><span class="relative z-10 leading-none">Refresh Token</span></button
							>
							<div class="flex gap-2 pt-10">
								<CheckBox
									labelClass="relative z-10 leading-none"
									label=""
									id="refersh-meta-token"
									classes="relative cursor-pointer"
									span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
								/>
								<label for="refersh-meta-token" class="text-sm sm:text-base"
									>Refresh all {connector.type} Tokens</label
								>
							</div>
						</div>
					</div>
					<div class="flex gap-4 justify-center pt-10">
						<button
							type="button"
							on:click={closeModal}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none">Cancel</span></button
						>

						<button
							type="button"
							on:click={handleSubmit}
							class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							><span class="relative z-10 leading-none">Done</span></button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
