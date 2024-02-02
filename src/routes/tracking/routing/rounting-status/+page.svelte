<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import facebook from '$lib/svgs/Facebook_f_logo.svg?url';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { slide } from 'svelte/transition';
	let showDropdown = false;
</script>

<main class="max-w-screen-xl mx-auto w-full flex flex-col xl:px-5 flex-1">
	<div class="flex-1 space-y-10 pt-5 flex flex-col">
		<div class="flex flex-col md:flex-row justify-between gap-5 items-center">
			<h2 class="text-lg md:text-xl xl:text-3xl text-white leading-none font-bold flex gap-1">
				Routing Connection Status
			</h2>
			<div class="flex gap-3 justify-center sm:justify-end items-center flex-wrap">
				<!-- Active button classes 'shadow-glow-blue before:opacity-100 after:opacity-0' : 'after:opacity-100 before:opacity-0' -->
				<button
					on:click={() => goto('/tracking/routing/set-up-connection/')}
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-0 after:ease-in-out after:duration-300  after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 "
				>
					<span class="relative z-10 inline-flex items-center gap-1"> Set up connection </span>
				</button>
				<button
					on:click={() => goto('/tracking/routing/rounting-setting/')}
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-0 after:ease-in-out after:duration-300  after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 "
				>
					<span class="relative z-10 inline-flex items-center gap-1"> Settings </span>
				</button>
				<button
					on:click={() => goto('/tracking/routing/rounting-status/')}
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white after:ease-in-out after:duration-300 after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 shadow-glow-blue before:opacity-100 after:opacity-0"
				>
					<span class="relative z-10 inline-flex items-center gap-1"> Status </span>
				</button>
			</div>
		</div>
		<!-- p-5 xl:py-7 xl:px-10 -->
		<div class="flex-1">
			<div
				class=" bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 flex flex-col overflow-hidden"
			>
				<div class="relative z-20 flex flex-col divide-y divide-grey">
					<div class="p-5 xl:py-7 xl:px-10 flex flex-wrap justify-between gap-5 ">
						<div class="space-y-1.5">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
								Source
							</h3>
							<div class="flex items-center gap-2">
								<img src="/images/OneTrack_kreislogo.png" class="w-6" alt="" /><span>OneTrack</span>
							</div>
						</div>
						<div class="space-y-1.5">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
								Destination
							</h3>
							<div class="flex items-center gap-2">
								<img src={facebook} class="w-6 h-6" alt="test" /><span>Meta</span>
							</div>
						</div>
						<div class="space-y-1.5">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
								Frequency
							</h3>
							<p class="text-xs leading-none text-grey-2">24 hours</p>
						</div>
						<div class="space-y-2">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1 pb-1">
								Frequency
							</h3>
							<CheckBox
								labelClass="relative z-10 leading-none"
								label=""
								id="frequency"
								classes="relative cursor-pointer"
								span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
							/>
						</div>
					</div>
					<div class="flex-1 p-5 xl:py-7 xl:px-10 gap-5 flex flex-wrap justify-between">
						<button
							class="text-lg text-white leading-none font-medium flex items-center gap-2 outline-none"
							on:click={() => {
								showDropdown = !showDropdown;
							}}
						>
							<span>View Sync History</span>
							<Icon
								data={Icons.triangleSymbolIcon}
								class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
								color="currentColor"
							/>
						</button>
						<div class="flex gap-3 justify-center sm:justify-end items-center flex-wrap">
							<button
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue  sm:px-3 2xl:px-7 p-1.5 2xl:py-2 px-5 xl:w-44 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
							>
								<span class="relative z-10 ">Reset your data</span>
							</button>
							<button
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue  sm:px-3 2xl:px-7 p-1.5 2xl:py-2 px-5 xl:w-44 text-sm font-semibold :outline-none ease-in-out duration-300 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-100 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-green after:absolute hover:shadow-glow-green hover:before:opacity-0"
							>
								<span class="relative z-10 ">Sync now</span>
							</button>
						</div>
					</div>
					{#if showDropdown}
						<div transition:slide class="space-y-5 p-5 xl:py-7 xl:px-10">
							<div class="flex gap-2 flex-wrap items-center justify-between">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Succeeded
									</h3>
									<p class="text-sm leading-none text-grey-2">
										5.31 KB | 2 emitted records | 2 committed records | 50s | Sync
									</p>
								</div>
								<div class="text-right text-sm">7:15PM 05/24</div>
							</div>
							<div class="flex gap-2 flex-wrap items-center justify-between">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Succeeded
									</h3>
									<p class="text-sm leading-none text-grey-2">
										5.31 KB | 2 emitted records | 2 committed records | 50s | Sync
									</p>
								</div>
								<div class="text-right text-sm">7:15PM 05/23</div>
							</div>
							<div class="flex gap-2 flex-wrap items-center justify-between">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Succeeded
									</h3>
									<p class="text-sm leading-none text-grey-2">
										5.31 KB | 2 emitted records | 2 committed records | 50s | Sync
									</p>
								</div>
								<div class="text-right text-sm">7:15PM 05/22</div>
							</div>
							<div class="flex gap-2 flex-wrap items-center justify-between">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Succeeded
									</h3>
									<p class="text-sm leading-none text-grey-2">
										5.31 KB | 2 emitted records | 2 committed records | 50s | Sync
									</p>
								</div>
								<div class="text-right text-sm">7:15PM 05/21</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div class="flex gap-4 justify-end pt-5 mt-auto">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</div>
</main>
