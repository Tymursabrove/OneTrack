<script lang="ts">
  import { onDestroy } from 'svelte'
  import Button from '$lib/components/common/Button.svelte'

  export let show = false
  export let closeOutside = true
  export let maxWidth = 600
  export let onClosed: Function | undefined = undefined

  function close (force = false) {
    show = force ? false : !closeOutside
    if (!show) onClosed?.()
  }

  onDestroy(() => close(true))
</script>

<slot name="handler"/>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="modal"
    on:click={() => close()}
  >
    <div class="modal__overlay"></div>

    <div
      class="modal__content {$$restProps.class ?? ''}"
      style='max-width: {maxWidth}px'
      on:click|stopPropagation
    >
      <slot/>

      {#if $$slots['submit-btn']}
        <div class="modal__footer">
          <Button
            action="secondary"
            variant="warn"
            text="Cancel"
            on:click={() => close(true)}
          />
          <slot name="submit-btn"/>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px 12px;
    overflow: auto;
    color: #fff;
    &, &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &__overlay {
      background: rgba(#000, .8);
    }
    &__content {
      position: relative;
      padding: 36px 58px;
      border-radius: 24px;
      border: 1px solid var(--card-background-stroke, #6F6E6E);
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
      backdrop-filter: blur(25px);
      margin: auto;
      animation: content-appear .3s ease-out;
      will-change: opacity, transform;
      @media(max-width: 767px) {
        padding: 24px;
      }
    }
    &__footer {
      margin-top: 31px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  }

  @keyframes content-appear {
    0% { opacity: .1; transform: translateY(-24px); }
    50% { opacity: .5; transform: translateY(-8px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
