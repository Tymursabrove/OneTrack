<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let title: string;
	export let list: any[];

	let showDropdown = false;
	function handleClick(id: string) {
		for (let item of list) {
			item.state = false;
		}
		let changedItem = list.find((x) => x.id == id);
		changedItem.state = true;
		dispatch('selectionChange', { changedItem });
		list = list;
	}
</script>

<div class="relative w-full z-20">
	<button
		type="button"
		class="{id} py-1 px-5 cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-300 z-20 before:rounded-md before:absolute before:inset-0 h-11 text-white before:shadow-glass-2 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl text-sm {showDropdown
			? ''
			: ''}"
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
			class="absolute mt-2 left-0 z-10 w-full top-full rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
			use:clickOutside={id}
			on:click_outside={() => {
				if (showDropdown) {
					showDropdown = false;
				}
			}}
		>
			<ul class="relative z-10 divide-y divide-grey max-h-60 overflow-auto" id="{id}-drop-wrapper">
				{#if list}
					{#each list as item (item.id)}
						<li
							class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions first-of-type:rounded-t-md last-of-type:rounded-b-md"
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
