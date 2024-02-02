<script lang="ts">
	import { onMount } from 'svelte';
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Loading from '$lib/components/layout/Loading.svelte';
	import { GetMetaAdAccountsList, GetMetaLongTermAccessToken } from '$lib/services/OAuthService';
	import { MetaOAuth, UserTokenContainer, SourceConnectorsQue } from '$lib/store';
	import { goto } from '$app/navigation';
	import { Icons } from '$lib/resources/IconResources';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';

	export let isOpen = false;

	let showError = false;
	let errorMessage = '';
	let errorHeading = '';
	let userName: null | string = null;
	let accounts: { id: string; name: string; status: boolean; accessToken: string }[] = [];
	let searchTerm = '';

	onMount(async () => {
		showError = false;
		errorMessage = '';
		errorHeading = '';

		MetaOAuth.subscribe(async (metaCreds) => {
			if (!metaCreds) {
				return;
			}

			let response = await GetMetaAdAccountsList(metaCreds.accessToken, metaCreds.userID);

			if (!response) {
				errorHeading = 'No access';
				errorMessage =
					"Couldn't fetch list of Ad Accounts, this can happen due to in-sufficient access to account stats, kindly try to login again.";
				showError = true;
				return;
			}
			if (response.accounts.length == 0) {
				errorHeading = 'We are Sorry 😔';
				errorMessage = `You don’t have any ad-accounts to display.`;
				showError = true;
				return;
			}
			let longTermAccessToken = await GetMetaLongTermAccessToken(metaCreds.accessToken);
			if (!longTermAccessToken) {
				errorHeading = 'Meta API is unavailable';
				errorMessage = `We were unable to get access token from Meta API.`;
				showError = true;
				return;
			}

			accounts = response.accounts.map((x) => {
				x.status = false;
				x.accessToken = longTermAccessToken.access_token;
				return x;
			});
		});
	});
	function onSave() {
		SourceConnectorsQue.set(
			accounts
				.filter((x) => x.status)
				.map((x) => {
					return {
						enabled: true,
						name: x.name,
						data: {
							accessToken: x.accessToken,
							accountId: x.id.replace('act_', '')
						},
						type: 'MetaAdData'
					};
				})
		);
		closeModal();
		goto('/tracking/connections');
	}
	function selectAll() {
		accounts = accounts.map((x) => {
			x.status = true;
			return x;
		});
	}
	function unSelectAll() {
		accounts = accounts.map((x) => {
			x.status = false;
			return x;
		});
	}
	function handleSearch(reverse = false) {
		if (!searchTerm || searchTerm == '') {
			selectAll();
			return;
		}
		searchTerm = searchTerm.toLowerCase();
		accounts = accounts.map((x) => {
			x.status = reverse;
			if (x.id.toLowerCase().includes(searchTerm) || x.name.toLowerCase().includes(searchTerm)) {
				x.status = !reverse;
			}
			return x;
		});
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
		<button
			type="button"
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-lg rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			{#if !showError}
				<div
					class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 space-y-7"
				>
					<div class="space-y-4">
						<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
							{userName ||
								(typeof $UserTokenContainer == 'string'
									? $UserTokenContainer
									: $UserTokenContainer?.email)}
						</h2>
						<div class="relative w-full flex items-center">
							<label for="search" class="sr-only">Search</label>

							<div
								class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
							>
								<input
									class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
									type="search"
									placeholder="Search"
									bind:value={searchTerm}
								/>
							</div>
						</div>
						<div class="grid grid-cols-2 gap-3">
							<button
								type="button"
								on:click={() => {
									handleSearch();
								}}
								class="cursor-pointer rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-md hover:before:opacity-0 after:bg-blue-box after:opacity-0 after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded-md outline-none text-sm sm:text-base"
							>
								<span class="relative z-10 flex items-center justify-start">
									<span class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
										<Icon
											data={Icons.searchIcon}
											stroke="transparent"
											class="w-4 sm:w-5 transitions "
										/>
									</span>
									<span class="relative z-10 block truncate pr-4 p-2 pl-10 sm:pl-12">Search</span>
								</span>
							</button>
							<button
								type="button"
								on:click={() => {
									handleSearch(true);
								}}
								class="cursor-pointer rounded-md leading-snug relative ease-in-out duration-300 h-11 text-white before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-md hover:before:opacity-0 after:bg-blue-box after:opacity-0 after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded-md outline-none text-sm sm:text-base"
							>
								<span class="relative z-10 flex items-center justify-start">
									<span class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
										<Icon
											data={Icons.inverseIcon}
											stroke="transparent"
											class="w-4 sm:w-5 transitions "
										/>
									</span>
									<span class="relative z-10 block truncate pr-4 p-2 pl-10 sm:pl-12"
										>Inverse Search</span
									>
								</span>
							</button>
							<button
								type="button"
								class="cursor-pointer rounded-md leading-snug group relative ease-in-out duration-300 h-11 text-white before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-md hover:before:opacity-0 after:bg-blue-box after:opacity-0 after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded-md outline-none text-sm sm:text-base"
								on:click={selectAll}
							>
								<span class="relative z-10 flex items-center justify-start">
									<span
										class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-green group-hover:text-white"
									>
										<Icon data={Icons.tick} stroke="transparent" class="w-4 sm:w-5 transitions " />
									</span>
									<span class="relative z-10 block truncate pr-4 p-2 pl-10 sm:pl-12"
										>Select all</span
									>
								</span>
							</button>
							<button
								type="button"
								class="cursor-pointer rounded-md leading-snug group relative ease-in-out duration-300 h-11 text-white before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-md hover:before:opacity-0 after:bg-blue-box after:opacity-0 after:backdrop-blur-2.5xl after:shadow-glass after:ease-in-out after:duration-300 after:absolute after:inset-0 hover:after:opacity-100 after:rounded-md outline-none text-sm sm:text-base"
								on:click={unSelectAll}
							>
								<span class="relative z-10 flex items-center justify-start">
									<span
										class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-red group-hover:text-white"
									>
										<Icon
											data={Icons.crossIcon}
											stroke="transparent"
											class="w-4 sm:w-5 transitions "
										/>
									</span>
									<span class="relative z-10 block truncate pr-4 p-2 pl-10 sm:pl-12"
										>Unselect all</span
									>
								</span>
							</button>
						</div>
					</div>

					<div class="relative flex justify-center w-full border-t border-grey px-3 pt-3">
						{#if accounts.length > 0}
							<table class="w-full table-fixed">
								{#each accounts as account}
									<tr>
										<td class="w-12 h-12" valign="middle">
											<div class="relative h-auto leading-none">
												<CheckBox
													labelClass="relative z-10 leading-none"
													label=""
													id="account-{account.id}"
													classes="relative cursor-pointer"
													span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
													checked={account.status}
													onChange={(e) => {
														account.status = e;
													}}
												/>
											</div>
										</td>
										<td class="w-1/3 h-12 px-2 text-center" valign="middle">
											<div class="flex justify-center">
												<Icon data={Icons.meta} stroke="transparent" class="w-8 h-8" />
											</div>
										</td>
										<td class="py-2" valign="middle">
											<div class="space-y-2">
												<p class="text-sm leading-none text-white">
													<b class="font-semibold">Name:</b>
													{account.name}
												</p>
												<p class="text-sm leading-none text-white">
													<b class="font-semibold">ID:</b>
													{account.id}
												</p>
											</div>
										</td>
									</tr>
								{/each}
							</table>
						{:else}
							<Loading />
						{/if}
					</div>

					<div class="flex gap-4 justify-center">
						<button
							type="button"
							on:click={closeModal}
							class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
							><span class="relative z-10 leading-none">Cancel</span></button
						>
						<button
							type="button"
							on:click={onSave}
							class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
							><span class="relative z-10 leading-none">Save</span></button
						>
					</div>
				</div>
			{:else}
				<div class="space-y-4">
					<h2 class="text-lg md:text-3xl text-white leading-none font-bold text-center">
						{errorHeading}
					</h2>
					<p class="text-md md:text-2xl text-white leading-none font-bold text-center">
						{errorMessage}
					</p>
				</div>
				<div class="flex gap-4 justify-center">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Close</span></button
					>
				</div>
			{/if}
		</div>
	</div>
{/if}
