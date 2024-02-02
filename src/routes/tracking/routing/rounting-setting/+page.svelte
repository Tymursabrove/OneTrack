<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Icons } from '$lib/resources/IconResources';
	import SelectionDropDown from '$lib/components/pages/onboarding/SelectionDropdown.svelte';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
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
				Routing Connection Settings
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
					class="relative inline-flex items-center justify-center rounded-md p-1.5 xl:py-2 px-5 xl:w-44 text-sm font-semibold outline-none ease-in-out duration-300 before:bg-blue-box before:rounded before:ease-in-out before:duration-300 before:inset-0 before:absolute hover:text-white text-white after:ease-in-out after:duration-300 after:rounded-md after:inset-0 after:absolute after:border after:border-blue hover:shadow-glow-blue hover:before:opacity-100 hover:after:opacity-0 shadow-glow-blue before:opacity-100 after:opacity-0"
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
		<!-- p-5 xl:py-7 xl:px-10 -->
		<div
			class="flex-1  bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass before:opacity-30 before:inset-0 flex flex-col "
		>
			<div class="relative z-20 flex flex-col divide-y divide-grey">
				<div class="p-5 xl:py-7 xl:px-10 ">
					<div class="space-y-3 max-w-sm">
						<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
							<span>Transfer</span>
						</h2>
						<div class="space-y-1">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
								Replication frequency
							</h3>
							<p class="text-sm leading-none text-grey-2">
								Set how often data should sync to the destination
							</p>
						</div>
						<SelectionDropDown
							id=""
							title="Every 24 hours"
							list={[
								{
									id: 'item-1',
									state: false,
									name: 'Every hour'
								},
								{
									id: 'item-2',
									state: false,
									name: 'Every 6 hours'
								},
								{
									id: 'item-3',
									state: false,
									name: 'Every 24 hours'
								},
								{
									id: 'item-4',
									state: false,
									name: 'Every 48 hours'
								}
							]}
							mainIcon={Icons.targetIcon}
							on:selectionChange={(e) => {}}
						/>
					</div>
				</div>
				<div class="flex-1 p-5 xl:py-7 xl:px-10">
					<div class="space-y-3">
						<h2 class="text-xl text-white leading-none font-medium flex items-center gap-2">
							<span>Streams</span>
						</h2>
						<div class="md:grid md:grid-cols-2 flex flex-col gap-5">
							<div class="space-y-3">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Source Namespace
									</h3>
									<p class="text-xs leading-none text-grey-2">
										Define the location where the data will be stored in the destination
									</p>
								</div>
								<SelectionDropDown
									id=""
									title="Mirror source structure"
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

							<div class="space-y-3">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Source Stream Prefix (Optional)
									</h3>
									<p class="text-xs leading-none text-grey-2">
										Add a prefix to stream names (ex. “airbyte_” causes “projects” =>
										“airbyte_projects”)
									</p>
								</div>
								<SelectionDropDown
									id=""
									title="exchange_"
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

							<div class="space-y-3">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Destination Namespace
									</h3>
									<p class="text-xs leading-none text-grey-2">
										Define the location where the data will be stored in the destination
									</p>
								</div>
								<SelectionDropDown
									id=""
									title="Mirror source structure"
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

							<div class="space-y-3">
								<div class="space-y-1">
									<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
										Destination Stream Prefix (Optional)
									</h3>
									<p class="text-xs leading-none text-grey-2">
										Add a prefix to stream names (ex. “airbyte_” causes “projects” =>
										“airbyte_projects”)
									</p>
								</div>
								<SelectionDropDown
									id=""
									title="exchange_"
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
						<div class="relative space-y-1 pt-3">
							<h3 class="text-sm xl:text-base text-white leading-none font-medium flex gap-1">
								<span>Activate the streams you want to sync</span>
							</h3>
							<label for="streamName" class="sr-only">Activate the streams you want to sync</label>
							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
									type="text"
									placeholder="Search stream name"
									name="streamName"
									id="streamName"
								/>
							</div>
						</div>

						<div class="pt-3">
							<div class="overflow-x-auto max-w-full">
								<table class="w-full border-collapse text-left">
									<tr class="border-b border-grey">
										<th valign="top" class="pt-1 pb-2">
											<CheckBox
												id="userid"
												span="w-4 h-4 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
												labelClass="sr-only"
												classes="relative cursor-pointer "
											/>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1"
											>
												Sync
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">&nbsp;</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1"
											>
												Source
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">Namespace</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1"
											>
												&nbsp;
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal whitespace-nowrap">
												Stream name
											</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1  whitespace-nowrap"
											>
												Sync mode
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">
												Source | Destination
											</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1  whitespace-nowrap"
											>
												Cursor field
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">&nbsp;</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1  whitespace-nowrap"
											>
												Primary key
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">&nbsp;</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1"
											>
												Destination
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal">Namespace</p>
										</th>
										<th valign="top" class="p-2 ">
											<p
												class="text-sm xl:text-base text-white leading-none font-medium flex gap-1"
											>
												&nbsp;
											</p>
											<p class="text-xs leading-none text-grey-2 font-normal  whitespace-nowrap">
												Stream name
											</p>
										</th>
									</tr>
									<tr class="border-b border-grey">
										<td class="p-2 ">
											<CheckBox
												id="userid"
												span="w-4 h-4 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
												labelClass="sr-only"
												classes="relative cursor-pointer "
											/>
										</td>
										<td class="p-2 ">
											<CheckBox
												labelClass="relative z-10 leading-none"
												label=""
												id="account-1"
												classes="relative cursor-pointer"
												span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
											/>
										</td>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal whitespace-nowrap">
												No namespace
											</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal whitespace-nowrap">
												exchange_rates
											</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal whitespace-nowrap">
												Incremental | Deduped
											</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal">
												&lt;sourceDefined&gt;
											</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal">date</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal whitespace-nowrap">
												&lt;destination schema&gt;
											</p></td
										>
										<td class="p-2 "
											><p class="text-xs leading-none text-grey-2 font-normal">
												exchange_exchange_rates
											</p></td
										>
									</tr>
								</table>
							</div>
						</div>
					</div>

					<div class="flex gap-4 justify-end pt-5">
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
			</div>
		</div>
	</div>
</main>
