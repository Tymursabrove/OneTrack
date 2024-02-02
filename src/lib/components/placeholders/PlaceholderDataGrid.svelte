<script lang="ts">
	import TanStackDataTable from '$lib/components/layout/TanStackDataTable.svelte';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { GetColumnDefinition } from '$lib/helpers/TableHelpers';
	import { defaultGridStyling as styling } from '$lib/helpers/EventsGridHelper';
	export let arePurchaseEvents = true;
	export let noOfRows = 10;

	let columns = [];
	let gridData = [];

	onMount(() => {
		gridData = getRows(noOfRows);
		columns = [
			GetColumnDefinition(
				'timestamp',
				'Date',
				'none',
				`Summary`,
				(cell) => moment.unix(cell / 1000).format('DD.MM.YYYY HH:mm '),
				true,
				false,
				false
			),
			GetColumnDefinition('email', 'E-mail'),
			GetColumnDefinition('visitorId', 'OneTrack ID'),
			GetColumnDefinition('campaignName', 'Campaign Name'),
			GetColumnDefinition('adId', 'Ad ID'),
			GetColumnDefinition('source', 'Source'),
			GetColumnDefinition('clickId', 'Click ID'),
			GetColumnDefinition('medium', 'Medium'),
			GetColumnDefinition('from', 'From'),
			GetColumnDefinition('referer', 'Referrer'),
			GetColumnDefinition('type', 'Type')
		];
	});

	function getRows(noOfRows = 10) {
		let events = [];
		let i = 0;
		while (i < noOfRows) {
			let obj = {
				timestamp: 1234567890000,
				email: 'a@b.c',
				visitorId: 'test',
				orderId: 'test'
			};

			obj = {
				...obj,
				campaignName: 'test',
				adId: 'test',
				source: 'test',
				clickId: 'test',
				medium: 'test',
				from: 'test',
				referer: 'test',
				type: 'test'
			};

			events.push(obj);
			i++;
		}
		return events;
	}
</script>

{#if gridData && gridData.length > 0 && columns.length > 0}
	<TanStackDataTable
		data={gridData}
		{columns}
		{styling}
		id="placeholder-datatable-main-page-grid"
	/>
{/if}
