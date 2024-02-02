<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import { showErrorMessage } from '$lib/services/ToastService';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import { onMount } from 'svelte';
	import { Workspace } from '$lib/store';
	import type { OneTrackSourceConnector } from '$lib/types/Types';
	import { get } from 'svelte/store';

	export let isOpen: boolean;
	export let icon: string;
	export let title: string;

	const connectorType = 'EventGateway';

	let accountName = '';
	let domain: string = '';
	let apiKey: string = '';
	let active = true;
	let workspaceId = '';
	let connectorId = '';

	onMount(() => {
		try {
			let ws = get(Workspace);
			if (ws == 'init' || ws == null) {
				throw 'No workspace found';
			}
			workspaceId = ws.id;
			let oneTrackConnector = ws.connectors?.find((x) => x.type == 'OneTrackPixel');
			if (!oneTrackConnector) {
				throw 'No webhook address found.';
			}
			let oc = oneTrackConnector as OneTrackSourceConnector;
			domain = `https://${oc.data.domain}/`;
		} catch (err) {
			showErrorMessage(err as string);
			closeModal();
		}
	});

	async function handleSaveClick() {
		if (!accountName) {
			showErrorMessage('Account name is required');
			return;
		}
		closeModal();
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative z-10 transform max-h-full flex flex-col text-left transition-all py-3 sm:my-5 w-full max-w-3xl rounded-2xl border border-grey-4 before:backdrop-blur-md before:bg-bglinear-5 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:py-5 sm:py-8 space-y-7"
			>
				<div class="space-y-1 flex gap-3 px-3 sm:px-5 lg:px-10">
					<span class="shrink-0"><Icon data={icon} stroke="transparent" class="w-10" /></span>
					<h2 class="text-lg md:text-2xl text-white leading-none font-semibold text-center">
						{title}
					</h2>
				</div>
				<div class="divide-y divide-grey-4 px-3 sm:px-5 lg:px-10 space-y-6">
					<div class="space-y-3">
						<h3 class="text-lg text-white text-left">Integration Name</h3>
						<p class="text-sm text-white text-left">
							Please assign a memorable name to your OneTrack and {title} integration. This name
							should be something that helps you easily identify this specific integration among
							others.
						</p>

						<div class="xs:grid xs:grid-cols-2 gap-5 pt-2">
							<div class="relative w-full flex items-center">
								<label for="integration_name" class="sr-only">Integration Name</label>
								<div
									class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
								>
									<input
										class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										id="integration_name"
										placeholder="Integration Name"
										name="integration_name"
										bind:value={accountName}
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="space-y-2 pt-5">
						<h3 class="text-lg text-white text-left">Domain & API Key</h3>
						<p class="text-sm text-white text-left">
							To link OneTrack with {title}, you'll need your unique OneTrack Domain and API Key.
							Please copy these pieces of information. Now, in the {title} integration setup, paste
							your OneTrack Domain and API Key into the respective fields. This authenticates and
							establishes a secure connection between OneTrack and {title}.
						</p>
						<div class="space-y-4 pt-3">
							<div class="relative w-full flex items-center gap-5">
								<div
									class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
								>
									<input
										class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										placeholder="Domain"
										bind:value={domain}
									/>
								</div>

								<button
									type="button"
									class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
									><span class="relative z-10 leading-none">
										<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-6" />
									</span></button
								>
							</div>
							<div class="relative w-full flex items-center gap-5">
								<div
									class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
								>
									<input
										class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										placeholder="API-Key"
									/>
								</div>

								<button
									type="button"
									class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
									><span class="relative z-10 leading-none">
										<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-6" />
									</span></button
								>
							</div>
							<div class="relative w-full flex items-center gap-5">
								<div
									class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
								>
									<input
										class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										placeholder="Workspace ID"
										bind:value={workspaceId}
									/>
								</div>

								<button
									type="button"
									class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
									><span class="relative z-10 leading-none">
										<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-6" />
									</span></button
								>
							</div>
							<div class="relative w-full flex items-center gap-5">
								<div
									class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-4 before:backdrop-blur-md w-full"
								>
									<input
										class="border relative z-10 border-grey-4 ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
										type="text"
										placeholder="Connector ID"
									/>
								</div>

								<button
									type="button"
									class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
									><span class="relative z-10 leading-none">
										<Icon data={Icons.copySymbolIcon} stroke="transparent" class="w-6" />
									</span></button
								>
							</div>
						</div>
					</div>

					<div class="pt-5 space-y-7">
						<div class="grid grid-cols-12 gap-3 items-center">
							<div class="col-span-4">
								<label for="meta-status" class="text-lg font-medium">Active</label>
							</div>
							<div class="col-span-8">
								<CheckBox
									labelClass="relative z-10 leading-none"
									label=""
									id="meta-status"
									checked={active}
									onChange={(e) => {
										active = e;
									}}
									classes="relative cursor-pointer"
									span="w-11 h-6 bg-white/10 flex border border-grey-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:-translate-x-px after:shadow-checkbox after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-grey after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-white/20"
								/>
							</div>
						</div>

						<div class="flex gap-3 items-center">
							<CheckBox
								id="userid"
								span="w-4 h-4 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
								labelClass="sr-only"
								classes="relative cursor-pointer"
								label=""
							/>
							<label for="userid">I agree to the Terms & Conditions</label>
						</div>
					</div>
				</div>

				<div class="flex gap-4 justify-end p-3 pb-0 sm:p-5 sm:pb-0 lg:px-10">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-md bg-transparent min-w-20 px-4 p-3 text-sm font-medium text-white shadow-sidebar border border-grey-4 hover:border-white/50 hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded after:inset-0 after:bg-linear-red after:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>

					<button
						on:click={handleSaveClick}
						type="button"
						class="relative inline-flex items-center justify-center rounded-md border border-grey-4 hover:border-white/50 text-white min-w-20 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 shadow-sidebar focus:ring-offset-2 before:bg-linear-blue before:rounded before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded after:bg-linear-green before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Save</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
