<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let tabItems;
	export let activeItem;
</script>


<nav class="flex border border-blue rounded divide-x divide-blue" aria-label="Tabs">
	{#each tabItems as item}	 
		<button class="cursor-pointer flex items-center justify-center font-semibold leading-snug relative ease-in-out duration-300 h-11 text-white  after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0  outline-none text-sm px-3 xs:px-5  {item === activeItem ? 'after:opacity-100 before:opacity-0 shadow-glow-blue' : 'hover:after:opacity-100 after:opacity-0'} "  on:click={() => dispatch('tabChange', item)}>
			<span class="relative z-10 leading-none p-2 block text-center">{item}</span>
		</button>	 
		{/each} 
  </nav>

 



 
