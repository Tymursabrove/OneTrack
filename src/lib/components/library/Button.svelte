<script lang="ts">
	import { dev } from '$app/environment';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	export let label = '';
	export let labelClass = '';
	export let iconLeft = '';
	export let iconLeftClass = '';
	export let iconRight = '';
	export let iconRightClass = '';
	export let theme = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let onClickFunc: () => void = () => {
		if (dev) {
			console.log(`${label ?? ''} button clicked`);
		}
	};
</script>

<button
	{type}
	on:click|preventDefault={onClickFunc}
	class="relative inline-flex items-center rounded-md border border-grey-4 hover:border-white/50 text-white px-5 p-0.5 h-10 text-sm focus:outline-none outline-none ease-in-out duration-300 shadow-sidebar before:rounded before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded before:inset-0 after:inset-0 before:absolute after:absolute gap-2 {theme}"
>
	{#if iconLeft}
		<span class="inline-flex items-center gap-2">
			<Icon
				data={iconLeft}
				stroke="transparent"
				class="shrink-0 relative z-10 ease-in-out duration-300 {iconLeftClass}"
			/>
			{#if label}<span class="relative z-10 {labelClass}">{label}</span>{/if}
		</span>
	{:else if label}
		<span class="relative z-10 {labelClass}">{label}</span>
	{/if}
	{#if iconRight}
		<Icon
			data={iconRight}
			stroke="transparent"
			class="shrink-0 relative z-10 ease-in-out duration-300 {iconRightClass}"
		/>
	{/if}
</button>
