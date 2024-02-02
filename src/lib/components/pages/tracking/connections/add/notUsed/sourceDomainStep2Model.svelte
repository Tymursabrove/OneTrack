<script>
	import { closeModal, openModal } from 'svelte-modals'; 
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from 'svelte/transition';
	import sourceDomainStep3Model from './sourceDomainStep3Model.svelte';
	export let isOpen = true;
	let certificate = false;
	function domainNextStepOpen() {
		closeModal();
		openModal(sourceDomainStep3Model, {});
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
		<div
			class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 xl:p-8 space-y-7"
			>
				<div class="space-y-4 px-3 min-h-80">
					<div class="space-y-1.5">
						<h2 class="text-2xl text-white leading-none font-semibold ">
							<span>Add A Record 2</span>
						</h2>
						<p class="text-base leading-none">Please add the A record to your DNS provider now.</p>
					</div>
					<div class="space-y-3">
						<div class="flex gap-2 items-center">
							<div
								class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full "
							>

							<input class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full pl-20" type="text" id="Value" placeholder="192.0.0.1" name="Value" />
							<label for="search" class="z-10 font-semibold text-sm text-grey-2 absolute left-0 inset-y-0 inline-flex items-center pl-4">Value:</label>
 
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
							<div
								class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full "
							>

							<input class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full pl-20" type="text" id="name" placeholder="one-track" name="name" />
							<label for="name" class="z-10 font-semibold text-sm text-grey-2 absolute left-0 inset-y-0 inline-flex items-center pl-4">Name:</label>
						 
							</div>

							<div class="shrink-0 w-12">
								<button
								class="w-12 h-12 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
								><span class="relative z-10 leading-none">
									<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-5" /></span></button
								>
							</div>
						</div>
						<div class="flex items-center justify-end pt-2">
							<button  on:click={() => {
								certificate = true;
							}} 
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-10 sm:w-auto sm:px-3 2xl:px-5 p-1.5 2xl:p-2 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
							>
								<span class="relative z-10 whitespace-nowrap">Check connection</span>
							</button>
						</div>
					</div>
					{#if certificate}
					<div class="flex justify-center items-center py-5" transition:slide>
						<div class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-2 before:opacity-30 before:inset-0 flex items-center p-3 xl:p-5 " >
							<!-- If certificate will be generated -->
							<div class="space-y-3 flex-1 relative z-10 w-32 ">
								<div class="flex justify-center"><Icon data={Icons.checkGreenIcon} stroke="transparent" class="w-10" /></div>
								<p class="text-xl text-white font-semibold text-center leading-tight">Connection
									successful</p>
							</div>
							<!-- else -->
							<div class="space-y-3 flex-1 relative z-10 w-40 hidden">
								<div class="flex justify-center text-red"><Icon data={Icons.crossIcon} stroke="transparent" class="w-10" /></div>
								<p class="text-xl text-white font-semibold text-center leading-tight">Connection is not generated</p>
							</div>
						</div>
					</div>
					{/if}

				</div>

				<div class="space-y-3">
					<div class="flex gap-3 justify-center items-start py-2">
						<button type="button" class="relative w-4 h-4 rounded-full bg-glass shadow-glass">
							<span class="sr-only">Step 1</span>
						</button>
						<button type="button" class="relative w-4 h-4 rounded-full bg-blue-box">
							<span class="sr-only">Step 2</span>
						</button>
						<button type="button" class="relative w-4 h-4 rounded-full bg-glass shadow-glass">
							<span class="sr-only">Step 3</span>
						</button>
					</div>
					<div class="flex gap-4 justify-center">
						<button
							type="button"
							on:click={closeModal}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none">Cancel</span></button
						>
 
					
						{#if certificate}
						<button
							on:click={domainNextStepOpen}
							type="button"
							class="relative inline-flex items-center justify-center rounded-full border-0 text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none ease-in-out duration-300 focus:ring-offset-2  before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300  after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute hover:shadow-glow-green focus:ring-2 focus:ring-green ring-offset-color before:bg-blue-box hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 shadow-glow-blue"
							><span class="relative z-10 leading-none">Generate SSL Certificate</span></button
						>
						{:else}
						<button							 
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none ease-in-out duration-300 focus:ring-offset-2  before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300  after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute after:opacity-0 bg-grey cursor-default outline-none" disabled
						><span class="relative z-10 leading-none">Generate SSL Certificate</span></button
					>
					{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
