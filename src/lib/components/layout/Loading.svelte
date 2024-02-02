<script>
	import LottiePlayer from '$lib/local-packages/LottiePlayer.svelte';
	import { onMount } from 'svelte';
	let showLoading = false;
	onMount(() => {
		showLoading = true;
	});
</script>

{#if showLoading}
	<LottiePlayer path="/loading.json" />
{/if}
