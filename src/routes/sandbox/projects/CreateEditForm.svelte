<script lang="ts" context="module">
</script>

<script lang="ts">
  import type { IProject, TagType, UtmSourceType } from './+page.svelte' // exception: must be imported not in the module context

  import Button from '$lib/components/common/Button.svelte'
  import Icon from '$lib/components/common/Icon.svelte'
  import Input from '$lib/components/common/Input.svelte'
  import Switch from '$lib/components/common/Switch.svelte'

  import Repeater from '../components/Repeater.svelte'
  import PlatformOptionList from '../components/PlatformOptionList.svelte'

  export let creatingEditingItem: IProject
  export let editingItem: IProject | null = null
  export let onCancel: Function
  export let onSubmit: Function

  let search = ''

  let newTag: TagType = getNewTag()
  let newUtmSource: UtmSourceType = getNewUtmSource()

  function getNewTag(): TagType {
    return { key: '', value: '' }
  }

  function getNewUtmSource(): UtmSourceType {
    return { key: '', value: '' }
  }

  $: foundPixels = creatingEditingItem.pixels.filter(
    (pixel) =>
      !search.trim() || pixel.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  )
</script>

<div class="form">
  <div class="form__heading">
    <h2 class="form__title">
      {editingItem?.title ?? 'Project'}
    </h2>
    <p class="form__description">
      {editingItem ? 'Configure the' : 'Create a'} project for better and faster adjustments of your
      ads
    </p>
  </div>

  <div class="form__name-input">
    <Input class="w-full" placeholder="Projectname" bind:value={creatingEditingItem.title} />
  </div>

  <div class="form__groups">
    <div class="form__group">
      <div class="form__group-title">Data Tags</div>
      <div class="form__group-description">Add your OneTrack Pixels</div>

      <div class="form__pixels">
        <PlatformOptionList
          setup={{
            searchable: true,
            options: creatingEditingItem.pixels
          }}
        />
      </div>

      <h3 class="form__group-description">Tags</h3>

      <div class="form__tags">
        <Repeater
          setup={{
            items: creatingEditingItem.tags,
            getNewItem: () => (newTag = getNewTag()),
            checkAddDisabled: (newItem, items) => !newItem.key.trim() || !newItem.value.trim()
          }}
        >
          <svelte:fragment slot="item" let:index>
            <Input bind:value={creatingEditingItem.tags[index].key} placeholder="Key" />
            <Input bind:value={creatingEditingItem.tags[index].value} placeholder="Value" />
          </svelte:fragment>

          <svelte:fragment slot="add">
            <Input bind:value={newTag.key} placeholder="Key" />
            <Input bind:value={newTag.value} placeholder="Value" />
          </svelte:fragment>
        </Repeater>
      </div>
    </div>

    <div class="form__group">
      <div class="form__group-title">Platforms</div>
      <div class="form__group-description">Platforms you want to include in your attribution</div>

      <div class="form__platforms">
        <PlatformOptionList
          setup={{
            options: creatingEditingItem.platforms
          }}
        >
          <svelte:fragment slot="item-info">
            <div class="platform__tags">
              <h3>Headline</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              </p>
              <div class="platform__tags__list">
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
                <div class="platform__tags__tag">Parameter</div>
              </div>
            </div>
          </svelte:fragment>
        </PlatformOptionList>
      </div>

      <div class="form__group-description">
        Add UTM Sources you want to exclude from your attribution
      </div>

      <div class="form__utm-sources">
        <Repeater
          setup={{
            items: creatingEditingItem.utmSources,
            getNewItem: () => (newUtmSource = getNewUtmSource()),
            checkAddDisabled: (newItem, items) => !newItem.key.trim() || !newItem.value.trim()
          }}
        >
          <svelte:fragment slot="item" let:index>
            <Input
              bind:value={creatingEditingItem.utmSources[index].key}
              placeholder="UTM Source"
            />
            <!-- <Input bind:value={creatingEditingItem.utmSources[index].value} placeholder="Value" /> -->
          </svelte:fragment>

          <svelte:fragment slot="add">
            <Input bind:value={newUtmSource.key} placeholder="Key" />
            <!-- <Input bind:value={newUtmSource.value} placeholder="Value" /> -->
          </svelte:fragment>
        </Repeater>
      </div>
    </div>
  </div>

  <div class="form__footer">
    <Button action="secondary" variant="error" text="Cancel" on:click={onCancel} />
    <Button text={editingItem ? 'Update' : 'Save'} on:click={onSubmit} />
  </div>
</div>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    &__title {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }
    &__description {
      font-size: 14px;
      padding-top: 5px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    &__heading {
    }

    &__name-input {
      width: 100%;
    }
    &__groups {
      display: grid;

      padding-top: 10px;
      @media (min-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    &__group {
      @media (max-width: 991px) {
        padding: 15px;
      }
      &:first-child {
        @media (min-width: 992px) {
          padding-right: 20px;
          border-right: 1px solid #8b939e;
        }
      }
      &:last-child {
        @media (min-width: 992px) {
          padding-left: 20px;
        }
      }
      &-title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
      }

      &-description {
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        padding-top: 14px;
        padding-top: 20px;
        padding-bottom: 10px;
      }
    }
    &__pixels {
      padding-top: 20px;
    }
    &__tags {
    }
    &__platforms {
    }
    &__utm-sources {
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }

  .platform__tags {
    padding: 15px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }
    p {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    &__list{
      display: flex; gap: 10px; flex-wrap: wrap;
    }
    &__tag{ padding: 2px 14px; box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.50); border-radius: 24px; font-size: 14px;
      background: linear-gradient(105deg, #007DF2 0%, #46A6FF 100%);
    }
  }

  // The blur on modal gets the performance crazy. Override while in dev
  :global(.modal__content) {
    backdrop-filter: none !important;
    background: #1b1a1a !important;
  }
</style>
