<script lang="ts">
	import moment from 'moment-timezone';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { onMount, onDestroy } from 'svelte';
	import { Customer, Workspace } from '$lib/store';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';
	import { showDataWasUpdated } from '$lib/services/ToastService';
	import type { Unsubscriber } from 'svelte/store';
	import SelectionDropDown from '$lib/components/pages/onboarding/SelectionDropdown.svelte';
	import { UpdateWorkspace } from '$lib/services/HttpRequests';
	import type { WorkspaceDataType } from '$lib/types/Types';

	let timeZones = moment.tz.names();
	let timeZonesList: { id: string; state: boolean; name: string; icon: string }[] = [];
	let unsubCustomer: Unsubscriber, unsubWorkspace: Unsubscriber;
	let cus: any | null = null;
	let ws: WorkspaceDataType;

	onMount(() => {
		unsubCustomer = Customer.subscribe((c) => {
			cus = c;
		});
		unsubWorkspace = Workspace.subscribe((w) => {
			if (w) {
				ws = w;

				timeZones.forEach((t) => {
					timeZonesList.push({ id: t, state: ws.timezone == t, name: t, icon: Icons.clockIcon });
				});
			}
		});
	});

	onDestroy(() => {
		if (unsubCustomer) {
			unsubCustomer();
		}
		if (unsubWorkspace) {
			unsubWorkspace();
		}
	});

	async function handleSubmit() {
		if (ws) {
			await UpdateWorkspace(ws.id, ws.name, ws.timezone);
			await ReloadWorkspaces();
			showDataWasUpdated('Settings were saved successfully');
		}
	}
</script>

{#if cus}
	<form on:submit|preventDefault={handleSubmit} class="space-y-8 divide-y divide-grey">
		<div class="space-y-8 divide-y divide-grey">
			<div class="space-y-5">
				<div class="space-y-5">
					<h1 class="text-2xl font-bold text-white">Account</h1>
					<div class="space-y-1">
						<h2 class="text-xl text-white leading-none font-medium flex gap-1">Profile</h2>
						<p class="text-sm leading-none text-grey-2">
							Following information is publicly displayed, be careful!
						</p>
					</div>
				</div>

				<div class="relative">
					<label class="block text-sm font-semibold text-white sr-only" for="username"
						>User ID</label
					>
					<div class="mt-1 relative">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5 ml-1 text-white"
							/>
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								bind:value={cus.identity}
								type="text"
								id="username"
								placeholder="ID"
								name="username"
							/>
						</div>
					</div>
				</div>
				{#if ws}
					<div class="grid gap-y-6 gap-x-4 sm:grid-cols-3">
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
								{ id: 'ecommerce', state: true, name: 'E-Com', icon: Icons.shoppingCartIcon }
							]}
							mainIcon={Icons.targetIcon}
							on:selectionChange={(e) => {}}
						/>
						<SelectionDropDown
							id="currency-type-setting-toggle-selection-dropdown"
							title="Currency"
							list={[
								{ id: 'eur', state: true, name: 'EUR', icon: Icons.currencyIcon },
								{ id: 'usd', state: false, name: 'USD', icon: Icons.currencyIcon }
							]}
							mainIcon={Icons.currencyIcon}
							on:selectionChange={(e) => {}}
						/>
						<SelectionDropDown
							id="timezone-type-setting-toggle-selection-dropdown"
							title="Timezone"
							list={timeZonesList}
							mainIcon={Icons.clockIcon}
							on:selectionChange={(e) => {
								ws.timezone = e.detail.changedItem.name;
							}}
						/>
					</div>
				{/if}
			</div>
		</div>
		<div class="space-y-6 pt-7">
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-medium flex gap-1">Personal Information</h2>
				<p class="text-sm leading-none text-grey-2">
					Communication details in case we want to connect with you. These will be kept private.
				</p>
			</div>
			<div class="grid gap-y-5 gap-x-4 sm:grid-cols-2">
				<div class="relative">
					<label for="firstName" class="sr-only">First name</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="First name"
								name="firstName"
								id="firstName"
								bind:value={cus.address.firstName}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="firstName" class="sr-only">Last name</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon
								data={Icons.singleCustomerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Last name"
								name="lastName"
								id="lastName"
								bind:value={cus.address.lastName}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="email" class="sr-only">Email</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.emailIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="email"
								placeholder="E-mail"
								name="email"
								id="email"
								bind:value={cus.address.email}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="street1" class="sr-only">Street 1</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.houseFilledIcon} class="w-5 h-5 text-white" />
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
								bind:value={cus.address.street1}
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
							<Icon data={Icons.signPostIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Number"
								name="streetNumber"
								id="streetNumber"
								bind:value={cus.address.streetNumber}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="street1" class="sr-only">Street 2</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.houseFilledIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Street 2"
								name="street2"
								id="street2"
								bind:value={cus.address.street2}
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
							<Icon
								data={Icons.locationMarkerIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>

						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="ZIP Code"
								name="zip"
								id="zip"
								bind:value={cus.address.zip}
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
							<Icon
								data={Icons.citySkyscrapersIcon}
								stroke="transparent"
								class="w-5 h-5 text-white"
							/>
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="City"
								name="city"
								id="city"
								bind:value={cus.address.city}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="country" class="sr-only">Country</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.globalSearchIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Country"
								name="country"
								id="country"
								bind:value={cus.address.country}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="language" class="sr-only">Language</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.flagIcon} stroke="transparent" class="w-5 h-5 text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="Country"
								name="language"
								id="language"
								bind:value={cus.language}
							/>
						</div>
					</div>
				</div>

				<div class="relative">
					<label for="telephone" class="sr-only">Phone</label>
					<div class="relative mt-1">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
						>
							<Icon data={Icons.telephoneIcon} stroke="transparent" class="w-5 h-5  text-white" />
						</div>
						<div
							class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
						>
							<input
								class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
								type="text"
								placeholder="000-0000000-00"
								name="telephone"
								id="telephone"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-8 pb-4 gap-4 flex justify-end">
			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="button"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</form>
{/if}
