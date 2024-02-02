<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { openModal } from 'svelte-modals';
	import exportModel from '$lib/components/pages/cohorts/ExportModal.svelte';
	import CohortsTableRow from '$lib/components/pages/cohorts/CohortsTableRow.svelte';

	function handleOpen() {
		openModal(exportModel, {});
	}
	let update = true;
	onMount(async () => {
		await tick();
		hideLoader();
	});
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex flex-col">
	<div class="flex flex-wrap justify-between items-center gap-3 border-b border-grey pb-5 ">
		<h2 class="text-lg md:text-xl text-white leading-none font-semibold flex gap-1">
			Cohort Builder
		</h2>
		<div class="flex gap-4">
			<button
				on:click={handleOpen}
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white px-5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
				><span class="relative z-10 leading-none">Export</span></button
			>
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none"
					><span class="relative z-10 leading-none">Import</span></span
				></button
			>
		</div>
	</div>

	<div class="flex flex-wrap justify-between gap-4 items-center py-6">
		<div class="relative flex gap-3">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent px-6 p-4 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none"
					><span class="relative z-10 leading-none">Edit All</span></span
				></button
			>

			<button
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-10 sm:w-auto sm:px-4 2xl:px-5 p-1.5 2xl:p-2 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
			>
				<span class="relative z-10 inline-flex items-center gap-1">
					<span class="text-xl">+</span><span class="whitespace-nowrap hidden sm:inline"
						>Add a new cohort</span
					>
				</span>
			</button>
		</div>
		<div class="relative w-full sm:w-auto">
			<form class="flex items-stretch gap-3 ">
				<div class="relative w-full sm:max-w-md flex items-center">
					<label for="search" class="sr-only">Search</label>
					<div
						class="pointer-events-none absolute inset-y-0 left-0 w-12 hidden xs:flex items-center justify-center z-10"
					>
						<Icon data={Icons.searchIcon} stroke="transparent" class="w-4 h-4  text-white" />
					</div>

					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 xs:pl-10 outline-none leading-none peer invalid:border-red invalid:text-red h-11 xl:w-80"
							type="search"
							id="search"
							placeholder="Search"
							name="search"
						/>
					</div>
				</div>

				<div class="w-full sm:max-w-sm hidden items-stretch">
					<input
						type="search"
						name="search"
						id="search"
						class="border border-grey flex-1 ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md shadow-sm focus:border-blue focus:ring-blue text-sm outline-none leading-none peer invalid:border-red invalid:text-red"
						placeholder="Search"
					/>
				</div>
				<button
					type="submit"
					class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white xl:px-7 p-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
					><Icon
						data={Icons.searchIcon}
						stroke="transparent"
						class="w-4 h-4 xs:hidden text-white relative z-10"
					/><span class="hidden xs:inline-flex relative z-10 leading-none">Search</span></button
				>
			</form>
		</div>
	</div>

	<div class="flex flex-col space-y-4">
		<div class="flex gap-3 px-4 xl:px-6 -mb-4">
			<div class="shrink-0 py-2">
				<CheckBox
					labelClass="relative z-10 leading-none xl:hidden"
					id="same-address"
					span="before:w-5 before:h-5 relative before:border-2 before:border-white before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0"
					label="Select All"
					classes="relative cursor-pointer "
				/>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 w-1/6 ">
				<span
					class="relative before:absolute before:inset-0 before:bg-table-heading before:border-l before:border-t before:border-blue before:rounded-tl after:w-full after:right-0 after:absolute after:h-px after:top-0 after:rounded-l after:bg-gradient-to-t after:from-color/10 after:backdrop-blur-xl after:to-color py-2 px-3 w-24 max-w-full block"
					>Name</span
				>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 w-1/3   ">
				<span
					class="relative before:absolute before:inset-0 before:bg-table-heading before:border-l before:border-t before:border-blue before:rounded-tl after:w-full after:right-0 after:absolute after:h-px after:top-0 after:rounded-l after:bg-gradient-to-t after:from-color/10 after:backdrop-blur-xl after:to-color py-2 px-3 w-32 max-w-full block"
					>Tag</span
				>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 w-1/6 ">
				<span
					class="relative before:absolute before:inset-0 before:bg-table-heading before:border-l before:border-t before:border-blue before:rounded-tl after:w-full after:right-0 after:absolute after:h-px after:top-0 after:rounded-l after:bg-gradient-to-t after:from-color/10 after:backdrop-blur-xl after:to-color py-2 px-3 w-32 max-w-full block"
					>Platforms</span
				>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 xl:w-16 2xl:w-20">
				<span
					class="relative before:absolute before:inset-0 before:bg-table-heading before:border-l before:border-t before:border-blue before:rounded-tl after:w-full after:right-0 after:absolute after:h-px after:top-0 after:rounded-l after:bg-gradient-to-t after:from-color/10 after:backdrop-blur-xl after:to-color py-2 px-3 w-20 max-w-full block"
					>Size</span
				>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 xl:w-24 2xl:w-32">
				<span
					class="relative before:absolute before:inset-0 before:bg-table-heading before:border-l before:border-t before:border-blue before:rounded-tl after:w-full after:right-0 after:absolute after:h-px after:top-0 after:rounded-l after:bg-gradient-to-t after:from-color/10 after:backdrop-blur-xl after:to-color py-2 px-3 w-32 max-w-full block"
					>Last update</span
				>
			</div>
			<div class="hidden xl:block text-sm font-semibold shrink-0 text-right w-24 2xl:w-auto">
				<span class="invisible">Actions</span>
			</div>
		</div>
		<CohortsTableRow />
		<CohortsTableRow />
		<CohortsTableRow />
		<CohortsTableRow />
		<CohortsTableRow />
		<CohortsTableRow />
	</div>
</main>
