<script lang="ts">
	import { onMount } from 'svelte';

	export let label = '';
	export let labelClass = '';
	export let inputClass = '';
	export let type: 'text' | 'password' | 'search' | 'number' | 'email' = 'text';
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let sizeClass = '';
	export let value = '';
	export let isRequired = true;

	let elm: HTMLInputElement;
	onMount(() => {
		elm.type = type;
	});
</script>

<div class="relative flex items-center {sizeClass}">
	{#if label}
		<label for={id} class="sr-only {labelClass}">{label}</label>
	{/if}
	<div
		class="relative rounded-md before:rounded before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full h-10"
	>
		<input
			bind:this={elm}
			{...$$restProps}
			class="relative border border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded focus:border-blue text-sm p-3 px-5 outline-none leading-none peer h-full w-full {inputClass}"
			{id}
			bind:value
			on:input
			{placeholder}
			{name}
			required={isRequired}
		/>
	</div>
</div>
