<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabItems: string[];
	export let activeItem: string;
</script>

<nav class="flex flex-col w-full sm:w-auto sm:flex-row gap-2 relative p-1 before:bg-dropdown before:rounded-md sm:before:rounded-full before:absolute before:inset-0" aria-label="Tabs">
	{#each tabItems as item}
		<button class="relative inline-flex items-center justify-center rounded-md md:rounded-full border-0 sm:w-72 xl:w-80 px-3 p-2 leading-none xl:text-lg font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-md sm:before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white {item ===
			activeItem
				? 'text-white before:opacity-100 shadow-dropdown'
				: 'text-white/60 before:opacity-0'} "
			on:click={() => dispatch('tabChange', item)} >
			<span class="relative z-10 leading-none">{item}</span>
		</button>
	{/each}
</nav>
