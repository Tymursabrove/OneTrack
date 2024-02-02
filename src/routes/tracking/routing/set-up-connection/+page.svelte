<script>
	import { onMount } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import SelectionDropDown from '$lib/components/pages/onboarding/SelectionDropdown.svelte';
	import facebook from '$lib/svgs/Facebook_f_logo.svg?url';
	import { goto } from '$app/navigation';
	import { uniqueId } from '$lib/helpers/MiscHelpers';

	
	let conversionAPIs = [];

	onMount(async () => {
		conversionAPIs = [];
		addEmptyItemInConverAPIs();
	});

	function addEmptyItemInConverAPIs() {
		conversionAPIs.push({ name: '', value: '', id: uniqueId() });
		conversionAPIs = conversionAPIs;
	}

	function removeItemFromConversionApis(id) {
		conversionAPIs = conversionAPIs.filter((x) => x.id != id);
	}
</script>

<main class="max-w-screen-xl mx-auto w-full flex flex-col xl:px-5 flex-1 ">
	<div class="flex-1 space-y-10 pt-5">
		<div class="flex flex-col md:flex-row justify-between gap-5 items-center">
			<h2 class="text-lg md:text-xl xl:text-3xl text-white leading-none font-bold flex gap-1">
				Set up routing connection
			</h2>
			<div class="flex gap-3 justify-center sm:justify-end items-center flex-wrap">
				<!-- Active button classes 'shadow-glow-blue before:opacity-100 after:opacity-0' : 'after:opacity-100 before:opacity-0' -->
				<button
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white after:ease-in-out after:duration-300 after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 shadow-glow-blue before:opacity-100 after:opacity-0"
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
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white before:opacity-0 after:ease-in-out after:duration-300  after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 "
				>
					<span class="relative z-10 inline-flex items-center gap-1"> Status </span>
				</button>
			</div>
		</div>
		<div class="flex-1 space-y-7">
			<div class="flex flex-col sm:flex-row items-start gap-3 xl:gap-5">
				<div
					class="flex-1 w-full sm:w-auto bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-5 xl:py-7 xl:px-10 before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 space-y-2 flex flex-col"
				>
					<div class="space-y-3 relative z-20">
						<h3 class="font-bold text-white text-sm sm:text-base md:text-xl leading-none">
							Select an existing source
						</h3>
						<SelectionDropDown
							id=""
							title="Source"
							list={[
								{
									id: 'item-1',
									state: false,
									name: 'lorem ipsum'
								},
								{
									id: 'item-2',
									state: false,
									name: 'lorem ipsum'
								},
								{
									id: 'item-3',
									state: false,
									name: 'lorem ipsum'
								},
								{
									id: 'item-4',
									state: false,
									name: 'lorem ipsum'
								}
							]}
							mainIcon={Icons.targetIcon}
							on:selectionChange={(e) => {}}
						/>
					</div>
				</div>
				<div
					class="shrink-0 text-white w-7 xl:w-10 hidden sm:flex items-center justify-center h-28 xl:h-32"
				>
					<!-- If Default -->
					<Icon data={Icons.AngleRight} stroke="transparent" class="lg:w-5 w-3" />
					<!-- else -->
					<!--Please remove hidden and add this to above icon-->
					<Icon data={Icons.AngleLeft} stroke="transparent" class="lg:h-5 h-3 hidden" />
				</div>
				<div
					class="flex-1 w-full sm:w-auto bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-5 xl:py-7 xl:px-10 before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 space-y-2 flex flex-col"
				>
					<div class="space-y-3 relative z-20">
						<h3 class="font-bold text-white text-sm sm:text-base md:text-xl leading-none">
							Destination
						</h3>
						{#each conversionAPIs as item (item.id)}
							<div class="flex gap-3 unique-{item.id}">
								<div class="flex-1">
									<SelectionDropDown
										id=""
										title="Destination"
										list={[
											{
												id: 'item-1',
												state: false,
												name: 'lorem ipsum'
											},
											{
												id: 'item-2',
												state: false,
												name: 'lorem ipsum'
											},
											{
												id: 'item-3',
												state: false,
												name: 'lorem ipsum'
											},
											{
												id: 'item-4',
												state: false,
												name: 'lorem ipsum'
											}
										]}
										mainIcon={Icons.targetIcon}
										on:selectionChange={(e) => {}}
									/>
								</div>
								<div class="flex items-stretch shrink-0">
									<button
										class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl shrink-0 w-12  "
										on:click={addEmptyItemInConverAPIs}
										><span class="relative z-10 flex justify-center">
											<Icon data={Icons.plus} stroke="transparent" class="w-4" /></span
										></button
									>

									<button
										on:click={() => {
											removeItemFromConversionApis(item.id);
										}}
										class="relative before:rounded-md before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300"
										><span class="relative z-10 "
											><Icon data={Icons.crossIcon} stroke="transparent" class="w-5" /></span
										></button
									>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 border border-blue flex items-center py-3 xl:py-5 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 "
			>
				<div
					class="relative z-10 flex flex-col mv:flex-row items-centter gap-5 px-4 md:px-10 flex-1"
				>
					<div class="flex-1 flex items-center">
						<div class="flex items-center gap-3">
							<img src="/images/OneTrack_kreislogo.png" class="w-7" alt="" /><span
								class="font-bold text-white text-sm sm:text-base md:text-xl leading-none"
								>OneTrack Source</span
							>
						</div>
					</div>
					<div class=" shrink-0 text-white w-10 hidden mv:flex items-center justify-center ">
						<Icon data={Icons.AngleRight} stroke="transparent" class="lg:w-5 w-3" />
					</div>
					<div class="flex-1 flex items-center">
						<div class="flex items-center gap-3 md:pl-10">
							<img src={facebook} class="w-7 " alt="test" /><span
								class="font-bold text-white text-sm sm:text-base md:text-xl leading-none"
								>Facebook Destination</span
							>
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex-1 bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-5 xl:py-7 xl:px-10 before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 space-y-2 flex flex-col"
			>
				<div class="space-y-3 relative z-20">
					<h3 class="font-bold text-white text-sm sm:text-base md:text-xl leading-none">
						Add filter settings
					</h3>
					<div class="flex flex-col mv:grid mv:grid-cols-2 sm:grid-cols-3 gap-3">
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Select event"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Select operator"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Select value"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Data"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Select operator"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
						<div class="relative">
							<SelectionDropDown
								id=""
								title="Data"
								list={[
									{
										id: 'item-1',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-2',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-3',
										state: false,
										name: 'lorem ipsum'
									},
									{
										id: 'item-4',
										state: false,
										name: 'lorem ipsum'
									}
								]}
								mainIcon={Icons.targetIcon}
								on:selectionChange={(e) => {}}
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="flex gap-4 justify-end">
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
					><span class="relative z-10 leading-none">Cancel</span></button
				>

				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
					><span class="relative z-10 leading-none">Connect</span></button
				>
			</div>
		</div>
	</div>
</main>
