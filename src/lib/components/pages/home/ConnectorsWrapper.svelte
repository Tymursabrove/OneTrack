<script>
	import { onMount } from 'svelte';
	import SocialInfoCard from '$lib/components/pages/home/SocialInfoCard.svelte';
	import { Connectors } from '$lib/store';
	import { Icons } from '$lib/resources/IconResources';

	let connectors = [];
	let totalAdSpend;

	onMount(() => {
		Connectors.subscribe((cns) => {
			connectors = cns;
		});
	});
</script>

<div class="hf social-info-cards">
	{#if connectors.length > 0}
		{#each connectors as connector}
			{#if connector.platform == 'meta'}
				<SocialInfoCard
					id={connector.id}
					connectorName={connector.platform}
					adSpendTotal={connector.adSpendTotal.toFixed(2)}
					overAllAdspend={totalAdSpend}
					roas={connector.roas}
					orders={connector.orders}
					orderValue={connector.orderValue}
					averageOrderValue={connector.averageOrderValue}
					cpc={connector.cpc}
					cpm={connector.cpm}
					cpp={connector.cpp}
					ctr={connector.ctr}
					cpo={connector.cpo}
					iconRaw={Icons.meta}
				/>
			{:else if connector.platform == 'google'}
				<SocialInfoCard
					id={connector.id}
					connectorName={connector.platform}
					adSpendTotal={connector.adSpendTotal.toFixed(2)}
					overAllAdspend={totalAdSpend}
					roas={connector.roas}
					orders={connector.orders}
					orderValue={connector.orderValue}
					averageOrderValue={connector.averageOrderValue}
					cpc={connector.cpc}
					cpm={connector.cpm}
					cpp={connector.cpp}
					ctr={connector.ctr}
					cpo={connector.cpo}
					iconRaw={Icons.google}
				/>
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.hf {
		display: flex;
		flex-direction: row;
	}
	.social-info-cards {
		margin-top: 1vh;
		justify-content: space-between;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}
</style>
