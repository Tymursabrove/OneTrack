<script lang="ts" context="module">
  import type { Placement } from '$lib/components/common/Popover.svelte'
</script>

<script lang="ts">
  import Popover from '$lib/components/common/Popover.svelte'

  export let placement: Placement = 'top'
  export let offset = 8
  export let beforeShow: (handler: HTMLElement) => boolean = () => true
</script>

<Popover
  theme="tooltip"
  trigger="hover"
  strategy="fixed"
  {beforeShow}
  {placement}
  {offset}
>
  <slot slot="default" let:show {show} let:popoverBus {popoverBus}/>
  <slot name="content" slot="content"/>
</Popover>

<style lang="scss">
  :global(.popover-tooltip-theme) {
    color: #fff;
    background: #2b3436;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.60);
    border-radius: 99px;
    font-size: 14px;
    line-height: 1.5;
    padding: 2px 12px;
  }
</style>
