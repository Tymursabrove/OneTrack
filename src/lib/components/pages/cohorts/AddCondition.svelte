<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	export let classBtn: string;
	export let activeClass: string;
	export let nonActiveClass: string;
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

<!-- border border-blue rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white py-2 px-5 font-medium outline-none after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded hover:shadow-glow-blue text-sm -->
<!-- after:opacity-100 shadow-glow-blue -->
<!-- after:opacity-0 -->
<div class="relative ">
	<button
		type="button"
		class="{classBtn} {showDropdown ? activeClass : nonActiveClass}"
		aria-haspopup="listbox"
		aria-expanded="true"
		aria-labelledby="listbox-label"
		on:click={() => {
			showDropdown = !showDropdown;
		}}
		{id}
	>
		<span class="{id} relative z-10  block truncate">{title}</span>
	</button>

	{#if showDropdown}
		<div
			transition:slide
			class="absolute mt-3 left-0 z-20 w-96 top-full bg-color focus:outline-none text-sm before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown "
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
			<ul class="relative z-10 on-hover-scroll  max-h-60 overflow-auto" id="{id}-drop-wrapper">
				{#if list}
					{#each list as item (item.id)}
						<li
							class="text-white relative group cursor-default select-none flex items-center p-3 pl-4 gap-2 hover:bg-grey/10 transitions first-of-type:rounded-t-md last-of-type:rounded-b-md "
						>
							<div class="relative flex gap-1.5">
								<div class="w-14 shrink-0">
									<Icon data={item.icon} stroke="transparent" class="w-10 text-white" />
								</div>
								<p class="text-sm font-semibold tracking-wide">
									<span>{item.name}</span>
									<span class="text-xs font-normal block">{item.descrip}</span>
								</p>
							</div>
							<button
								class="absolute inset-0 z-10"
								on:click|stopPropagation|preventDefault={async () => {
									showDropdown = false;
									handleClick(item.id);
								}}
							>
								<span class="sr-only">toggle</span>
							</button>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
