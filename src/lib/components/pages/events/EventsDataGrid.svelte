<script lang="ts">
	import TanStackDataTable from '$lib/components/layout/TanStackDataTable.svelte';
	import { onMount, onDestroy, tick } from 'svelte';
	import { defaultGridStyling as styling } from '$lib/helpers/EventsGridHelper';
	import { CSVExportQue, CurrentEventsFilter } from '$lib/store';
	import { handleUpdatedCSVQue } from '$lib/helpers/CSVHelpers';
	import type { Unsubscriber } from 'svelte/store';
	import TooltipData from '$lib/resources/TooltipResources';
	import type { CustomEventDataType } from '$lib/types/Types';
	import { createEventsColumns } from '../../../../routes/attribution/events/helpers';

	export let arePurchaseEvents = true;
	export let data: CustomEventDataType[] = [];

	const tooltipFinder = (y: string, z: string) =>
		TooltipData.events.kpis.find((x) => x.name == y)?.value ?? y;

	let columns: any[] = [];
	let gridData: CustomEventDataType[] = [];
	let filter: string | null = null;
	let endSubscription: Unsubscriber;
	let endFilterSubscription: Unsubscriber;

	onMount(() => {
		endSubscription = CSVExportQue.subscribe((csvData) => {
			if (!csvData) {
				return;
			}
			if (csvData.allEventsExportSelected) {
				handleUpdatedCSVQue(data, `${arePurchaseEvents ? 'order' : 'lead'}_events `);
			}
		});
		endFilterSubscription = CurrentEventsFilter.subscribe((filterValue) => {
			if (filterValue != filter) {
				filter = filterValue;
			}
		});
	});

	onDestroy(() => {
		if (endSubscription) {
			endSubscription();
		}
		if (endFilterSubscription) {
			endFilterSubscription();
		}
		CSVExportQue.set(null);
	});

	$: {
		loadRows(data, filter);
	}

	async function loadRows(events: CustomEventDataType[], filter: string | null) {
		try {
			gridData = [];
			columns = [];
			await tick();
			if (filter) {
				gridData = events.filter((x) => x.cardCategory == filter);
			} else {
				gridData = events;
			}
			columns = createEventsColumns(gridData, arePurchaseEvents);
		} catch (err) {
			console.error(err);
		}
	}
</script>

{#if gridData && gridData.length > 0 && columns.length > 0}
	<TanStackDataTable
		data={gridData}
		{columns}
		{styling}
		id="events-main-page-grid"
		{tooltipFinder}
	/>
{/if}
