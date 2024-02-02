<script lang="ts" context="module">
  import type { Placement, Instance } from '@popperjs/core'
  import type { ISafeGuard } from '$lib/components/common/SafeGuard.svelte'
  export type { Placement, Instance }

  export type IPopoverBus = {
    open: () => void;
    close: () => void;
    setSafeGuard: (safeGuard: ISafeGuard) => void;
  }
</script>

<script lang="ts">
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte'
  import { createPopper } from '@popperjs/core'

  import SafeGuard from '$lib/components/common/SafeGuard.svelte'

  const dispatch = createEventDispatcher()

  export let trigger: 'hover'|'click' = 'click'
  export let strategy: 'absolute'|'fixed' = 'absolute'
  export let placement: Placement = 'bottom'
  export let theme: 'default'|'tooltip' = 'default'
  export let offset = 8
  export let show = false
  export let beforeShow: (handler: HTMLElement) => boolean = () => true

  let popoverSafeGuard: ISafeGuard | null

  let handler: HTMLElement
  let content: HTMLElement

  let popper: Instance
  let popperPlacement: Placement = placement

  function isEventDenied (e: MouseEvent) {
    return (trigger === 'click' && e.type !== 'click')
  }

  function onShow (e: MouseEvent) {
    if (isEventDenied(e) || !beforeShow(handler)) return

    popper = createPopper(handler, content, {
      placement,
      strategy,
      modifiers: [{
        name: 'popper-auto-placement',
        enabled: true,
        phase: 'main',
        fn ({ state }) {
          if (popperPlacement !== state.placement) {
            popperPlacement = state.placement
          }
        },
      }]
    })

    document.body.appendChild(content)
    open()
  }

  async function onHide (e: MouseEvent) {
    const isEventOutside = !handler.matches(':hover') && !content.matches(':hover')

    if (!isEventOutside || isEventDenied(e)) return

    if (popoverSafeGuard?.isActive()) return popoverSafeGuard = popoverSafeGuard

    popper.destroy()
    popoverSafeGuard = null
    content.remove()

    close()
  }

  function open () {
    show = trigger === 'hover' ? true : !show
  }

  function close () {
    show = false
    popperPlacement = placement
  }

  function getOffsetStyle (placement: Placement) {
    let position = placement.split('-')[0]

    if (['top', 'bottom'].includes(position)) {
      return `padding-${position === 'top' ? 'bottom' : 'top'}: ${offset}px;`
    } else if (['left', 'right'].includes(position)) {
      return `padding-${position === 'left' ? 'right' : 'left'}: ${offset}px;`
    }
  }

  $: popoverBus = {
    open,
    close,
    setSafeGuard: (safeGuard) => popoverSafeGuard = safeGuard
  } satisfies IPopoverBus

  $: dispatch('bus', popoverBus)

  onMount(() => {
    handler = content.previousElementSibling as HTMLElement

    handler.addEventListener('click', onShow)
    handler.addEventListener('mouseenter', onShow)
    if (trigger === 'hover') handler.addEventListener('mouseleave', close)

    dispatch('bus', popoverBus)

    return () => {
      handler.removeEventListener('click', onShow)
      handler.removeEventListener('mouseenter', onShow)
      if (trigger === 'hover') handler.removeEventListener('mouseleave', close)
    }
  })

  afterUpdate(() => popper?.update())
</script>

<svelte:window
  on:click={show ? onHide : () => {}}
/>

<slot {show} {popoverBus}>
  <div class="popover-handler-placeholder"></div>
</slot>

<div
  class="popover-wrapper"
  style={getOffsetStyle(popperPlacement || placement)}
  class:is-hidden={!show}
  bind:this={content}
>
  {#if show}
    <div class="popover-content popover-{theme}-theme">
      <slot name="content"/>
    </div>
  {/if}
</div>

{#if popoverSafeGuard}
  <SafeGuard safeGuard={popoverSafeGuard}/>
{/if}

<style lang="scss">
  .popover-handler-placeholder {
    display: none;
  }

  .popover-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    color: #fff;
    &.is-hidden {
      display: none;
    }
  }

  :global(.popover-default-theme) {
    display: inline-flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid var(--card-background-stroke, #6F6E6E);
    background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.60);
    backdrop-filter: blur(25px);
  }
</style>
