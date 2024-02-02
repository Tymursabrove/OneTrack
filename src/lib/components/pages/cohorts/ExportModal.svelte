<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import exportData from '$lib/components/pages/cohorts/ExportData.svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';

	export let isOpen: boolean;

	const exportDataModel = [
		{
			icon: Icons.meta,
			name: 'Facebook',
			title: 'export',
			actions: true
		},
		{
			icon: Icons.snapchatIcon,
			name: 'Snapchat',
			title: 'export'
		},
		{
			icon: Icons.tiktok,
			name: 'TikTok',
			title: 'export'
		},
		{
			icon: Icons.google,
			name: 'Google',
			title: 'export'
		},
		{
			icon: Icons.linkedin,
			name: 'LinkedIn',
			title: 'export'
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
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative  transform max-h-full max-w-md mx-auto flex flex-col p-3 text-left transition-all sm:my-5 sm:w-full sm:max-w-lg rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform  rounded-3xl  sm:p-10 space-y-8"
			>
				<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
					Export Profiles
				</h2>
				<div class="relative">
					<table class="w-full table-fixed">
						{#each exportDataModel as { name, icon, title }}
							<tr>
								<td class="w-12 h-12">
									<Icon data={icon} class="w-10 h-10" />
								</td>
								<td class="font-semibold py-5 px-4">{name}</td>
								<td class="text-right">
									<div class="ml-auto flex justify-end">
										<button
											type="button"
											class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-28 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
											on:click={() => {
												closeModal();
												openModal(exportData, { platform: icon, platformName: name });
											}}
											><span class="relative z-10 leading-none"
												><span class="relative z-10 leading-none">{title}</span></span
											></button
										>
									</div></td
								>
							</tr>
						{/each}
					</table>
				</div>

				<div class="flex justify-center">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
