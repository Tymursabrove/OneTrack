<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { AllWorkspace, Workspace, CleanDataRelatedStores } from '$lib/store';
	import { get } from 'svelte/store';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { UpdateSelectedWorkspace } from '$lib/services/WorkspaceService';
	import { slide } from 'svelte/transition';

	let id = 'workspace-selection-dropdown';
	let title = 'Workspace';
	let list = [];
	let showDropdown = false;
	let previousWorkspaceId: null | string = null;

	onMount(() => {
		AllWorkspace.subscribe((allws) => {
			if (!allws || allws.length == 0) {
				return;
			}
			let extractedList = allws.map((x) => {
				return {
					state: false,
					name: x.name,
					id: x.id
				};
			});

			let selectedWorkspace = extractedList.find((x) => x.id == get(Workspace)?.id);
			if (!selectedWorkspace) {
				selectedWorkspace = extractedList[0];
			}
			selectedWorkspace.state = true;
			previousWorkspaceId = selectedWorkspace.id;
			title = selectedWorkspace.name;
			list = extractedList;
		});
	});
	async function toggleSelection(wsId) {
		for (let ws of list) {
			ws.state = false;
			if (ws.id == wsId) {
				ws.state = true;
				title = ws.name;
			}
		}
		list = list;
		await tick();
		if (wsId != previousWorkspaceId) {
			CleanDataRelatedStores();
			await UpdateSelectedWorkspace(wsId);
			previousWorkspaceId = wsId;
		}
	}
</script>

<div class="relative w-full min-w-48">

	<!-- shadow-[inset_2px_2px_4px_0px_rgba(0,_0,_0,_0.1),_inset_-2px_-2px_4px_0px_rgba(255,_255,_255,_0.1),_0px_4px_20px_0px_rgba(0,_0,_0,_0.6)] 
	bg-[linear-gradient(116deg,_rgba(170,_170,_170,_0.35)_-11%,rgba(170,_170,_170,_0.2)_116%)] bg-cover bg-50%_50% bg-blend-normal
 -->

	<button
		type="button"
		class="{id} group cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 h-10 text-white border  z-20 text-sm outline-none hover:border-white/50 before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded hover:before:opacity-0  after:absolute after:inset-0 after:rounded after:bg-cover after:bg-[50%_50%] after:bg-blend-normal after:ease-in-out after:duration-300 after:shadow-button after:bg-linear-blue hover:after:opacity-100 {showDropdown ? 'after:opacity-100 before:opacity-0 border-white/50' : 'after:opacity-0 border-grey-4'}"
		aria-haspopup="listbox"
		aria-expanded="true"
		aria-labelledby="listbox-label"
		on:click={() => {
			showDropdown = !showDropdown;
		}}
		{id}
	>
		<span class="flex gap-2 text-left relative z-10 py-1 w-full">
			<span
				class="{id} pointer-events-none flex items-center justify-center w-10 absolute left-2 inset-y-0 text-blue group-hover:text-white ease-in-out duration-300 {showDropdown ? 'text-white' : ''}"
			>
				<Icon
					data={Icons.threeCustomersSymbolIcon}
					class="w-5 h-5 -mt-0.5"					 
					stroke="transparent"
				/>
			</span>
			<span class=" {id} block truncate pr-8 p-2 pl-12">{title}</span>
			<span class="{id} pointer-events-none absolute inset-y-0 right-4 flex items-center">
				<Icon
					data={Icons.triangleSymbolIcon}
					stroke="transparent"
					class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
					color="currentColor"
				/>
			</span>
		</span>
	</button>

	{#if showDropdown}
		<div
			transition:slide
			class="relative md:absolute mt-1 md:mt-3 left-0 z-10 w-full top-full focus:outline-none text-sm border border-grey-4 backdrop-blur-md bg-bglinear-4 shadow-sidebar rounded-md"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
			id="{id}-drop-wrapper"
			use:clickOutside={id}
			on:click_outside={() => {
				if (showDropdown) {
					showDropdown = false;
				}
			}}
		>
			<ul
				class="relative divide-y divide-grey-4 max-h-60 on-hover-scroll overflow-auto rounded-md !pr-0"
			>
				{#if list}
					{#each list as item (item.id)}
						<li
							class=" {id} text-white relative cursor-default select-none p-3 pl-5 hover:bg-grey/20 transitions border-y border-transparent hover:border-grey/20 first-of-type:rounded-t-md last-of-type:rounded-b-md"
							on:click|stopPropagation={async () => {
								showDropdown = false;
								await toggleSelection(item.id);
							}}
						>
							<input type="checkbox" class="sr-only" bind:checked={item.state} />
							<label for="">{item.name}</label>
							<button class="{id} absolute inset-0 z-10"
								><span class="{id} sr-only">toggle</span></button
							>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
