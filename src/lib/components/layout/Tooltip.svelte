<script lang="ts">
	export let tooltip: boolean | string = false; // prevent blank tooltips
	export let className = ''; // prevent blank tooltips
</script>

<span data-tooltip={tooltip} class={className}>
	<slot />
</span>
