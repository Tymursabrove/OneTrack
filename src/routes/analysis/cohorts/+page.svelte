<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { openModal } from 'svelte-modals';
	import exportModel from '$lib/components/pages/cohorts/ExportModal.svelte';

	function handleOpen() {
		openModal(exportModel, {});
	}
	onMount(async () => {
		await tick();
		hideLoader();
	});
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex flex-col flex-1">
	<div class="flex flex-wrap justify-between items-center gap-3 border-b border-grey pb-5">
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
	<div class="flex flex-wrap justify-end gap-4 items-center py-6">
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
	<div class="flex justify-center items-center flex-1">
		<button
			class="md:w-56 flex justify-center items-center xl:max-w-sm bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-5 py-10 before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 hover:before:bg-blue-box hover:before:opacity-100 before:ease-in-out before:duration-300"
			on:click={() => {
				goto('/analysis/cohorts/cohorts-builder-edit');
			}}
		>
			<div class="relative z-10 space-y-7 flex justify-center flex-col items-center">
				<Icon data={Icons.plus} class="w-14" />
				<p class="text-center text-xl font-semibold w-32">Build your first Cohort</p>
			</div>
		</button>
	</div>
</main>
