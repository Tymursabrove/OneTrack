<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from 'svelte/transition';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { onMount } from 'svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import SelectionDropdown from './SelectionDropdown.svelte';

	let showFilterDropdown = false;
	let conversionAPIs: { name: string; value: string; id: string }[] = [];

	onMount(() => {
		let conversionAPIs = [];
		addEmptyItemInConverAPIs();
	});

	function addEmptyItemInConverAPIs() {
		conversionAPIs.push({ name: '', value: '', id: uniqueId() });
		conversionAPIs = conversionAPIs;
	}
	function removeItemFromConversionApis(id: string) {
		conversionAPIs = conversionAPIs.filter((x) => x.id != id);
	}
</script>

<div class="relative">
	<button
		on:click={() => {
			showFilterDropdown = !showFilterDropdown;
		}}
		type="button"
		class="relative flex items-center justify-center border border-grey-4 rounded-md before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-green after:opacity-0 hover:after:opacity-100 hover:before:opacity-0 hover:border-white/50 w-14 xs:w-20 h-10"
	>
		<span
			class="text-white inline-flex items-center justify-start p-2.5 gap-3 font-semibold text-sm relative z-10"
		>
			<Icon data={Icons.filter} class="w-5 h-5 " stroke="transparent" />

			<span class="sr-only">filter</span>
			<span class="pointer-events-none flex items-center">
				<Icon
					data={Icons.triangleSymbolIcon}
					class="w-2.5 h-2.5 transitions {showFilterDropdown ? 'rotate-180' : ''}"
					stroke="transparent"
				/>
			</span>
		</span>
	</button>
	{#if showFilterDropdown}
		<div
			transition:slide
			class="absolute mt-2 max-w-[calc(100vw-20px)] w-106 xl:w-120 bg-color/30 left-0 md:left-auto md:right-0 z-30 top-full rounded-md focus:outline-none text-sm border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
		>
			<div
				class="divide-y divide-grey max-h-106 on-hover-scroll overflow-auto rounded-md space-y-5 p-3"
			>
				<div class="space-y-3">
					<h3 class="text-sm font-semibold">Current Filters</h3>
					<div
						class="border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar rounded p-2 flex justify-between items-start"
					>
						<div class="flex gap-2 items-start">
							<CheckBox
								labelClass="relative z-10 leading-none"
								label=""
								id="checkbox-for-card-5"
								classes="relative cursor-pointer disabled"
								span="w-11 h-6 bg-white/10 flex border border-grey-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px after:shadow-checkbox after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-grey after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-white/20"
							/>
							<p class="text-sm font-semibold">NameXYZ Lorem ipsum</p>
						</div>
						<div class="flex items-center gap-2">
							<button
								class="flex items-center justify-center shrink-0 text-white ease-in-out duration-300"
							>
								<Icon data={Icons.settingsGearIcon} stroke="transparent" class="w-4" />
							</button>
							<button
								class="flex items-center justify-center shrink-0 ease-in-out duration-300 rounded-full w-5 h-5 hover:bg-red text-red-400 hover:text-white"
							>
								<Icon data={Icons.crossIcon} stroke="transparent" class="w-4" />
							</button>
						</div>
					</div>
				</div>
				<div class="pt-3 space-y-3">
					<h3 class="text-sm font-semibold">Add new filter</h3>
					{#each conversionAPIs as item, i (item.id)}
						<div class="space-y-3">
							<div class="flex gap-3 items-start">
								<div class="space-y-3 flex-1">
									<div
										class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
									>
										<input
											type="text"
											placeholder="Name"
											class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 outline-none leading-none peer invalid:border-red invalid:text-red h-10 w-full"
										/>
									</div>

									<SelectionDropdown
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

									<div class="grid grid-cols-2 gap-3">
										<SelectionDropdown
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
										<SelectionDropdown
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
								</div>

								{#if i < conversionAPIs.length - 1}
									<button
										on:click={() => {
											removeItemFromConversionApis(item.id);
										}}
										class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 h-10 w-10 flex justify-center items-center"
									>
										<span class="relative z-10"
											><Icon data={Icons.crossIcon} stroke="transparent" class="w-5" /></span
										>
									</button>
								{/if}
							</div>

							<div class="flex gap-3">
								{#if i < conversionAPIs.length - 1}
									<!-- Single +And dropdown -->
									<button
										class="border border-white/50 rounded-md leading-snug relative ease-in-out duration-300 h-10 text-white py-1 px-3 font-semibold outline-none uppercase after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-green"
										on:click={addEmptyItemInConverAPIs}
									>
										<span class="relative z-10 leading-none block text-center">+ AND</span>
									</button>
								{:else}
									<!-- +And option dropdown -->
									<button
										class="border border-white/50 rounded-md leading-snug relative ease-in-out duration-300 h-10 text-white py-1 px-3 font-semibold outline-none uppercase after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-green"
										on:click={addEmptyItemInConverAPIs}
										><span class="relative z-10 leading-none block text-center">+ AND</span>
									</button>
									<!-- +Or -->
									<button
										on:click={addEmptyItemInConverAPIs}
										class="border border-white/50 rounded-md leading-snug relative ease-in-out duration-300 h-10 text-white py-1 px-3 font-semibold outline-none uppercase after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded after:shadow-button after:bg-linear-orange"
									>
										<span class="relative z-10 leading-none block text-center">+ Or</span>
									</button>
								{/if}
							</div>
						</div>
					{/each}
					<div class="pt-3 flex justify-end">
					<button
						 
						type="button"
						class="relative inline-flex items-center justify-center rounded-md border border-grey-4 hover:border-white/50 text-white min-w-20 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 shadow-sidebar focus:ring-offset-2 before:bg-linear-blue before:rounded before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded after:bg-linear-green before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Save</span></button
					>
				</div>
				</div>
			</div>
		</div>
	{/if}
</div>
