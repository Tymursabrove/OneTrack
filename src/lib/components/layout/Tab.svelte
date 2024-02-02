<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabItems: string[];
	export let activeItem: string;
</script>

<nav class="flex space-x-2" aria-label="Tabs">
	{#each tabItems as item}
		<button
			class="relative inline-flex items-center justify-center rounded-full border-0 hover:shadow-glow-blue min-w-24 px-3 p-2.5 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-100 before:inset-0 before:absolute hover:text-white {item ===
			activeItem
				? 'text-white before:opacity-100 shadow-glow-blue'
				: 'text-white/60 before:opacity-0'} "
			on:click={() => dispatch('tabChange', item)}
		>
			<span class="relative z-10 leading-none">{item}</span>
		</button>
	{/each}
</nav>
