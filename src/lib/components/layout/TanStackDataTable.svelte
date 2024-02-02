<script lang="ts">
	import { writable } from 'svelte/store';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type Cell
	} from '@tanstack/svelte-table';
	import { getTdClass, getTfootClass, getThClass } from '$lib/helpers/TableHelpers';
	import { onDestroy, onMount } from 'svelte';
	import type { TanstackTableStyling } from '$lib/types/Types';
	import { get as getLocalStorage, set as setLocalStorage } from '$lib/local-packages/LocalStorage';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import { debounce } from '$lib/helpers/MiscHelpers';
	import { dev } from '$app/environment';
	export let id: string;
	export let data;
	export let columns: any[];
	export let styling: TanstackTableStyling;
	export let startIndex = 0;
	export let chunk = 50;
	export let tooltipFinder = (x: string, y: string, name: string = '') => {
		return x;
	};
	export let cellOnDoubleClickHandler = (data: Cell<unknown, unknown>) => {
		if (dev) {
			console.log({ key: data.id, value: data.getValue() });
		}
	};

	const columnSizes = getLocalStorage(id) ?? {};
	const debouncedResizeHandler = debounce(handleResizeMutations, 500, false);
	const intersectionObserver = new IntersectionObserver(handleIntersection);
	const resizeObserver = new ResizeObserver(debouncedResizeHandler);

	const rowEndAreaId = 'rowEndDiv';
	let totalInViewPort = chunk;
	let sorting: any[] = [];
	let columnOrder: any[] = [];
	let columnPinning = {};
	let columnVisibility = {};

	onMount(() => {
		addIntersectionObserver();
		addResizeObservers();
	});

	onDestroy(() => {
		removeIntersectionObserver();
		removeResizeObservers();
	});

	function getDefaultCalculatedWidth(name: string) {
		let width = name.length * 15 + 45;
		if (width < 110) {
			width = 110;
		}
		return width;
	}
	function addIntersectionObserver() {
		const intersectionTarget = document.querySelector(`#${rowEndAreaId}`);
		if (intersectionTarget) {
			intersectionObserver.observe(intersectionTarget);
		}
	}

	function addResizeObservers() {
		for (let col of columns) {
			let elm = document.querySelector(`#${col.id}`);
			if (elm) {
				resizeObserver.observe(elm);
			}
		}
	}

	function removeIntersectionObserver() {
		const intersectionTarget = document.querySelector(`#${rowEndAreaId}`);
		if (intersectionTarget) {
			intersectionObserver.unobserve(intersectionTarget);
		}
	}

	function removeResizeObservers() {
		for (let col of columns) {
			let el = document.querySelector(`#${col.id}`);
			if (el) {
				resizeObserver.unobserve(el);
			}
		}
	}

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				let placeholderEnd = totalInViewPort + chunk;
				if (placeholderEnd < data.length) {
					totalInViewPort = placeholderEnd;
				} else {
					totalInViewPort = data.length;
				}
			}
		});
	}

	function handleResizeMutations(mutations: ResizeObserverEntry[]) {
		if (mutations.length > 1) {
			return;
		}
		mutations.forEach((mutation) => {
			let oldResizeState = getLocalStorage(id);
			if (!oldResizeState) {
				oldResizeState = {};
			}
			oldResizeState[mutation.target.id] = mutation.contentRect.width;
			setLocalStorage(id, oldResizeState);
		});
	}

	function resetViewChunks() {
		startIndex = 0;
		totalInViewPort = chunk;
	}

	const setSorting = (updater: any) => {
		resetViewChunks();
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const setColumnOrder = (updater: any) => {
		if (updater instanceof Function) {
			columnOrder = updater(columnOrder);
		} else {
			columnOrder = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnOrder
			}
		}));
	};

	const setColumnVisibility = (updater: any) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}));
	};

	const setColumnPinning = (updater: any) => {
		if (updater instanceof Function) {
			columnPinning = updater(columnPinning);
		} else {
			columnPinning = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnPinning
			}
		}));
	};

	const options = writable({
		data,
		columns,
		state: {
			sorting,
			columnOrder,
			columnPinning,
			columnVisibility
		},
		onSortingChange: setSorting,
		onColumnOrderChange: setColumnOrder,
		onColumnPinningChange: setColumnPinning,
		onColumnVisibilityChange: setColumnVisibility,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel()
	});
	const table = createSvelteTable(options);
</script>

<table class={styling.table}>
	<thead class={styling.thead.self}>
		{#each $table.getHeaderGroups() as headerGroup (headerGroup.id)}
			<tr class={styling.thead.tr}>
				{#each headerGroup.headers as header (header.id)}
					<th
						id={header.column.columnDef.id}
						colSpan={header.colSpan}
						class={getThClass(header, styling)}
					>
						<div
							id={header.column.columnDef.id}
							class="relative pt-5 group {styling.thead.th.innerDiv}"
							class:cursor-pointer={header.column.getCanSort()}
							class:select-none={header.column.getCanSort()}
							style="width:{columnSizes[header.column.columnDef.id] ??
								getDefaultCalculatedWidth(header.column.columnDef.header())}px;"
						>
							<div
								class="absolute top-1 right-1 group-hover:opacity-100 opacity-0 ease-in-out duration-300"
							>
								<Tooltip top>
									<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
									<span slot="tip" class="flex gap-2 leading-tight text-sm"
										><Icon data={Icons.infoIcon} stroke="transparent" class="w-5 shrink-0" />
										{tooltipFinder(
											header.column.columnDef.header(),
											header.column.columnDef.iconType,
											header.column.columnDef.id
										)}
									</span>
								</Tooltip>
							</div>

							{#if header.column.columnDef.iconType != 'none'}
								<div class="flex justify-center">
									<Icon
										data={Icons[header.column.columnDef.iconType]}
										stroke="transparent"
										class="w-5"
									/>
								</div>
							{/if}
							<p class="flex flex-row justify-between">
								<span>{header.column.columnDef.header()}</span>
								<span class="mx-1 font-light" on:click={header.column.getToggleSortingHandler()}>
									{{
										desc: '  ▼',
										asc: '  ▲'
									}[header.column.getIsSorted().toString()] ?? '⇅'}
								</span>
							</p>
						</div>
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody class={styling.tbody.self} id="tbody">
		{#each $table.getRowModel().rows.slice(startIndex, totalInViewPort) as row}
			<tr class={styling.tbody.tr}>
				{#each row.getVisibleCells() as cell}
					<td
						on:dblclick={() => {
							cellOnDoubleClickHandler(cell);
						}}
						class={getTdClass(cell, styling)}
						style="width:{columnSizes[cell.column.columnDef.id] ??
							getDefaultCalculatedWidth(cell.column.columnDef.header())}px;"
					>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</td>
				{/each}
			</tr>
		{/each}
		<tr>
			<td colspan={columns.length}>
				<div id="rowEndDiv" style={`height:5px;background-color:transparent;`} />
			</td>
		</tr>
	</tbody>
	<tfoot class={styling.tfoot.self}>
		{#each $table.getFooterGroups() as footerGroup}
			<tr class={styling.tfoot.tr}>
				{#each footerGroup.headers as header}
					<th class={getTfootClass(header, styling)}>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(header.column.columnDef.footer, header.getContext())}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</tfoot>
</table>
