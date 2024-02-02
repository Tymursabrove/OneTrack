<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { fly, fade } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { SelectionDropdownItem, UserPostRequestItem } from '$lib/types/Types';
	import { showErrorMessage } from '$lib/services/ToastService';
	import { sendLocalRequest } from '$lib/services/HttpsBaseRequests';
	import SelectionDropDown from './SelectionDropdown.svelte';

	const dispatch = createEventDispatcher();
	interface provinceItem extends SelectionDropdownItem {
		code: string;
	}

	export let userToPost: UserPostRequestItem;
	let countries: SelectionDropdownItem[] = [];
	let provinces: provinceItem[] = [];

	onMount(async () => {
		await getCountries();
	});

	function next() {
		if (!areInputValuesValid()) {
			return;
		}
		dispatch('navEvent', { navigation: 'next' });
	}

	function previous() {
		dispatch('navEvent', { navigation: 'previous' });
	}

	function areInputValuesValid() {
		if (!userToPost.address.street) {
			showErrorMessage('Street address is is required.');
			return false;
		}
		if (!userToPost.address.streetNumber) {
			showErrorMessage('Street number is required.');
			return false;
		}
		if (!userToPost.address.zip) {
			showErrorMessage('Zip code is required.');
			return false;
		}
		if (!userToPost.address.city) {
			showErrorMessage('City name is required.');
			return false;
		}
		if (!userToPost.address.countryCode) {
			showErrorMessage('Country is required.');
			return false;
		}
		if (!userToPost.address.provinceCode) {
			showErrorMessage('Province/State is required.');
			return false;
		}
		return true;
	}

	export async function getCountries() {
		try {
			let response = await sendLocalRequest('GET', '/server/data/countries');
			let tempList = response.data as string[];
			countries = tempList.map((x) => {
				return {
					id: x.toLowerCase(),
					icon: Icons.globalSearchIcon,
					state: x == userToPost.address.country,
					name: x
				};
			});
		} catch (error) {
			console.error(error);
		}
	}

	export async function getCountryDetails(country: string) {
		let url = `/server/data/country?country=${country}`;
		let response = await sendLocalRequest('GET', url);
		userToPost.address.country = response.name;
		userToPost.address.countryCode = response.code;
		provinces = [];
		for (let key in response.sub) {
			const obj = response.sub[key];
			if (!provinces.find((x) => x.id == obj.name)) {
				provinces.push({
					id: obj.name,
					name: obj.name,
					icon: Icons.targetIcon,
					state: obj.name == userToPost.address.province,
					code: key
				});
			}
		}
		provinces = provinces;
	}
</script>

<div
	class="absolute inset-0 flex flex-col justify-start items-center "
	in:fly={{ x: 200, duration: 1000 }}
	out:fly={{ x: -300, duration: 200 }}
>
	<div
		class="flex items-center flex-1 justify-center lg:justify-between w-full gap-12 xl:gap-20 2xl:gap-32"
	>
		<div
			class="relative flex-1 items-stretch justify-center lg:justify-center hidden lg:flex shrink-0 "
		>
			<img
				src="/images/illustration-4.png"
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
						<div
							class="relative text-white flex justify-center"
							in:fly={{ x: 300, duration: 1100 }}
							out:fly={{ x: -300, duration: 200 }}
						>
							<!-- Form -->
							<form>
								<div class="gap-y-5 min-h-150 flex flex-col w-full">
									<div class="flex-1 space-y-6 w-full">
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
												Your address data
											</h1>
											<p class="text-grey-2 font-semibold">
												Fill out your personal information to get started.
											</p>
										</div>

										<div class="flex flex-col gap-4 flex-1 ">
											<div class="grid grid-cols-2 gap-4">
												<div class="relative">
													<label for="street1" class="sr-only">Street 1</label>
													<div class="relative mt-1">
														<div
															class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
														>
															<Icon data={Icons.houseLineIcon} class="w-5 h-5 text-white" />
														</div>

														<div
															class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
														>
															<input
																class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
																type="text"
																placeholder="Street 1"
																name="street1"
																id="street1"
																bind:value={userToPost.address.street}
															/>
														</div>
													</div>
												</div>

												<div class="relative">
													<label for="streetNumber" class="sr-only">Number</label>
													<div class="relative mt-1">
														<div
															class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
														>
															<Icon
																data={Icons.signPostIcon}
																stroke="transparent"
																class="w-5 h-5 text-white"
															/>
														</div>
														<div
															class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
														>
															<input
																class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
																type="text"
																placeholder="Number"
																name="streetNumber"
																id="streetNumber"
																bind:value={userToPost.address.streetNumber}
															/>
														</div>
													</div>
												</div>
											</div>

											<div class="relative">
												<label for="street1" class="sr-only">Street 2</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.houseLineIcon} class="w-5 h-5 text-white" />
													</div>

													<div
														class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="text"
															placeholder="Street 2"
															name="street2"
															id="street2"
															bind:value={userToPost.address.streetAlternative}
														/>
													</div>
												</div>
											</div>

											<div class="relative">
												<label for="zip" class="sr-only">ZIP Code</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.locationMarkerIcon} class="w-5 h-5 text-white" />
													</div>

													<div
														class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="text"
															placeholder="ZIP Code"
															name="zip"
															id="zip"
															bind:value={userToPost.address.zip}
														/>
													</div>
												</div>
											</div>

											<div class="relative">
												<label for="city" class="sr-only">City</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.citySkyscrapersIcon} class="w-5 h-5 text-white" />
													</div>
													<div
														class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="text"
															placeholder="City"
															name="city"
															id="city"
															bind:value={userToPost.address.city}
														/>
													</div>
												</div>
											</div>
											<SelectionDropDown
												id="coutry-of-user-drop-down"
												title="Country"
												list={countries}
												mainIcon={Icons.globalSearchIcon}
												on:selectionChange={async (e) => {
													await getCountryDetails(e.detail.changedItem.name);
												}}
											/>
											<SelectionDropDown
												id="province-of-user-drop-down"
												title="Province/State"
												list={provinces}
												mainIcon={Icons.targetIcon}
												on:selectionChange={(e) => {
													userToPost.address.province = e.detail.changedItem.name;
													userToPost.address.provinceCode =
														provinces
															.find((x) => x.id == e.detail.changedItem.id)
															?.code|| '';
												}}
											/>
										</div>
									</div>
									<div class="flex flex-col gap-4 mt-auto ">
										<div class="flex gap-3 justify-center items-start py-2">
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 1</span></button
											>
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 2</span></button
											>
											<button type="button" class="relative w-4 h-4 rounded-full bg-blue-box"
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
												class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
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
