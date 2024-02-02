<script lang="ts" context="module">
  import type { Writable } from 'svelte/store'
  import type { IDndListSetup } from './DndList'
</script>

<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'
  import { bind } from '$lib/local-packages/LocalStorage'

  import Tooltip from '$lib/components/common/Tooltip.svelte'
  import Icon from '$lib/components/common/Icon.svelte'

  export let setup: IDndListSetup

  let order: Writable<number[]> = bind(setup.name, [])
  let dragDisabled = true

  function onDrop(e: any) {
    const { source, trigger } = e.detail.info
    items = e.detail.items
    dragDisabled = (source === 'keyboard' && trigger === 'dragStopped') || source === 'pointer'
  }

  $: items = setup.items
    .map((item, index) => ({
      id: index,
      ...item
    }))
    .sort((a, b) => $order.indexOf(a.id) - $order.indexOf(b.id)) as IDndListSetup['items']

  $: order.update(() => items.map((item) => item.id as number))
</script>

<div class="dnd-list {$$restProps.class ?? ''}">
  <div
    class="dnd-list__items"
    use:dndzone={{
      items,
      flipDurationMs: 200,
      zoneTabIndex: -1,
      dropTargetStyle: {},
      dragDisabled,
      dropFromOthersDisabled: true,
      type: setup.name
    }}
    on:consider={onDrop}
    on:finalize={onDrop}
  >
    {#each items as item (item.id)}
      <div
        class="dnd-item is-{setup.itemsSize}"
        animate:flip={{ duration: 200 }}
        on:keydown={() => (dragDisabled = false)}
        on:mouseup={() => (dragDisabled = true)}
        on:touchend={() => (dragDisabled = true)}
      >
        <div class="dnd-item__inner">
          <div class="dnd-item__head">
            <div class="dnd-item__head__inner">
              {#if item.icon}
                <Icon class="dnd-item__icon" name={item.icon} size="big" />
              {/if}

              <div class="dnd-item__title">
                {item.title}
                {#if item.online}
                  <div class="dnd-item__online" />
                {/if}
              </div>

              <div class="dnd-item__info__drag-handler">
                <div class="dnd-item__info">
                  <Tooltip>
                    <Icon name="info" interactive size="small" />
                    <svelte:fragment slot="content">
                      {item.info}
                    </svelte:fragment>
                  </Tooltip>
                </div>

                <div
                  class="dnd-item__drag-handler"
                  on:mousedown={() => (dragDisabled = false)}
                  on:touchstart={() => (dragDisabled = false)}
                >
                  <Icon name="bars" size="small" />
                </div>
              </div>
            </div>
            {#if item.description}
              <div class="dnd-item__description">
                {item.description}
              </div>
            {/if}
          </div>

          <div class="dnd-item__content" class:is-full-width={item.fullWidthContent}>
            <slot itemName={item.name} />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
	.dnd-list {
		&__items {
			display: flex;
			outline: none;
			flex-wrap: wrap;
			margin: -10px;
		}
	}

  .dnd-item {
    padding: 10px;
    display: flex;
    flex-shrink: 0;
    &.is-small {
      width: 100%;
      @media (min-width: 768px) {
        width: 50%;
      }
      @media (min-width: 1024px) {
        width: 50%;
      }
      @media (min-width: 1280px) {
        width: 25%;
      }
    } // 25%
    &.is-medium {
      width: 100%;
      @media (min-width: 768px) {
        width: 50%;
      }
    } // 50%
    &.is-big {
      width: 100%;
    } // 100%

    &__inner {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      flex: 1 0 auto;
      border: 1px solid #6f6e6e;
      padding: 20px;
      border-radius: 24px;

			background-image: linear-gradient(
				116deg,
				rgba(133, 129, 129, 0.05) 0%,
				rgba(170, 170, 170, 0.2) 100%
			);
			box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.6);
		}
		&__head {
			display: flex;
			padding: 20px;
			padding-bottom: 0;
			flex-direction: column;
			&__inner {
				display: flex;
				gap: 5px;
				flex-wrap: wrap;
			}
		}

    &__icon {
    }
    &__title {
      flex: 1 0 auto;
      display: flex;
      gap: 4px;
      align-items: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }
    &.is-small {
      .dnd-item__title {
        font-size: 16px;
        @media (min-width: 1280px) {
          font-size: 20px;
        }
      }
    }

    &__online {
      width: 6px;
      height: 6px;
      background-color: #61f5db;
      border-radius: 50%;
    }
    &__drag-handler {
      cursor: move;
    }

    &__description {
    }

    &__content {
      flex: 1 0 auto;
      padding-top: 20px;
      position: relative;

      &.is-full-width {
        padding-top: 10px;
        margin: 0 -20px -20px;
      }
    }

    &__info__drag-handler {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }
</style>
