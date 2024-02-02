<script>
	import Loading from '$lib/components/layout/Loading.svelte';
	export let caption = 'Test Caption';
</script>

<div class="grid">
	<div class="flex">
		<Loading />
		<p>{caption}</p>
	</div>
</div>

<style>
	.grid {
		display: grid;
		align-items: center;
		height: 100%;
	}
	.flex {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	p {
		font-size: 16px;
		margin-top: -10px;
	}
</style>
