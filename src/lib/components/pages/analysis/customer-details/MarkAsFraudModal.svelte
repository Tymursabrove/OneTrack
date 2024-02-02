<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import exportData from '$lib/components/pages/cohorts/ExportData.svelte';
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/library/Button.svelte';
	 

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
		<div			 
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div class="relative transform max-h-full max-w-md mx-auto flex flex-col p-3 text-left transition-all sm:my-5 sm:w-full sm:max-w-lg rounded-3xl border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar " >
			<div class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl sm:p-10 space-y-14">
				<div class="space-y-3">
					<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
						Mark as Fraud
					</h2>
					<p class="text-center text-lg">Did you detect a fake profile?</p>
				</div>
				<div class="relative flex justify-center">
					<img src="/images/fraud-icon.svg" alt="" />
				</div>
				<div class="space-y-8">
				<p class="text-center text-lg">Mark this profile as fraud.</p>
				<div class="flex gap-3 justify-center">

 
					<Button onClickFunc={closeModal} label="Cancel" theme="before:bg-bglinear-4 after:bg-linear-blue" />
					<Button onClickFunc={closeModal} label="Fraud" theme="before:bg-linear-red after:bg-linear-red-2" />
 
				</div>
			</div>
			</div>
		</div>
	</div>
{/if}
