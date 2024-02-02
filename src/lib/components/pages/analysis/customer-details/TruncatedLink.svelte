<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';

	export let url: string;

	const allowedLength = 200;

	function replaceSymbols(source: string) {
		let truncated = source.length > allowedLength ? `${source.slice(0, allowedLength)}...` : source;
		return truncated;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="text-transparent flex flex-row bg-clip-text break-word bg-radial-blue font-semibold text-left group text-xs xl:text-sm leading-snug hover:cursor-pointer"
	on:click={() => {
		window.open(`${url}`, '_blank');
	}}
>
	<span>{replaceSymbols(url)}</span>
	<Icon action="secondary" style="margin-left:5px;" name="output-arrow" size="small" filled={true} />
</div>
