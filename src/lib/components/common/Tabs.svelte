<script lang="ts" context="module">
  export interface ITab {
    title: string;
    name: string;
    [prop: string]: any;
  }
</script>

<script lang="ts">
  export let tabs: ITab[] = []
  export let selectedTabName: string | undefined = undefined

  $: activeTab = tabs.find(tab => tab.name === selectedTabName) ?? tabs[0]
</script>

<div class="tabs">
  <div class="tabs__nav">
    {#each tabs as tab}
      <button
        class="tabs__nav-item"
        class:is-selected={tab.name === activeTab?.name}
        on:click={() => selectedTabName = tab.name}
      >
        {tab.title}
      </button>
    {/each}
  </div>

  {#each tabs as tab}
    {#if tab === activeTab}
      <slot tabName={tab.name}/>
    {/if}
  {/each}
</div>

<style lang="scss">
  .tabs {
    &__nav {
      display: flex;
      gap: 12px;
      overflow: auto;
      white-space: nowrap;
      border-radius: 6px;
      border: 1px solid var(--card-background-stroke, #6F6E6E);
      background: var(--card-background-fill, linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%));
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
      padding: 6px;
      &-item {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0);
        padding: 1px 16px;
        border-radius: 6px;
        font-weight: 600;
        &:hover, &:active {
          background: rgba(#fff, .1);
        }
        &.is-selected {
          border: 1px solid rgba(255, 255, 255, 0.50);
          background: var(--blue-button-fill, linear-gradient(135deg, rgba(0, 125, 242, 0.40) 0%, #46A6FF 100%));
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.60);
          pointer-events: none;
        }
      }
    }
  }
</style>