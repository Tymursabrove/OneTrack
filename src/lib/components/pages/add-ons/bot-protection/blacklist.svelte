<script>
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { slide } from 'svelte/transition';
	import { Icons } from '$lib/resources/IconResources';

	const dispatch = createEventDispatcher();
	const id = 'event-type-toggle-selection-dropdown';
	const title = 'Blacklist';

	let list = [
		{ id: 'blacklist', state: true, name: 'Blacklist' },
		{ id: 'whitelist', state: false, name: 'Whitelist' }
	];

	let showDropdown = false;
	function handleClick(id) {
		for (let item of list) {
			item.state = false;
		}
		list.find((x) => x.id == id).state = true;
		dispatch('selectionChange', { isPurchaseSelected: list.find((x) => x.id == 'purchase').state });
		list = list;
	}
</script>

<div class="relative flex items-center z-30 ">
	<div class="relative w-full">
		<button
			type="button"
			class="py-2.5  px-4 cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative transition-all ease-in-out duration-300 shadow-glow-blue text-white bg-blue-box z-20 outline-none"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			on:click|stopPropagation={() => {
				showDropdown = !showDropdown;
			}}
			{id}
		>
			<span class="block truncate">{title}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<Icon
					data={Icons.triangleSymbolIcon}
					class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
					stroke="transparent"
				/>
			</span>
		</button>

		{#if showDropdown}
			<div
				transition:slide
				class="absolute mt-2 left-0 z-10 w-full top-full text-sm bg-color focus:outline-none text-sm before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown "
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				<ul
					class="relative divide-y divide-grey max-h-60 on-hover-scroll overflow-auto rounded-md"
					id="{id}-drop-wrapper"
					use:clickOutside
					on:click_outside={() => {
						if (showDropdown) {
							showDropdown = false;
						}
					}}
				>
					{#if list}
						{#each list as item (item.id)}
							<li
								class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
								on:click|stopPropagation={async () => {
									showDropdown = false;
									handleClick(item.id);
								}}
							>
								<input type="checkbox" class="sr-only peer" bind:checked={item.state} />
								<span
									class="border-2 border-white w-5 h-5 rounded-full inline-flex items-center justify-center after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
								/>
								<span for="">{item.name}</span>
								<button class="absolute inset-0 z-10"><span class="sr-only">toggle</span></button>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
