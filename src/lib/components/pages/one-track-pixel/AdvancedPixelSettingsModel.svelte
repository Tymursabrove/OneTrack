<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import SelectionDropDown from './SelectionDropDown.svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	export let isOpen = false;

	let routingIds = [];

	onMount(async () => {
		routingIds = [];

		addEmptyItemInRoutingIDs();
	});
	function addEmptyItemInRoutingIDs() {
		routingIds.push({ name: '', value: '', id: uniqueId() });
		routingIds = routingIds;
	}

	function removeItemFromRoutingIds(id) {
		routingIds = routingIds.filter((x) => x.id != id);
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex p-3 items-center justify-center"
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="fixed inset-0 bg-black/90 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative transform max-h-full flex flex-col rounded-3xl bg-color p-3 text-left shadow-xl transition-all sm:my-5 w-full max-w-5xl h-screen"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 on-hover-scroll transform rounded-3xl py-3 xs:p-5 sm:py-7 space-y-4 flex flex-col"
			>
				<div class="space-y-1.5 items-center">
					<h3 class="text-xl text-white leading-none font-medium flex items-center gap-2">
						Advanced Pixel Settings
						<Tooltip top>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
							<span slot="tip" class="flex gap-2 leading-tight text-xs"
								><Icon data={Icons.infoIcon} stroke="transparent" class="w-4 shrink-0" />does not match RegEx (ignore case)</span
							>
						</Tooltip>
					</h3>
					<p class="text-xs leading-snug">
						Define how you would like to activate your pixel based on the routing parameters.
						Routing parameters are synced with the postback rounting. For more inforamtion please
						hover over the information icon and watch the video tutorial.
					</p>
				</div>
				<div class="relative space-y-4 flex-1">
					<div
						class="border border-blue py-4 px-5 relative rounded-2xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-2xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col after:absolute after:inset-0 after:rounded-2xl after:ease-in-out after:duration-500 after:border-3 after:border-transparent mt-4"
					>
						<div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
							<div class="flex-1 flex items-center gap-2">
								<div class="shrink-0">
									<Icon data={Icons.onetrackBlueIcon} stroke="transparent" class="w-6 md:w-10" />
								</div>
								<p class="text-lg md:text-xl font-semibold text-white whitespace-nowrap">OneTrack Source</p>
							</div>
							<div class="w-full md:w-20">
								<Icon data={Icons.forwardIcon} stroke="transparent" class="w-6 md:w-10" />
							</div>
							<div class="flex-1 flex items-center gap-2 md:pl-10">
								<Icon data={Icons.metaLogoIcon} stroke="transparent" class="w-6" />
								<p class="text-lg md:text-xl font-semibold text-white whitespace-nowrap">Meta Pixel 1</p>
							</div>
						</div>
					</div>

					<div class="space-y-3 pt-5">
						<p class="text-xs leading-snug">
							Send data to Meta Pixel 1 when an Event from the OneTrack Pixel occurs and all of
							these conditions are true
						</p>
						<div class="flex items-center gap-3">
							<CheckBox
								labelClass="relative z-10 leading-none"
								label=""
								id="apply-changes"
								classes="relative cursor-pointer"
								span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
							/>
							<label for="apply-changes">Apply all changes to the routing</label>
						</div>

						<div class="space-y-5 pt-3">
							{#each routingIds as item, i (item.id)}
								<div class="flex gap-3 items-end">
									<div class="flex flex-col xs:grid xs:grid-cols-2 md:grid-cols-4 gap-3 flex-1 ">
										<div class="max-w-full">
											<SelectionDropDown
												id={item.id}
												title="Select Event"
												list={[
													{
														id: 'item-1',
														state: true,
														name: 'Page View'
													},
													{
														id: 'item-2',
														state: false,
														name: 'View Content'
													},
													{
														id: 'item-3',
														state: false,
														name: 'Add to Cart'
													},
													{
														id: 'item-4',
														state: false,
														name: 'Remove from Cart'
													},
													{
														id: 'item-5',
														state: false,
														name: 'Lead'
													},
													{
														id: 'item-6',
														state: false,
														name: 'Purchase'
													},
													{
														id: 'item-7',
														state: false,
														name: 'Initiate Checkout'
													}
												]}
												mainIcon={Icons.targetIcon}
												on:selectionChange={(e) => {}}
											/>
										</div>
										<div class="max-w-full">
											<SelectionDropDown
												id={item.id}
												title="Select Trigger"
												list={[
													{
														id: 'item-1',
														state: true,
														name: 'Page URL'
													},
													{
														id: 'item-2',
														state: false,
														name: 'Value'
													},
													{
														id: 'item-3',
														state: false,
														name: 'Time on Page'
													},
													{
														id: 'item-4',
														state: false,
														name: 'Scroll Depth'
													}
												]}
												mainIcon={Icons.targetIcon}
												on:selectionChange={(e) => {}}
											/>
										</div>
										<div class="max-w-full">
											<SelectionDropDown
												id={item.id}
												title="Select Operator"
												list={[
													{
														id: 'item-1',
														state: true,
														name: 'equals'
													},
													{
														id: 'item-2',
														state: false,
														name: 'contains'
													},
													{
														id: 'item-3',
														state: false,
														name: 'matches RegEx (ignore case)'
													},
													{
														id: 'item-4',
														state: false,
														name: 'does not equal'
													},
													{
														id: 'item-5',
														state: false,
														name: 'does not contain'
													},
													{
														id: 'item-6',
														state: false,
														name: 'does not start with'
													},
													{
														id: 'item-7',
														state: false,
														name: 'does not end with'
													},
													{
														id: 'item-8',
														state: false,
														name: 'does not match RegEx'
													},
													{
														id: 'item-9',
														state: false,
														name: 'does not match RegEx...'
													},
													{
														id: 'item-10',
														state: false,
														name: 'less than'
													},
													{
														id: 'item-11',
														state: false,
														name: 'less than or equal to'
													}
												]}
												mainIcon={Icons.targetIcon}
												on:selectionChange={(e) => {}}
											/>
										</div>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl max-w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												id={item.id}
												placeholder="Value"
												name={item.id}
											/>
										</div>
									</div>
									<div class="flex gap-2 shrink-0">
										{#if i < routingIds.length - 1}
										<button
											on:click={() => {
												removeItemFromRoutingIds(item.id);
											}}
											class="relative before:rounded-md before:shadow-glass-2 before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 w-12 py-3.5"
										>
											<span class="relative z-10 flex justify-center">
												<Icon data={Icons.crossIcon} stroke="transparent" class="w-5" />
											</span>
										</button>
										{:else}
										
										<button
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl shrink-0 w-12 py-3.5"
											on:click={addEmptyItemInRoutingIDs}
										>
											<span class="relative z-10 flex justify-center">
												<Icon data={Icons.plus} stroke="transparent" class="w-4" />
											</span>
										</button>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="flex gap-4 justify-end">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>
					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
					>
						<span class="relative z-10 leading-none">
							<span class="relative z-10 leading-none">Save</span>
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
