<script>
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	import { openModal } from 'svelte-modals';
	import { data } from '$lib/resources/HelpCenterResources';
	import { Workspace } from '$lib/store';
	import { goto } from '$app/navigation';
	import featureRequestModal from '$lib/components/pages/helpAndSupport/FeatureRequestModal.svelte';
	import { showMessage } from '$lib/services/ToastService';

	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});
	function handleOpen() {
		openModal(featureRequestModal, {});
	}
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col justify-center xl:px-9">
	<div class="divide-y divide-grey space-y-10 py-5 xl:px-14">
		<!-- Heading -->
		<div class="text-center">
			<h2 class="sm:text-lg xl:text-xl font-semibold ">Help Center</h2>
			<h3 class="text-xl sm:text-3xl xl:text-4xl font-semibold">How can we help you today?</h3>
			<div class="max-w-sm mx-auto p-3 pb-0">
				<p class="text-sm">
					Search for a topic or question, check out our FAQs and guides, contact us for detailed
					support
				</p>
			</div>
		</div>
		<div class="pt-10 space-y-10">
			<div class="relative w-full mx-auto max-w-sm flex items-center">
				<label for="keyword" class="sr-only">Search</label>
				<div
					class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
				>
					<input
						class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
						type="text"
						id="keyword"
						placeholder="Enter a question, topic or keyword"
					/>
				</div>
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sl:grid-cols-5 gap-5 text-white">
				{#each data.rootPages as page}
					{#if page.visible}
						<button
							on:click={() => {
								//goto(page.link);
								showMessage(
									'Page is being developed right now. It will be available soon.',
									'',
									'info'
								);
							}}
							type="button"
							class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 hover:before:opacity-0 before:inset-0 before:ease-in-out before:duration-300 after:absolute after:bg-blue-box after:rounded-3xl after:opacity-0 hover:after:opacity-100 after:shadow-glass after:backdrop-blur-2.5xl  after:inset-0 after:ease-in-out after:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group "
						>
							<div
								class="w-32 h-40 max-w-full flex flex-col justify-center items-center text-center space-y-3 relative z-10"
							>
								<h3 class="font-semibold text-xl">{page.heading}</h3>
								<p class="text-sm">{page.subHeading}</p>
								<p class="text-sm">
									<span class="text-blue group-hover:text-white ease-in-out duration-300"
										>{page.actionText}</span
									>
								</p>
							</div>
						</button>
					{/if}
				{/each}
			</div>
		</div>
		<div class="pt-10 space-y-10">
			<div
				class="flex flex-col xs:grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 text-white"
			>
				<button
					type="button"
					class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 hover:before:opacity-0 before:inset-0 before:ease-in-out before:duration-300 after:absolute after:bg-blue-box after:rounded-3xl after:opacity-0 hover:after:opacity-100 after:shadow-glass after:backdrop-blur-2.5xl  after:inset-0 after:ease-in-out after:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group "
				>
					<div
						class="w-60 h-40  max-w-full flex flex-col justify-center items-center text-center space-y-3 relative z-10"
					>
						<h3 class="font-semibold text-xl">Refer a friend</h3>
						<p class="text-sm">Refer someone who might benefit from OneTrack.</p>
						<p class="text-sm">
							<span class="text-blue group-hover:text-white ease-in-out duration-300">Refer</span>
						</p>
					</div>
				</button>

				<button
					type="button"
					class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 hover:before:opacity-0 before:inset-0 before:ease-in-out before:duration-300 after:absolute after:bg-blue-box after:rounded-3xl after:opacity-0 hover:after:opacity-100 after:shadow-glass after:backdrop-blur-2.5xl  after:inset-0 after:ease-in-out after:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group "
				>
					<div
						class="w-60 h-40  max-w-full flex flex-col justify-center items-center text-center space-y-3 relative z-10"
					>
						<h3 class="font-semibold text-xl">Missing something?</h3>
						<p class="text-sm">Are you missing any specific feature? Just let us know.</p>
						<p class="text-sm">
							<span class="text-blue group-hover:text-white ease-in-out duration-300"
								>Request a feature</span
							>
						</p>
					</div>
				</button>

				<button
					type="button"
					class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 hover:before:opacity-0 before:inset-0 before:ease-in-out before:duration-300 after:absolute after:bg-blue-box after:rounded-3xl after:opacity-0 hover:after:opacity-100 after:shadow-glass after:backdrop-blur-2.5xl  after:inset-0 after:ease-in-out after:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group "
				>
					<div
						class="w-60 h-40  max-w-full flex flex-col justify-center items-center text-center space-y-3 relative z-10"
					>
						<h3 class="font-semibold text-xl">Write a Review</h3>
						<p class="text-sm">Do you like our work? Write a review on Trustpilot.</p>
						<p class="text-sm">
							<span class="text-blue group-hover:text-white ease-in-out duration-300">Rate us</span>
						</p>
					</div>
				</button>

				<button
					type="button"
					class="outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 hover:before:opacity-0 before:inset-0 before:ease-in-out before:duration-300 after:absolute after:bg-blue-box after:rounded-3xl after:opacity-0 hover:after:opacity-100 after:shadow-glass after:backdrop-blur-2.5xl  after:inset-0 after:ease-in-out after:duration-300 ease-in-out duration-300 space-y-2 flex flex-col justify-center items-center group "
				>
					<div
						class="w-60 h-40  max-w-full flex flex-col justify-center items-center text-center space-y-3 relative z-10"
					>
						<h3 class="font-semibold text-xl">Upload a Testimonial</h3>
						<p class="text-sm">Upload a short testimonial video.</p>
						<p class="text-sm">
							<span class="text-blue group-hover:text-white ease-in-out duration-300">Upload</span>
						</p>
					</div>
				</button>
			</div>
		</div>
	</div>
</main>
