<script>
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';	
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	

	export let isOpen;

	let pixelsIds = [];

	onMount(async () => {
		pixelsIds = [];

		addEmptyItemInPixelIDs();
	});
	function addEmptyItemInPixelIDs() {
		pixelsIds.push({ name: '', value: '', id: uniqueId() });
		pixelsIds = pixelsIds;
	}

	function removeItemFromPixelIds(id) {
		pixelsIds = pixelsIds.filter((x) => x.id != id);
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
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
		<div class="flex flex-col max-h-screen relative z-10 w-full gap-2 mv:gap-0 max-w-3xl flex-1">
			<div
				class="flex-1 flex flex-col text-left shadow-xl w-full max-h-full py-3 xs:p-5 xl:p-8 rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
			>
				<div
					class="relative overflow-auto max-w-full flex-1 on-hover-scroll flex flex-col xs:max-h-[calc(100vh-5rem)] max-h-[calc(100vh-10rem)]"
				>
					<div class="space-y-2">
						<h2 class="text-2xl text-white leading-none font-semibold">
							<span>Domain Connector</span>
						</h2>
					</div>
					<div class="space-y-5 pt-3">
						<div class="space-y-7">
							<div class="space-y-2">
								<label for="name" class="text-base leading-none">Give your Domain a Name</label>
								<div
									class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="name"
										placeholder="Name"
										name="name"
									/>
								</div>
							</div>
							<div class="space-y-2">
								<label for="domain-connector-XYZ" class="text-base leading-none"
									>We automatically set up this Domain Connector for you:</label
								>
								<div
									class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
								>
									<input
										class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="domain-connector-XYZ"
										placeholder="Domain Connector XYZ"
										name="domain-connector-XYZ"
									/>
								</div>
							</div>
							<div class="space-y-3">
								<p class="text-base leading-none">
									If you want to add additional Domain Connectors, add them here:
								</p>
								{#each pixelsIds as item, i (item.id)}
									<div class="relative w-full flex items-stretch gap-3">
										<div
											class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												id={item.id}
												placeholder="Name"
												name={item.id}
											/>
										</div>
										<div
											class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												id={item.id}
												placeholder="Domain Connector"
												name={item.id}
											/>
										</div>
										<div class="flex items-stretch shrink-0">
											{#if i < pixelsIds.length - 1}
												<button
													on:click={() => {
														removeItemFromPixelIds(item.id);
													}}
													class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 w-12"
												>
													<span class="relative z-10 flex justify-center"
														><Icon data={Icons.crossIcon} stroke="transparent" class="w-5" /></span
													>
												</button>
											{:else}
												<button
													class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl shrink-0 w-12"
													on:click={addEmptyItemInPixelIDs}
												>
													<span class="relative z-10 flex justify-center">
														<Icon data={Icons.plus} stroke="transparent" class="w-4" />
													</span>
												</button>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>
						<div class="flex gap-4 justify-center py-5 -mb-5">
							<button
								type="button"
								on:click={closeModal}
								class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
								><span class="relative z-10 leading-none">Cancel</span></button
							>

							<button
								type="button"
								on:click={closeModal}
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
								><span class="relative z-10 leading-none">Done</span></button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
