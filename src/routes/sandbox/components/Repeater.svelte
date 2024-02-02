<script lang="ts" context="module">
  export interface IRepeaterSetup<T> {
    items: T[],
    getNewItem: () => T,
    checkAddDisabled: (newItem: T, items: T[]) => boolean
  }
</script>

<script lang="ts">
  type RepeaterItemType = $$Generic

  import Button from '$lib/components/common/Button.svelte'

  export let setup: IRepeaterSetup<RepeaterItemType>

  function addItem (item: RepeaterItemType) {
    setup.items.push(item)
    setup.items = setup.items
    newItem = setup.getNewItem()
  }

  function removeItem (item: RepeaterItemType) {
    setup.items.splice(setup.items.indexOf(item), 1)
    setup.items = setup.items
  }

  let newItem = setup.getNewItem()

  $: isAddDisabled = setup.checkAddDisabled(newItem, setup.items)
</script>

<div class="repeater">
  {#key setup.items.length}
    {#each setup.items as item, index}
      <div class="repeater__row">
        <slot name="item" {index}/>
        <Button
          action="secondary"
          variant="error"
          leftIcon="kreuz"
          on:click={() => removeItem(item)}
        />
      </div>
    {/each}
  {/key}

  {#if $$slots.add}
    <div class="repeater__row">
      <slot name="add"/>
      <Button
        action="secondary"
        variant="success"
        leftIcon="plus"
        disabled={isAddDisabled}
        on:click={() => addItem(newItem)}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .repeater {
    display:flex; gap: 10px; flex-direction: column;
    &__row {
      display: flex;
      align-items: center; gap: 10px;
    }
  }
</style>
