<script>
	import { closeModal, openModal } from 'svelte-modals'; 
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import sourceDomainStep4Model from './sourceDomainStep4Model.svelte';
	export let isOpen = true;
	function domainNextStepOpen() {
		closeModal();
		openModal(sourceDomainStep4Model, {});
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
		<div
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl" >
			<div class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 xl:p-8 space-y-7" >
				<div class="space-y-4 px-3 min-h-80">
					<div class="space-y-1.5">
						<h2 class="text-2xl text-white leading-none font-semibold ">
							<span>SSL Certificate</span>
						</h2>
						<p class="text-base leading-none">Create your SSL certificate.</p>
					</div>

					<div class="space-y-3">
						<div class="flex gap-2 items-center">
							<div class="relative w-full flex items-center">
								<label for="Key" class="sr-only">Key</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								    >
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="Key"
										placeholder="Key"
										name="Key"
									/>
								</div>
							</div>
							<div class="shrink-0 w-12">
								<button
								class="w-12 h-12 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
								><span class="relative z-10 leading-none">
									<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-5" /></span></button
								>
							</div>
						</div>

                        <div class="flex gap-2 items-center">
							<div class="relative w-full flex items-center">
								<label for="Value" class="sr-only">Value</label>
								<div
									class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								    >
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="Value"
										placeholder="Value"
										name="Value"
									/>
								</div>
							</div>
							<div class="shrink-0 w-12">
								<button
								class="w-12 h-12 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
								><span class="relative z-10 leading-none">
									<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-5" /></span></button
								>
							</div>
						</div>
					</div>
				</div>

				<div class="space-y-3">
					<div class="flex gap-3 justify-center items-start py-2">
						<button type="button" class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
							><span class="sr-only">Step 1</span></button
						>
						<button type="button" class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
							><span class="sr-only">Step 2</span></button
						>
						<button type="button" class="relative w-4 h-4 rounded-full bg-blue-box"
							><span class="sr-only">Step 3</span></button
						>
					</div>
					<div class="flex gap-4 justify-center">
						<button
							type="button"
							on:click={closeModal}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none">Cancel</span></button
						>

						<button
							on:click={domainNextStepOpen}
							type="button"
							class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							><span class="relative z-10 leading-none">Finish</span></button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
