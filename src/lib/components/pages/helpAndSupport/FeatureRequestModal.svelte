<script>
	import { closeModal, openModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	export let isOpen;
	
</script>

{#if isOpen} 


<div
	class="fixed inset-0 z-50 flex p-3 items-center justify-center " in:fly="{{ y: -50, duration: 500 }}" out:fly="{{ y: -50, duration: 300 }}"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<button type="button" class="fixed inset-0 bg-black/70 transition-opacity cursor-default" on:click={closeModal} />

	 
		<div class="relative  transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 sm:w-full sm:max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"		>
			<div class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform  rounded-3xl space-y-8"		>
				
				<div class="w-full flex flex-col relative z-10 p-5 xs:p-10 space-y-5">
					<div class="space-y-1.5 text-left">
						<h2 class="text-xl text-white leading-none font-medium flex gap-1">
							Which feature are you missing?
						</h2>
						<p class="text-sm leading-none text-grey-2">
							Your request will be processed asap.
						</p>
					</div>
					<div class="flex flex-col gap-5">
						<div class="relative w-full">
							<label for="name" class="sr-only">Name</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									id="name"
									name="name"
									placeholder="Name"
								/>
							</div>
						</div>

						<div class="relative w-full">
							<label for="phone" class="sr-only">Phone</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="tel"
									id="phone"
									name="phone"
									placeholder="Phone"
								/>
							</div>
						</div>
 

						<div class="relative w-full">
							<label for="feature" class="sr-only">Describe the feature you are missing.</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<textarea
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-32 w-full"
									id="feature"
									name="feature"
									placeholder="Describe the feature you are missing."
								/>
							</div>
						</div>
						<div class="relative w-full">
							<label for="reason" class="sr-only">Why do you need this feature?</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<textarea
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-32 w-full"
									id="reason"
									name="reason"
									placeholder="Why do you need this feature?"
								/>
							</div>
						</div>

						<div class="pt-2 gap-4 flex justify-end">
							<button
								type="button" on:click={closeModal}
								class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
								><span class="relative z-10 leading-none">Cancel</span></button
							>
							<button
								type="button"
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
								><span class="relative z-10 leading-none">Submit</span></button
							>
						</div>
					</div>
				</div>



				 
		
			</div>
		</div>
</div>








{/if}







 