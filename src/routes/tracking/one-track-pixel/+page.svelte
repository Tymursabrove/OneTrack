<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	import { openModal } from 'svelte-modals';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import AdvancedPixelSettingsModel from '$lib/components/pages/one-track-pixel/AdvancedPixelSettingsModel.svelte';

	function handleOpen() {
		openModal(AdvancedPixelSettingsModel, {});
	}

	let domainIds = [];

	onMount(async () => {
		domainIds = [];

		addEmptyItemInDomainIDs();
	});
	function addEmptyItemInDomainIDs() {
		domainIds.push({ name: '', value: '', id: uniqueId() });
		domainIds = domainIds;
	}

	function removeItemFromDomainIds(id) {
		domainIds = domainIds.filter((x) => x.id != id);
	}
</script>

<main class="w-full flex flex-col space-y-5 lg:space-y-10 xl:px-5 flex-1 relative">
	<!-- Top Section -->
	<div class="md:grid md:grid-cols-2 flex flex-col gap-5 xl:gap-10">
		<div class="space-y-4">
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
					OneTrack Pixel Setup
				</h2>
				<p class="text-xs leading-none">
					Setup your OneTrack Pixel and 3. party integrations for your Funnel or E-Commerce
				</p>
			</div>
			<div
				class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 after:border-3 after:border-transparent"
			>
				<div class="relative z-10 py-3 px-4 xl:py-5 xl:px-6 md:max-h-[calc(100vh-13.6rem)] md:overflow-y-auto on-hover-scroll" >
					<div
						class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col py-3 px-4 xl:py-5 xl:px-6 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 after:border-3 after:border-transparent"
					>
						<div class="xs:grid xs:grid-cols-12 flex flex-col gap-5 relative z-10">
							<div class="xs:col-span-7">
								<div class="flex gap-2">
									<div class="shirink-0">
										<Icon data={Icons.bulbOnGreen} stroke="transparent" class="w-6 xl:w-8" />
									</div>
									<div class="space-y-3">
										<h3
											class="text-2xl xl:text-3xl font-semibold text-transparent bg-clip-text bg-radial-green"
										>
											<span>Tutorial</span>
										</h3>
										<p class="text-sm leading-snug">
											Watch this tutorial for further instructions and questions that may arrise
											during your OneTrack Pixel setup process.<br />Please click on the video to
											play.
										</p>
									</div>
								</div>
							</div>
							<div class="flex items-center justify-center xs:col-span-5">
								<button class="shadow-glass w-full bg-blue-box rounded-3xl h-36 flex justify-center items-center" >
									<Icon data={Icons.triangleSymbolIcon} stroke="transparent" class="w-8 -rotate-90" />
								</button>
							</div>
						</div>
					</div>
					<div class="pt-7 space-y-6 divide-y divide-grey">
						<div class="space-y-3">
							<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
								Select your Domain Connector
							</h3>

							{#each domainIds as item, i (item.id)}
								<div class="relative w-full flex items-stretch gap-3">
									<div
										class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											id={item.id}
											placeholder="Domain Connector"
											name={item.id}
										/>
									</div>

									<div class="flex items-stretch shrink-0">
										{#if i < domainIds.length - 1}
											<button
												on:click={() => {
													removeItemFromDomainIds(item.id);
												}}
												class="relative before:rounded-md before:shadow-glass-2 before:bg-radial-red before:absolute before:inset-0 hover:before:opacity-70 before:opacity-0 p-2 before:backdrop-blur-2.5xl shrink-0 text-red hover:text-white before:ease-in-out before:duration-300 w-12"
											>
												<span class="relative z-10 flex justify-center"
													><Icon data={Icons.crossIcon} stroke="transparent" class="w-5" /></span
												>
											</button>
										{:else}
											<button
												class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl shrink-0 w-12"
												on:click={addEmptyItemInDomainIDs}
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
						<div class="pt-5 space-y-5">
							<div class="space-y-1">
								<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									OneTrack Pixel Setup
								</h2>
								<p class="text-xs leading-none">
									Setup your OneTrack Pixel and 3. party integrations for your Funnel or E-Commerce
								</p>
							</div>
							<div class="space-y-5 max-w-sm">
								<div class="flex justify-between items-start">
									<div class="space-y-3">
										<div class="space-y-1 flex-1">
											<h2
												class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2"
											>
												Automatically track Leads
											</h2>
											<p class="text-xs leading-none">Description</p>
										</div>
										<div class="relative flex flex-col gap-3 pl-4">
											<CheckBox
												labelClass="relative z-10 leading-none"
												id="fromInputFields"
												span="before:w-4 before:h-4 relative before:border before:border-grey before:rounded-sm block after:left-1 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-6 before:top-0.5 before:absolute before:left-0 "
												label="From Input Fields"
												classes="relative cursor-pointer text-sm"
											/>
											<CheckBox
												labelClass="relative z-10 leading-none"
												id="FromURL"
												span="before:w-4 before:h-4 relative before:border before:border-grey before:rounded-sm block after:left-1 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-6 before:top-0.5 before:absolute before:left-0 "
												label="From URL"
												classes="relative cursor-pointer text-sm"
											/>
										</div>
									</div>

									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="automatically"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
								<div class="flex justify-between items-start">
									<div class="space-y-1 flex-1">
										<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
											Advanced PII detection
										</h2>
										<p class="text-xs leading-none">Description</p>
									</div>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="advanced"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
								<div class="flex justify-between items-start">
									<div class="space-y-1 flex-1">
										<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
											Input Field Data Analysis
										</h2>
										<p class="text-xs leading-none">Description</p>
									</div>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="analysis"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
								<div class="flex justify-between items-start">
									<div class="space-y-1 flex-1">
										<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
											Technical Data Collection
										</h2>
										<p class="text-xs leading-none">Description</p>
									</div>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="technical"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
								<div class="flex justify-between items-start">
									<div class="space-y-1 flex-1">
										<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
											Store PII on user Browser
										</h2>
										<p class="text-xs leading-none">Description</p>
									</div>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="pii"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
							</div>
						</div>
						<div class="pt-5 space-y-5">
							<div class="space-y-1">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									E-Commerce
								</h3>
								<p class="text-xs leading-none">
									If you are using OneTrack with an E-Commerce platform please select the right
									E-Commerce platform
								</p>
							</div>
							<div class="space-y-5 max-w-sm">
								<div class="flex justify-between items-start">
									<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
										Shopify
									</h2>

									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="shopify"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>

								<div class="flex justify-between items-start">
									<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
										Magento
									</h2>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="magento"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
							</div>
						</div>
						<div class="pt-5 space-y-5">
							<div class="space-y-1">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									Third party integration
								</h3>
								<p class="text-xs leading-none">
									Select the 3rd party integrations that you want to use along with OneTrack
								</p>
							</div>

							<div
								class="relative rounded-2xl before:opacity-40 before:shadow-dropdown before:absolute before:inset-0 before:rounded-2xl before:bg-glass before:backdrop-blur-2.5xl before:ease-in-out before:duration-300 shadow-navbar w-full"
								>
								<div class="relative z-10 py-3 px-5 flex items-start gap-2">
									<div class="shirink-0 mt-1">
										<Icon data={Icons.exclamationColoredIcon} stroke="transparent" class="w-5" />
									</div>
									<div class="space-y-2 flex-1">
										<h3
											class="text-xl font-semibold text-transparent bg-clip-text bg-radial-yellow"
										>
											<span>Caution!</span>
										</h3>
										<p class="text-sm leading-none">
											All your 3rd Party integrations Pixels must be added in your destinations
											beforehand
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="pt-5 space-y-10">
							<div class="space-y-4">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									Meta Pixel
								</h3>
								<div class="max-w-sm">
									<div
										class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											placeholder="Name"
										/>
									</div>
								</div>
								<div class="space-y-3">
									<div class="relative w-full flex gap-4 items-center">
										<CheckBox
											labelClass="relative z-10 leading-none"
											label=""
											id="meta-pixel-1"
											classes="relative cursor-pointer"
											span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
										/>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												placeholder="fb pixel 1"
											/>
										</div>

										<div class="flex items-stretch shrink-0 gap-3 md:pl-3">
											<button
												class="relative text-grey hover:text-white shrink-0 ease-in-out duration-300"
												on:click={handleOpen}
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" />
												</span>
											</button>
											<button
												class="relative text-red hover:text-white shrink-0 ease-in-out duration-300"
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.crossIcon} stroke="transparent" class="w-5" />
												</span>
											</button>
										</div>
									</div>
									<div class="relative w-full flex gap-4 items-center">
										<CheckBox
											labelClass="relative z-10 leading-none"
											label=""
											id="meta-pixel-2"
											classes="relative cursor-pointer"
											span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
										/>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												placeholder="fb pixel 1"
											/>
										</div>

										<div class="flex items-stretch shrink-0 gap-3 md:pl-3">
											<button
												class="relative text-grey hover:text-white shrink-0 ease-in-out duration-300"
												on:click={handleOpen}
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" />
												</span>
											</button>
											<button
												class="relative text-red hover:text-white shrink-0 ease-in-out duration-300"
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.crossIcon} stroke="transparent" class="w-5" />
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="space-y-4">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									TikTok Pixel
								</h3>
								<div class="max-w-sm">
									<div
										class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
									>
										<input
											class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
											type="text"
											placeholder="Name"
										/>
									</div>
								</div>
								<div class="space-y-3">
									<div class="relative w-full flex gap-4 items-center">
										<CheckBox
											labelClass="relative z-10 leading-none"
											label=""
											id="tikTok-pixel-1"
											classes="relative cursor-pointer"
											span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
										/>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												placeholder="fb pixel 1"
											/>
										</div>

										<div class="flex items-stretch shrink-0 gap-3 md:pl-3">
											<button
												class="relative text-grey hover:text-white shrink-0 ease-in-out duration-300"
												on:click={handleOpen}
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" />
												</span>
											</button>
											<button
												class="relative text-red hover:text-white shrink-0 ease-in-out duration-300"
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.crossIcon} stroke="transparent" class="w-5" />
												</span>
											</button>
										</div>
									</div>
									<div class="relative w-full flex gap-4 items-center">
										<CheckBox
											labelClass="relative z-10 leading-none"
											label=""
											id="tikTok-pixel-2"
											classes="relative cursor-pointer"
											span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
										/>
										<div
											class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
										>
											<input
												class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
												type="text"
												placeholder="fb pixel 1"
											/>
										</div>

										<div class="flex items-stretch shrink-0 gap-3 md:pl-3">
											<button
												class="relative text-grey hover:text-white shrink-0 ease-in-out duration-300"
												on:click={handleOpen}
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.settingsGearSolid} stroke="transparent" class="w-5" />
												</span>
											</button>
											<button
												class="relative text-red hover:text-white shrink-0 ease-in-out duration-300"
											>
												<span class="relative z-10 flex justify-center">
													<Icon data={Icons.crossIcon} stroke="transparent" class="w-5" />
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="pt-5 space-y-5">
							<div class="space-y-1">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									GDPR Compliance
								</h3>
								<p class="text-sm leading-snug">
									You can use OneTrack fully GDPR compliant. This effects immediatly the postback to
									your previousely selected 3rd party integrations. If the user has not given
									consent trough your consent management tool we will not send any data to
									previousley selected 3rd party integrations.
								</p>
							</div>

							<div class="space-y-1">
								<div class="flex gap-3">
									<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
										GDPR Compliant Tracking
									</h3>
									<CheckBox
										labelClass="relative z-10 leading-none"
										label=""
										id="GDPR"
										classes="relative cursor-pointer"
										span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
									/>
								</div>
								<p class="text-sm leading-snug">
									Please copy the following code into your consent management tool to activate the
									respective 3rd party integration once the user has given its consent.
								</p>
							</div>

							<div class="space-y-1.5">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									Meta
								</h3>
								<div class="relative before:rounded-full before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
									<div class="relative z-10 flex justify-between items-center">
										<div class="flex-1 truncate py-2 pl-5 text-sm text-grey-2 font-semibold">window.ot.compliance.meta = true;</div>
										<button class="p-3 mr-2 rounded-full text-grey hover:text-white ease-in-out duration-300">
											<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-5" />
										</button>
									</div>
								</div>
							</div>

							<div class="space-y-1.5">
								<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
									TikTok
								</h3>
								<div class="relative before:rounded-full before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
									<div class="relative z-10 flex justify-between items-center">
										<div class="flex-1 truncate py-2 pl-5 text-sm text-grey-2 font-semibold">window.ot.compliance.tiktok = true;</div>
										<button class="p-3 mr-2 rounded-full text-grey hover:text-white ease-in-out duration-300">
											<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-5" />
										</button>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="flex gap-5 justify-end">
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-28 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				>
					<span class="relative z-10 leading-none">Cancel</span>
				</button>
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
				>
					<span class="relative z-10 leading-none">
						<span class="relative z-10 leading-none">Generate Code</span>
					</span>

				</button>
			</div>
		</div>
		<div class="space-y-4">
			<div class="space-y-1">
				<h2 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">Summary</h2>
				<p class="text-xs leading-none">These are your Pixel Settings</p>
			</div>

			<div
				class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 after:border-3 after:border-transparent"
			>
				<div class="relative z-10 space-y-7 py-3 px-4 xl:py-5 xl:px-6 md:max-h-[calc(100vh-19.5rem)] md:overflow-y-auto on-hover-scroll">
					<div class="space-y-2">
						<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
							Connected Domains
						</h3>
						<div class="flex flex-wrap gap-2">
							<p
								class="shadow-glass bg-radial-purple py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								one-track.my-domain1.com
							</p>
							<p
								class="shadow-glass bg-radial-purple py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								one-track.my-best-domain2.com
							</p>
							<p
								class="shadow-glass bg-radial-purple py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								one-track.my-domain3.com
							</p>
						</div>
					</div>

					<div class="space-y-2">
						<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
							E-Commerce
						</h3>
						<div class="flex flex-wrap gap-2">
							<p
								class="shadow-glass bg-radial-green-2 py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								Shopify
							</p>
						</div>
					</div>

					<div class="space-y-2">
						<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
							Third Party Integrations
						</h3>
						<div class="flex flex-wrap gap-2">
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								fb pixel 1
							</p>
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								fb pixel 2
							</p>
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								testpixel
							</p>
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								tiktok pixel 1
							</p>
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								tiktok pixel 2
							</p>
							<p
								class="shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-sm"
							>
								testpixel
							</p>
						</div>
					</div>
					<div class="space-y-3 pt-5 sm:pt-8">
						<div class="space-y-1">
							<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
								OneTrack Pixel Code
							</h3>
							<p class="text-xs leading-none">
								Please copy and paste your OneTrack Pixel into your website’s &#60head&#62 section.
							</p>
						</div>
						<div
							class="relative rounded-2xl before:opacity-40 before:shadow-dropdown before:absolute before:inset-0 before:rounded-2xl before:bg-glass before:backdrop-blur-2.5xl before:ease-in-out before:duration-300 shadow-navbar w-full max-w-screen-lg mx-auto"
						>
							<div class="relative z-10 p-3">
								<code class="flex flex-col max-w-full leading-snug overflow-auto on-hover-scroll">
									<div class="text-grey italic">// cache-advance.config.js</div>
									<div class="pl-5">
										<span class="text-purple-500 font-semibold">export default</span>
										<span class="text-grey">&lcub;</span>
									</div>
									<div class="pl-10">
										<span class="text-blue font-semibold">strategy</span><span class="text-grey"
											>:</span
										> <span class="text-blue font-semibold">'predictive'</span><span
											class="text-grey">,</span
										>
									</div>
									<div class="pl-10">
										<span class="text-blue font-semibold">engine</span><span class="text-grey"
											>:</span
										> <span class="text-grey">&lcub;</span>
									</div>
									<div class="pl-14">
										<span class="text-blue font-semibold">cpus</span><span class="text-grey">:</span
										>
										12<span class="text-grey">,</span>
									</div>
									<div class="pl-14">
										<span class="text-blue font-semibold">backups</span><span class="text-grey"
											>:</span
										> <span class="text-grey">&lsqb;</span><span class="text-blue font-semibold"
											>'./storage/cache.wtf'</span
										><span class="text-grey">&rsqb;,</span>
									</div>
									<div class="pl-10"><span class="text-grey">&rcub;,</span></div>
									<div class="text-grey pl-5">&rcub;</div>
								</code>
							</div>
						</div>
						<div class="pt-1 flex justify-end">
							<button
								type="button"
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							>
								<span class="relative z-10 leading-none flex gap-1">
									<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-4" />
									<span class="relative z-10 leading-none">Copy Code</span>
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col py-3 px-4 xs:py-5 xs:px-6 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 after:border-3 after:border-transparent"
			>
				<div class="relative z-10 space-y-3">
					<div class="space-y-1">
						<h3 class="text-lg xl:text-xl text-white xl:leading-none leading-none font-medium flex items-center gap-2">
							Validate your Pixel Connection
						</h3>
						<p class="text-xs leading-none">These are your Pixel Settings</p>
					</div>
					<div class="flex flex-wrap xl:flex-row xl:flex-nowrap gap-5 items-center">
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								placeholder="Domain"
							/>
						</div>
						<div class="flex justify-end shrink-0">
							<button
								type="button"
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white p-3 px-7 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							>
								<span class="relative z-10 leading-none whitespace-nowrap">Validate Pixel</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
