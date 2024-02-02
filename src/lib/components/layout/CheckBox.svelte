<script lang="ts">
	import { dev } from '$app/environment';

	export let label = '';
	export let style = '';
	export let classes = '';
	export let labelClass = '';
	export let id = '';
	export let span = '';
	export let checked = false;
	export let disabled = false;
	export let onChange = (e: boolean) => {
		if (dev) {
			console.log({ id, value: e });
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label class="block {classes}" {style} for={id}>
	<input
		type="checkbox"
		class="sr-only peer"
		{id}
		on:change={(e) => onChange(e.target?.checked)}
		{checked}
		{disabled}
	/>
	<span class={span}><span class={labelClass}>{label}</span></span>
</label>
