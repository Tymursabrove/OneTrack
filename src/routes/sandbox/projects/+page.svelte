<script lang="ts" context="module">
  import type { SpriteIconName } from '$lib/common/SpriteIcons'
  import type { ICard, ICardListSetup } from '../components/CardList.svelte'

  export type PixelType = {
    id: string
    title: string
    isActive: boolean
  }

  export type TagType = {
    key: string
    value: string
  }

  export type PlatformType = {
    id: string
    title: string
    icon: SpriteIconName
    isActive: boolean
  }

  export type UtmSourceType = {
    key: string
    value: string
  }

  export interface IProject extends ICard {
    pixels: PixelType[]
    tags: TagType[]
    platforms: PlatformType[]
    utmSources: UtmSourceType[]
  }
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { hideLoader } from '$lib/helpers/MiscHelpers'

  import CardList from '../components/CardList.svelte'
  import Modal from '$lib/components/common/Modal.svelte'
  import Button from '$lib/components/common/Button.svelte'
  import Icon from '$lib/components/common/Icon.svelte'
  import CreateEditForm from './CreateEditForm.svelte'

  let deletingItem: IProject | null = null
  let editingItem: IProject | null = null
  let creatingEditingItem: IProject | null = null

  let isCreateEditModalShown = false
  let isDeleteModalShown = false

  let setup: ICardListSetup<IProject> = {
    group: 'Projects',
    color: 'blue',

    items: [
      getDemoItem(),
      getDemoItem(),
      getDemoItem(),
      getDemoItem(),
      getDemoItem(),
      getDemoItem()
    ]
  }

  function getDemoItem(title?: string, description?: string): IProject {
    return {
      id: `id${Math.round(Math.random() * 10000)}`,
      title: title ?? `Title ${Math.round(Math.random() * 10000)}`,
      description: description ?? `Description ${Math.round(Math.random() * 10000)}`,
      icon: 'world-wide-web',
      isActive: true,
      pixels: [
        { id: 'id1', title: 'Pixel 1', isActive: true },
        { id: 'id2', title: 'Pixel 2', isActive: true },
        { id: 'id3', title: 'Pixel 3', isActive: true },
        { id: 'id4', title: 'Pixel 4', isActive: false },
        { id: 'id5', title: 'Pixel 5', isActive: false }
      ],
      tags: [
        { key: 'key 1', value: 'value 1' },
        { key: 'key 2', value: 'value 2' }
      ],
      platforms: [
        { id: 'id1', title: 'Meta', icon: 'meta', isActive: true },
        { id: 'id2', title: 'Google', icon: 'google', isActive: true },
        { id: 'id3', title: 'TikTok', icon: 'tik-tok', isActive: true },
        { id: 'id4', title: 'Snapchat', icon: 'snapchat', isActive: false }
      ],
      utmSources: [
        { key: 'key 1', value: 'UTM Source 1' },
        { key: 'key 2', value: 'UTM Source 2' }
      ]
    }
  }

  function cloneItem(item: IProject) {
    const newItem = { ...item, id: `cloned${Math.round(Math.random() * 10000)}` }
    setup.items.splice(setup.items.indexOf(item), 0, newItem)
    setup = setup
  }

  function deleteItems(items: IProject[]) {
    items.map((item) => {
      setup.items.splice(setup.items.indexOf(item), 1)
    })
    setup = setup
  }

  $: if (isCreateEditModalShown && !creatingEditingItem) {
    creatingEditingItem = JSON.parse(JSON.stringify(editingItem ?? getDemoItem('', '')))
  }

  onMount(async () => {
    await tick()
    hideLoader()
  })
</script>

<div class="projects-page">
  <CardList
    {setup}
    on:toggleActive={(e) => {
      const item = e.detail
      // Example with how to rollback the status
      const denied = !!Math.round(Math.random())
      if (denied) {
        alert(`Denied! / Errror! (keep prev state)`)
        item.isActive = !item.isActive
      }
    }}
  >
    <div class="projects-page__header" slot="header" let:selectedItems>
      <h1 class="projects-page__title">Projects</h1>

      <div class="projects-page__actions">
        {#if selectedItems.length}
          <Button
            text="Delete Selected"
            variant="error"
            on:click={() => (isDeleteModalShown = true)}
          />
        {/if}

        <Button
          on:click={() => (isCreateEditModalShown = true)}
          text="Add new Project"
          leftIcon="plus"
        />
      </div>
    </div>

    <svelte:fragment slot="item-actions" let:item>
      <Icon name="copy" interactive on:click={() => cloneItem(item)} />

      <Icon
        name="setting-solid"
        interactive
        on:click={() => (isCreateEditModalShown = !!(editingItem = item))}
      />

      <Icon
        name="kreuz"
        interactive
        on:click={() => {
          deletingItem = item
          isDeleteModalShown = true
        }}
      />
    </svelte:fragment>

    <svelte:fragment slot="footer" let:selectedItems>
      <Modal bind:show={isCreateEditModalShown} maxWidth={1648} closeOutside={false} class="grow">
        {#if creatingEditingItem}
          <CreateEditForm
            bind:creatingEditingItem
            bind:editingItem
            onCancel={() => {
              creatingEditingItem = editingItem = null
              isCreateEditModalShown = false
            }}
            onSubmit={() => {
              if (!creatingEditingItem) return // Makes no sense as there's a check on top. But, svelte validator is somewhat blind

              editingItem
                ? setup.items.splice(setup.items.indexOf(editingItem), 1, creatingEditingItem)
                : setup.items.push(creatingEditingItem)

              setup = setup

              creatingEditingItem = editingItem = null
              isCreateEditModalShown = false
            }}
          />
        {/if}
      </Modal>

      <Modal bind:show={isDeleteModalShown} onClosed={() => (deletingItem = null)}>
        Are you sure you want to delete {(deletingItem ? [deletingItem] : selectedItems)
          .map((item) => item.title)
          .join(', ')}?

        <Button
          slot="submit-btn"
          text="Delete"
          variant="error"
          on:click={() => deleteItems(deletingItem ? [deletingItem] : selectedItems)}
        />
      </Modal>
    </svelte:fragment>
  </CardList>
</div>

<style lang="scss">
  .projects-page {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    &__title {
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      color: #fff;
    }
    &__actions {
      display: flex;
      gap: 10px;
    }
  }
</style>
