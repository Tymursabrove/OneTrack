<script lang="ts">
  export let value: string | number | null | undefined = undefined
  export let disabled = false
  
  export let size: 'medium'|'small' = 'medium'
</script>

<input
  {...$$restProps}
  class="input is-{$$restProps.type ?? 'text'} is-{size} {$$restProps.class ?? ''}"
  bind:value={value}
  on:input
  {disabled}
>

<style lang="scss">
  .input {
    border-radius: 6px;
    border: 1px solid var(--card-background-stroke, #6F6E6E);
    background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
    font-weight: 600;
    line-height: 20px;
    appearance: textfield;
    width: 100%;

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    &:focus {
      border: 1px solid #007DF2;
    }

    &.is-disabled {
      pointer-events: none;
      filter: brightness(0.6);
    }

    &.is-medium {
      padding: 12px 21px;
    }

    &.is-small {
      padding: 4px 17px;
    }
  }
</style>
