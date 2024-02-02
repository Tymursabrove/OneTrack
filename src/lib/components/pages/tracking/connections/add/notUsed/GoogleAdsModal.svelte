<script>
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import Tab from './TabGoogleAds.svelte';
	import SelectionDropDown from '../../../../connections/SelectionDropDown.svelte';
	import SelectionTriggerDropDown from '../../../../connections/SelectionTriggerDropDown.svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';
	
	let showDropdown = false;
	export let isOpen;

	let tabItems = ['Google Ads Tag', 'Trigger Configuration'];
	let activeItem = 'Google Ads Tag';

	const triggerTabChange = (event) => {
		activeItem = event.detail;
	};
	let pixelsIds = [];
	let conversionAPIs = [];

	onMount(async () => {
		pixelsIds = [];
		conversionAPIs = [];
		addEmptyItemInPixelIDs();
		addEmptyItemInConverAPIs();
	});
	function addEmptyItemInPixelIDs() {
		pixelsIds.push({ name: '', value: '', id: uniqueId() });
		pixelsIds = pixelsIds;
	}
	function addEmptyItemInConverAPIs() {
		conversionAPIs.push({ name: '', value: '', id: uniqueId() });
		conversionAPIs = conversionAPIs;
	}
	function removeItemFromPixelIds(id) {
		pixelsIds = pixelsIds.filter((x) => x.id != id);
	}
	function removeItemFromConversionApis(id) {
		conversionAPIs = conversionAPIs.filter((x) => x.id != id);
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center "
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
		<div class="flex flex-col max-h-screen relative z-10 w-full gap-2 mv:gap-0 max-w-3xl flex-1 ">
			<Tab {tabItems} {activeItem} on:tabChange={triggerTabChange} />
			<!-- py-3 xs:py-5 sm:py-8  -->
			<div
				class="flex-1 flex flex-col rounded-3xl mv:rounded-tl-none bg-color text-left transition-all py-3 w-full max-h-full border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl mv:before:rounded-tl-none"
			>
				<div
					class="relative overflow-auto max-w-full flex-1 on-hover-scroll transform rounded-3xl flex flex-col xs:max-h-[calc(100vh-5rem)] max-h-[calc(100vh-10rem)] py-5"
				>
					{#if activeItem === 'Google Ads Tag'}
						<div class="flex flex-col">
							<div class="space-y-7 flex-1 min-h-96 ">
								<div class="space-y-1 flex items-center gap-3 px-3 sm:px-5 lg:px-10">
									<span class="shrink-0">
										<Icon data={Icons.googleAdsIcon} class="w-10" />
									</span>
									<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
										Google Ads
									</h2>
								</div>

								<div class="divide-y divide-grey border-b border-grey gap-10 pb-8 flex flex-col">
									<div
										class="xs:grid xs:grid-cols-2 gap-5 pt-10 first-of-type:pt-0 px-3 sm:px-5 lg:px-10"
									>
										<div class="relative w-full flex items-center">
											<label for="account_name" class="sr-only">Name</label>
											<div
												class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
											>
												<input
													class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
													type="text"
													id="account_name"
													placeholder="Account Name"
													name="account_name"
												/>
											</div>
										</div>
									</div>
									<div class="pt-8 first-of-type:pt-0 space-y-3 px-3 sm:px-5 lg:px-10">
										<div class="flex justify-between items-center gap-3 w-full">
											<h4 class="text-lg font-semibold">Pixel ID</h4>
										</div>

										<div class="flex flex-col xs:flex-row flex-wrap gap-3 ">
											<div class="relative flex-1 flex items-center">
												<label for="conversion_id" class="sr-only">Conversion ID</label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
												>
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id="conversion_id"
														placeholder="Conversion ID"
														name="conversion_id"
													/>
												</div>
											</div>
											<div class="relative flex-1 flex items-center">
												<label for="conversion_label" class="sr-only">Conversion Label</label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
												>
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id="conversion_label"
														placeholder="Conversion Label"
														name="conversion_label"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex gap-4 justify-end p-3 pb-0 sm:p-5 sm:pb-0 lg:px-10 mt-auto">
								<button
									type="button"
									on:click={closeModal}
									class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
									><span class="relative z-10 leading-none">Cancel</span></button
								>

								<button
									on:click={closeModal}
									type="button"
									class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
									><span class="relative z-10 leading-none">Save</span></button
								>
							</div>
						</div>
					{:else}
						<div class="flex flex-col">
							<div class="space-y-7 flex-1 min-h-96 ">
								<div class="space-y-1 flex items-center gap-3 px-3 sm:px-5 lg:px-10">
									<span class="shrink-0">
										<Icon data={Icons.googleAdsIcon} class="w-10" />
									</span>
									<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
										Google Ads
									</h2>
								</div>
								<div class="space-y-7 px-3 sm:px-5 lg:px-10">
									<div class="flex justify-between items-center gap-3 w-full">
										<h4 class="text-lg font-semibold">Trigger Configuration</h4>
									</div>
									<div class="flex flex-col xs:flex-row flex-wrap gap-3 ">
										<div class="relative flex-1 flex items-center">
											<SelectionDropDown
												id="trigger-type-dropdown"
												title="Trigger Type"
												list={[
													{
														id: 'item_1',
														state: false,
														name: 'lorem ipsum'
													},
													{
														id: 'item_2',
														state: false,
														name: 'lorem ipsum'
													},
													{
														id: 'item_3',
														state: false,
														name: 'lorem ipsum'
													},
													{
														id: 'item_4',
														state: false,
														name: 'lorem ipsum'
													},
													{
														id: 'item_5',
														state: false,
														name: 'lorem ipsum'
													}
												]}
												on:selectionChange={(e) => {}}
											/>
										</div>

										<div class="relative flex-1 flex items-center">
											<label for="event_name" class="sr-only">Event name</label>
											<div
												class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
											>
												<input
													class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
													type="text"
													id="event_name"
													placeholder="Event name"
													name="event_name"
												/>
											</div>
										</div>
									</div>

									<div class="flex flex-col">
										<p class="text-base leading-none pb-3">This trigger fires on</p>
										{#each pixelsIds as item (item.id)}
											<div
												class="relative before:border-l before:border-white before:absolute before:inset-y-0 before:left-6 w-full "
												>
												<div class="flex gap-x-5 sm:gap-x-10 items-start relative w-full pb-5">
													<!-- if id number == 1 -->
													<div
														class="bg-color text-white text-sm rounded p-3 shrink-0 relative before:border-t before:border-white before:absolute before:w-5 sm:before:w-10 sm:before:-right-10 before:-right-5 before:top-1/2 before:-translate-y-1/2 after:absolute after:inset-0 after:rounded after:bg-blue/20 after:border-blue after:border-2 hidden"
													>
														<span class="relative z-10">All</span>
													</div>
													<!-- {:else} -->

													<button
														class="bg-color text-white text-sm rounded p-3 shrink-0 relative before:border-t before:border-white before:absolute before:w-5 sm:before:w-10 sm:before:-right-10 before:-right-5 before:top-1/2 before:-translate-y-1/2 after:bg-radial-green after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 border-2   {showDropdown
															? 'after:border-white after:bg-white/10 border-white'
															: 'after:opacity-20 after:border-green border-green'}"
														on:click={() => {
															showDropdown = !showDropdown;
														}}
													>
														<span class="relative z-10 flex gap-2 items-center"
															><span>And</span>
															<Icon
																data={Icons.triangleSymbolIcon}
																class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
																color="currentColor"
															/>
														</span>
														{#if showDropdown}
															<div class="relative flex flex-col z-10" transition:slide>
																<button
																	type="button"
																	class="outline-none py-1 text-sm text-left hidden">And</button
																>
																<button type="button" class="outline-none pt-1 text-sm text-left"
																	>Or</button
																>
															</div>
														{/if}
													</button>

													<!-- {/if} -->

													<div class="flex flex-col gap-10 flex-1 ">
														{#each conversionAPIs as item (item.id)}
															<div class="flex-1 flex gap-x-3 items-start">
																<div class="space-y-5 w-full">
																	<div
																		class="flex-1 relative rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0 "
																	>
																		<div
																			class="relative p-3 flex flex-col divide-y divide-grey space-y-2"
																		>
																			<div class="w-full relative ">
																				<SelectionTriggerDropDown
																					id="trigger-selection-dropdown"
																					title="Select event"
																					list={[
																						{
																							id: 'item_1',
																							state: false,
																							name: 'Watched ad'
																						},
																						{
																							id: 'item_2',
																							state: false,
																							name: 'Clicked ad'
																						},
																						{
																							id: 'item_3',
																							state: false,
																							name: 'Added to cart'
																						},
																						{
																							id: 'item_4',
																							state: false,
																							name: 'Deleted from cart'
																						},
																						{
																							id: 'item_5',
																							state: false,
																							name: 'Purchased'
																						}
																					]}
																					on:selectionChange={(e) => {}}
																				/>
																			</div>
																			<div
																				class="pt-2 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-grey relative  gap-3 items-center"
																			>
																				<div class="flex-1 w-full ">
																					<SelectionTriggerDropDown
																						id="trigger-property-dropdown"
																						title="Select property"
																						list={[
																							{
																								id: 'item_1',
																								state: false,
																								name: 'click'
																							},
																							{
																								id: 'item_2',
																								state: false,
																								name: 'page view'
																							},
																							{
																								id: 'item_3',
																								state: false,
																								name: 'purchase'
																							},
																							{
																								id: 'item_4',
																								state: false,
																								name: 'add to cart'
																							},
																							{
																								id: 'item_5',
																								state: false,
																								name: 'delete from cart'
																							},
																							{
																								id: 'item_6',
																								state: false,
																								name: 'ad view'
																							},
																							{
																								id: 'item_7',
																								state: false,
																								name: 'xxx'
																							}
																						]}
																						on:selectionChange={(e) => {}}
																					/>
																				</div>
																				<div class="sm:pl-3 pt-3 sm:pt-0 w-full sm:w-28">
																					<SelectionTriggerDropDown
																						id="trigger-equals-dropdown"
																						title="Equals"
																						list={[
																							{
																								id: 'item_1',
																								state: false,
																								name: '<'
																							},
																							{
																								id: 'item_2',
																								state: false,
																								name: '>'
																							},
																							{
																								id: 'item_3',
																								state: false,
																								name: '<='
																							},
																							{
																								id: 'item_4',
																								state: false,
																								name: '>='
																							}
																						]}
																						on:selectionChange={(e) => {}}
																					/>
																				</div>
																				<div
																					class="sm:pl-3 pt-2 sm:pt-0 w-full flex-1 flex items-center"
																				>
																					<input
																						type="text"
																						class="w-full h-8 bg-transparent border border-transparent ease-in-out duration-300 focus:border-blue rounded-md px-2 outline-none placeholder-white"
																						placeholder="value"
																					/>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div class="flex gap-3">
																		<button
																			class="border-2 border-green rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-1 px-3 font-semibold outline-none after:bg-radial-green after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-40 after:opacity-0 after:rounded uppercase "
																			on:click={addEmptyItemInConverAPIs}
																			><span class="relative z-10 leading-none block text-center"
																				>+ AND</span
																			></button
																		>
																		<button
																			on:click={addEmptyItemInConverAPIs}
																			class="border-2 border-yellow rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-1 px-3 font-semibold outline-none after:bg-radial-yellow after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-40 after:opacity-0 after:rounded uppercase w-20 hover:shadow-glow-yellow"
																			><span class="relative z-10 leading-none block text-center"
																				>+ Or</span
																			></button
																		>
																	</div>
																</div>
																<button
																	on:click={() => {
																		removeItemFromConversionApis(item.id);
																	}}
																	class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300"
																	><span class="relative z-10 "
																		><Icon
																			data={Icons.crossIcon}
																			stroke="transparent"
																			class="w-5"
																		/></span
																	></button
																>
															</div>
														{/each}
													</div>
												</div>
											</div>
										{/each}

										<div class="flex justify-start">
											<button
												on:click={addEmptyItemInPixelIDs}
												class="border border-blue rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-2 px-5 font-semibold outline-none after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:opacity-0 after:rounded hover:shadow-glow-blue"
												><span class="relative z-10 leading-none block text-center"
													>+ Add Condition</span
												></button
											>
										</div>
									</div>
								</div>
							</div>
							<div class="flex gap-4 justify-end p-3 pb-0 sm:p-5 sm:pb-0 lg:px-10 mt-auto">
								<button
									type="button"
									on:click={closeModal}
									class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
									><span class="relative z-10 leading-none">Cancel</span></button
								>

								<button
									on:click={closeModal}
									type="button"
									class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
									><span class="relative z-10 leading-none">Save</span></button
								>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
