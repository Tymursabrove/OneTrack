<script lang="ts" context="module">
  export const filterNames: FilterEnum[] = ['accountId', 'campaignId', 'adSetId', 'adId']

  import type { Writable } from 'svelte/store'
  import type { RowType } from '$lib/components/table/types'
  import type { IBatchSelectBus } from '$lib/components/common/BatchSelect.svelte'
  import type { TabEnum } from '$lib/components/layout/Attribution/Layout.svelte'

  export type FilterEnum = 'accountId'|'campaignId'|'adSetId'|'adId'
  export type FilterType = { title: string; headTitle: string; options: OptionType[] }
  export type OptionType = { title: string; id: string }

  
  export interface IFilterBus {
    filters: Record<FilterEnum, string[]>;
    tabStatuses: Record<TabEnum, boolean>;
    apply: (filterName: FilterEnum, filterIds: string[]) => void;
    reset: (filterName: FilterEnum) => void;
    resetAll: () => void;
    filterFn: (row: RowType, scoped: boolean) => RowType;
    tabNameToFilterName: (tabName: TabEnum) => FilterEnum;
    filterNameToTabName: (filterName: FilterEnum) => TabEnum;
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import Storage from '$lib/local-packages/LocalStorage'

  import BatchSelect from '$lib/components/common/BatchSelect.svelte'
  import Tabs from '$lib/components/common/Tabs.svelte'
  import Input from '$lib/components/common/Input.svelte'
  import Button from '$lib/components/common/Button.svelte'
  import Icon from '$lib/components/common/Icon.svelte'
  import Popover from '$lib/components/common/Popover.svelte'
  import Checkbox from '$lib/components/common/Checkbox.svelte'

  const dispatch = createEventDispatcher()

  export let disabled = true

  export let data!: {
    campaigns: RowType[];
    adSets: RowType[];
    ads: RowType[];
  }

  export let storageKey!: string
  export let parentActiveTabName!: TabEnum

  let batchSelectBus: IBatchSelectBus
  let rerenderKey = 0

  let selectedIds: Writable<Record<FilterEnum, string[]>> = Storage.bind(storageKey, {
    accountId: [],
    campaignId: [],
    adSetId: [],
    adId: [],
  })

  let searchQueries: Writable<Record<FilterEnum, string>> = Storage.bind(`${storageKey}_search_queries`, {
    accountId: '',
    campaignId: '',
    adSetId: '',
    adId: '',
  })

  let inverseFlags: Writable<Record<FilterEnum, boolean>> = Storage.bind(`${storageKey}_inverse_flags`, {
    accountId: false,
    campaignId: false,
    adSetId: false,
    adId: false,
  })

  let filters: Record<FilterEnum, FilterType> = {
    accountId: {
      title: 'Accounts',
      headTitle: 'Account Name',
      options: getOptions(data.campaigns, 'accountName', 'accountId'),
    },
    campaignId: {
      title: 'Campaigns',
      headTitle: 'Campaign Name',
      options: getOptions(data.campaigns, 'campaignName', 'campaignId'),
    },
    adSetId: {
      title: 'Ad Sets',
      headTitle: 'Ad Set Name',
      options: getOptions(data.adSets, 'adSetName', 'adSetId'),
    },
    adId: {
      title: 'Ads',
      headTitle: 'Ad Name',
      options: getOptions(data.ads, 'adName', 'adId'),
    },
  }

  let filterTabs = Object.entries(filters).map(([ name, filter ]) => ({
    name: name as FilterEnum,
    title: filter.title
  }))

  let filteredIds = getFilteredIds()

  function getOptions (data: RowType[], titleProp: string, idProp: FilterEnum) {
    const uniqueIds: string[] = []

    return data.filter(row => {
      if (!(idProp in row) || uniqueIds.includes(row[idProp])) return
      return uniqueIds.push(row[idProp])
    }).map(row => ({
      title: row[titleProp],
      id: row[idProp]
    })).sort((rowA, rowB) => rowA.title > rowB.title ? 1 : -1)
  }

  function filterFn (row: RowType, scoped = false) {
    const idProps: Record<FilterEnum, boolean> = { 
      adId: true,
      adSetId: true,
      campaignId: true,
      accountId: true,
    }

    Object.keys(idProps).map(key => {
      const idProp = key as FilterEnum

      if (!(idProp in row)) return
      if (!scoped) return scoped = true

      if ($selectedIds[idProp].length) {
        idProps[idProp] = $selectedIds[idProp].includes(row[idProp])
      }
    })

    return !Object.values(idProps).includes(false)
  }

  function getFilteredIds () {
    return {
      accountId: data.campaigns.filter(row => filterFn(row)).map(row => row.accountId),
      campaignId: data.campaigns.filter(row => filterFn(row)).map(row => row.campaignId),
      adSetId: data.adSets.filter(row => filterFn(row)).map(row => row.adSetId),
      adId: data.ads.filter(row => filterFn(row)).map(row => row.adId),
    }
  }

  function tabNameToFilterName (tabName: TabEnum): FilterEnum {
    if (tabName === 'adSets') return 'adSetId'
    if (tabName === 'ads') return 'adId'
    return 'campaignId'
  }

  function filterNameToTabName (filterName: FilterEnum): TabEnum {
    if (filterName === 'adSetId') return 'adSets'
    if (filterName === 'adId') return 'ads'
    return 'campaigns'
  }

  function getTabFilterStatus (tabName: TabEnum) {
    const filterName = tabNameToFilterName(tabName)
    return !!($selectedIds[filterName].length && $selectedIds[filterName].length !== data[tabName].length)
  }

  function init () {
    dispatch('bus', {
      filters: {
        accountId: $selectedIds.accountId,
        campaignId: $selectedIds.campaignId,
        adSetId: $selectedIds.adSetId,
        adId: $selectedIds.adId,
      },

      tabStatuses: {
        campaigns: getTabFilterStatus('campaigns'),
        adSets: getTabFilterStatus('adSets'),
        ads: getTabFilterStatus('ads'),
      },

      apply (filterName: FilterEnum, filterIds: string[]) {
        $selectedIds[filterName] = filterIds
        init()
      },

      reset (filterName: FilterEnum) {
        $selectedIds[filterName] = []
        init()
      },

      resetAll () {
        filterNames.map(filterName => $selectedIds[filterName] = [])
        init()
      },

      filterFn,
      tabNameToFilterName,
      filterNameToTabName,
    } satisfies IFilterBus)

    filteredIds = getFilteredIds()
  }

  $: activeFilterName = tabNameToFilterName(parentActiveTabName)
  $: activeFilter = filters[activeFilterName]
  $: activeOptions = activeFilter.options.filter(option => filteredIds[activeFilterName].includes(option.id))

  $: activeIds = activeFilter.options.filter(option => activeOptions.includes(option)).map(option => option.id)
  $: activeSelectedIds = $selectedIds[activeFilterName]

  $: activeSearchQuery = $searchQueries[activeFilterName];
  $: activeFoundOptions = activeOptions.filter(option => {
    const foundOption = [option.title, option.id].find(match => match.toLowerCase().includes(activeSearchQuery.toLowerCase()))
    return $inverseFlags[activeFilterName] ? !foundOption : foundOption
  })

  $: activeSelectedIds && (rerenderKey += 1)

  onMount(init)
</script>

<BatchSelect
  ids={activeIds}
  bind:selectedIds={$selectedIds[activeFilterName]}
  on:bus={e => batchSelectBus = e.detail}
  on:update={init}
/>

<Popover
  placement="bottom-start"
  let:show
>
  <Button
    class="grow"
    action="secondary"
    state={show ? 'active' : 'default'}
    text="Search and Filter"
    role="dropdown"
    {disabled}
  />

  <div class="filter" slot="content">
    <Tabs
      tabs={filterTabs}
      bind:selectedTabName={activeFilterName}
    >
      {#if batchSelectBus && activeOptions.length}
        <div class="filter__search">
          <Input
            class="filter__search-input"
            bind:value={$searchQueries[activeFilterName]}
            placeholder="Search..."
          />

          <Icon
            class="filter__search-inverseFlags"
            name="inverse-search"
            size="big"
            interactive
            filled={$inverseFlags[activeFilterName]}
            on:click={() => $inverseFlags[activeFilterName] = !$inverseFlags[activeFilterName]}
          />

          <Button
            class="filter__search-btn"
            leftIcon="tick"
            disabled={!activeSearchQuery.trim() || !activeFoundOptions.find(option => !activeSelectedIds.includes(option.id))}
            on:click={() => activeFoundOptions.map(option => !activeSelectedIds.includes(option.id) && batchSelectBus.toggleSelect(option.id))}
          />
        </div>
  
        <div class="filter__head">
          <Checkbox
            value={batchSelectBus?.value}
            intermidiate={batchSelectBus?.value === null}
            name={`${activeFilterName}_id`}
            on:change={() => batchSelectBus.toggleSelectAll()}
          >
            {activeFilter.headTitle}
          </Checkbox>
        </div>
  
        <div class="filter__options">
          {#each activeOptions as option(option.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#key rerenderKey}
              <div
                class="filter__option"
                class:is-hidden={!activeFoundOptions.includes(option)}
                on:click={e => batchSelectBus.select(e, option.id)}
              >
                <Checkbox
                  value={activeSelectedIds.includes(option.id)}
                  name={`${activeFilterName}_id`}
                  on:change={() => batchSelectBus.toggleSelect(option.id)}
                >
                  {option.title}
                </Checkbox>
              </div>
            {/key}
          {/each}
        </div>
      {:else}
        <div class="filter__empty">No data to show</div>
      {/if}
    </Tabs>
  </div>
</Popover>

<style lang="scss">
  .filter {
    width: 100vw;
    max-width: 546px;
    padding: 21px;
    border-radius: 6px;

    &__search {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 18px 0;
      :global(.filter__search-input) {
        width: 100%;
        padding-right: 50px;
      }
      :global(.filter__search-inverseFlags) {
        position: absolute;
        right: 110px;
      }
    }

    &__head {
      padding-bottom: 6px;
      margin-bottom: 12px;
      border-bottom: 2px solid;
      color: #66b5ff;
      font-weight: 600;
      :global(.checkbox__body) {
        border: 2px solid #66b5ff;
        color: #fff;
      }
    }

    &__options {
      max-height: calc(100vh - 430px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      font-weight: 600;
      &::before {
        content: '';
        margin-top: -13px;
      }
    }

    &__option {
      padding: 12px 0;
      border-top: 1px solid #8B939E;
      &.is-hidden {
        color: #8B939E;
        order: 9999;
      }
    }

    &__empty {
      text-align: center;
      margin-top: 18px;
      padding: 11px;
      border-radius: 6px;
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.2) 100%));
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.6);
      font-weight: 600;
      color: rgba(#fff, .5);
    }
  }
</style>
