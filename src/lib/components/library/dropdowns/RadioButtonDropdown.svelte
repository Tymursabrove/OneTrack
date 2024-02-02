<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/common/Button.svelte';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let title: string;
	export let list: { id: string; name: string; state: boolean }[];
	export let classes = 'relative w-full';

	let showDropdown = false;
	function handleClick(id: string) {
		for (let item of list) {
			item.state = false;
		}
		let changedItem = list.find((x) => x.id == id);
		if (!changedItem) {
			return;
		}
		changedItem.state = true;
		dispatch('selectionChange', { changedItem });
		list = list;
	}
</script>

<div class={classes}>
	<Button
		role="dropdown"
		text={title}
		action="secondary"
		size="small"
		class={id}
		on:click={() => {
			showDropdown = !showDropdown;
		}}
	/>

	{#if showDropdown}
		<div
			transition:slide
			class="absolute mt-2 inset-x-0 z-20 top-full rounded-md focus:outline-none text-sm border border-grey-4 backdrop-blur-md bg-bglinear-5 shadow-sidebar"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
			use:clickOutside={id}
			on:click_outside={() => {
				if (showDropdown) {
					showDropdown = false;
				}
			}}
		>
			<ul
				class="relative z-10 on-hover-scroll max-h-60 overflow-auto divide-y divide-grey-4"
				id="{id}-drop-wrapper"
			>
				{#if list}
					{#each list as item (item.id)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							class="text-white relative group cursor-default select-none flex items-center px-1 py-2 xl:p-3 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20 first-of-type:rounded-t-md last-of-type:rounded-b-md"
							on:click={() => {
								showDropdown = false;
								handleClick(item.id);
							}}
						>
							<input
								type="checkbox"
								name="sortby"
								id={item.id}
								class="sr-only peer"
								bind:checked={item.state}
							/>
							<span
								class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100 shrink-0"
							/>
							<label for={item.id}>{item.name}</label>
							<button class="absolute inset-0 z-10"><span class="sr-only">toggle</span> </button>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
