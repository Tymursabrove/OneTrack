<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	import ProcessingFeesModal from './ProcessingFeesModal.svelte';
	import ProductionCostModel from './ProductionCostModel.svelte';
	import OtherExpesesModel from './OtherExpensesModel.svelte';
	import { fly } from 'svelte/transition';

	function processingFeesOpen() {
		closeModal();
		openModal(ProcessingFeesModal, {});
	} 
	function ProductionCostOpen() {
		closeModal();
		openModal(ProductionCostModel, {});
	} 
	function OtherExpesesModelOpen() {
		closeModal();
		openModal(OtherExpesesModel, {});
	} 

	export let isOpen: boolean;

	 
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
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-4xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl" >
			<div class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 xl:p-10 space-y-4 sm:space-y-7" >
				 <h3 class="text-2xl sm:text-4xl font-bold text-white">Data Settings</h3>
				 <div class="sm:grid sm:grid-cols-2 flex flex-col gap-5 pb-3">
					<button on:click={processingFeesOpen} class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:bg-blue-box before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300">
						<span class="relative z-10 p-4 sm:px-7 block text-left">
							<span class="text-xl sm:text-2xl font-semibold block">Processing Fees</span>
							<span class="text-sm">Add payment gateway charges</span>
						</span>
					</button>
					<button on:click={ProductionCostOpen} class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:bg-blue-box before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300">
						<span class="relative z-10 p-4 sm:px-7 block text-left">
							<span class="text-xl sm:text-2xl font-semibold block">Production Costs (COGS)</span>
							<span class="text-sm">Set your costs of goods sold</span>
						</span>
					</button>
					<button on:click={OtherExpesesModelOpen} class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:bg-blue-box before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300">
						<span class="relative z-10 p-4 sm:px-7 block text-left">
							<span class="text-xl sm:text-2xl font-semibold block">Other Expenses</span>
							<span class="text-sm">Add any other expenses you have</span>
						</span>
					</button>
				 </div>
			</div>
			
		</div>
	</div>
{/if}
