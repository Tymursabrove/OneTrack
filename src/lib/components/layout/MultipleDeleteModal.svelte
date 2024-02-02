<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal } from 'svelte-modals';
	import { MultipleDeleteQue, Workspace } from '$lib/store';
	import { get } from 'svelte/store';
	import { DeleteConnector } from '$lib/services/HttpConnectorsRequests';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';
	import { fly } from 'svelte/transition';

	export let isOpen: boolean;

	async function confirmDelete() {
		let deleteObjects = get(MultipleDeleteQue);
		if (!deleteObjects || deleteObjects.length < 1) {
			return;
		}
		for (let delObj of deleteObjects) {
			await DeleteOperation(delObj);
		}
		await ReloadWorkspaces();
		MultipleDeleteQue.set(null);
		closeModal();
	}
	async function DeleteOperation(obj: { type: string; id: string }) {
		let ws = get(Workspace);
		if (!obj || !ws) {
			return;
		}
		await DeleteConnector(ws.id, obj.id);
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex p-3 items-center justify-center "
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-black/90 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div
			class="relative transform max-h-full flex flex-col rounded-3xl bg-color p-3 text-left shadow-xl transition-all sm:my-5 w-full max-w-2xl "
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 xl:p-8 "
			>
				<div class="max-w-lg mx-auto space-y-7 flex flex-col items-center justify-center">
					<Icon data={Icons.redAlertIcon} stroke="transparent" class="w-20" />

					<h2 class="text-2xl xl:text-3xl text-center text-white leading-snug font-semibold ">
						<span>Do you really want to delete {$MultipleDeleteQue?.length} item?</span>
					</h2>

					<div class="flex gap-4 justify-center">
						<button
							on:click={closeModal}
							type="button"
							class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
						>
							<span class="relative z-10 leading-none">No, go back</span>
						</button>

						<button
							type="button"
							on:click={confirmDelete}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none"> Yes, delete</span></button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
