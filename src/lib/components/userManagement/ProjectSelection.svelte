<script>
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from 'svelte/transition';
	let id = 'project-selection-dropdown';
	let title = 'Project - Coming soon';
	let list = [];
	let showDropdown = false;
</script>

<div class="relative flex items-center ">
	<div class="relative flex-1 max-w-full ">

		<button
		type="button"
		class="{id} cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 z-20 text-sm before:rounded-md outline-none"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			on:click={() => {
				showDropdown = !showDropdown;
			}}
			{id}
		>
		<span class="flex gap-2 text-left relative z-10 py-1 w-full">
			<span class="{id} pointer-events-none flex items-center justify-center w-10 absolute left-2 inset-y-0 text-blue">
				<Icon data={Icons.folderIcon} class="w-4 h-4 -mt-0.5" color="currentColor"  stroke="transparent" />
			</span>
			<span class=" {id} block truncate pr-8 p-2 pl-12">{title}</span>
			<span class="{id} pointer-events-none absolute inset-y-0 right-4 flex items-center ">
				<Icon
					data={Icons.triangleSymbolIcon}  stroke="transparent"
					class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
					color="currentColor"
				/>
			</span>
		</span>
		</button>

		{#if showDropdown}
			<div
				transition:slide
				class="relative md:absolute mt-1 md:mt-3 left-0 z-10 w-full top-full bg-color focus:outline-none text-sm before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
				id="{id}-drop-wrapper"
				use:clickOutside={id}
				on:click_outside={() => {
					if (showDropdown) {
						showDropdown = false;
					}
				}}
			>
			<ul class="relative divide-y divide-grey max-h-60 on-hover-scroll overflow-auto rounded-md">
					{#if list}
						{#each list as item (item.id)}
							<li
							class=" {id} text-white relative cursor-default select-none p-3 pl-5 hover:bg-grey/20 transitions border-y border-transparent hover:border-grey/20 first-of-type:rounded-t-md last-of-type:rounded-b-md"
								>
								<input type="checkbox" class="sr-only" bind:checked={item.state} />
								<label for="">{item.name}</label>
								<button
									class="{id} absolute inset-0 z-10"
									on:click|stopPropagation={async () => {
										showDropdown = false;
									}}><span class="{id} sr-only">toggle</span></button
								>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
