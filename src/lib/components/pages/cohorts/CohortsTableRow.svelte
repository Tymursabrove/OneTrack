<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import DeleteModel from '$lib/components/layout/DeleteModel.svelte';
	import { openModal } from 'svelte-modals';

	let update = true;
	function handleDelete() {
		openModal(DeleteModel, {});
	}
</script>

<div
	class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 border hover:border-blue border-transparent flex items-center py-3 xs:py-5 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 ease-in-out duration-500 "
>
	<div
		class="flex flex-wrap xl:flex-nowrap justify-between xl:justify-start gap-y-4 md:gap-x-3 pl-14 px-4 xl:px-6 w-full relative z-10 items-start md:items-center "
	>
		<div
			class="w-4 shrink-0 flex h-full items-start md:items-start absolute xl:static left-3 top-1"
		>
			<CheckBox
				id="userid-"
				span="w-4 h-4 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
				labelClass="sr-only"
				classes="relative cursor-pointer "
				onChange={() => {}}
			/>
		</div>
		<div class="text-xs md:text-sm xl:w-1/6 xl:shrink-0 flex flex-col gap-y-2 px-3">
			<!-- Label hidden on desktop -->
			<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Source Name</p>

			<span class="block leading-snug">cohort 1 - AGE: 18-55 | EK: 200.000+</span>
		</div>
		<div class="text-xs md:text-sm xl:w-1/3 font-semibold xl:shrink-0 flex flex-col gap-y-2 px-3">
			<!-- Label hidden on desktop -->
			<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Tags</p>
			<div class="flex flex-wrap items-center gap-1 max-w-full ">
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>campaign 1</span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>meta </span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>beauty product</span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>snapchat</span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>age-targeted</span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
				<p
					class="inline-flex items-center rounded-full bg-blue-box py-1 pr-1.5 pl-3 text-xs font-semibold  leading-none text-white gap-1"
				>
					<span>skin</span>
					<button class="text-white outline-none ease-in-out duration-300 hover:bg-white/20 p-1">
						<Icon data={Icons.crossIcon} stroke="transparent" class="w-3" /></button
					>
				</p>
			</div>
		</div>
		<div class="text-xs md:text-sm xl:w-1/6 xl:shrink-0 flex flex-col gap-y-2 px-3 ">
			<!-- Label hidden on desktop -->
			<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Platforms</p>
			<div class="flex items-center gap-2">
				<span>Facebook, TikTok, Snapchat</span>
			</div>
		</div>
		<div class="text-xs md:text-sm xl:w-16 2xl:w-20 shrink-0 flex flex-col gap-y-2 px-3 ">
			<!-- Label hidden on desktop -->
			<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Size</p>
			<div class="flex items-center gap-2">
				<span>856</span>
			</div>
		</div>
		<div class="text-xs md:text-sm xl:w-24 2xl:w-32 shrink-0 flex flex-col gap-y-2 px-3 ">
			<!-- Label hidden on desktop -->
			<p class="text-xs text-grey-2 xl:hidden whitespace-nowrap">Last update</p>
			<div class="flex flex-col items-start gap-1">
				<span>30.08.2022</span>
				{#if !update}
					<span
						class="font-medium text-xs text-white leading-none bg-radial-green-2 uppercase rounded-full text-shadow-1 py-1 px-2"
						>up-to-date</span
					>
				{:else}
					<span
						class="font-medium text-xs text-white leading-none bg-radial-red uppercase rounded-full text-shadow-1 py-1 px-2"
						>outdated</span
					>
				{/if}
			</div>
		</div>
		<div class=" shrink-0 flex flex-wrap xl:w-24 2xl:w-auto items-center gap-1 px-3 ">
			<button
				class="w-8 h-8 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-blue-box after:absolute after:inset-0"
				><span class="relative z-10 leading-none">
					<Icon data={Icons.refresh} stroke="transparent" class="w-5" /></span
				></button
			>
			<button
				class="w-8 h-8 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
				><span class="relative z-10 leading-none">
					<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" /></span
				></button
			>
			<button
				on:click={handleDelete}
				type="button"
				class="flex items-center justify-center shrink-0 p-0.5 text-red ease-in-out duration-300 hover:bg-red hover:text-white rounded-full w-8 h-8 "
			>
				<Icon data={Icons.crossIcon} stroke="transparent" class="w-4 " />
			</button>
		</div>
	</div>
</div>
