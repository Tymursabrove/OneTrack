<script lang="ts" context="module">
  export interface IBatchSelectBus {
    select: (e: MouseEvent, id: string) => string[];
    selectRange: (startId: string, endId: string) => string[];
    toggleSelect: (id: string) => string[];
    toggleSelectAll: () => string[];
    value: boolean | null;
  }
</script>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  export let ids: string[] = []
  export let selectedIds: string[] = []

  let lastSelectedId = ''
  let shiftStartId = ''
  let shiftEndId = ''

  const dispatch = createEventDispatcher()

  const select: IBatchSelectBus['select'] = (e, id) => {
    const triggerKey = e.metaKey || e.ctrlKey

    if (!triggerKey) return selectedIds

    if (triggerKey && e.shiftKey) {
      if (!shiftStartId) {
        shiftStartId = lastSelectedId
      } 

      if (shiftEndId) {
        // Shrink the previously selected range
        selectedIds = selectedIds.filter(selectedId => {
          return ids.indexOf(selectedId) < Math.min(ids.indexOf(shiftStartId), ids.indexOf(shiftEndId)) ||
            ids.indexOf(selectedId) > Math.max(ids.indexOf(shiftStartId), ids.indexOf(shiftEndId))
        })
      }

      // Select the new range
      selectedIds = selectRange(shiftStartId, id)
      shiftEndId = id
    } else {
      if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(selectedId => selectedId !== id)
      } else {
        selectedIds = [...selectedIds, id]
      }

      lastSelectedId = id
      shiftStartId = shiftEndId = ''
    }

    document.getSelection()?.empty()

    dispatch('update', selectedIds)
    return selectedIds
  }

  const toggleSelect: IBatchSelectBus['toggleSelect'] = id => {
    if (!ids.includes(id)) return selectedIds

    const isSelected = selectedIds.includes(id)

    isSelected
      ? selectedIds.splice(selectedIds.indexOf(id), 1)
      : selectedIds.push(id)

    selectedIds = selectedIds

    dispatch('update', selectedIds)
    return selectedIds
  }

  const toggleSelectAll: IBatchSelectBus['toggleSelectAll'] = () => {
    selectedIds = selectedIds.length ? [] : [...ids]

    dispatch('update', selectedIds)
    return selectedIds
  }

  const selectRange: IBatchSelectBus['selectRange'] = (startId, endId) => {
    const startIndex = ids.indexOf(startId)
    const endIndex = ids.indexOf(endId)

    for (let i = Math.min(startIndex, endIndex); i <= Math.max(startIndex, endIndex); i++) {
      if (!selectedIds.includes(ids[i])) {
        selectedIds = [...selectedIds, ids[i]]
      }
    }

    return selectedIds
  }

  $: hasPartialSelection = selectedIds.length && (selectedIds.length !== ids.length)
  $: value = hasPartialSelection ? null : !!(selectedIds.length && (selectedIds.length === ids.length))

  $: bus = {
    select,
    selectRange,
    toggleSelect,
    toggleSelectAll,
    value
  } satisfies IBatchSelectBus

  $: dispatch('bus', bus)

  onMount(() => dispatch('bus', bus))
</script>
