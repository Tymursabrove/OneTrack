<script>
	import { closeModal } from 'svelte-modals';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	export let isOpen;
	function handleRouting() {
		closeModal();
	}
</script>

{#if isOpen}
	<SideNav hidden={false} on:didRouting={handleRouting} />
{/if}
