<script lang="ts">
	import { tick } from 'svelte';
	import TanStackDataTable from '$lib/components/layout/TanStackDataTable.svelte';
	import LoadingWithCaption from '$lib/components/layout/LoadingWithCaption.svelte';
	import PageUnderDevelopment from '$lib/components/layout/PageUnderDevelopment.svelte';
	import { fly } from 'svelte/transition';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { Icons, getIconByName } from '$lib/resources/IconResources';
	import { defaultGridStyling } from '$lib/helpers/EventsGridHelper';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { get as getLocalStorage, set as setLocalStorage } from '$lib/local-packages/LocalStorage';
	import SelectionDropdown from './NoIconsSelectionDropdown.svelte';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import type { TanstackTableStyling } from '$lib/types/Types';
	import SortableList from '$lib/local-packages/SortableList.svelte';

	export let Source: any[] | null = null;
	export let SourceManipulator: (source: any) => { rows: any[]; columns: any[] };
	export let id: string;
	export let gridStyling: TanstackTableStyling = defaultGridStyling;
	export let tabName: string;
	export let kpis: { KPI: string; Description: string }[];

	export let tooltipFinder = (y: string, z: string, id: string = '') => {
		try {
			let kpiObj = kpis.find((x) => x.KPI.toLowerCase() == `${y} (${z})`.toLowerCase());
			if (!kpiObj) {
				return y;
			}
			let description = kpiObj.Description;
			description = description.replaceAll('{replace}', tabName);
			return description;
		} catch (err) {
			console.error(err);
			return y;
		}
	};
	interface VisibilitySetting {
		id: string;
		name: string;
		isVisible: boolean;
		iconType: string;
	}

	let columns: any[] = [];
	let rows: any[] = [];
	let visibleColumns: any[] | null = [];
	let columnVisibilitySettings: null | VisibilitySetting[] = null;
	let loading = true;
	let showTableSettings = false;

	$: {
		renderRows(Source);
	}

	async function renderRows(source: any[] | null) {
		try {
			loading = true;
			rows = [];
			columns = [];
			await tick();
			if (!source) {
				return;
			}
			let response = SourceManipulator(source);
			rows = response.rows;
			columns = response.columns;
			let savedVisibilitySettings: null | VisibilitySetting[] = getLocalStorage(id);
			if (!savedVisibilitySettings || savedVisibilitySettings.length != columns.length) {
				savedVisibilitySettings = columns.map((x) => {
					return { id: x.id, name: x.header(), isVisible: x.isVisible, iconType: x.iconType };
				});
			}
			await alignColumnVisibilityWithSettings(savedVisibilitySettings);
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
	async function handleColumnVisibilityChange(id: string, state: boolean) {
		if (!columnVisibilitySettings) {
			return;
		}
		let columnIndex = columnVisibilitySettings.findIndex((x) => x.id == id);
		if (columnIndex != -1) {
			columnVisibilitySettings[columnIndex].isVisible = state;
		}
		await alignColumnVisibilityWithSettings(columnVisibilitySettings);
	}
	async function alignColumnVisibilityWithSettings(visibilitySettings: null | VisibilitySetting[]) {
		if (!visibilitySettings) {
			return;
		}
		let updatedColumns = [];
		for (let setting of visibilitySettings) {
			let column = columns.find((x) => x.id == setting.id);
			if (!column) {
				continue;
			}
			column.isVisible = setting.isVisible;
			column.isFirst = false;
			column.isLast = false;
			updatedColumns.push(column);
		}

		columns = updatedColumns;
		visibleColumns = null;
		await tick();
		let visibleColumnsTemp = columns.filter((x) => x.isVisible);
		visibleColumnsTemp[0].isFirst = true;
		visibleColumnsTemp[0].footer = (e: any) => {
			return `Summary (${rows.length})`;
		};
		visibleColumnsTemp[visibleColumnsTemp.length - 1].isLast = true;
		visibleColumns = visibleColumnsTemp;
		if (visibilitySettings) {
			setLocalStorage(id, visibilitySettings);
			columnVisibilitySettings = visibilitySettings;
		}
	}
	async function handleColumnSorting(event: any) {
		let updatedVisibility: VisibilitySetting[] = [];
		if (!columnVisibilitySettings) {
			return;
		}
		for (let elm of event.to.children) {
			let item = columnVisibilitySettings.find((x) => x.id == elm.id);
			if (item) {
				updatedVisibility.push(item);
			}
		}
		columnVisibilitySettings = null;
		await tick();
		alignColumnVisibilityWithSettings(updatedVisibility);
	}
	function hideTableSettingsIfVisible() {
		if (showTableSettings) {
			showTableSettings = false;
		}
	}
</script>

<div class="absolute top-4 right-0" {id}>
	<button
		id="table-settings-campaigns"
		class="{id} rounded-full border border-blue shadow-glow-blue inline-flex items-center gap-2 text-sm p-1.5 xs:px-4 {showTableSettings
			? 'bg-blue-box'
			: 'bg-glass'}"
		on:click={() => {
			showTableSettings = !showTableSettings;
		}}
		><span class="{id} hidden xs:inline-flex">Table settings</span>
		<Icon
			data={Icons.settingsGearSolid}
			class="{id} w-4 h-4  {showTableSettings ? 'text-white' : 'text-white'}"
			stroke="transparent"
		/>
	</button>
	{#if showTableSettings}
		<div
			class="absolute right-0 z-20 top-full overflow-hidden p-3 w-screen max-w-xs sm:max-w-2xl focus:outline-none text-sm py-2 rounded-3xl border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar"
		>
			<div
				class="{id} p-5 relative z-10 sm:divide-x divide-y sm:divide-y-0 divide-grey-4 sm:grid sm:grid-cols-12 on-hover-scroll max-h-[60vh] overflow-auto"
				id="{id}-drop-wrapper"
				use:clickOutside={id}
				on:click_outside={hideTableSettingsIfVisible}
			>
				<div class="pb-4 sm:pb-0 sm:pr-4 space-y-4 col-span-5">
					<h3 class="text-lg text-white leading-none font-medium flex gap-1">
						Goal min ROAS (soon)
					</h3>
					<div class="space-y-2">
						<div class="gap-3 flex items-center">
							<p
								class="bg-transparent w-16 text-center py-1 px-3 text-white relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70"
							>
								<span class="relative z-10">N/A</span>
							</p>
							<p class="font-medium inline-flex min-w-20">{tabName}</p>
						</div>
					</div>

					<div class="relative space-y-2">
						<SelectionDropdown
							id="trigger-{id}-Performance"
							title="Columns: Performance"
							list={[
								{
									id: 'item_1',
									state: false,
									name: 'Columns: Performance',
									icon: Icons.clockIcon
								}
							]}
							on:selectionChange={(e) => {}}
						/>

						<SelectionDropdown
							id="trigger-{id}-Performance1"
							title="Columns: Performance"
							list={[
								{
									id: 'item_1',
									state: false,
									name: 'Columns: Performance',
									icon: Icons.clockIcon
								}
							]}
							on:selectionChange={(e) => {}}
						/>

						<SelectionDropdown
							id="trigger-{id}-Performance2"
							title="Columns: Performance"
							list={[
								{
									id: 'item_1',
									state: false,
									name: 'Columns: Performance',
									icon: Icons.clockIcon
								}
							]}
						/>
					</div>
				</div>
				<div class="pt-4 sm:pt-0 sm:pl-4 col-span-7">
					<h3 class="text-lg text-white leading-none font-medium flex gap-1 pl-8">
						Columns: {columnVisibilitySettings?.filter((x) => x.isVisible).length} / {columnVisibilitySettings?.length}
						visible
					</h3>
					<div class="pt-5 space-y-1">
						{#if columnVisibilitySettings && columnVisibilitySettings.length > 0}
							<SortableList
								class="list-group col"
								handle=".cursor-grab"
								animation={150}
								onEnd={handleColumnSorting}
							>
								{#each columnVisibilitySettings as visibilitySetting}
									<div
										class="rrounded relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:backdrop-blur-2.5xl before:ease-in-out before:duration-300 before:opacity-0 hover:before:opacity-70 group"
										id={visibilitySetting.id}
									>
										<div class="flex gap-1 items-center py-2 px-3 relative z-10">
											<div
												class="cursor-grab w-4 flex justify-center items-center shrink-0 text-white cursor-move opacity-0 group-hover:opacity-100"
											>
												<Icon data={Icons.dots} stroke="transparent" class="h-4 " />
											</div>
											<div class="w-12 shrink-0">
												<CheckBox
													labelClass="relative z-10 leading-none"
													label=""
													checked={visibilitySetting.isVisible}
													id="account-{visibilitySetting.id}"
													classes="relative cursor-pointer block"
													span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
													onChange={async (e) => {
														await handleColumnVisibilityChange(visibilitySetting.id, e);
													}}
												/>
											</div>
											<div class="w-12 shrink-0 flex justify-center items-center">
												<Icon
													data={getIconByName(visibilitySetting.iconType)}
													stroke="transparent"
													class="w-7 h-7"
												/>
											</div>
											<div class="flex-1 flex truncate tablle-setting font-medium">
												<Tooltip top>
													<div class="flex-1 truncate">
														{visibilitySetting.name}
													</div>
													<span slot="tip" class="flex gap-2 leading-tight text-xs"
														><Icon
															data={Icons.infoIcon}
															stroke="transparent"
															class="w-4 shrink-0"
														/>{visibilitySetting.name}</span
													>
												</Tooltip>
											</div>
										</div>
									</div>
								{/each}
							</SortableList>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
<div
	class="w-full flex-1 border-gradient border-gradient-blue bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:rounded-tl-none rounded-3xl rounded-tl-none before:shadow-glass-dropdown before:opacity-30 before:inset-0 max-w-full"
>
	<div class="rounded-3xl rounded-tl-none overflow-hidden w-full">
		<div class="overflow-auto w-full flex-1 scrollbar scroll-card-meta md:min-h-full relative z-10">
			{#if rows && rows.length > 0 && visibleColumns}
				<TanStackDataTable
					data={rows}
					columns={visibleColumns}
					styling={gridStyling}
					id="{tabName}-{id}-tanstack-datagrid"
					{tooltipFinder}
				/>
			{:else if loading}
				<LoadingWithCaption caption="Rendering data..." />
			{:else}
				<PageUnderDevelopment
					heading="No data to show"
					details="Please reload the page or re-adjust the filters"
				/>
			{/if}
		</div>
	</div>
</div>
