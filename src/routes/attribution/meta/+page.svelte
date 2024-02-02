<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { derived } from 'svelte/store';

	import { CurrentRange, Workspace } from '$lib/store';
	import { GetMetaAttributionData } from '$lib/services/HttpPlatformMetricsRequests';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import type { MetaAttributionDataResponse } from '$lib/types/HttpResponsesTypes';
	import Layout from '$lib/components/layout/Attribution/Layout.svelte';
	import { metaTableSetups } from './misc';

	let workspace: any;
	let page = 'meta';

	let data: MetaAttributionDataResponse = {
		campaigns: [],
		adSets: [],
		ads: []
	};

	let rerenderKey = 0;
	let isLoading = false;

	let loadData: () => void;

	onMount(async () => {
		await tick();

		const unsubscribe = derived([Workspace, CurrentRange], ([$Workspace, $CurrentRange]) => [
			$Workspace,
			$CurrentRange
		]).subscribe(([$Workspace, $CurrentRange]: any[]) => {
			if (!$Workspace?.id || !$CurrentRange) return;

			const { start, end } = $CurrentRange;

			workspace = $Workspace;
			hideLoader();

			loadData = () => {
				isLoading = true;
				data.campaigns = data.adSets = data.ads = [];

				GetMetaAttributionData(workspace.id, start, end).then(res => {
					data = res;
					isLoading = false;
				});
			};

			loadData();
		});

		return () => unsubscribe();
	});
</script>

<div class="px-0.5 space-y-4 flex flex-col flex-1">
	{#if workspace}
		{#key rerenderKey}
			<Layout
				setups={metaTableSetups}
				{data}
				{isLoading}
				{workspace}
				{page}
				on:reload={loadData}
				on:removeStorageKeys={() => (rerenderKey += 1)}
			>
				<svelte:fragment slot="head-title">Meta - Ads Dashboard</svelte:fragment>
				<svelte:fragment slot="head-description">
					Here you can find a comprehensive overview of all your meta ads
				</svelte:fragment>
				<svelte:fragment slot="head-info">
					Welcome to the Meta Tab, where you can view and compare all KPIs for your Campaigns, Ad
					Sets, and Ads as measured by both Facebook (Meta) and OneTrack. This comprehensive table
					provides a holistic view of your marketing performance, helping you understand the impact
					of your advertising efforts across all levels of granularity.<br /><br />
					With the ability to filter data by Account Name, Campaign Name, Ad Set Name, and Ad Name, you
					can easily focus on specific segments of your advertising strategy. Applying a filter, such
					as on the campaign level, will only display the Ad Sets and Ads within the selected campaigns,
					streamlining your analysis and making it simple to pinpoint areas for optimization.<br
					/><br />
					Use the Meta Tab to gain valuable insights into your marketing campaigns, and leverage the
					combined power of Meta and OneTrack metrics to make data-driven decisions that improve your
					advertising results.
				</svelte:fragment>
			</Layout>
		{/key}
	{/if}
</div>

<style lang="scss" global>
	// While dev only: get rid of styles that have negative impact on performance
	*:after,
	*::before {
		backdrop-filter: none !important;
		background-attachment: unset !important;
		filter: none !important;
		box-shadow: none !important;
	}
	* {
		background-attachment: unset !important;
	}
</style>
