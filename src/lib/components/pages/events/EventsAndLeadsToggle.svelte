<script lang="ts">
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/common/Button.svelte';

	const dispatch = createEventDispatcher();
	const id = 'event-type-toggle-selection-dropdown';
	const title = 'Event Type';

	export let arePurchaseEvents: boolean;

	let list: { id: string; state: boolean; name: string }[];

	assignList(arePurchaseEvents);
	let showDropdown = false;
	function handleClick(id: string) {
		for (let item of list) {
			item.state = false;
		}
		let index = list.findIndex((x) => x.id == id);
		list[index].state = true;
		dispatch('selectionChange', {
			isPurchaseSelected: list.find((x) => x.id == 'purchase')?.state ?? true
		});
		list = list;
	}
	function assignList(purchaseEvents: boolean) {
		list = [
			{ id: 'purchase', state: purchaseEvents, name: 'Purchase Events' },
			{ id: 'lead', state: !purchaseEvents, name: 'Lead Events' }
		];
	}
	$: {
		assignList(arePurchaseEvents);
	}
</script>

<div class="relative flex items-center z-30">
	<div class="relative w-32 xs:w-44 xl:w-52">
		<Button
			role="dropdown"
			on:click={() => {
				showDropdown = !showDropdown;
			}}
			text={title}
			action="secondary"
			class={id}
			{id}
		/>

		{#if showDropdown}
			<div
				transition:slide
				class="absolute mt-2 inset-x-0 z-20 top-full rounded-md focus:outline-none text-sm border border-grey-4 backdrop-blur-md bg-bglinear-5 shadow-sidebar"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
			>
				<ul
					class="relative z-10 divide-y divide-grey max-h-60 on-hover-scroll overflow-auto rounded-md"
					id="{id}-drop-wrapper"
					use:clickOutside={id}
					on:click_outside={() => {
						if (showDropdown) {
							showDropdown = false;
						}
					}}
				>
					{#if list}
						{#each list as item (item.id)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<li
								class="text-white relative group cursor-default select-none flex items-center py-3 px-4 gap-2 hover:bg-grey/10 transitions border-y border-transparent hover:border-grey/20"
								on:click|stopPropagation={async () => {
									showDropdown = false;
									handleClick(item.id);
								}}
							>
								<input type="checkbox" class="sr-only peer" bind:checked={item.state} />
								<span
									class="border-2 border-white w-5 h-5 rounded-full inline-flex items-center justify-center after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
								/>
								<span>{item.name}</span>
								<button class="absolute inset-0 z-10"><span class="sr-only">toggle</span></button>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
