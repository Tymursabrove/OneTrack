<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import Loading from '$lib/components/layout/Loading.svelte';
	import successModel from '$lib/components/pages/cohorts/SuccessModel.svelte';
	import { fly } from 'svelte/transition';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';

	export let isOpen: boolean;
	export let platform: string;

	function handleExportOpenModel() {
		closeModal();
		openModal(successModel, {});
	}
	let accounts = [
		{
			name: 'I AM NAME',
			ID: 'gfjziörhulk66hzojh57k6g68'
		},
		{
			name: 'I AM NAME',
			ID: 'gfjziörhulk66hzojh57k6g68'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49385'
		},
		{
			name: 'I AM NAME',
			ID: 'gfjziörhulk66hzojh57k6g68'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49387'
		},
		{
			name: 'I AM NAME',
			ID: 'gfjziörhulk66hzojh57k6g68'
		},
		{
			name: 'I AM NAME',
			ID: 'gfjziörhulk66hzojh57k6g68'
		}
	];
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
		<button
			type="button"
			class="fixed inset-0 bg-black/90 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative max-w-md mx-auto transform max-h-full flex flex-col rounded-3xl bg-color p-3 text-left shadow-xl transition-all sm:my-5 sm:w-full sm:max-w-lg "
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform  rounded-3xl  sm:p-10 space-y-8"
			>
				<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
					Export Data
				</h2>
				<div class="relative flex justify-center">
					{#if accounts.length > 0}
						<table class="w-auto min-w-96 table-fixed">
							{#each accounts as account}
								<tr>
									<td class="w-12 h-12" valign="middle">
										<div class="relative h-auto leading-none">
											<CheckBox
												labelClass="relative z-10 leading-none"
												label=""
												id="account-{account.ID}"
												classes="relative cursor-pointer"
												span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
												onChange={() => {}}
											/>
										</div>
									</td>
									<td class="w-32 h-12 px-5 text-center" valign="middle">
										<Icon data={platform} class="w-8 h-8 mx-auto" />
									</td>
									<td class="py-2" valign="middle">
										<div class="space-y-2">
											<p class="text-sm leading-none text-white">
												<b class="font-semibold">Name:</b>
												{account.name}
											</p>
											<p class="text-sm leading-none text-white">
												<b class="font-semibold">ID:</b>
												{account.ID}
											</p>
										</div>
									</td>
								</tr>
							{/each}
						</table>
					{:else}
						<Loading />
					{/if}
				</div>

				<div class="flex gap-4 justify-center">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>
					<button
						type="button"
						on:click={handleExportOpenModel}
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Export</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
