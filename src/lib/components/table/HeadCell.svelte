<script lang="ts" context="module">
  import type { ITableColumn, ITableBus, ISortData, ISortDir } from '$lib/components/table/types'
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import Icon from '$lib/components/common/Icon.svelte'
  import Tooltip from '$lib/components/common/Tooltip.svelte'

  export let col!: ITableColumn
  export let baseTableBus!: ITableBus
  export let sortData!: ISortData
  export let width: number | undefined
  export let isPinned!: boolean

  const dispatch = createEventDispatcher()

  let el: HTMLDivElement

  let isResizing = false
  let isResizeActive = false
  let resizeX = 0

  let minWidth: number
  let maxWidth: number

  function onResizeStart (e: MouseEvent): void {
      isResizing = true
      resizeX = e.clientX
      document.body.style.cursor = 'col-resize'
      minWidth = getMinWidth(el)
      maxWidth = getMaxWidth(baseTableBus.tableEl)
  }

  function onResize (e: MouseEvent): void {
    if (!isResizing || !width) return

    const diff = resizeX - e.clientX
    if (diff === 0) return

    let resizeWidth = width - diff
    isResizeActive = resizeWidth >= minWidth && resizeWidth <= maxWidth

    if (resizeWidth < minWidth) resizeWidth = minWidth
    if (resizeWidth > maxWidth) resizeWidth = maxWidth

    dispatch('resize', resizeWidth)
    if (isResizeActive) resizeX = e.clientX
  }

  function onResizeEnd (): void {
      isResizing = isResizeActive = false
      document.body.style.cursor = ''
  }

  function getMinWidth (el: HTMLDivElement): number {
      if (col.minWidth) return col.minWidth

      el.style.width = '0'
      const minWidth = el.scrollWidth + 1
      el.removeAttribute('style')

      return minWidth
  }

  function getMaxWidth (tableEl: HTMLDivElement): number {
      return col.maxWidth ?? (tableEl.clientWidth * .7)
  }

  function onSort () {
      const dirs: ISortDir[] = ['asc', 'desc', null]
      const dir = sortData.colName === col.name ? sortData.dir : null
      const nextDir = dirs[(dirs.indexOf(dir) + 1) % dirs.length]

      return baseTableBus.sort({
          colName: col.name,
          dir: nextDir,
      }, col.getValue, col.ascSortFn)
  }

  $: sortDir = sortData.colName === col.name ? sortData.dir : null

  onMount(() => dispatch('resize', Math.max(width ?? 0, getMinWidth(el))))
</script>

<svelte:window
  on:mouseup={isResizing ? onResizeEnd : () => {}}
  on:mousemove|passive|capture={isResizing ? onResize : () => {}}
/>

<div
  class="base-head-cell"
  class:is-resizing={isResizing}
  bind:this={el}
>
  <div class="base-head-cell__inner">
    <div
      class="base-head-cell__title-group"
      class:has-info={col.info}
    >
      {#if col.icon}
        <div class="base-head-cell__icon">
          <Icon
            name={col.icon}
            filled={true}
            size='small'
          />
        </div>
      {/if}

      {#if col.info}
        <div class="base-head-cell__info">
          <Tooltip>
            <Icon
              name="info"
              interactive={true}
              size="small"
            />
            <svelte:fragment slot="content">
              {col.info}
            </svelte:fragment>
          </Tooltip>
        </div>
      {/if}

      <div class="base-head-cell__title">
        <slot name="title">
          {col.title}
        </slot>
      </div>
    </div>

    {#if !col.controlsDisabled}
      <button
        class="base-head-cell__pin"
        class:is-pinned={isPinned}
        on:click|preventDefault={() => baseTableBus.togglePin(col.name)}
      >
        <Icon
          name={isPinned ? 'unpin' : 'pin'}
          filled={isPinned}
          interactive={true}
        />
      </button>

      <button
        class="base-head-cell__sort"
        on:click={onSort}
      >
        <Icon
          name={sortDir ? `sort-${sortDir}` : 'sort'}
          filled={!!sortDir}
          interactive={true}
        />
      </button>
    {/if}

    <button
      class="base-head-cell__resize"
      class:is-active={isResizeActive}
      class:is-disabled={col.controlsDisabled}
      on:mousedown|stopPropagation={onResizeStart}
    ></button>
  </div>
</div>

<style lang="scss">
  :global(.is-dragging-cell) {
    .base-head-cell__resize {
      visibility: hidden !important;
    }
  }

  .base-head-cell {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 8px 0;
    white-space: nowrap;

    &__inner {
      display: flex;
      align-items: flex-end;
      min-height: 40px;
      flex-grow: 1;
      padding: 0 3px 0 15px;
      position: relative;
    }

    &__title-group {
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
      padding-right: 14px;
      gap: 3px 8px;
      &.has-info {
        min-width: 54px;
      }
    }

    &__title {
      width: 100%;
    }

    &__icon {
      display: flex;
    }

    &__info, &__pin, &__sort {
      flex-shrink: 0;
    }

    &__pin, &__sort {
      cursor: pointer;
      margin-left: 3px;
    }

    &__pin {
      &.is-pinned {
        visibility: visible !important;
      }
    }

    &__resize {
      width: 1px;
      flex-shrink: 0;
      cursor: col-resize;
      background: #B7B7B7;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      &:hover, &.is-active {
        background: var(--blue-box, linear-gradient(135deg, #007DF2 0%, #46A6FF 100%));
      }
      &.is-disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 5px;
      }
    }

    &:not(:hover):not(.is-resizing) {
      .base-head-cell__info,
      .base-head-cell__pin {
        visibility: hidden;
      }
    }
  }
</style>
