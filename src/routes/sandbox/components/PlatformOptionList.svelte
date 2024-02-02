<script lang="ts" context="module">
  import type { SpriteIconName } from '$lib/common/SpriteIcons'

  export type PlatformOptionType = {
    id: string
    icon?: SpriteIconName
    title: string
    isActive: boolean
  }

  export interface IPlatformOptionListSetup {
    searchable: boolean
    options: PlatformOptionType[]
  }
</script>

<script lang="ts">
  import Icon from '$lib/components/common/Icon.svelte'
  import Input from '$lib/components/common/Input.svelte'
  import Switch from '$lib/components/common/Switch.svelte'
  import Popover from '$lib/components/common/Popover.svelte'

  export let setup: IPlatformOptionListSetup

  let search = ''

  $: foundOptions = setup.options.filter(
    (option) =>
      !search.trim() || option.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  )
</script>

<div class="platform-options">
  {#if setup.searchable}
    <div class="platform-options__search">
      <Input class="w-full" placeholder="Search..." bind:value={search} />
    </div>
  {/if}

  <div class="platform-options__list">
    {#each foundOptions as option}
      <div class="platform-options__item">
        <div class="platform-option" class:is-inactive={!option.isActive}>
          <div class="platform-option__group">
          <div class="platform-option__switch">
            <Switch bind:value={option.isActive} />
          </div>
          {#if option.icon}
            <div class="platform-option__icon">
              <Icon name={option.icon} />
            </div>
          {/if}
        
          <div class="platform-option__title">{option.title}</div>
        </div>
          {#if $$slots['item-info']}
            <div class="platform-option__info">
              <Popover
                placement="top"
                trigger="hover"
              >
                <Icon name="info" interactive/>
                <slot name="item-info" slot="content"/>
              </Popover>
            </div>
          {/if}

        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .platform-options {
    &__search {
    }
    &__list {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 10px;
    }
    &__item {
      border-radius: 6px;
      background: var(
        --card-background-fill,
        linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.2) 100%)
      );
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.6);
      font-weight: 600;
      line-height: 20px;
      appearance: textfield;
      width: 100%;
      grid-column: span 12 / span 12;
      @media (min-width: 540x) {
        grid-column: span 6 / span 6;
      }
      @media (min-width: 1280px) {
        grid-column: span 4 / span 4;
      }
    }
  }

  .platform-option {
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 10px;
    border: 1px solid #6f6e6e;
    justify-content: space-between;
    &.is-inactive {
      background: radial-gradient(
        75.27% 75.27% at 68.03% 31.76%,
        rgba(225, 67, 67, 0.7) 0%,
        rgba(134, 10, 10, 0.7) 100%
      );
      border-color: rgba(134, 10, 10, 0.7);
    }

    &__group{
      display: flex; gap: 5px; align-items: center;
    }

    &__icon {
      padding-left: 5px;
    }
    &__title {
      font-size: 14px;
      padding-left: 5px;
    }
    &__switch {
    }
  }
</style>
