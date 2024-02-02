<script lang="ts" context="module">
  import type { SpriteIconName } from '$lib/common/SpriteIcons'
  import type { IBatchSelectBus } from '$lib/components/common/BatchSelect.svelte'

  export interface ICard {
    id: string
    icon: SpriteIconName
    title: string
    description: string
    isActive: boolean
  }

  export interface ICardListSetup<T> {
    group: string
    color: 'blue' | 'violet' | 'green' | 'yellow' | 'red'
    items: T[]
  }
</script>

<script lang="ts">
  type CardType = $$Generic<ICard>

  import { createEventDispatcher } from 'svelte'

  import Icon from '$lib/components/common/Icon.svelte'
  import Switch from '$lib/components/common/Switch.svelte'
  import BatchSelect from '$lib/components/common/BatchSelect.svelte'

  const dispatch = createEventDispatcher()

  export let setup: ICardListSetup<CardType>

  let batchSelectBus: IBatchSelectBus
  let ids = setup.items.map((item) => item.id)
  let selectedIds: string[] = []

  $: selectedItems = setup.items.filter((item) => selectedIds.includes(item.id))
</script>

<BatchSelect {ids} bind:selectedIds on:bus={(e) => (batchSelectBus = e.detail)} />

{#if batchSelectBus}
  {#key selectedItems}
    <slot name="header" {selectedItems} />

    <div class="card-list">
      <div class="card-list__items">
        {#each setup.items as item (item.id)}
          <div class="card-list__item">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="card is-{setup.color}"
              class:is-selected={selectedIds.includes(item.id)}
              on:click={(e) => batchSelectBus.select(e, item.id)}
              >
              <div class="card__inner">
                <div class="card__icon">
                  <Icon name={item.icon} size="large" />
                </div>
                <div class="card__body">
                  <div class="card__head">
                    <div class="card__tile_group">
                      <h2 class="card__title">{item.title}</h2>
                    </div>
                    {#if $$slots['item-actions']}
                      <div class="card__actions">
                        <slot name="item-actions" {item} />
                      </div>
                    {/if}
                  </div>
                  <div class="card__description">{item.description}</div>
                  <div class="card__status">
                    <div class="card__status-text {item.isActive ? 'is-active' : 'is-inactive'}">
                      {item.isActive ? 'Active' : 'Inactive'}
                    </div>
                    <div class="card__status-switch">
                      <Switch
                        bind:value={item.isActive}
                        on:change={(e) => dispatch('toggleActive', item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <p class="card-list__item__group">{setup.group}</p>
          </div>
        {/each}
      </div>
    </div>

    <slot name="footer" {selectedItems} />
  {/key}
{/if}

<style lang="scss">
  .card-list {
    &__items {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(1, 1fr); 
      @media(min-width:640px){
      grid-template-columns: repeat(2, 1fr); 
      }
      @media(min-width:1280px){
      grid-template-columns: repeat(3, 1fr); 
      }
    }
    &__item {
      position: relative;
      transition: ease-in-out 0.5s all;
     
      
    
      display: flex;
      flex-shrink: 0;
    


    &__group {
      font-size: 0.75rem;
      line-height: 1rem;
      line-height: 1;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      line-height: 1;
      border-radius: 1.5rem;
      padding: 0.25rem;
      padding-right: 0.5rem;
      padding-left: 4.5rem;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
      color: #fff;
      opacity: 0;
      text-orientation: mixed;
      writing-mode: vertical-rl; transform: rotate(180deg);
      transition: ease-in-out 0.5s all;
      background: linear-gradient(105deg, rgba(0, 125, 242, 0.40) 0%, #46A6FF 100%);
      --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
    }

    &:hover{
      transform: translateX(1.1rem);
      .card-list__item__group   {
        transform:rotate(180deg) translateX(2.1rem); opacity: 1;
      }
    }





  }





  }

  .card {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    flex: 1 0 auto;
    border: 1px solid #6f6e6e;
    padding: 20px;
    border-radius: 24px;
    position: relative; z-index: 10;
    background-image: linear-gradient(
      116deg,
      rgba(133, 129, 129, 0.05) 0%,
      rgba(170, 170, 170, 0.2) 100%
    );
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
     

    &.is-selected {
      background: radial-gradient(75.27% 75.27% at 68.03% 31.76%, rgba(225, 67, 67, 0.7) 0%, rgba(134, 10, 10, 0.7) 100%);
    }

    &.is-blue {
    }
    &.is-violet {
    }
    &.is-green {
    }
    &.is-yellow {
    }
    &.is-red {
    }

    &__inner {
      display: flex;
      flex: 1 0 auto;
      width: 100%;
      gap: 10px;
    }
    
    &__icon {
    }
    &__body {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__head {
      display: flex;
      justify-content: space-between;
      gap: 3px;
    }
    &__title {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 600;
    }
    &__actions {
      display: flex;
      flex-shrink: 0;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: 0.375rem;
    }
    &__description {
      font-size: 0.75rem;
    }
    &__status {
      display: flex;
      justify-content: space-between;

      &-text {
        display: flex;
        justify-content: space-between;
        flex: 1 1 0%;

        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 600;
        color: transparent;
        &.is-active {
          background-image: radial-gradient(
            63.52% 63.52% at 68.03% 31.76%,
            #61f5db 0%,
            #16ccac 100%
          );
        }
        &.is-inactive {
          background-image: radial-gradient(
            63.52% 63.52% at 68.03% 31.76%,
            #e14343 0%,
            #bd1616 100%
          );
        }
      }
      &-switch {
      }
    }
  }
</style>
