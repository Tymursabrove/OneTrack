<script lang="ts">
	import moment from 'moment-timezone';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher } from 'svelte';
	import SelectionDropDown from './SelectionDropdown.svelte';
	import { fly, fade } from 'svelte/transition';
	import { CurrencySymbol, Workspace } from '$lib/store';

	const dispatch = createEventDispatcher();
	let timeZones = moment.tz.names();
	let timeZonesList = timeZones.map((t) => {
		return { id: t, state: $Workspace?.timezone == t, name: t, icon: Icons.clockIcon };
	});

	function next() {
		dispatch('navEvent', { navigation: 'next' });
	}
	function previous() {
		dispatch('navEvent', { navigation: 'previous' });
	}
</script>

<div
	class="absolute inset-0 flex flex-col justify-start items-center"
	in:fly={{ x: 200, duration: 1000 }}
	out:fly={{ x: -300, duration: 200 }}
>
	<div
		class="flex items-center flex-1 justify-center lg:justify-between w-full gap-12 xl:gap-20 2xl:gap-32"
	>
		<div class="relative flex-1 items-stretch justify-center hidden lg:flex shrink-0">
			<img
				src="/images/illustration-3.png"
				alt="Welcome"
				class="aspect-square object-cover"
				in:fade={{ delay: 500 }}
				out:fade={{ delay: 200 }}
			/>
		</div>
		<div class="relative flex flex-col justify-center items-center max-w-lg xl:max-w-xl w-full">
			<div class="relative w-full">
				<div class="absolute inset-0 hidden md:flex flex-col justify-between">
					<img
						in:fly={{ x: 300, duration: 500 }}
						out:fly={{ x: -300, duration: 200 }}
						src={Icons.svgUrls.purpleCircleUrl}
						alt="bg-circles-purple"
						class="aspect-square -translate-y-1/2 -translate-x-1/2 w-1/4"
					/>
					<img
						in:fly={{ x: 300, duration: 500 }}
						out:fly={{ x: -300, duration: 200 }}
						src={Icons.svgUrls.blueCircleUrl}
						alt="bg-circles-blue"
						class="aspect-square mt-auto ml-auto w-1/2 translate-y-1/2 relative -top-10 translate-x-1/2"
					/>
				</div>
				<div
					class="relative w-full lg:min-h-72 z-10 flex items-stretch before:absolute before:inset-0 before:rounded-3xl before:backdrop-blur-2.5xl before:bg-linear before:shadow-glass-dropdown max-w-xl"
				>
					<div class="relative z-10 flex-1 p-5 sm:p-10 lg:p-14 xl:px-20">
						<div class="relative text-white flex justify-center">
							<!-- Form -->
							<form>
								<div
									class="gap-y-5 min-h-150 flex flex-col"
									in:fly={{ x: 300, duration: 1100 }}
									out:fly={{ x: -300, duration: 200 }}
								>
									<div class="flex-1 space-y-6">
										<div class="flex flex-col gap-4">
											<Icon
												data={Icons.oneTrackLightGreyFullNameIcon}
												class="max-w-full h-7 "
												stroke="transparent"
												color="currentColor"
											/>
											<h1
												class="text-3xl xl:text-4xl leading-none font-bold text-center tracking-wider"
											>
												Your workspace settings
											</h1>
											<p class="text-grey-2 font-semibold">
												Fill out your personal information to get started.
											</p>
										</div>

										<div class="flex flex-col gap-4">
											<SelectionDropDown
												id="event-type-setting-toggle-selection-dropdown"
												title="Analytics Event Type"
												list={[
													{
														id: 'lead',
														state: false,
														name: 'Lead Gen',
														icon: Icons.threeCustomersSymbolIcon
													},
													{
														id: 'ecommerce',
														state: true,
														name: 'E-Com',
														icon: Icons.shoppingCartIcon
													}
												]}
												mainIcon={Icons.targetIcon}
												on:selectionChange={(e) => {}}
											/>
											<SelectionDropDown
												id="currency-type-setting-toggle-selection-dropdown"
												title="Currency"
												list={[
													{
														id: 'eur',
														state: $CurrencySymbol == 'EUR',
														name: 'EUR',
														icon: Icons.currencyIcon
													},
													{
														id: 'usd',
														state: $CurrencySymbol == 'USD',
														name: 'USD',
														icon: Icons.currencyIcon
													}
												]}
												mainIcon={Icons.currencyIcon}
												on:selectionChange={(e) => {
													if ($Workspace) {
														CurrencySymbol.set(e.detail.changedItem.name);
													}
												}}
											/>
											<SelectionDropDown
												id="timezone-type-setting-toggle-selection-dropdown"
												title="Timezone"
												list={timeZonesList}
												mainIcon={Icons.clockIcon}
												on:selectionChange={(e) => {
													if ($Workspace) {
														$Workspace.timezone = e.detail.changedItem.name;
													}
												}}
											/>
										</div>
									</div>
									<div class="flex flex-col gap-4 mt-auto">
										<div class="flex gap-3 justify-center items-start py-2">
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 1</span></button
											>
											<button type="button" class="relative w-4 h-4 rounded-full bg-blue-box"
												><span class="sr-only">Step 2</span></button
											>
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 3</span></button
											>
										</div>
										<div class="flex justify-center gap-4">
											<button
												on:click={previous}
												type="button"
												class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
												><span class="relative z-10 leading-none">Back</span></button
											>

											<button
												on:click={next}
												type="button"
												class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
												><span class="relative z-10 leading-none">Next</span></button
											>
										</div>
									</div>
								</div>
							</form>
							<!--End Form -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
