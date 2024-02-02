<script>
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import Tab from './Tabs.svelte';
	import { onMount } from 'svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import Tags from '$lib/local-packages/InputTags.svelte';
	export let isOpen = true;

	let tabItems = ['TOFU', 'MOFU', 'BOFU'];
	let activeItem = 'TOFU';

	const triggerTabChange = (event) => {
		activeItem = event.detail;
	};

	let tags = ['Tag', 'Tag 2'];
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

	const platforms = [
		{ icons: Icons.meta, id: 'checkboxLabelOne' },
		{ icons: Icons.google, id: 'checkboxLabelTwo' },
		{ icons: Icons.tiktok, id: 'checkboxLabelThree' },
		{ icons: Icons.snapchatLogo, id: 'checkboxLabelFour' },
		{ icons: Icons.linkedInLogo, id: 'checkboxLabelFive' },
		{ icons: Icons.taboolaLogo, id: 'checkboxLabelsix' },
		{ icons: Icons.outbrainLogo, id: 'checkboxLabelSven' }
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
				<div class="space-y-8 min-h-80">
					<div class="space-y-4">
						<h2 class="text-2xl text-white leading-none font-semibold ">
							<span>New page</span>
						</h2>
						<div class="relative w-full flex items-stretch gap-3  ">
							<label for="search" class="sr-only">Name</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="text"
									id="name"
									placeholder="Name"
									name="name"
								/>
							</div>
						</div>
					</div>

					<div class="space-y-5">
						<div class="flex flex-wrap gap-4 justify-between">
							<div class="space-y-2">
								<h4 class="text-sm font-semibold text-white">Kategory</h4>
								<Tab {tabItems} {activeItem} on:tabChange={triggerTabChange} />
							</div>

							<div class="space-y-2">
								<h4 class="text-sm font-semibold text-white">Platforms</h4>
								<div class="flex flex-wrap items-center gap-3 px-0.5">
									{#each platforms as platform}
										<label
											for={platform.id}
											class="flex cursor-pointer select-none items-center relative"
										>
											<input type="checkbox" id={platform.id} class="sr-only peer" />
											<div
												class="peer-checked:ring-blue peer-checked:shadow-glow-blue relative before:absolute before:bg-dropdown shadow-glass-2 before:opacity-60 before:inset-0 before:backdrop-blur-2.5xl before:rounded-full rounded-full ring-2 ring-grey/80 w-10 h-10 flex justify-center items-center shrink-0  ease-in-out duration-300 "
											>
												<Icon
													data={platform.icons}
													class="w-5 relative z-10"
													stroke="transparent"
												/>
											</div>
										</label>
									{/each}
								</div>
							</div>
						</div>

						{#if activeItem === 'TOFU'}
							<div class="space-y-4 first-of-type:pt-0">
								<!-- https://svelte-tags-input.vercel.app/ Tags Input package used from this site -->
								<div
									class="group relative flex w-full flex-wrap duration-300 ease-in-out before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
								>
									<Tags bind:tags allowPaste={true} placeholder={'Add a new Tag TOFU'} />
								</div>
								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">URL</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											id="url"
											placeholder="URL"
											name="url"
										/>
									</div>
								</div>

								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">Description</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<textarea
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-32 w-full"
											id="Description"
											placeholder="Description"
											name="Description"
										/>
									</div>
								</div>
							</div>
						{:else if activeItem === 'MOFU'}
							<div class="space-y-4 first-of-type:pt-0">
								<!-- https://svelte-tags-input.vercel.app/ Tags Input package used from this site -->
								<div
									class="group relative flex w-full flex-wrap duration-300 ease-in-out before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
								>
									<Tags bind:tags allowPaste={true} placeholder={'Add a new Tag MOFU'} />
								</div>
								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">URL</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											id="url"
											placeholder="URL"
											name="url"
										/>
									</div>
								</div>

								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">Description</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<textarea
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-32 w-full"
											id="Description"
											placeholder="Description"
											name="Description"
										/>
									</div>
								</div>
							</div>
						{:else}
							<div class="space-y-4 first-of-type:pt-0">
								<!-- https://svelte-tags-input.vercel.app/ Tags Input package used from this site -->
								<div
									class="group relative flex w-full flex-wrap duration-300 ease-in-out before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
								>
									<Tags bind:tags allowPaste={true} placeholder={'Add a new Tag BOFU'} />
								</div>
								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">URL</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											id="url"
											placeholder="URL"
											name="url"
										/>
									</div>
								</div>

								<div class="relative w-full flex items-stretch gap-3  ">
									<label for="search" class="sr-only">Description</label>
									<div
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<textarea
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue
                                   focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-32 w-full"
											id="Description"
											placeholder="Description"
											name="Description"
										/>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="flex gap-4 justify-end pt-2">
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
						><span class="relative z-10 leading-none">Submit</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
