<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { clickOutside } from '$lib/helpers/MiscHelpers';
	import { slide } from 'svelte/transition';
	import { showErrorMessage } from '$lib/services/ToastService';
	import { AttributionWindow, AttributionType } from '$lib/store';

	export let id: string;

	const days = [1, 7, 14, 21, 28, 60, 90];
	const attributes = ['First Click', 'Last Click', 'Linear', 'Time Decay', 'U-Shaped'];
	const allowedDays = [1, 7, 14, 21, 28];
	const allowedAttributions = ['First Click', 'Last Click'];

	let showDropdown = false;
	let attributionWindowInputHolder = 14;
</script>

<div class="relative w-full z-20">
	<button
		type="button"
		class="{id} group cursor-pointer w-full flex items-center justify-start rounded-md leading-snug relative ease-in-out duration-300 h-10 text-white border  z-20 text-sm outline-none hover:border-white/50 before:bg-linear-3 before:backdrop-blur-md before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded hover:before:opacity-0  after:absolute after:inset-0 after:rounded after:bg-cover after:bg-[50%_50%] after:bg-blend-normal after:ease-in-out after:duration-300 after:shadow-button after:bg-linear-blue hover:after:opacity-100 {showDropdown ? 'after:opacity-100 before:opacity-0 border-white/50' : 'after:opacity-0 border-grey-4'} "
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
				class="{id} pointer-events-none flex items-center justify-center w-10 absolute left-0 inset-y-0 text-blue group-hover:text-white ease-in-out duration-300 {showDropdown ? 'text-white' : ''}"
			>
				<Icon
					data={Icons.chartIcon}
					class="w-5 h-5 -mt-0.5"
					color="currentColor"
					stroke="transparent"
				/>
			</span>
			<span class="{id} block truncate pr-8 p-2 pl-10"
				>{$AttributionWindow} {$AttributionWindow == 1 ? 'Day' : 'Days'} | {$AttributionType}</span
			>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10">
				<Icon
					data={Icons.triangleSymbolIcon}
					class="w-2.5 h-2.5 transitions {showDropdown ? 'rotate-180' : ''}"
					color="currentColor"
				/>
			</span>
		</span>
	</button>

	{#if showDropdown}
		<div
			transition:slide
			class="md:absolute md:mt-3 mt-1 relative md:right-0 z-10 max-w-full md:w-screen md:max-w-md top-full focus:outline-none text-sm border border-grey-4     backdrop-blur-md bg-bglinear-5 shadow-sidebar rounded-md"
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
			<div
				class="relative z-10 p-5 flex flex-col md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-grey-4 max-h-60 on-hover-scroll overflow-auto md:max-h-inherit md:overflow-visible"
			>
				<div class="pb-3 md:pb-0 md:pr-3 space-y-3">
					<h3 class="font-semibold text-white">Attribution window</h3>
					<div class="space-y-px -ml-3">
						{#each days as day}
							<button
								on:click={() => {
									AttributionWindow.set(day);
									attributionWindowInputHolder = day;
									showDropdown = !showDropdown;
								}}
								disabled={!allowedDays.includes(day)}
								class="relative flex justify-between text-left p-2 items-center leading-none w-full font-semibold border border-transparent hover:border-white/50 ease-in-out duration-300 rounded-lg after:absolute after:inset-0 after:bg-blue-box after:rounded-md after:ease-in-out after:duration-300 text-shadow-1 group {day ==
								$AttributionWindow
									? 'after:opacity-100 border-white/50'
									: 'after:opacity-0 hover:after:opacity-100'}"
								><span class="relative z-10">{day} {day == 1 ? 'Day' : 'Days'} </span>
								{#if !allowedDays.includes(day)}
									<span
										class="relative z-10 border rounded inline-flex uppercase px-1.5 text-xs gap-1 py-0.5 leading-none text-grey-2 border-grey bg-radial-gray group-hover:border-white group-hover:text-white ease-in-out duration-300"
										>Soon <Icon data={Icons.rocket} class="w-3 shrink-0" stroke="transparent" />
									</span>
								{/if}
							</button>
						{/each}
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<label for="custom-days" class="text-left leading-none font-semibold">Custom:</label>
						<div
							class="relative border border-grey-4 rounded-md before:rounded-md before:absolute before:inset-0 before:bg-linear-3 before:opacity-70 before:backdrop-blur-md before:shadow-sidebar w-12"
						>
							<input
								name="custom"
								type="text"
								placeholder="000"
								bind:value={attributionWindowInputHolder}
								on:change={() => {
									if (attributionWindowInputHolder < 1) {
										attributionWindowInputHolder = 1;
									}
									if (attributionWindowInputHolder > 30) {
										showErrorMessage(
											'The maximum attribution window in your OneTrack plan is limited to 30 days'
										);
										attributionWindowInputHolder = 30;
										AttributionWindow.set(30);
									}
									AttributionWindow.set(attributionWindowInputHolder);
									showDropdown = !showDropdown;
								}}
								class="border relative border-transparent z-10 ease-in-out duration-500 bg-transparent block w-full placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-2 outline-none leading-none h-8 text-center"
							/>
						</div>
						<p class="text-left leading-none font-semibold">
							{$AttributionWindow == 1 ? 'Day' : 'Days'}
						</p>
					</div>
				</div>
				<div class="pt-5 md:pt-0 md:pl-5 space-y-3">
					<h3 class="font-semibold text-white">Attribution model</h3>
					<div class="space-y-px -ml-3">
						{#each attributes as attribute}
							<button
								on:click={() => {
									AttributionType.set(attribute);
									showDropdown = !showDropdown;
								}}
								disabled={!allowedAttributions.includes(attribute)}
								class="relative flex justify-between text-left p-2 items-center leading-none w-full font-semibold border border-transparent hover:border-white/50 ease-in-out duration-300 rounded-lg after:absolute after:inset-0 after:bg-blue-box after:rounded-md after:ease-in-out after:duration-300 text-shadow-1 group {attribute ==
								$AttributionType
									? 'after:opacity-100 border-white/50'
									: 'after:opacity-0 hover:after:opacity-100'}"
								><span class="relative z-10">{attribute}</span>
								{#if !allowedAttributions.includes(attribute)}
									<span
										class="relative z-10 border rounded inline-flex uppercase px-1.5 text-xs gap-1 py-0.5 leading-none
										text-grey-2 border-grey bg-radial-gray group-hover:border-white group-hover:text-white ease-in-out duration-300"
										>Soon <Icon data={Icons.rocket} class="w-3 shrink-0" stroke="transparent" />
									</span>
								{/if}
							</button>
						{/each}
						<button
							class="relative text-left px-3 py-2 leading-none w-full font-bold border border-transparent hover:border-grey/40 hover:bg-white/10 ease-in-out duration-300 rounded-md after:absolute after:inset-0 after:bg-blue-box after:shadow-glow-blue after:rounded-md after:ease-in-out after:duration-300 after:opacity-0 group"
							><span
								class="relative z-10 bg-purple-text text-transparent bg-clip-text ease-in-out duration-300 group-hover:bg-white flex justify-between items-center gap-2"
								><span>OneTrack - SCOUT</span><img
									src={Icons.svgUrls.aiChipColoredBordered}
									alt=""
									class="w-7"
								/></span
							>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
