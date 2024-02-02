<script>
	import { closeModal } from 'svelte-modals';
	import { CSVExportQue } from '$lib/store';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { fly } from 'svelte/transition';

	export let isOpen;
	let campaignsSelected = true;
	let adSetsSelected = true;
	let adsSelected = true;
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
			type="button"
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative  transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-sm rounded-3xl border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar" 
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 sm:py-10 space-y-10"
			>
				<div class="space-y-1 px-3">
					<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
						Download your data
					</h2>
					<p class="text-center font-semibold text-sm ">
						Which data sets would you like to download?
					</p>
				</div>
				<div class="relative space-y-5 px-5">
					<CheckBox
						labelClass="relative z-10 leading-none font-medium"
						id="campaigns"
						span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-10 before:absolute before:left-0"
						label="Campaigns"
						classes="relative cursor-pointer block "
						checked={campaignsSelected}
						onChange={(e) => {
							campaignsSelected = e;
						}}
					/>
					<CheckBox
						labelClass="relative z-10 leading-none font-medium"
						id="adSets"
						span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-10 before:absolute before:left-0"
						label="Ad Sets"
						classes="relative cursor-pointer block "
						checked={adSetsSelected}
						onChange={(e) => {
							adSetsSelected = e;
						}}
					/>
					<CheckBox
						labelClass="relative z-10 leading-none font-medium"
						id="ads"
						span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-10 before:absolute before:left-0"
						label="Ads"
						classes="relative cursor-pointer block "
						checked={adsSelected}
						onChange={(e) => {
							adsSelected = e;
						}}
					/>
				</div>

				<div class="flex gap-4 justify-center">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>

					<button
						on:click={() => {
							CSVExportQue.set({
								metaCampaignsSelected: campaignsSelected,
								metaAdSetsSelected: adSetsSelected,
								metaAdsSelected: adsSelected
							});
							closeModal();
						}}
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Download CSV</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
