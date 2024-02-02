<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher, onMount } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';
	import type { SelectionDropdownItem } from '$lib/types/Types';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let title: string;
	export let list: SelectionDropdownItem[];

	let showDropdown = false;

	function handleClick(id: string) {
		for (let item of list) {
			item.state = false;
		}
		let changedItem = list.find((x) => x.id == id);
		if (changedItem) {
			changedItem.state = true;
			dispatch('selectionChange', { changedItem });
			list = list;
		}
	}
</script>

<div class="relative w-full">
	<button
		type="button"
		class="py-1 px-4 cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-300 before:rounded-md before:absolute before:inset-0 h-11 text-white before:shadow-glass-2 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl text-sm"
		aria-haspopup="listbox"
		aria-expanded="true"
		aria-labelledby="listbox-label"
		on:click={() => {
			showDropdown = !showDropdown;
		}}
		{id}
	>
		<span class="{id} block truncate z-10">{title}</span>
		<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10">
			<Icon
				data={Icons.triangleSymbolIcon}
				class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
				color="currentColor"
			/>
		</span>
	</button>

	{#if showDropdown}
		<div
			transition:slide
			class="absolute mt-2 left-0 z-20 max-h-60 w-full top-full overflow-auto rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md shadow-dropdown before:opacity-60 before:inset-0"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
		>
			<ul
				class="relative z-10 divide-y divide-grey max-h-60 on-hover-scroll overflow-auto"
				id="{id}-drop-wrapper"
			>
				{#if list}
					{#each list.filter((x) => x.state) as item (item.id)}
						<li
							class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
							class:bg-blue={item.state}
						>
							<span>{item.name}</span>
							<button
								class="absolute inset-0 z-10"
								on:click|stopPropagation|preventDefault={async () => {
									showDropdown = false;
									handleClick(item.id);
								}}><span class="sr-only">toggle</span></button
							>
						</li>
					{/each}
					{#each list.filter((x) => !x.state) as item (item.id)}
						<li
							class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
							class:bg-blue={item.state}
						>
							<span>{item.name}</span>
							<button
								class="absolute inset-0 z-10"
								on:click|stopPropagation|preventDefault={async () => {
									showDropdown = false;
									handleClick(item.id);
								}}><span class="sr-only">toggle</span></button
							>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
