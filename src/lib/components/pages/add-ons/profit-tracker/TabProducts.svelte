<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabItems;
	export let activeItem;
</script>


<nav class="flex flex-col xs:flex-row gap-2 w-full xs:w-auto" aria-label="Tabs">
	{#each tabItems as item}	 
		<button class="cursor-pointer flex items-center justify-center font-medium rounded-full md:rounded-none md:rounded-t-md leading-snug relative ease-in-out duration-300 h-11 text-white after:bg-blue-box after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 after:rounded-full md:after:rounded-none md:after:rounded-t-md outline-none text-sm xl:text-base w-full px-1 xl:px-0 xl:w-40  {item === activeItem ? 'after:opacity-100 before:opacity-0' : 'hover:after:opacity-100 after:opacity-0'} "  on:click={() => dispatch('tabChange', item)}>
			<span class="relative z-10 leading-none py-1 px-3 md:p-1 xl:p-2 block text-center">{item}</span>
		</button>	 
		{/each} 
  </nav>

 



 
