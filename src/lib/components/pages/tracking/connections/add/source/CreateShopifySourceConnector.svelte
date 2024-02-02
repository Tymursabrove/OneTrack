<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/common/Icon.svelte';
	import { goto } from '$app/navigation';
	import { showCopiedToClipboardToast, showErrorMessage } from '$lib/services/ToastService';
	import { SourceConnectorsQue, Workspace } from '$lib/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { OneTrackSourceConnector } from '$lib/types/Types';
	import Button from '$lib/components/common/Button.svelte';
	import Switch from '$lib/components/common/Switch.svelte';
	
	export let isOpen = true;

	let webhookUrl: string | null = null;
	let host: string | null = null;
	let name: string = '';
	let secret: string = '';
	let isActivated = false;

	onMount(() => {
		try {
			let ws = get(Workspace);
			if (ws == 'init' || ws == null) {
				throw 'No workspace found';
			}
			let oneTrackConnector = ws.connectors?.find((x) => x.type == 'OneTrackPixel');
			if (!oneTrackConnector) {
				throw 'No webhook address found.';
			}
			let oc = oneTrackConnector as OneTrackSourceConnector;
			host = oc.data.domain;
			webhookUrl = `https://${oc.data.domain}/shopifywebhook/orders/${ws.id}`;
		} catch (err) {
			showErrorMessage(err as string);
			closeModal();
		}
	});

	async function handleSubmit() {
		if (!name) {
			showErrorMessage('Connector name is required');
			return;
		}
		if (!secret) {
			showErrorMessage('Signature is required');
			return;
		}
		if (!host) {
			showErrorMessage('No host found');
			return;
		}
		SourceConnectorsQue.set([
			{
				enabled: isActivated,
				name: name,
				data: {
					secret: secret.trim(),
					host
				},
				type: 'ShopifyWebhook'
			}
		]);
		closeModal();
		gotoSourcesPage();
	}
	function gotoSourcesPage() {
		goto('/tracking/connections');
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
			class="relative z-10 transform max-h-full flex flex-col text-left transition-all p-3 sm:my-5 w-full max-w-4xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform md:p-5 space-y-7"
			>
				<div class="space-y-7">
					<div class="flex gap-4 items-center">
						<Icon name="shopify-seeklogo.com" size="large" />
						<div class="space-y-2">
							<h2 class="text-xl text-white leading-none font-medium flex gap-1">Shopify</h2>
							<p class="text-sm leading-none">Add Shopify as a source for your purchase events.</p>
						</div>
					</div>

					<div
						class="relative rounded-2xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
					>
						<div class="relative p-3 md:p-5">
							<div class="flex gap-2 items-start">
								<Icon name="ideabulbGreen" size="big" filled={true} />
								<div class="space-y-3">
									<h3
										class="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-radial-green"
									>
										<span>Step 1: Enter Your Store Name</span>
									</h3>
									<p class="text-sm leading-relaxed">
										Start by typing the name of your Shopify store in the box below. Make sure it's
										the name you usually use to find your store, especially if you have more than
										one.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="relative w-full flex items-center">
						<label
							for="store_name"
							class="md:text-lg font-semibold leading-none shrink-0 w-28 md:w-40">Store Name</label
						>
						<div
							class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
						>
							<input
								class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								bind:value={name}
								placeholder="Enter your Shopify Store Name here"
							/>
						</div>
					</div>

					<div
						class="relative rounded-2xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
					>
						<div class="relative p-3 md:p-5">
							<div class="flex gap-2 items-start">
								<Icon name="ideabulbGreen" size="big" filled={true} />
								<div class="space-y-6">
									<div class="space-y-3">
										<h3
											class="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-radial-green"
										>
											<span>Step 2: Copy This Special Link</span>
										</h3>
										<p class="text-sm leading-relaxed">
											Copy the link below this instruction box by clicking on the “copy” icon.
										</p>
									</div>
									<div class="space-y-2">
										<p class="text-sm leading-relaxed">
											Now, let's go on a little trip to your Shopify store. Ready?
										</p>
										<ol class="space-y-2 list-decimal pl-7">
											<li class="text-sm leading-relaxed">
												Look to the left side of your Shopify store page. See the bottom corner?
												There's a button called 'Settings'. Give it a click.
											</li>
											<li class="text-sm leading-relaxed">
												A new menu will pop up. Almost at the bottom, there’s a button called
												'Notifications'. Click it too.
											</li>
											<li class="text-sm leading-relaxed">
												We’re almost there! Scroll down, down, down...until you can’t anymore.
												There's a section called 'Webhooks'.
											</li>
											<li class="text-sm leading-relaxed">
												See the ‘Create Webhook’ button? Click it and a new window will pop up like
												magic!
											</li>
										</ol>
									</div>

									<div class="space-y-2">
										<p class="text-sm leading-relaxed">In this new window:</p>
										<ol class="space-y-2 list-[lower-alpha] pl-7">
											<li class="text-sm leading-relaxed">
												Look for a dropdown menu called ‘Event’. Click it and select ‘Order
												Creation’.
											</li>
											<li class="text-sm leading-relaxed">
												You’ll see something called ‘Format’. Make sure it says ‘JSON’.
											</li>
											<li class="text-sm leading-relaxed">
												Remember the link you copied earlier? Right-click on the box labeled ‘URL’
												and paste the link there.
											</li>
											<li class="text-sm leading-relaxed">
												There’s one more dropdown called ‘Webhook API version’. Click it and choose
												the option that has ‘(Latest)’ in its name
											</li>
											<li class="text-sm leading-relaxed">Now click the ‘Save’ button.</li>
										</ol>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="relative w-full flex items-center gap-5">
						<div
							class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
						>
							<input
								class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full text-blue placeholder-blue font-semibold"
								type="url"
								bind:value={webhookUrl}
								placeholder="https:www.domain.com/webhook"
							/>
						</div>

						<button
							type="button"
							on:click={async () => {
								await navigator.clipboard.writeText(webhookUrl ?? '');
								showCopiedToClipboardToast();
							}}
							class="w-12 h-12 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
							><span class="relative z-10 leading-none">
								<Icon name="copy" size="big" filled={true} />
							</span></button
						>
					</div>

					<div
						class="relative rounded-2xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
					>
						<div class="relative p-3 md:p-5">
							<div class="flex gap-2 items-start">
								<Icon name="ideabulbGreen" size="big" filled={true} />
								<div class="space-y-6">
									<div class="space-y-3">
										<h3
											class="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-radial-green"
										>
											<span>Step 3: Copy Your Webhook Signature</span>
										</h3>
										<p class="text-sm leading-relaxed break-all">
											Go back to where you were, and below your new webhook, you’ll see some bold
											text on an orange background. <br />
											It’s a long mix of letters and numbers called the 'Webhook Signature'. <br />
											Here’s an example of what it looks like: <br />
											53cb06165f6fdb8b62e71014334095b9288b7f3546bf49275b132a03e7c5141b2.
										</p>
										<p>
											Copy it by selecting the text and pressing <b class="font-semibold"
												>‘Ctrl+C’</b
											>
											(Windows) or <b class="font-semibold">‘Command+C’</b> (Mac).
										</p>
										<p>
											Now, come back here and right-click on the box below this instruction. Paste
											the Webhook Signature in by pressing ‘Ctrl+V’ (Windows) or ‘Command+V’ (Mac).
											Make sure you didn’t miss any characters!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="relative w-full flex items-center">
						<label
							for="webhook_signature"
							class="md:text-lg font-semibold leading-none shrink-0 w-28 md:w-60"
							>Webhook Signature</label
						>
						<div
							class="relative before:rounded-md before:shadow-sidebar before:absolute before:inset-0 before:bg-bglinear-3 before:backdrop-blur-md w-full"
						>
							<input
								class="border relative border-grey-6 ease-in-out duration-500 bg-transparent focus:bg-black/30 block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
								type="text"
								placeholder="Enter the Signature from Shopify here"
								bind:value={secret}
							/>
						</div>
					</div>

					<div
						class="relative rounded-2xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
					>
						<div class="relative p-3 md:p-5">
							<div class="flex gap-2 items-start">
								<Icon name="ideabulbGreen" size="big" filled={true} />
								<div class="space-y-6">
									<div class="space-y-3">
										<h3
											class="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-radial-green"
										>
											<span>Almost Done!</span>
										</h3>
										<p class="text-sm leading-relaxed break-words">
											See the green 'Save' button? Give it a click. Voila! Your Shopify store and
											OneTrack are now best friends, sharing order info with each other!
										</p>
										<p>
											If for some reason you change your mind and don’t want them to be friends
											anymore, flip the toggle switch to turn off the connector and then hit ‘Save’.
										</p>
										<p>
											Congratulations! You've successfully connected OneTrack with Shopify's Order
											Streams.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-12 gap-3 items-center">
						<div class="col-span-4">
							<label for="meta-status" class="text-lg font-medium">Active</label>
						</div>
						<div class="col-span-8">
							<Switch
								bind:value={isActivated}
								on:change={(e) => {
									isActivated = e.detail;
								}}
							/>
						</div>
					</div>
				</div>

				<div class="flex gap-4 justify-end">
					<Button
						on:click={closeModal}
						text="Cancel"
						variant="error"
						rounded={true}
						action="secondary"
					/>
					<Button on:click={handleSubmit} text="Save" rounded={true} />
				</div>
			</div>
		</div>
	</div>
{/if}
