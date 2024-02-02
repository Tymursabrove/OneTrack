<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabItems;
	export let activeItem;
</script>

<!--
@component
This component hosts enables the jumping between different cohort building steps
  -->

<nav class="flex flex-col mv:flex-row gap-2" aria-label="Tabs">
	{#each tabItems as item}
		<button
			class="cursor-pointer flex items-center justify-center font-medium rounded-full mv:rounded-none mv:rounded-t-md leading-snug relative ease-in-out duration-300 h-11 text-white before:bg-glass before:absolute before:inset-0 before:rounded-full mv:before:rounded-none mv:before:rounded-t-md before:opacity-30 before:backdrop-blur-2.5xl    after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded-full mv:after:rounded-none mv:after:rounded-t-md outline-none text-sm xs:w-52  {item ===
			activeItem
				? 'after:opacity-100 before:opacity-0'
				: 'hover:after:opacity-100 after:opacity-0'} "
			on:click={() => dispatch('tabChange', item)}
		>
			<span class="relative z-10 leading-none p-2 block text-center">{item}</span>
		</button>
	{/each}
</nav>
