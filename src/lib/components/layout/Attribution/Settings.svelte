<script lang="ts" context="module">
  import type { Writable } from 'svelte/store'
  import type { ITableBus, ITableSettingsColumn, ITableSettingsRoas } from '$lib/components/table/types'
  import type { IPopoverBus } from '$lib/components/common/Popover.svelte'
</script>

<script lang="ts">
  import { writable } from 'svelte/store'

  import Popover from '$lib/components/common/Popover.svelte'
  import Button from '$lib/components/common/Button.svelte'
  import Icon from '$lib/components/common/Icon.svelte'
  import Input from '$lib/components/common/Input.svelte'
  import Switch from '$lib/components/common/Switch.svelte'

  export let baseTableBus!: ITableBus
  export let roasValues!: Writable<Record<string, number | string | null>>
  export let removeStorageKeys!: () => void
  
  let popoverBus: IPopoverBus

  let settings: Writable<{
    roas: ITableSettingsRoas[],
    cols: ITableSettingsColumn[],
  }> = writable({
    roas: [],
    cols: [],
  })

  function getSettings (): {
    roas: ITableSettingsRoas[],
    cols: ITableSettingsColumn[],
  } {
    return {
      roas: [{
        page: 'meta',
        title: 'Meta',
        value: $roasValues['meta'] ?? '',
      },{
        page: 'tiktok',
        title: 'TikTok',
        value: $roasValues['tiktok'] ?? '',
      },{
        page: 'google',
        title: 'Google',
        value: $roasValues['google'] ?? '',
      }],

      cols: baseTableBus.orderedCols
        .filter(col => col.name !== 'id')
        .map(col => ({
            ...col,
            isVisible: baseTableBus.visibleCols.includes(col),
            isPinned: baseTableBus.pinnedCols.includes(col),
        }))
    }
  }

  function syncSettings () {
      return $settings = getSettings()
  }

  function applySettings (): void {
    const original = getSettings()

    $settings.cols.filter(col => {
        const originalCol = original.cols.find(_col => _col.name === col.name)
        return col.isVisible !== originalCol?.isVisible
    }).map(col => baseTableBus.toggleVisibility(col.name))

    $settings.cols.filter(col => {
        const originalCol = original.cols.find(_col => _col.name === col.name)
        return col.isPinned !== originalCol?.isPinned
    }).map(col => baseTableBus.togglePin(col.name))

    $settings.roas.map(col => $roasValues = { ...$roasValues, [col.page]: col.value })

    popoverBus.close()
  }

  function init () {
    syncSettings()

    popoverBus.setSafeGuard({
      isActive: () => hasChanges,
      onSubmit: applySettings,
      onCancel: popoverBus.close // To keep opened: () => {}
    })

    return true
  }

  $: popoverBus && init()
  $: hasChanges = popoverBus ? JSON.stringify($settings) !== JSON.stringify(getSettings()) : false
</script>

<Popover
  placement="bottom-end"
  let:popoverBus
  let:show
  beforeShow={init}
  on:bus={e => popoverBus = e.detail}
>
  <Button
    state={show ? 'active' : 'default'}
    action="secondary"
    leftIcon="setting-solid"
  />

  <div
    class="table-settings"
    slot="content"
  >
    <div class="table-settings__body">
      <div class="table-settings__group scrollbar">
        <div class="table-settings__title">Goal min ROAS</div>
        <div class="table-settings__roas">
          {#each $settings.roas as roasItem}
            <div class="table-settings__roas-item">
              <Input
                class="table-settings__roas-input"
                type="number"
                size="small"
                bind:value={roasItem.value}
              />
              {roasItem.title}
            </div>
          {/each}
        </div>
      </div>

      <div class="table-settings__group scrollbar">
        <div class="table-settings__title">Table contents</div>
        <div class="table-settings__cols">
          {#each $settings.cols as col}
            <div class="table-settings-col" class:is-pinned={col.isPinned}>
              <div class="table-settings-col__toggle-visible">
                <Switch
                  name="table_settings_visible"
                  bind:value={col.isVisible}
                />
              </div>
              {#if col.icon}
                <Icon
                  class="table-settings-col__icon"
                  name={col.icon}
                  size="big"
                />
              {/if}
              <div class="table-settings-col__title">
                {col.title}
              </div>
              <button
                class="table-settings-col__toggle-pin"
                on:click={() => col.isPinned = !col.isPinned}
              >
                <Icon
                  name={col.isPinned ? 'unpin' : 'pin'}
                  size='big'
                  interactive={true}
                />
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="table-settings__footer">
      <Button
        class="mr-auto"
        action="secondary"
        variant="error"
        text="Restore Defaults"
        on:click={removeStorageKeys}
      />

      <Button
        action="secondary"
        variant="warn"
        text="Cancel"
        on:click={() => popoverBus.close()}
      />

      <Button
        text="Apply"
        on:click={applySettings}
        disabled={!hasChanges}
      />
    </div>
  </div>
</Popover>

<style lang="scss">
  .table-settings {
    padding: 24px 21px 24px 3px;
    &__body {
      display: flex;
      flex-grow: 1;
      @media (max-width: 767px) {
        max-height: calc(100vh - 415px);
        flex-direction: column;
        overflow: auto;
        gap: 32px;
      }
    }
    &__group {
      padding: 0 18px;
      @media (min-width: 768px) {
        max-height: calc(100vh - 330px);
        overflow: auto;
        & + & {
          border-left: 1px solid #8B939E;
        }
      }
    }
    &__title {
      font-size: 20px;
      line-height: 1;
      font-weight: 600;
      margin-bottom: 21px;
    }
    &__roas {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &__roas-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }
    :global(.table-settings__roas-input) {
      width: 66px;
      text-align: center;
    }
    &__cols {
      margin-top: -5px;
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 18px;
      padding-left: 18px;
      gap: 12px;
    }
  }

  .table-settings-col {
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 5px 14px;
    gap: 12px;
    border: 1px solid transparent;
    margin: 4px 0;
    &:hover {
      border-color: var(--card-background-stroke, #6F6E6E);
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
      /* CardBackgroundEffect */
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
      backdrop-filter: blur(25px);
    }
    &.is-pinned, &:hover {
      .table-settings-col__toggle-pin {
        visibility: visible;
      }
    }
    //&__toggle-visible {}
    &__title {
      flex-grow: 1;
    }
    &__toggle-pin {
      visibility: hidden;
    }
  }
</style>
