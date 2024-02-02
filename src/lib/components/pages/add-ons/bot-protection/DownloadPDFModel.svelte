<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	// import CheckBox from '$lib/components/layout/CheckBox.svelte';
	// import configrationModal from './configrationModal.svelte';
	import { fly } from 'svelte/transition';
	import PlaceholderDataGrid from '$lib/components/placeholders/PlaceholderDataGrid.svelte';

	// function handleBack() {
	// 	closeModal();
	// 	openModal(configrationModal, {});
	// }

	export let isOpen: boolean;

 
 

  
</script>
 

 
 


 
{#if isOpen}

	<div class="fixed inset-0 z-50 flex p-3 items-center justify-center "
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true" >
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed inset-0 bg-black/70 transition-opacity cursor-default" on:click={closeModal} />
		<div class="relative max-h-full flex flex-col text-left transition-all sm:my-5 w-full max-w-7xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl" >
			<div class="relative max-w-full flex-1 flex flex-col rounded-3xl p-5 xl:px-10 space-y-5" >
				 <div class="flex justify-between gap-5 pt-3">
					<h3 class="text-3xl font-bold">Bot Protection</h3>
					<Icon
					data={Icons.oneTrackLightGreyFullNameIcon}
					class="lg:h-10 h-7"
					fill="currentColor"
					stroke="currentColor"
				/>
				 </div>

			<div class="rounded-xl overflow-hidden space-y-3">
				
				<div
				class="w-full flex-1 overflow-hidden bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 max-w-full"
					>
				<div class="overflow-auto max-w-full flex-1 max-h-96 relative z-20 on-hover-scroll">
					<PlaceholderDataGrid noOfRows={35} />
				</div>
				</div>


				<div class="flex gap-2 px-3 py-5 justify-end">
					<button
						on:click={closeModal}
						type="button"
						class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-28 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
					>
						<span class="relative z-10 leading-none">Cancel</span>
					</button>
					<button
						on:click={closeModal}
						type="button"
						class="  relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
					>
						<span class="relative z-10 leading-none">
							<span class="relative z-10 leading-none">Save</span>
						</span>
					</button>
				</div>

			</div>


			</div>
		</div>
	</div>
{/if}
