<script lang="ts" context="module">
  import type { ITableBus } from '$lib/components/table/types'
  import type { TabEnum } from '$lib/components/layout/Attribution/Layout.svelte'
</script>

<script lang="ts">
  import { downloadData } from '$lib/components/table/misc'

  import Modal from '$lib/components/common/Modal.svelte'
  import Button from '$lib/components/common/Button.svelte'
  import Switch from '$lib/components/common/Switch.svelte'
  
  export let tableBuses: Record<TabEnum, ITableBus>
  export let activeTabName: TabEnum
  export let isLoading = true

  let selected: Record<TabEnum, boolean> = getSelected()

  let isModalShown = false

  function getSelected () {
    return {
      campaigns: activeTabName === 'campaigns',
      adSets: activeTabName === 'adSets',
      ads: activeTabName === 'ads',
    }
  }

  function download () {
    (Object.keys(selected) as TabEnum[]).map(key => {
      if (selected[key]) downloadData(tableBuses[key].getDataAsCSV(), `${key}.csv`)
    })

    isModalShown = false
  }

  $: isModalShown && (selected = getSelected())
</script>

<Modal bind:show={isModalShown}>
  <Button
    slot="handler"
    action="secondary"
    leftIcon="download"
    disabled={isLoading}
    on:click={() => isModalShown = true}
  />
  <div class="download-modal">
    <div class="download-modal__title">
      Download your data
    </div>
    <div class="download-modal__description">
      Which data sets would you like to download?
    </div>
    <div class="download-modal__options">
      <Switch bind:value={selected.campaigns}>Campaigns</Switch>
      <Switch bind:value={selected.adSets}>Ad Sets</Switch>
      <Switch bind:value={selected.ads}>Ads</Switch>
    </div>
  </div>
  <Button
    slot="submit-btn"
    text="Download CSV"
    on:click={download}
  />
</Modal>

<style lang="scss">
  .download-modal {
    line-height: 20px;
    text-align: center;
    &__title {
      font-size: 24px;
      font-weight: 700;
    }
    &__description {
      font-size: 14px;
      margin-top: 12px;
    }
    &__options {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 46px 0;
    }
  }
</style>
