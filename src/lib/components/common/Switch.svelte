<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let trueValue: any = true
  export let falseValue: any = false
  export let value: any = falseValue

  export let disabled = false

  function toggle () {
    if (disabled) return
    value = checked ? falseValue : trueValue
    return dispatch('change', value)
  }

  function onKeydown (e: KeyboardEvent) {
    if ((!e.metaKey && !e.ctrlKey) && ['Enter', 'Space'].includes(e.code)) {
      e.preventDefault()
      toggle()
    }
  }

  $: checked = value === trueValue
</script>

<label
  class="switch {$$restProps.class ?? ''}"
  class:is-checked={checked}
  class:is-disabled={disabled}
>
  <input
    {...$$restProps}
    class="switch__checkbox"
    type="checkbox"
    {disabled}
    {checked}
    {value}
    on:change={toggle}
  >

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span class="switch__body" tabindex="0" on:keydown={onKeydown}>
    <span class="switch__handler"></span>
  </span>

  {#if $$slots['default']}
    <div class="switch__text">
      <slot/>
    </div>
  {/if}
</label>

<style lang="scss">
  .switch {
    display: inline-flex;
    vertical-align: middle;
    cursor: pointer;

    &.is-checked {
      .switch__handler {
        transform: translateX(27px);
        background: linear-gradient(104deg, #007DF2 0%, #46A6FF 100%);
      }
    }

    &.is-disabled {
      .switch__body {
        filter: contrast(0) brightness(0.6);
        pointer-events: none;
      }
    }

    &__checkbox {
      display: none;
    }
    &__body {
      display: flex;
      flex-shrink: 0;
      width: 52px;
      height: 25px;
      position: relative;
      background: linear-gradient(116deg, rgba(196, 196, 196, 0.25) 0%, rgba(196, 196, 196, 0.10) 100%);
      border-radius: 24px;
      border: 0.50px rgba(196, 196, 196, 0.50) solid;
    }
    &__handler {
      position: absolute;
      width: 25px;
      top: 0;
      bottom: 0;
      left: 0;
      background: #8B939E;
      border-radius: 50%;
      transition: transform .15s ease;
    }
    &__text {
      margin-left: 21px;
    }
  }
</style>
