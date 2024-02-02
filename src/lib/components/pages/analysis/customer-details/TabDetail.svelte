<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/common/Button.svelte';
	const dispatch = createEventDispatcher();

	export let tabItems: string[];
	export let activeItem: string;
</script>

<nav class="flex gap-1.5 xs:gap-3" aria-label="Tabs">
	{#each tabItems as item}
		<Button
			text={item}
			size="small"
			role="button"
			action={item == activeItem ? 'primary' : 'secondary'}
			on:click={() => dispatch('tabChange', item)}
			label={item}
		/>
	{/each}
</nav>
