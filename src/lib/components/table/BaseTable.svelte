<script lang="ts" context="module">
  import type { Writable } from 'svelte/store'
  import type * as Types from '$lib/components/table/types'
  import type { IBatchSelectBus } from '$lib/components/common/BatchSelect.svelte'
</script>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import HeadCell from '$lib/components/table/HeadCell.svelte'
  import { defaultAscSortFn } from '$lib/components/table/misc'
	import PageUnderDevelopment from '$lib/components/layout/PageUnderDevelopment.svelte'

  import Storage from '$lib/local-packages/LocalStorage'

  import BatchSelect from '$lib/components/common/BatchSelect.svelte'
  import Checkbox from '$lib/components/common/Checkbox.svelte'

  const dispatch = createEventDispatcher()

  export let setup!: Types.ITableSetup
  export let data: Types.RowType[] = []
  export let namespace = ''
  export let isLoading = true
  export let selectedIds: string[] = []

  const storageKeys = {
    colWidths: `${namespace}_table_col_widths`,
    order: `${namespace}_table_order`,
    pinned: `${namespace}_table_pinned`,
    visible: `${namespace}_table_visible`,
    sortData: `${namespace}_table_sort_data`,
  }

  let batchSelectBus: IBatchSelectBus

  let dndDurationMs = 0 /** Should be always 0 by default */

  let tableEl: HTMLDivElement
  let skeletonEl: HTMLDivElement

  let vScroll: Types.ITableVScroll = {
      range: { startAt: 0, endAt: 0 },
      offsets: { top: 0, bottom: setup.rowHeight * data.length },
  }
  let vScrollInitialized = false
  let vScrollDebounceInt: number | undefined

  let cols: Types.ITableColumn[] = setup.cols.map((col, id) => ({ id, ...col }))

  let colWidths = Storage.bind(storageKeys.colWidths, Object.fromEntries(
    cols.map(col => [col.name, col.width])
  ))

  let order = Storage.bind(storageKeys.order, setup.order)
  let pinned = Storage.bind(storageKeys.pinned, setup.pinned)
  let visible = Storage.bind(storageKeys.visible, setup.visible)

  let sortData: Writable<Types.ISortData> = Storage.bind(storageKeys.sortData, {
    colName: '',
    dir: null
  })

  let summaryData = getSummaryData()

  const setScrollPosition: Types.ITableBus['setScrollPosition'] = (scrollTop = 0) => {
    const { rowHeight, rowsPerView } = setup

    // Cache some results for better user experience
    const cacheSize = rowsPerView
    const startAt = Math.max(Math.floor((scrollTop - rowHeight) / rowHeight) - cacheSize, 0)
    const endAt = startAt + rowsPerView + (cacheSize * 2)

    const top = startAt * rowHeight
    const bottom = (data.length - endAt) * rowHeight

    if (!vScrollInitialized && tableEl) {
      tableEl.scrollTop = scrollTop
    }

    if (!vScrollInitialized || startAt !== vScroll.range.startAt) {
      vScroll.range = { startAt, endAt }
    }

    vScroll.offsets = { top, bottom }
    vScrollInitialized = true

    return vScroll
  }

  const toggleVisibility: Types.ITableBus['toggleVisibility'] = colName => {
    const isVisible = $visible.includes(colName)

    isVisible
      ? $visible.splice($visible.indexOf(colName), 1)
      : $visible.push(colName)

    $visible = $visible

    return !isVisible
  }

  const togglePin: Types.ITableBus['togglePin'] = colName => {
    const isPinned = $pinned.includes(colName)

    isPinned
      ? $pinned.splice($pinned.indexOf(colName), 1)
      : $pinned.push(colName)

    $pinned = $pinned

    return !isPinned
  }

  const getDataAsCSV: Types.ITableBus['getDataAsCSV'] = () => {
    const exportCols = visibleCols.filter(col => col !== idCol)

    const rowsData = data.map(row => {
      return exportCols.map(col => {
        const value = col.getValue(row)
        return JSON.stringify(col.display?.(value) ?? value ?? '')
      }).join()
    }).join('\n')

    const colsTitles = exportCols.map(col => JSON.stringify(col.title)).join()

    return `${colsTitles}\n${rowsData}`
  }

  const sort: Types.ITableBus['sort'] = (sortDataValue, display, ascSortFn = defaultAscSortFn ) => {
    $sortData = sortDataValue

    return data = data.sort((rowA, rowB) => {
      if (!$sortData.dir) return rowA.id - rowB.id
      const dirMultiplier = $sortData.dir === 'desc' ? -1 : 1
      return ascSortFn(display(rowA), display(rowB), display, $sortData) * dirMultiplier
    })
  }

  const removeStorageKeys: Types.ITableBus['removeStorageKeys'] = () => {
    Object.values(storageKeys).map(Storage.remove)
  }

  function onScroll (e: any) {
    if (e.type === 'wheel') {
      e.preventDefault()

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX * .5)) {
        tableEl.scrollTop += e.deltaY
      } else {
        tableEl.scrollLeft += e.deltaX
      }

      // Wheel event cancels inertia scroll, thus animation will be synced
      skeletonEl.style.transform = `translateY(-${tableEl.scrollTop % setup.rowHeight}px)`
      skeletonEl.querySelectorAll('.base-table__group.-unpinned').forEach((el: any) => {
        el.style.transform = `translateX(-${tableEl.scrollLeft}px)`
      })
    }

    clearTimeout(vScrollDebounceInt)
    vScrollDebounceInt = setTimeout(() => {
      setScrollPosition(tableEl?.scrollTop)
    }, 200)
  }

  function onColumnDrop (e: any) {
    const dndCols = e.detail.items as Types.ITableColumn[]
    cols = [...pinnedCols, ...dndCols]
    dndDurationMs = e.type === 'finalize' ? 0 : 150
    return $order = [...$pinned, ...dndCols.map(col => col.name)]
  }

  function transformDraggedElement (el?: HTMLElement, event?: any) {
    const action = event?.type === 'finilized' ? 'remove' : 'add'
    el?.classList?.[action]('is-dragging-cell')
  }

  function restoreSort () {
    const col = setup.cols.find(col => col.name === $sortData.colName)
    return col ? sort($sortData, col.getValue, col.ascSortFn) : data
  }

  function getSummaryData () {
    return Object.fromEntries(
      cols.map(col => {
        const summary = col.getSummary?.(data)
        return [col.name, summary ? (col.display?.(summary) ?? summary) : '\u00A0' /* nbsp */]
      })
    )
  }

  $: data && (summaryData = getSummaryData())
  $: data && restoreSort()
  $: isEmpty = !isLoading && !data.length

  $: vScrollData = data.slice(vScroll.range.startAt, vScroll.range.endAt) satisfies Types.RowType[]
  $: skeletonRowsSize = isLoading ? (setup.rowsPerView + 2) : Math.min(setup.rowsPerView + 2, data.length)

  $: idCol = cols.find(col => col.name === 'id')
  $: ids = data.map(row => idCol?.getValue(row)) satisfies number[]

  $: unpinnedCols = cols
    .filter(col => $visible.includes(col.name) && !$pinned.includes(col.name))
    .sort((a, b) => $order.indexOf(a.name) - $order.indexOf(b.name))

  $: pinnedCols = cols
    .filter(col => $visible.includes(col.name) && $pinned.includes(col.name))
    .sort((a, b) => $order.indexOf(a.name) - $order.indexOf(b.name))
    .sort((a, b) => $pinned.indexOf(a.name) - $pinned.indexOf(b.name))

  $: orderedCols = cols
    .sort((a, b) => $order.indexOf(a.name) - $order.indexOf(b.name))

  $: visibleCols = [...pinnedCols, ...unpinnedCols]

  $: baseTableBus = {
    tableEl,
    unpinnedCols,
    pinnedCols,
    orderedCols,
    visibleCols,

    setScrollPosition,
    toggleVisibility,
    togglePin,
    getDataAsCSV,
    sort,
    removeStorageKeys,
  } satisfies Types.ITableBus

  $: dispatch('bus', baseTableBus)

  $: data && setScrollPosition(setup.startScrollPosition ?? 0)
  onMount(() => setScrollPosition(setup.startScrollPosition ?? 0))
</script>

{#if idCol}
  <BatchSelect
    bind:ids={ids}
    bind:selectedIds={selectedIds}
    on:bus={e => batchSelectBus = e.detail}
  />
{/if}

<div class="base-table-wrapper">
  <div
    class="base-table"
    class:is-loading={isLoading}
    class:is-empty={isEmpty}
    bind:this={tableEl}
    on:wheel|capture={onScroll}
    on:scroll={onScroll}
  >
    <div class="base-table__head">
      {#each [
        { name: 'pinned', cols: pinnedCols },
        { name: 'unpinned', cols: unpinnedCols }
      ] as group}
        {#if group.cols.length}
          <div
            class="base-table__group -head -{group.name}"
            use:dndzone={{
              items: group.cols,
              flipDurationMs: dndDurationMs,
              type: `table-header-${group.name}`,
              dropFromOthersDisabled: true,
              dropTargetStyle: {},
              transformDraggedElement,
              dragDisabled: group.name === 'pinned',
            }}
            on:consider={onColumnDrop}
            on:finalize={onColumnDrop}
          >
            {#each group.cols as col(col.id ?? col.name)}
              <div
                class="base-table__cell"
                animate:flip={{ duration: dndDurationMs }}
                style="width: {$colWidths[col.name]}px;"
              >
                <HeadCell
                  {col}
                  {baseTableBus}
                  sortData={$sortData}
                  width={$colWidths[col.name]}
                  isPinned={$pinned.includes(col.name)}
                  on:resize={e => $colWidths[col.name] = e.detail}
                >
                  <svelte:fragment slot="title">
                    {#if col.name === 'id'}
                      <Checkbox
                        value={batchSelectBus?.value}
                        intermidiate={batchSelectBus?.value === null}
                        name={`${setup.name}_id`}
                        disabled={isLoading}
                        on:change={() => batchSelectBus?.toggleSelectAll()}
                      />
                    {:else}
                      {col.title}
                    {/if}
                  </svelte:fragment>
                </HeadCell>
              </div>
            {/each}
          </div>
        {/if}
      {/each}
    </div>

    {#if isEmpty}
      <div class="base-table__empty">
        <PageUnderDevelopment
					heading="No data to show"
					details="Please reload the page or re-adjust the filters"
				/>
      </div>
    {/if}

    <div class="base-table__body">
      <div class="base-table__skeleton" bind:this={skeletonEl}>
        {#key skeletonRowsSize}
          {#each Array(skeletonRowsSize) as index}
            <div
              class="base-table__v-row"
              style="height: {setup.rowHeight}px;"
            >
              <div class="base-table__row">
                {#each [
                  { name: 'pinned', cols: pinnedCols },
                  { name: 'unpinned', cols: unpinnedCols }
                ] as group}
                  {#if group.cols.length}
                    <div class="base-table__group -row -{group.name}">
                      {#each group.cols as col}
                        <div
                          class="base-table__cell"
                          style="width: {$colWidths[col.name]}px;"
                        >
                          <div class="skeleton-content"></div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          {/each}
        {/key}
      </div>

      {#key vScroll.offsets.top}
        <div style="height: {vScroll.offsets.top}px;"></div>
      {/key}

      {#each vScrollData as row(idCol?.getValue(row))}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="base-table__v-row"
          style="height: {setup.rowHeight}px;"
          on:click={e => batchSelectBus?.select(e, idCol?.getValue(row))}
        >
          <div
            class="base-table__row"
            class:is-selected={selectedIds.includes(idCol?.getValue(row))}
          >
            {#each [
              { name: 'pinned', cols: pinnedCols },
              { name: 'unpinned', cols: unpinnedCols }
            ] as group}
              {#if group.cols.length}
                <div
                  class="base-table__group -row -{group.name}"
                  class:is-selected={selectedIds.includes(idCol?.getValue(row))}
                >
                  {#each group.cols as col}
                    <div
                      class="base-table__cell"
                      style="width: {$colWidths[col.name]}px;"
                    >
                      {#if col.name === 'id'}
                        <Checkbox
                          value={selectedIds.includes(idCol?.getValue(row))}
                          name={`${setup.name}_id`}
                          on:change={() => batchSelectBus.toggleSelect(idCol?.getValue(row))}
                        />
                      {:else}
                        <slot
                          name="cell"
                          value={col.display?.(col.getValue(row)) ?? col.getValue(row)}
                          colName={col.name}
                          type={col.type}
                        />
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/each}

      {#key vScroll.offsets.bottom}
        <div style="height: {vScroll.offsets.bottom}px;"></div>
      {/key}
    </div>

    {#if !isEmpty}
      <div class="base-table__footer">
        {#each [
          { name: 'pinned', cols: pinnedCols },
          { name: 'unpinned', cols: unpinnedCols }
        ] as group}
          {#if group.cols.length}
            <div class="base-table__group -footer -{group.name}">
              {#each group.cols as col}
                <div
                  class="base-table__cell"
                  style="width: {$colWidths[col.name]}px;"
                >
                  {#if isLoading}
                    <div class="skeleton-content"></div>
                  {:else}
                    {summaryData[col.name]}
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  :global(html, body) {
    -webkit-overflow-scrolling: auto; 
    overscroll-behavior-x: none;
    overscroll-behavior-y: none;
  }

  :global(.is-dragging-cell) {
    background: #333B43!important;
    opacity: .9!important;
    border-radius: 6px!important;
  }

  .base-table-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .base-table {
    display: flex;
    flex-direction: column;
    overflow: auto;
    line-height: 125%;
    &.is-loading {
      &, .base-table__body {
        height: 100%;
      }
    }
    &.is-empty {
      height: 100%;
      .base-table__body {
        display: none;
      }
    }

    :global([data-is-dnd-shadow-item]) {
      visibility: visible !important;
      opacity: .4;
    }

    &__head, &__row, &__footer {
      display: flex;
      border-radius: 6px;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
      min-width: fit-content;
    }

    &__head, &__footer {
      position: sticky;
      z-index: 3;
      background: linear-gradient(90deg, #333B43 0%, #515C67 52.08%, #333B43 100%);
    }

    &__head {
      top: 0;
      border-top-left-radius: 0;
    }

    &__body {
      padding: 4px 0;
    }

    &__skeleton {
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
      will-change: transform;
      .base-table__row {
        box-shadow: none;
      }
      .base-table__group.-pinned {
        will-change: inherit;
      }
    }

    &__empty {
      height: 100%;
      overflow: hidden;
      position: sticky;
      left: 0;
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.2) 100%));
      border-radius: 6px;
    }

    &__footer {
      bottom: 0;
    }

    &__v-row {
      padding: 4px 0;
      background: #111A2D;
      position: relative;
      z-index: 1;
    }

    &__row {
      background: linear-gradient(90deg, #10161F 0%, #1F2731 50.52%, #10161F 100%);
      height: 100%;
      &:hover {
        background: linear-gradient(90deg, #070F17 0%, #101E2D 50.52%, #070F17 100%);
      }
      &.is-selected {
        background: radial-gradient(#46A6FF 0%, #003A71 100%);
      }
    }

    &__cell {
      display: flex;
      height: 100%;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    &__cell-truncate {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__group {
      display: flex;
      border: 1px solid var(--card-background-stroke, #6F6E6E);
      border-radius: inherit;
      background: inherit;
      &:last-child {
        flex-grow: 1;
      }
      &.-pinned {
        position: sticky;
        left: 0;
        z-index: 2;
        box-shadow: inherit;
        &:not(:only-child) {
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      &.-unpinned {
        &:not(:only-child) {
          border-left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      &.-head {
        :global(.base-head-cell__inner) {
          padding: 0 3px 0 15px;
        }
      }
      &.-row {
        .base-table__cell {
          padding: 12px 3px 12px 15px;
        }
      }
      &.-footer {
        .base-table__cell {
          padding: 8px 3px 8px 15px;
        }
      }
    }
  }

  .custom-scrollbar {
    overflow: overlay!important;
    &::-webkit-scrollbar-track {
      box-shadow: none;
      background: transparent;
    }

    &::-webkit-scrollbar {
      width: 10px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-image: -webkit-linear-gradient(top,
        #e4f5fc 0%,
        #bfe8f9 50%,
        #9fd8ef 51%,
        #2ab0ed 100%);
    }
  }

  .skeleton-content {
    width: 100%;
    height: 20px;
    background: linear-gradient(
        90deg,
        rgba(133, 129, 129, 0.05),
        rgba(170, 170, 170, 0.2) 50%,
        rgba(133, 129, 129, 0.05) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-content 1.5s infinite;
    border-radius: 6px;
  }

  @keyframes skeleton-content {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0% 0;
    }
  }
</style>
