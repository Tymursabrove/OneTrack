<script lang="ts" context="module">
  export const tabNames: TabEnum[] = ['campaigns', 'adSets', 'ads']

  import type { Writable } from 'svelte/store'
  import type { WorkspaceDataType } from '$lib/types/Types'
  import type { ITableSetup, ITableBus, RowType } from '$lib/components/table/types'
  import type { IFilterBus } from '$lib/components/layout/Attribution/Filter.svelte'
  
  export type TabEnum = 'campaigns'|'adSets'|'ads'
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Storage from '$lib/local-packages/LocalStorage'

  import BaseTable from '$lib/components/table/BaseTable.svelte'

  import Settings from '$lib/components/layout/Attribution/Settings.svelte'
  import Download from '$lib/components/layout/Attribution/Download.svelte'
  import Filter from '$lib/components/layout/Attribution/Filter.svelte'

  import Modal from '$lib/components/common/Modal.svelte'
  import Button from '$lib/components/common/Button.svelte'
  import Tooltip from '$lib/components/common/Tooltip.svelte'
  import Icon from '$lib/components/common/Icon.svelte'

  const dispatch = createEventDispatcher()

  export let setups: {
    campaigns: ITableSetup;
    adSets: ITableSetup;
    ads: ITableSetup;
  }

  export let data: {
    campaigns: RowType[];
    adSets: RowType[];
    ads: RowType[];
  }

  export let workspace!: WorkspaceDataType
  export let page!: string
  export let isLoading = true

  const storageKeys = {
    activeTab: `${page}_${workspace.id}_table_layout_active_tab`,
    roasValues: `${workspace.id}_table_layout_roas_values`,
    filter: `${page}_${workspace.id}_filter`,
  }

  let tableBuses = {} as {
    [x in TabEnum]: ITableBus
  } & {
    [slot_ctx: string]: ITableBus
  }

  let selectedIds: {
    [x in TabEnum]: string[]
  } & {
    [slot_ctx: string]: string[]
  } = {
    campaigns: [],
    adSets: [],
    ads: [],
  }

  let filterBus: IFilterBus

  let activeTabName: Writable<TabEnum> = Storage.bind(storageKeys.activeTab, 'campaigns')
  let roasValues: Writable<Record<string, number>> = Storage.bind(storageKeys.roasValues, {})

  let isPageTextModalShown = false

  function onKeydown (e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && ['ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault()

      const index = tabNames.indexOf($activeTabName)
      const length = tabNames.length

      $activeTabName = e.code === 'ArrowLeft' 
        ? tabNames[(index || length) - 1]
        : $activeTabName = tabNames[(index + 1) % length]
    }

    if ((e.metaKey || e.ctrlKey) && e.code === 'Backspace') {
      e.preventDefault()
      e.shiftKey ? resetFilters() : resetFilter($activeTabName)
    }

    if ((e.metaKey || e.ctrlKey) && e.code === 'Enter') {
      e.preventDefault()
      applyFilters()
    }
  }

  function removeStorageKeys () {
    Storage.remove(storageKeys.roasValues)
    baseTableBus.removeStorageKeys()
    dispatch('removeStorageKeys')
  }

  function filterData () {
    filteredData = {
      campaigns: data.campaigns.filter(row => filterBus.filterFn(row, true)),
      adSets: data.adSets.filter(row => filterBus.filterFn(row, true)),
      ads: data.ads.filter(row => filterBus.filterFn(row, true)),
    }
  }

  function applyFilters () {
    tabNames.map(tabName => {
      if (!selectedIds[tabName].length) return

      filterBus.apply(filterBus.tabNameToFilterName(tabName), selectedIds[tabName])
      selectedIds[tabName] = []
    })
  }

  function resetFilter (tabName: TabEnum) {
    filterBus.reset(filterBus.tabNameToFilterName(tabName))
  }

  function resetFilters () {
    filterBus.resetAll()
  }

  function checkFilterDisabled () {
    return !!tabNames.find(tabName => selectedIds[tabName].length && selectedIds[tabName].length !== filteredData[tabName].length)
  }

  $: baseTableBus = tableBuses[$activeTabName]
  $: isFilterDisabled = (selectedIds && filteredData) ? checkFilterDisabled() : false

  $: filteredData = {
    campaigns: data.campaigns,
    adSets: data.adSets,
    ads: data.ads,
  } as {
    [x in TabEnum]: RowType
  } & {
    [slot_ctx: string]: RowType
  }

  $: filterBus && filterData()
</script>

<svelte:window
  on:keydown={onKeydown}
/>

<div class="table-layout">
  <div class="table-layout__head">
    <div class="table-layout__head-group">
      <div class="table-layout__head-title-info">
        <div class="table-layout__head-title">
          <slot name="head-title"/>
        </div>
    
        {#if $$slots['head-info']}
          <Modal bind:show={isPageTextModalShown}>
            <Icon
              slot="handler"
              class="table-layout__head-info"
              name="info"
              interactive
              on:click={() => isPageTextModalShown = true}
            />

            <slot name="head-info"/>
          </Modal>
        {/if}
      </div>

      <div class="table-layout__head-description">
        <slot name="head-description"/>
      </div>
    </div>

    <div class="table-layout__head-group">
      {#if $$slots['head-last-update']}
        <div class="table-layout__head-last-update">
          Last Updated: <slot name="head-last-update"/>
        </div>
      {/if}

      {#if $$slots['head-next-update']}
        <div class="table-layout__head-next-update">
          Next Update: <slot name="head-next-update"/>
        </div>
      {/if}
    </div>
  </div>

  {#if baseTableBus}
    <div class="table-layout__setup">
      <div class="table-layout__setup-filter">
        {#key isLoading}
          {#if isFilterDisabled}
            <Button
              class="grow"
              text="Apply Filters"
              disabled={isLoading}
              on:click={applyFilters}
            />
          {:else}
            <Filter
              {data}
              disabled={isLoading}
              parentActiveTabName={$activeTabName}
              storageKey={storageKeys.filter}
              on:bus={e => filterBus = e.detail}
            />
          {/if}
        {/key}
      </div>

      <div class="table-layout__setup-actions">
        <!-- <Button
          action="secondary"
          leftIcon="filter"
          role="dropdown"
          on:click={() => alert('Is coming...')}
          disabled={true}
        /> -->

        <Button
          action="secondary"
          leftIcon="reloadIcon"
          on:click={() => dispatch('reload', $activeTabName)}
          disabled={isLoading}
        />

        <Download
          {tableBuses}
          activeTabName={$activeTabName}
          {isLoading}
        />

        <Settings
          {baseTableBus}
          {roasValues}
          {removeStorageKeys}
        />
      </div>
    </div>
  {/if}

  <div class="table-layout__nav">
    <div class="table-layout-tabs">
      {#each tabNames as name}
        {@const setup = setups[name]}

        <button
          class="table-layout-tabs__item"
          class:is-selected={$activeTabName === name}
          on:click={() => $activeTabName = name}
        >
          <Icon name={setup.icon}/>

          {setup.title}

          {#if !isLoading && filterBus?.tabStatuses[name] }
            <button
              class="filter-clear-btn"
              on:click|stopPropagation={() => resetFilter(name)}
            >
              <Icon name="filter"/>
              <Icon name="close"/>
            </button>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  {#each Object.entries(setups) as [ctx, setup]}
    <div
      class="table-layout__body"
      class:is-hidden={$activeTabName !== ctx}
    >
      {#key isLoading && activeTabName}
        <BaseTable
          {setup}
          data={filteredData[ctx]}
          namespace={`${page}_${workspace.id}_${ctx}`}
          {isLoading}
          bind:selectedIds={selectedIds[ctx]}
          on:bus={e => tableBuses[ctx] = e.detail}
        >
          <svelte:fragment slot="cell" let:value let:colName let:type>
            {#if $roasValues[page] && type === 'roas'}
              <div class="roas-goal -{value >= $roasValues[page] ? 'passed' : 'failed'}">
                <slot name="cell" {value} {colName}>
                  {value}
                </slot>
              </div>
            {:else}
              <slot name="cell" {value} {colName}>
                <Tooltip beforeShow={handler => handler.scrollHeight > handler.offsetHeight}>
                  <div class="cell-truncate">
                    {value}
                  </div>
                  <svelte:fragment slot="content">
                    {value}
                  </svelte:fragment>
                </Tooltip>
              </slot>
            {/if}
          </svelte:fragment>
        </BaseTable>
      {/key}
    </div>
  {/each}
</div>

<style lang="scss" global>
  .table-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    &__head {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      font-size: 14px;
      line-height: 20px;
      &-group {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      &-title-info {
        display: flex;
        gap: 8px;
      }
      &-title {
        font-size: 24px;
        font-weight: 600;
      }
      // &-description {}
      &-text {
        display: none;
      }
      &-last-update, &-next-update {
        text-align: right;
      }
    }

    &__setup {
      padding: 21px 0;
      flex-wrap: wrap;
      &, &-filter, &-actions {
        display: flex;
        gap: 12px;
      }
      &-filter {
        margin-right: auto;
        width: 100%;
        @media (min-width: 768px) {
          max-width: 320px;
        }
      }
    }
    &__nav {
      max-width: 1400px;
      overflow: auto;
    }
    &__body {
      height: 0;
      flex-grow: 1;
      &.is-hidden {
        visibility: hidden;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    }
  }

  .table-layout-tabs {
    display: flex;
    gap: 12px;
    white-space: nowrap;
    &__item {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 12px;
      padding: 12px 21px;
      border-radius: 6px 6px 0px 0px;
      font-weight: 600;
      border: 1px solid var(--card-background-stroke, #6F6E6E);
      border-bottom: none;
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60), 0px -4px 8px 0px rgba(0, 0, 0, 0.50) inset;
      &:hover {
        background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.10) 0%, rgba(170, 170, 170, 0.40) 100%));
      }
      &.is-selected {
        border-color: rgba(255, 255, 255, 0.50);
        background: linear-gradient(135deg, rgba(0, 125, 242, 0.20) 0%, rgba(70, 166, 255, 0.50) 100%);
      }
    }
  }

  .filter-clear-btn {
    display: flex;
    align-items: center;
    border-radius: 24px;
    border: 1px solid;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.50);
    padding: 2px 14px;
    font-weight: normal;
    margin: -2px 0 -2px auto;
    &:hover {
      background: rgba(#fff, .15);
    }
    &:active {
      background: rgba(#fff, .1);
    }
  }

  .roas-goal {
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.50);
    flex-grow: 1;
    padding: 9px;
    margin-left: -9px;
    &.-passed {
      background: var(--radial-green-3, radial-gradient(75.27% 75.27% at 68.03% 31.76%, #11C1A2 0%, #008B72 100%));
    }
    &.-failed {
      background: var(--radial-red, radial-gradient(75.27% 75.27% at 68.03% 31.76%, #E14343 0%, #860A0A 100%));
    }
  }

  .cell-truncate {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
</style>
