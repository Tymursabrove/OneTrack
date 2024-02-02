<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Workspace } from '$lib/store';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import facebook from '$lib/svgs/Facebook_f_logo.svg?url';
	import checkmarkGreen from '$lib/svgs/checkmark-green.svg?url';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	let unsub;
	onMount(() => {
		unsub = Workspace.subscribe(async (ws) => {});
	});

	let accounts = [
		{
			ID: 'hd8383hdf49383'
		},
		{
			ID: 'hd8383hdf49384'
		},
		{
			ID: 'hd8383hdf49385'
		},
		{
			ID: 'hd8383hdf49386'
		},
		{
			ID: 'hd8383hdf49387'
		},
		{
			ID: 'hd8383hdf49388'
		},
		{
			ID: 'hd8383hdf49389'
		}
	];
</script>

<main class="max-w-screen-xl mx-auto w-full flex flex-col  xl:px-5 flex-1 pt-5 md:pt-10 ">
	<div class="flex-1 space-y-5 md:space-y-10">
		<div class="flex justify-between gap-5 items-center">
			<h2 class="text-lg md:text-xl text-white leading-none font-medium flex gap-1">Routing</h2>

			<button
				on:click={() => goto('/tracking/routing/set-up-connection/')}
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue sm:min-w-24 w-10 sm:w-auto sm:px-3 2xl:px-7 p-1.5 2xl:p-2 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
			>
				<span class="relative z-10 inline-flex items-center gap-1">
					<span class="text-xl">+</span><span class="whitespace-nowrap hidden sm:inline"
						>New Connection</span
					>
				</span>
			</button>
		</div>

		<div class="space-y-3">
			<div class="hidden md:flex gap-3 px-4 md:px-6">
				<div class="w-14 shrink-0" />
				<div class="text-sm font-semibold flex-1 shrink-0">Source Name</div>
				<div class="text-sm font-semibold flex-1 shrink-0">Destination Name</div>
				<div class="text-sm font-semibold w-32 shrink-0">Frequency</div>
				<div class="text-sm font-semibold w-32 shrink-0">Last Sync</div>
				<div class="text-sm font-semibold w-20 xl:w-28 shrink-0">Enabled</div>
				<div class="w-10 shrink-0" />
			</div>
			{#each accounts as account}
				<div
					class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 border border-blue flex items-center py-3 xs:py-5  after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 "
				>
					<div
						class="flex flex-wrap md:flex-nowrap gap-y-4 md:gap-x-3 pl-14 px-4 md:px-6 w-full relative z-10 items-start md:items-center "
					>
						<div class="w-10 shrink-0 flex items-center absolute md:static left-3 top-5">
							<!-- If its success -->
							<img src={checkmarkGreen} class="w-5" alt="" />
							<!-- Else -->
							<Icon
								data={Icons.crossIcon}
								stroke="transparent"
								class="w-5 transitions text-red hidden"
							/>
							<!-- end if -->
						</div>
						<div
							class="text-xs md:text-sm font-semibold w-1/2 xs:w-1/3 md:w-auto md:flex-1 shrink-0 flex flex-col gap-y-2 "
						>
							<!-- Label hidden on desktop -->
							<p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Source Name</p>
							<div class="flex items-center gap-2">
								<img src="/images/OneTrack_kreislogo.png" class="w-6" alt="" /><span>OneTrack</span>
							</div>
						</div>
						<div
							class="text-xs md:text-sm font-semibold w-1/2 xs:w-1/3 md:w-auto md:flex-1 shrink-0 flex flex-col gap-y-2"
						>
							<p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Destination Name</p>
							<div class="flex items-center gap-2">
								<img src={facebook} class="w-6 h-6" alt="test" /><span>Meta</span>
							</div>
						</div>
						<div
							class="text-xs md:text-sm font-semibold w-1/2 xs:w-1/3 md:w-32 shrink-0 flex flex-col gap-y-2"
						>
							<p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Frequency</p>
							<p>24 hours</p>
						</div>
						<div
							class="text-xs md:text-sm font-semibold w-1/2 xs:w-1/3 md:w-32 shrink-0 flex flex-col gap-y-2"
						>
							<p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Last Sync</p>
							<p>20 hours ago</p>
						</div>
						<div
							class="text-xs md:text-sm font-semibold w-1/2 xs:w-1/3 md:w-20 xl:w-28 shrink-0 flex flex-col gap-y-2"
						>
							<p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Enabled</p>
							<div class="relative h-auto leading-none">
								<CheckBox
									labelClass="relative z-10 leading-none"
									label=""
									id="account-{account.ID}"
									classes="relative cursor-pointer"
									span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
								/>
							</div>
						</div>
						<div class="w-1/2 xs:w-1/3 md:w-10 shrink-0 flex items-center">
							<button
								on:click={() => goto('/tracking/routing/rounting-status/')}
								class="w-8 h-8 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
								><span class="relative z-10 leading-none">
									<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" /></span
								></button
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- Pagination -->
	<nav class="flex items-center justify-end pt-5">
		<div class="flex items-center justify-end gap-2">
			<div class="flex gap-2 items-center">
				<span class="inline-flex items-center text-sm font-medium text-white">Items per page:</span>
				<select
					class="pagination-select w-10 outline-none focus:ring-0 leading-none border-0 border-b border-grey rounded-0 appearance-none text-white bg-transparent p-0 text-sm font-medium"
				>
					<option>9</option>
				</select>
			</div>
			<div class="hidden md:flex items-center">
				<a
					href="/#"
					class="inline-flex items-center w-8 h-8 justify-center rounded-full hover:bg-white/10 text-sm font-medium text-white ease-in-out duration-300"
					>1</a
				>
				<span class="inline-flex items-center text-sm font-medium text-white">-</span>
				<a
					href="/#"
					class="inline-flex items-center w-8 h-8 justify-center rounded-full hover:bg-white/10 text-sm font-medium text-white ease-in-out duration-300"
					>2</a
				>
				<span class="inline-flex items-center text-sm font-medium text-white ">of 2</span>
			</div>
			<div class="flex gap-1 flex-1 justify-end items-center">
				<a
					href="/#"
					class="inline-flex relative items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 text-sm font-medium text-white ease-in-out duration-300"
				>
					<span class="sr-only">Previous</span>
					<Icon data={Icons.AngleLeft} class="w-2.5 h-2.5" color="currentColor" />
				</a>
				<a
					href="/#"
					class="inline-flex relative items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 text-sm font-medium text-white ease-in-out duration-300"
				>
					<span class="sr-only">Next</span>
					<Icon data={Icons.AngleRight} class="w-2.5 h-2.5" color="currentColor" />
				</a>
			</div>
		</div>
	</nav>
	<!--End Pagination -->
</main>
