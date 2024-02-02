<script lang="ts" context="module">
  export interface ISafeGuard {
    isActive: () => boolean;
    onCancel: () => void;
    onSubmit: () => void;
  }
</script>

<script lang="ts">
  import Modal from '$lib/components/common/Modal.svelte'
  import Button from '$lib/components/common/Button.svelte'

  export let safeGuard: ISafeGuard

  $: show = safeGuard.isActive()
</script>

<Modal closeOutside={false} {show} maxWidth={856}>
  <div class="safe-guard">
    <div class="safe-guard__image">
      <img src="/images/alert.svg" alt=""/>
    </div>

    <div class="safe-guard__title">
      You have unfinished changes!
    </div>

    <div class="safe-guard__footer">
      <Button
        action="secondary"
        variant='error'
        text="Discard"
        on:click={() => {
          safeGuard.onCancel()
          show = false
        }}
      />
      <Button
        text="Save"
        on:click={() => {
          safeGuard.onSubmit()
          show = false
        }}
      />
    </div>
  </div>
</Modal>

<style lang="scss">
.safe-guard {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  &__image {
    width: 103px;
    height: 103px;
  }
  &__title {
    font-size: 32px;
    font-weight: 600;
    margin: 31px 0;
    line-height: normal;
  }
  &__footer {
    display: flex;
    gap: 29px;
  }
}
</style>