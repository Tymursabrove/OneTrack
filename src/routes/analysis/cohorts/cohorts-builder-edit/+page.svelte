<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader, clickOutside } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import Tab from '$lib/components/pages/cohorts/TabCohort.svelte';
	import TabLeft from '$lib/components/pages/cohorts/TabCohortLeft.svelte';
	import { slide } from 'svelte/transition';
	import Tags from '$lib/local-packages/InputTags.svelte';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import SelectionTriggerDropDown from '$lib/components/pages/cohorts/SelectionTriggerDropDown.svelte';
	import AddCondition from '$lib/components/pages/cohorts/AddCondition.svelte';
	import SelectionDropDown from '$lib/components/pages/onboarding/SelectionDropdown.svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';

	let tabItems = ['Step 1 - Conditions', 'Step 2 - Destionations', 'Step 3 - Schedule'];
	let activeItem = 'Step 1 - Conditions';
	let tabLeftItems = ['Overview', 'Audience'];
	let activeLeftItem = 'Overview';
	const triggerTabChange = (event) => {
		activeItem = event.detail;
	};
	const triggerTabLeftChange = (eventLeft) => {
		activeLeftItem = eventLeft.detail;
	};

	let dropdownID = uniqueId();

	let tags = ['Tag', 'Tag 2'];

	let showDropdown = false;

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

	onMount(async () => {
		await tick();
		hideLoader();
	});

	let conditionExpand = false;

	const platforms = [
		{
			ID: 'platform-1',
			name: 'Facebook',
			logo: Icons.meta
		},
		{
			ID: 'platform-2',
			name: 'Snapchat',
			logo: Icons.snapchatLogo
		},
		{
			ID: 'platform-3',
			name: 'TikTok',
			logo: Icons.tiktok
		},
		{
			ID: 'platform-4',
			name: 'Google',
			logo: Icons.google
		},
		{
			ID: 'platform-5',
			name: 'LinkedIn',
			logo: Icons.linkedin
		}
	];

	const accounts = [
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49383'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49384'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49385'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49386'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49387'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49388'
		},
		{
			name: 'I AM NAME',
			ID: 'hd8383hdf49389'
		}
	];

	const userprofiles = [
		{
			name: 'Jane Doe',
			ID: 'u484828a84',
			email: 'jd@gmail.com'
		},
		{
			name: 'Dejesus Michael',
			ID: 'u484828a85',
			email: 'dejesusmichael@mail.org'
		},
		{
			name: 'Mclaughlin Steele',
			ID: 'hd8383hdf49385',
			email: 'mclaughlinsteele@mail.me'
		},
		{
			name: 'Laverne Dodson',
			ID: 'hd8383hdf49386',
			email: 'lavernedodson@mail.ca'
		},
		{
			name: 'Trudy Berg',
			ID: 'hd8383hdf49387',
			email: 'trudyberg@mail.us'
		},
		{
			name: 'Lamb Underwood',
			ID: 'hd8383hdf493897',
			email: 'lambunderwood@mail.me'
		},
		{
			name: 'Mcleod Wagner',
			ID: 'hd8383hdf49388',
			email: 'mcleodwagner@mail.biz'
		},
		{
			name: 'Shannon Kennedy',
			ID: 'hd8383hdf49389',
			email: 'shannonkennedy@mail.ca'
		},
		{
			name: 'Sarah Black',
			ID: 'hd8383hdf495589',
			email: 'sarah.black@company.com'
		},
		{
			name: 'Jane Doe',
			ID: 'hd8383hdf496589',
			email: 'jd@gmail.com'
		}
	];
</script>

<svelte:head>
	<style lang="scss">
		.progress-circle {
			animation: animation 2s linear forwards;
			stroke-dasharray: 300;
			stroke-dashoffset: 300;
		}
		@keyframes animation {
			100% {
				stroke-dashoffset: 75;
			}
		}
	</style>
</svelte:head>

<main class="p-0 max-w-screen-xl mx-auto w-full flex flex-col flex-1 ">
	<div class="flex flex-col flex-wrap justify-between items-start gap-3 flex-1">
		<h2 class="text-lg md:text-xl xl:text-4xl text-white leading-none font-bold">Cohort Builder</h2>
		<div
			class="flex flex-col items-stretch relative z-10 w-full pt-4 md:grid md:grid-cols-12 gap-7 flex-1 "
		>
			<!-- Left Column  -->
			<div class="md:col-span-8 xl:col-span-7 space-y-3 mv:space-y-0 flex flex-col flex-1">
				<Tab {tabItems} {activeItem} on:tabChange={triggerTabChange} />
				<div
					class="relative rounded-3xl mv:rounded-tl-none before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl mv:before:rounded-tl-none before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex items-start after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 ease-in-out duration-500 flex-1 flex-col pb-5"
				>
					<div
						class="flex-1 flex flex-col relative z-10 p-3 sm:p-7 pb-3 2xl:p-10 2xl:pb-7 w-full max-h-full overflow-x-hidden overflow-y-auto "
					>
						{#if activeItem === 'Step 1 - Conditions'}
							<div class="divide-y divide-grey space-y-10 flex flex-col flex-1">
								<div class="space-y-4">
									<div class="relative w-full flex items-center">
										<label for="search" class="sr-only">Domain URL</label>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												id="search"
												placeholder="Domain URL"
												name="domain_url"
											/>
										</div>
									</div>

									<div
										class="group relative flex w-full flex-wrap duration-300 ease-in-out before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
									>
										<Tags bind:tags allowPaste={true} placeholder={'Add a new Tag'} />
									</div>
								</div>
								<div class="p-7 pb-0 2xl:p-10 2xl:pb-0 -mx-7 2xl:-mx-10 flex-1 flex flex-col ">
									<div class="flex-1">
										<h3 class="text-sm pb-5">Add your conditions</h3>

										<div class="flex flex-col">
											{#each pixelsIds as pixelsIdsItem, k (pixelsIdsItem.id)}
												<div
													class="relative before:border-l before:border-white before:absolute before:inset-y-0 before:left-6 w-full "
												>
													<div
														class="flex gap-x-3 xl:gap-x-5 2xl:gap-x-7 items-start relative w-full pb-5"
													>
														<div class="xl:w-16 w-10 shrink-0">
															<!-- if id number == 1 -->
															{#if k == 0}
																<div
																	class="bg-color text-white text-sm rounded p-3 shrink-0 relative before:border-t before:border-white before:absolute before:w-5 sm:before:w-10 sm:before:-right-10 before:-right-5 before:top-1/2 before:-translate-y-1/2 after:absolute after:inset-0 after:rounded after:bg-blue/20 after:border-blue after:border-2 text-center "
																>
																	<span class="relative z-10">All</span>
																</div>
															{:else}
																<button
																	class="bg-color text-white text-sm rounded p-3 shrink-0 relative before:border-t before:border-white before:absolute before:w-5 sm:before:w-10 sm:before:-right-10 before:-right-5 before:top-1/2 before:-translate-y-1/2 after:bg-radial-green after:backdrop-blur-2.5xl after:shadow-glass  after:ease-in-out after:duration-300 after:absolute after:inset-0 border-2   {showDropdown
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
																			class="w-2.5 h-2.5 transitions {showDropdown
																				? 'rotate-180'
																				: ''}"
																			color="currentColor"
																		/>
																	</span>
																	{#if showDropdown}
																		<div class="relative flex flex-col z-10" transition:slide>
																			<button
																				type="button"
																				class="outline-none py-1 text-sm text-left hidden"
																				>And</button
																			>
																			<button
																				type="button"
																				class="outline-none pt-1 text-sm text-left">Or</button
																			>
																		</div>
																	{/if}
																</button>
															{/if}
														</div>

														<div class="flex flex-col gap-3 xl:gap-7 flex-1 ">
															{#each conversionAPIs as item, i (item.id)}
																<div class="flex-1 flex gap-x-3 items-start">
																	<div class="space-y-5 w-full">
																		{#if i == 0 && k == 0}
																			<!-- Group of First select dropdowns (total 6)  -->
																			<div
																				class="flex-1 relative rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0 "
																			>
																				<div
																					class="relative px-3 py-2 flex flex-col divide-y divide-grey space-y-2"
																				>
																					<div
																						class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-grey relative  gap-3 items-center"
																					>
																						<div class="flex-1 w-full ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-event"
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
																							class="pl-1.5 xl:pl-3 pt-3 sm:pt-0 w-full lg:w-20 xl:w-32"
																						>
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-equals"
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
																						<div class="sm:pl-3 pt-2 sm:pt-0 w-full flex-1 ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}+{i}-value"
																								title="Select Value"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: 'xxx'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: 'xxx'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: 'xxx'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: 'xxx'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: 'xxx'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																					</div>
																					<div
																						class="pt-2 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-grey relative  gap-3 items-center"
																					>
																						<div class="flex-1 w-full ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-within"
																								title="Within"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: 'before'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: 'after'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: 'not within'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: 'xxx'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: 'xxx'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																						<div
																							class="pl-1.5 xl:pl-3 pt-3 sm:pt-0 w-full lg:w-20 xl:w-32"
																						>
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-number"
																								title="10"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: '1'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: '2'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: '3'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: '4'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: '5'
																									},
																									{
																										id: 'item_6',
																										state: false,
																										name: '6'
																									},
																									{
																										id: 'item_7',
																										state: false,
																										name: '7'
																									},
																									{
																										id: 'item_8',
																										state: false,
																										name: '8'
																									},
																									{
																										id: 'item_9',
																										state: false,
																										name: '9'
																									},
																									{
																										id: 'item_10',
																										state: false,
																										name: '10'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																						<div class="pl-1.5 sm:pl-3 pt-2 sm:pt-0 w-full flex-1 ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-time"
																								title="Select time"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: 'hour(s)'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: 'day(s)'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: 'week(s)'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: 'month(s)'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: 'year(s)'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																					</div>
																				</div>
																			</div>
																		{:else}
																			<!-- Group of additional select dropdowns (total 3)  -->
																			<div
																				class="flex-1 relative rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0 "
																			>
																				<div class="relative py-2 px-3 flex flex-col ">
																					<div
																						class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-grey relative  gap-3 items-center"
																					>
																						<div class="flex-1 w-full ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-property"
																								title="Select property"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: 'Gender'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: 'Age'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: 'Age'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: 'CLV'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: 'Highest purchase'
																									},
																									{
																										id: 'item_6',
																										state: false,
																										name: 'Lowest purchase'
																									},
																									{
																										id: 'item_7',
																										state: false,
																										name: 'Last Purchase'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																						<div class="sm:pl-3 pt-3 sm:pt-0 w-full sm:w-32">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-equals"
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
																						<div class="sm:pl-3 pt-2 sm:pt-0 w-full flex-1 ">
																							<SelectionTriggerDropDown
																								id="trigger-{dropdownID}-time"
																								title="Select time"
																								list={[
																									{
																										id: 'item_1',
																										state: false,
																										name: 'hour(s)'
																									},
																									{
																										id: 'item_2',
																										state: false,
																										name: 'day(s)'
																									},
																									{
																										id: 'item_3',
																										state: false,
																										name: 'week(s)'
																									},
																									{
																										id: 'item_4',
																										state: false,
																										name: 'month(s)'
																									},
																									{
																										id: 'item_5',
																										state: false,
																										name: 'year(s)'
																									}
																								]}
																								on:selectionChange={(e) => {}}
																							/>
																						</div>
																					</div>
																				</div>
																			</div>
																		{/if}

																		<div class="flex gap-3">
																			{#if i < conversionAPIs.length - 1}
																				<!-- Single +And dropdown -->
																				<button
																					class="border-2 border-green rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-1 px-3 font-semibold outline-none after:bg-radial-green after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-40 after:opacity-20 after:rounded uppercase "
																					on:click={addEmptyItemInConverAPIs}
																					><span
																						class="relative z-10 leading-none block text-center"
																						>+ AND</span
																					></button
																				>
																			{:else}
																				<!-- +And option dropdown -->
																				<AddCondition
																					classBtn="border-2 border-green rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-1 px-3 font-semibold outline-none after:bg-radial-green after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-40 after:opacity-0 after:rounded uppercase"
																					activeClass="after:opacity-40"
																					nonActiveClass="after:opacity-0"
																					id="trigger-{dropdownID}-and"
																					title="+ AND"
																					list={[
																						{
																							id: 'item_1',
																							state: false,
																							icon: Icons.overviewAnalysisIcon,
																							name: 'Have a property',
																							descrip: 'Filter by a column in the table'
																						},
																						{
																							id: 'item_2',
																							state: false,
																							icon: Icons.pointer,
																							name: 'Performed an event',
																							descrip:
																								'Filter by whether they have an associated event'
																						},
																						{
																							id: 'item_3',
																							state: false,
																							icon: Icons.piechart,
																							name: 'Part of an audience',
																							descrip:
																								'Filter by whether they are included or not in an audience'
																						}
																					]}
																					on:selectionChange={(e) => {}}
																					/>
																				<button class="hidden" on:click={addEmptyItemInConverAPIs}
																					><span
																						class="relative z-10 leading-none block text-center"
																						>+ AND</span>
																				</button>
																				<!-- +Or -->
																				<button
																					on:click={addEmptyItemInConverAPIs}
																					class="border-2 border-yellow rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-1 px-3 font-semibold outline-none after:bg-radial-yellow after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-40 after:opacity-0 after:rounded uppercase w-20 hover:shadow-glow-yellow">
																					<span class="relative z-10 leading-none block text-center">+ Or</span
																					></button>
																			{/if}
																		</div>
																	</div>
																	{#if i !== 0}
																		<!-- Button for local list delete -->
																		<button
																			on:click={() => {
																				removeItemFromConversionApis(item.id);
																			}}
																			class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 w-8 h-8"
																			><span class="relative z-10 flex justify-center"
																				><Icon
																					data={Icons.crossIcon}
																					stroke="transparent"
																					class="w-5"
																				/></span
																			></button
																		>
																	{:else}
																		<!-- Button for complete list delete -->
																		<button
																			on:click={() => {
																				removeItemFromPixelIds(pixelsIdsItem.id);
																			}}
																			class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 w-8 h-8"
																			><span class="relative z-10 flex justify-center"
																				><Icon
																					data={Icons.crossIcon}
																					stroke="transparent"
																					class="w-5"
																				/></span
																			></button
																		>
																	{/if}
																</div>
															{/each}
														</div>
													</div>
												</div>
											{/each}
										</div>

										<div class="flex justify-start relative">
											<!-- on:click={addEmptyItemInPixelIDs} -->
											<AddCondition
												classBtn="border border-blue rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-2 px-5 font-medium outline-none after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded hover:shadow-glow-blue text-sm"
												activeClass="after:opacity-100 shadow-glow-blue"
												nonActiveClass="after:opacity-0"
												id="trigger-{dropdownID}-condition"
												title="+ Add Condition"
												list={[
													{
														id: 'item_1',
														state: false,
														icon: Icons.overviewAnalysisIcon,
														name: 'Have a property',
														descrip: 'Filter by a column in the table'
													},
													{
														id: 'item_2',
														state: false,
														icon: Icons.pointer,
														name: 'Performed an event',
														descrip: 'Filter by whether they have an associated event'
													},
													{
														id: 'item_3',
														state: false,
														icon: Icons.piechart,
														name: 'Part of an audience',
														descrip: 'Filter by whether they are included or not in an audience'
													}
												]}
												on:selectionChange={(e) => {}}
											/>
										</div>
									</div>
									<div class="flex gap-4 justify-end pt-3 ">
										<button
											type="button"
											class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
											><span class="relative z-10 leading-none">Cancel</span></button
										>

										<button
											type="button"
											class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
											><span class="relative z-10 leading-none">Next</span></button
										>
									</div>
								</div>
							</div>
						{:else if activeItem === 'Step 2 - Destionations'}
							<div class="space-y-10 flex flex-col justify-start flex-1">
								<div class="flex flex-col gap-4 flex-1">
									{#each platforms as platform}
										<div
											class=" relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex items-center py-3 px-4 xs:py-5 xs:px-6 "
										>
											<div class="relative z-10 flex flex-col flex-1">
												<div class="flex gap-2 xs:gap-5 items-center">
													<CheckBox
														id="userid-{platform.ID}"
														span="w-4 h-4 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
														labelClass="sr-only"
														classes="relative cursor-pointer "
													/>
													<button
														class="flex items-center gap-2 xs:gap-x-5 shrink-0 flex-1 w-full"
														on:click={() => {
															conditionExpand = !conditionExpand;
														}}
													>
														<div class="h-10 w-10 rounded-full flex justify-center items-center  ">
															<Icon
																data={platform.logo}
																class="object-cover aspect-square w-full"
															/>
														</div>

														<div class="space-y-1 flex flex-col">
															<h3 class="block text-sm font-semibold text-white">
																{platform.name}
															</h3>
														</div>
													</button>
												</div>
												{#if conditionExpand}
													<div class="pl-10 pt-3" transition:slide>
														<table class="w-full table-fixed">
															{#each accounts as account}
																<tr>
																	<td class="w-12 h-12" valign="center">
																		<div class="relative h-auto leading-none">
																			<CheckBox
																				labelClass="relative z-10 leading-none"
																				label=""
																				id="account-{account.ID}"
																				classes="relative cursor-pointer"
																				span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
																			/>
																		</div>
																	</td>
																	<td class="w-24 h-12 px-2 text-center" valign="center">
																		<div class="flex justify-center">
																			<Icon data={Icons.meta} class="w-8 h-8" />
																		</div>
																	</td>
																	<td class="py-2" valign="center">
																		<div class="space-y-2">
																			<p class="text-sm leading-none text-white">
																				<b class="font-semibold">Name:</b>
																				{account.name}
																			</p>
																			<p class="text-sm leading-none text-white">
																				<b class="font-semibold">ID:</b>
																				{account.ID}
																			</p>
																		</div>
																	</td>
																</tr>
															{/each}
														</table>
													</div>
												{/if}
											</div>
										</div>
									{/each}
								</div>
								<div class="flex gap-4 justify-end">
									<button
										type="button"
										class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
										><span class="relative z-10 leading-none">Back</span></button
									>

									<button
										type="button"
										class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
										><span class="relative z-10 leading-none">Next</span></button
									>
								</div>
							</div>
						{:else}
							<div class="space-y-7 flex flex-col justify-start flex-1">
								<h2 class="text-lg  text-white leading-none font-semibold text-left">
									Set your schedule
								</h2>
								<div class="divide-y divide-grey space-y-10 flex-1">
									<div class="relative space-y-6 ">
										<label
											for="Manual"
											class="text-white relative group cursor-default flex items-start gap-4 	"
										>
											<input
												type="radio"
												id="Manual"
												name="add-option"
												class="peer sr-only"
												value="Manual"
											/>
											<span
												class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
												><span class="sr-only">Manual</span></span
											>
											<span class="flex flex-col gap-1">
												<span class="text-lg leading-none font-semibold">Manual</span>
												<span class="leading-none">Run your sync on a set interval.</span>
											</span>
										</label>
										<label
											for="interval"
											class="text-white relative group cursor-default flex items-start gap-4 "
										>
											<input
												type="radio"
												id="interval"
												name="add-option"
												class="peer sr-only"
												value="interval"
											/>
											<span
												class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
												><span class="sr-only">Interval</span></span
											>
											<span class="flex flex-col gap-1">
												<span class="text-lg leading-none font-semibold">Interval</span>
												<span class="leading-none">Run your sync on a set interval.</span>
											</span>
										</label>
									</div>

									<!-- Interval Data -->
									<div class="space-y-7 p-10 pb-0 -mx-10 ">
										<h3 class="text-lg  text-white leading-none font-semibold text-left">
											Configure your schedule
										</h3>

										<div class="flex gap-5 items-center">
											<label for="" class="text-base text-left tracking-wide font-medium "
												>Every</label
											>
											<div
												class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-24 shrink-0"
											>
												<input
													class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
													type="text"
													id="search"
													placeholder="10"
													name="points"
												/>
											</div>
											<div class="w-48 max-w-full">
												<SelectionDropDown
													id="trigger-{dropdownID}-Interval"
													title="Interval"
													mainIcon={Icons.clockIcon}
													list={[
														{
															id: 'item_1',
															state: false,
															name: 'Hour(s)',
															icon: Icons.clockIcon
														},
														{
															id: 'item_2',
															state: false,
															name: 'Day(s)',
															icon: Icons.clockIcon
														},
														{
															id: 'item_3',
															state: false,
															name: 'Week(s)',
															icon: Icons.clockIcon
														},
														{
															id: 'item_4',
															state: false,
															name: 'Month(s)',
															icon: Icons.clockIcon
														}
													]}
													on:selectionChange={(e) => {}}
												/>
											</div>
										</div>

										<h3
											class="text-base tracking-wide text-white leading-none font-medium text-left"
										>
											End date
										</h3>
										<div class="relative space-y-6 ">
											<label
												for="indefinitely"
												class="text-white relative group cursor-default flex items-center gap-4 	"
											>
												<input
													type="radio"
													id="indefinitely"
													name="end-date"
													class="peer sr-only"
													value="indefinitely"
												/>
												<span
													class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
													><span class="sr-only">Run indefinitely</span></span
												>

												<span class="text-base leading-none font-medium">Run indefinitely</span>
											</label>
											<label
												for="until"
												class="text-white relative group cursor-default flex items-center gap-4 "
											>
												<input
													type="radio"
													id="until"
													name="end-date"
													class="peer sr-only"
													value="until"
												/>
												<span
													class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
													><span class="sr-only">Run until</span></span
												>

												<span class="text-base leading-none font-medium">Run until</span>
											</label>
										</div>
									</div>
								</div>

								<div class="flex gap-4 justify-end mt-auto ">
									<button
										type="button"
										class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
										><span class="relative z-10 leading-none">Back</span></button
									>

									<button
										type="button"
										class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
										><span class="relative z-10 leading-none">Save and run</span></button
									>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="md:col-span-4 xl:col-span-5 space-y-4 mv:space-y-0 flex flex-col flex-1">
				<TabLeft {tabLeftItems} {activeLeftItem} on:tabChange={triggerTabLeftChange} />
				<div
					class="relative rounded-3xl mv:rounded-tl-none before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl mv:before:rounded-tl-none before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex items-start after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 ease-in-out duration-500 flex-1 flex-col"
				>
					<div class="flex-1 flex flex-col relative z-10 p-5 xs:p-7 2xl:p-10 w-full">
						{#if activeLeftItem === 'Overview'}
							<div class="space-y-3">
								<h3 class="text-center text-xl font-medim">Data of your selected target group</h3>

								<div class="flex flex-col xl:flex-row gap-3">
									<div class="w-32 mx-auto xl:ml-0 shrink-0">
										<div
											class="w-28 h-28 border border-blue rounded-full flex justify-center items-center bg-radial-circle relative "
										>
											<div
												class="w-20 h-20 border border-blue rounded-full bg-color flex items-center justify-center shadow-circle"
											>
												<div
													class="bg-radial-circle-inside w-16 h-16 rounded-full shadow-circle flex justify-center items-center text-white"
												>
													<Icon
														data={Icons.threeCustomersSymbolIcon}
														class="w-9"
														stroke="transparent"
													/>
												</div>
											</div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												version="1.1"
												width="112px"
												height="112px"
												class="-rotate-90 absolute top-0 left-0 drop-shadow-circle-inside"
												style="margin:-1px"
											>
												<defs>
													<linearGradient id="GradientColor">
														<stop offset="0%" stop-color="#e91e63" />
														<stop offset="100%" stop-color="#673ab7" />
													</linearGradient>
													<radialGradient
														id="paint0_radial_2283_46246"
														cx="0"
														cy="0"
														r="1"
														gradientUnits="userSpaceOnUse"
														gradientTransform="translate(48.9999 48.9999) rotate(157.77) scale(49.0922 53.0895)"
													>
														<stop offset="0.643878" stop-color="#46A6FF" stop-opacity="0.5" />
														<stop offset="1" stop-color="#007DF2" />
													</radialGradient>
												</defs>
												<circle
													cx="56"
													cy="56"
													r="47.3"
													class="animation progress-circle"
													fill="none"
													stroke="url(#paint0_radial_2283_46246)"
													stroke-width="15"
												/>
											</svg>
										</div>
									</div>
									<div class="flex-1">
										<table class="w-full text-sm font-semibold">
											<tr>
												<td class="">Average CLV per customer: </td>
												<td class="text-right pb-3">$3,568</td>
											</tr>
											<tr>
												<td>Average AOV per customer:</td>
												<td class="text-right py-3">$568</td>
											</tr>
											<tr>
												<td>Percentage:</td>
												<td class="text-right py-3">85.6%</td>
											</tr>
										</table>
									</div>
								</div>

								<div class="flex-1">
									<table class="w-full text-sm font-semibold">
										<tr>
											<td class="">Your total customers:</td>
											<td class="text-right py-3">1,000</td>
										</tr>
										<tr>
											<td>Selected target group:</td>
											<td class="text-right py-3">856</td>
										</tr>
									</table>
								</div>
								<div class="flex-1 space-y-8">
									<h3 class="text-sm font-semibold text-left">Average Age:</h3>
									<div
										class="h-1 flex items-center w-full px-3 justify-start relative before:w-3 before:h-3 before:rounded-full before:z-10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-blue-box after:w-3 after:h-3 after:rounded-full after:z-10 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-white"
									>
										<div class="w-full h-0.5 bg-white relative">
											<span
												class="w-1/2 bg-blue-box h-1.5 block absolute left-0 after:absolute after:h-3 after:w-1 after:bg-white after:right-0 after:top-1/2 after:-translate-y-1/2 -mt-0.5 -ml-px"
											/>
											<span
												class="text-sm font-semibold absolute text-white text-center transform -top-7"
												style="left:50%; --tw-translate-x:-50% ">32 years</span
											>
											<!-- formulla :left: achievement*100/maximumvalue; --tw-translate-x: -achievement*100/maximumvalue -->
										</div>
										<span class="text-sm text-white font-smibold absolute -bottom-7 -left-1"
											>22</span
										>
										<span class="text-sm text-white font-smibold absolute -bottom-7 -right-1"
											>22</span
										>
									</div>
								</div>

								<div class="flex-1 space-y-2 pt-10">
									<h3 class="text-sm font-semibold text-left">Gender Distribution:</h3>

									<div class="flex ">
										<span class="text-left text-sm font-semibold" style="width:56%">56% Female</span
										>
										<span class="text-left text-sm font-semibold">44% Male</span>
									</div>
									<div class="rounded-md flex shadow-dropdown h-10 overflow-hidden">
										<span
											class="h-full bg-purple-box border border-purple rounded-l-md block"
											style="width:56%"
										/>
										<span
											class="h-full bg-blue-box-2 block border border-blue-3 border-l-0 rounded-r-md"
											style="width:44%"
										/>
									</div>
								</div>

								<div class="flex-1 space-y-2 pt-5">
									<div class="flex justify-between ">
										<h3 class="text-sm font-semibold text-left">Days till buy:</h3>
										<span class="text-left text-sm font-semibold">14</span>
									</div>
								</div>

								<div class="flex-1 space-y-4 pt-2">
									<h3 class="text-sm font-semibold text-left">Geographic Location:</h3>

									<div class="flex justify-center items-center">
										<img src="/images/us-map.png" alt="USA Map" class="" />
									</div>
								</div>
							</div>
						{:else}
							<!-- max-h-[calc(100vh-19rem)] -->
							<div class="relative max-h-full -mx-10 overflow-auto on-hover-scroll">
								<table class="border-0 w-full divide-y divide-grey">
									<tr>
										<th class="text-sm text-white pl-10 pb-3">Profile</th>
										<th class="text-sm text-white pb-3 pl-5 text-left">Name & ID</th>
										<th class="text-sm text-white pr-10 pb-3 text-left">Email</th>
									</tr>
									{#each userprofiles as userprofile}
										<tr>
											<td class="py-3 pl-10"
												><div
													class="h-12 w-12 rounded-full flex justify-center items-center bg-white/10"
												>
													<!-- <Icon data={Icons.singleManCustomerIcon} class="w-5 h-5 text-white" /> -->
													<img
														src={Icons.svgUrls.avatarUrl}
														class="object-cover aspect-square w-full"
														alt="Avatar"
													/>
												</div></td
											>
											<td class="pl-5"
												><div class="space-y-1 flex flex-col">
													<h3 class="block text-sm font-semibold text-white">
														<a
															class="text-white ease-in-out duration-300 hover:text-blue-400"
															href="/analysis/customer-details/{userprofile.ID}"
															>{userprofile.name}</a
														>
													</h3>
													<p class="text-sm leading-none ">
														<a
															class="text-white block  break-words ease-in-out duration-300 hover:text-blue-400"
															href="/analysis/customer-details/{userprofile.ID}">{userprofile.ID}</a
														>
													</p>
												</div></td
											>
											<td class="pr-10"
												><p class="text-sm  truncate text-left" title={userprofile.email}>
													{userprofile.email}
												</p></td
											>
										</tr>
									{/each}
								</table>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
