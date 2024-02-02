<script>
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { slide } from 'svelte/transition';
	import { Icons } from '$lib/resources/IconResources';

	const dispatch = createEventDispatcher();
	const id = 'event-type-toggle-selection-dropdown';
	const title = 'Quick Select';

	 
    const listItems = [
        {
        platform:'Europe',
        platformId:'platform-1',
         }, 
          {
        platform:'Asia',
        platformId:'platform-2',
         }, 
          {
        platform:'DACH-Countries',
        platformId:'platform-3',
         }, 
          {
        platform:'xxx',
        platformId:'platform-4',
         }, 
          {
        platform:'xxx',
        platformId:'platform-4',
         }, 
          {
        platform:'xxx',
        platformId:'platform-5',
         },
    ]



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
				class="absolute mt-2 left-0 z-10 w-full top-full text-sm bg-color focus:outline-none  before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown "
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
					{#if listItems}
						 

                        <li class="divide-y divide-grey flex flex-col ">
							 
                             {#each listItems as item}
                            <label for={item.platformId} class="relative cursor-pointer block p-4">
                                <input id={item.platformId} type="checkbox" class="sr-only peer"> 
                                <span class="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0">
                                 <span class="relative z-10 leading-none">{item.platform}</span></span>
                            </label>
                            {/each}
						</li>


							 
					 
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
