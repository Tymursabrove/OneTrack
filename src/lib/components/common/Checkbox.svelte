<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '$lib/components/common/Icon.svelte'

  const dispatch = createEventDispatcher()

  export let trueValue: any = true
  export let falseValue: any = false
  export let value: any = falseValue
  export let intermidiate = false

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
  class="checkbox {$$restProps.class ?? ''}"
  class:is-intermidiate={intermidiate}
  class:is-checked={checked}
  class:is-disabled={disabled}
>
  <input
    {...$$restProps}
    class="checkbox__checkbox"
    type="checkbox"
    {disabled}
    {checked}
    {value}
    on:change={toggle}
  >

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span class="checkbox__body" tabindex="0" on:keydown={onKeydown}>
    <Icon name={intermidiate ? 'minus' : 'check'} class="checkbox__icon"/>
  </span>

  {#if $$slots['default']}
    <div class="checkbox__text">
      <slot/>
    </div>
  {/if}
</label>

<style lang="scss">
  .checkbox {
    display: inline-flex;
    cursor: pointer;
    vertical-align: middle;
    align-items: baseline;

    &.is-checked, &.is-intermidiate {
      .checkbox__body {
        background: linear-gradient(104deg, #007DF2 0%, #46A6FF 100%);
        border-color: transparent;
      }
      :global(.checkbox__icon) {
        opacity: 1;
      }
      &.is-disabled {
        .checkbox__body {
          background: linear-gradient(104deg, desaturate(#007DF2, 100%) 0%, desaturate(#46A6FF, 100%) 100%);
        }
      }
    }

    &.is-disabled {
      pointer-events: none;
      .checkbox__body {
        filter: brightness(0.6);
      }
    }

    &__checkbox {
      display: none;
    }

    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 15px;
      height: 15px;
      border-radius: 2px;
      border: 1px #B7B7B7 solid;
      color: #fff;
      position: relative;
    }

    &__text {
      margin-left: 12px;
    }

    :global(.checkbox__icon) {
      width: 11px!important;
      height: 11px !important;
      opacity: 0;
    }
  }
</style>
