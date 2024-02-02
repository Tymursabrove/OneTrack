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
	export let mainIcon: string;

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

<div class="relative group w-full z-20">
	<button
		type="button"
		class="{id} py-1 px-4 cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-300 z-20 before:rounded-md before:absolute before:inset-0 h-11 text-white before:shadow-glass-2 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl text-sm  {showDropdown
			? ''
			: ''}"
		aria-haspopup="listbox"
		aria-expanded="true"
		aria-labelledby="listbox-label"
		
		{id}
	>

	<!-- on:mouseenter={() => {
		showDropdown = true;
	}} -->
		
		<span class="{id} block truncate z-10">{title}</span>
		<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10">
			<Icon
				data={Icons.triangleSymbolIcon}
				class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
				color="currentColor"
			/>
		</span>
	</button>

	<!-- {#if showDropdown}
	transition:slide -->
	<div class="absolute group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible ease-in-out duration-300 -translate-y-10 left-0 z-10 top-full w-full scale-50 opacity-0 invisible ">
		<div			
			class="mt-2 w-full relative rounded-md bg-color focus:outline-none text-sm before:absolute before:bg-dropdown before:backdrop-blur-2.5xl before:rounded-md before:shadow-dropdown before:opacity-60 before:inset-0"
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
			<ul class="relative z-10 divide-y divide-grey max-h-96 overflow-auto on-hover-scroll" id="{id}-drop-wrapper">
				{#if list}
					{#each list as item (item.id)}
						<li
							class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20 first-of-type:rounded-t-md last-of-type:rounded-b-md"
						 
						>

						 
						<label for="">{item.name}</label>
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
	<!-- {/if} -->
</div>
</div>
