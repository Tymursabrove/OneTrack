<script lang="ts">
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { fly } from 'svelte/transition';
	import type { AttributionSearchItem } from '$lib/types/Types';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let title: string;
	export let list: AttributionSearchItem[];
	let displayList = [...list];
	let searchTerm = '';
	let showDropdown = false;

	$: {
		updateDisplayList(list);
	}
	function updateDisplayList(updatedList: AttributionSearchItem[]) {
		displayList = [...updatedList];
	}
	function onSelection() {
		dispatch('onSelectionChanged', displayList);
	}
	function onAllSelectionChanged(val: boolean) {
		for (let elm of displayList) {
			elm.state = val;
		}
		displayList = displayList;
		dispatch('allSelectionChanged', val);
	}
	function handleSearch() {
		doSearch((x: boolean) => {
			return x;
		});
	}
	function handleReverseSearch() {
		doSearch((x: boolean) => {
			return !x;
		});
	}
	function doSearch(outputFilter: Function) {
		if (searchTerm == null) {
			return;
		}
		displayList = displayList
			.map((x) => {
				let lowerSearchTerm = searchTerm.toLowerCase();
				if (outputFilter(x.name.toLowerCase().includes(lowerSearchTerm))) {
					x.state = true;
				} else {
					x.state = false;
				}
				return x;
			})
			.sort((a) => {
				if (outputFilter(a.state == false)) {
					return 1;
				}
				return -1;
			});
	}
</script>

<div class="relative" {id}>
	<button
		class="py-2.5 p-5 pr-7 relative w-full md:w-32 xl:w-40 2xl:w-52 cursor-pointer flex items-center justify-start text-sm rounded-md leading-snug transition-all ease-in-out duration-300 shadow-glow-blue text-white bg-blue-box z-20 {id}"
		on:click={() => {
			if (showDropdown) {
				showDropdown = false;
				onSelection();
			} else {
				showDropdown = true;
			}
		}}
	>
		<span class="block truncate {id}">{title}</span><span
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 {id}"
			><Icon
				data={Icons.triangleSymbolIcon}
				class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
				color="currentColor"
			/>
		</span>
	</button>
	{#if showDropdown}
		<div
			in:fly={{ y: -50, duration: 500 }}
			out:fly={{ y: -50, duration: 300 }}
			class="absolute mt-2 left-0 z-30 top-full py-2 w-60 xl:w-110 rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
		>
			<div
				class="divide-y divide-white/80 relative z-10 max-h-[60vh] overflow-auto on-hover-scroll"
				id="{id}-drop-wrapper"
				use:clickOutside={id}
				on:click_outside={() => {
					if (showDropdown) {
						showDropdown = false;
						onSelection();
					}
				}}
			>
				<div class="xl:px-5 p-3 pb-0 space-y-1">
					<div
						class="relative before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-glass before:opacity-60 before:inset-0"
					>
						<div class="relative z-10">
							<input
								class="bg-transparent border border-transparent rounded texrt-white py-3 px-5 w-full placeholder-white font-medium ease-in-out duration-300 focus:border-blue outline-none focus:bg-color/20"
								placeholder="Search..."
								bind:value={searchTerm}
							/>
						</div>
					</div>
					<div class="divide-y divide-grey flex flex-col">
						<button
							class="text-left flex items-center gap-2 outline-none py-4"
							on:click={handleSearch}
							><Icon
								data={Icons.searchIcon}
								class="w-3 h-3 text-grey-2"
								color="currentColor"
							/><span>Search</span></button
						>
						<button
							class="pt-3 text-left flex items-center gap-2 outline-none py-4"
							on:click={handleReverseSearch}
							><Icon
								data={Icons.inverseIcon}
								class="w-3 h-3 text-grey-2"
								color="currentColor"
							/><span>Inverse Search</span></button
						>
					</div>
				</div>

				<div class="divide-y divide-white/80">
					{#if displayList}
						<div class="divide-y divide-grey flex flex-col px-3 xl:px-5">
							<button
								class="text-left flex items-center gap-2 outline-none py-4"
								on:click={() => {
									onAllSelectionChanged(true);
								}}
							>
								<Icon data={Icons.checkIcon} class="w-4 h-4 text-green" color="currentColor" /><span
									>Select all</span
								>
							</button>
							<button
								class="text-left flex items-center gap-2 outline-none py-4"
								on:click={() => {
									onAllSelectionChanged(false);
								}}
							>
								<Icon data={Icons.crossIcon} class="w-4 h-4 text-red" color="currentColor" /><span
									>Unselect all</span
								>
							</button>
						</div>
						<div class="divide-y divide-grey flex flex-col px-3 xl:px-5">
							{#each displayList as item (item.name)}
								<label class="relative cursor-pointer block py-4">
									<input type="checkbox" bind:checked={item.state} class="sr-only peer" />
									<span
										class="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0"
										><span class="relative z-10 leading-none">{item.name}</span></span
									></label
								>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
