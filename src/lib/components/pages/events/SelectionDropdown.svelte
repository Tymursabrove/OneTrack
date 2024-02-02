<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';
	import { Icons } from '$lib/resources/IconResources';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let title: string;
	export let list: { id: string; state: boolean; name: string }[];

	let showDropdown = false;
	function handleClick(id: string) {
		for (let item of list) {
			item.state = false;
		}
		let changedItem = list.find((x) => x.id == id);
		if (!changedItem) {
			return;
		}
		changedItem.state = true;
		dispatch('selectionChange', { changedItem });
		list = list;
	}
</script>

<div class="relative w-full">
	<button
		type="button"
		class="{id} py-1 px-4 h-10 group cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 text-white border z-20 text-sm outline-none hover:border-white/50 before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded hover:before:opacity-0 after:absolute after:inset-0 after:rounded after:bg-cover after:bg-[50%_50%] after:bg-blend-normal after:ease-in-out after:duration-300 after:shadow-button after:bg-linear-blue hover:after:opacity-100 after:opacity-0 border-grey-4 {showDropdown
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
		<span class="pointer-events-none absolute inset-y-0 right-1 flex items-center pr-3 z-10">
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
			class="absolute bg-color/90 mt-2 inset-x-0 z-40 top-full border border-grey-4 backdrop-blur-md bg-bglinear-5 shadow-sidebar rounded-md"
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
			<ul class="relative z-10 on-hover-scroll max-h-60 overflow-auto" id="{id}-drop-wrapper">
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
