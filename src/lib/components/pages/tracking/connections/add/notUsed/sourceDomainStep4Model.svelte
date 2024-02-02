<script>
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	export let isOpen = true;
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex p-3 items-center justify-center "
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div
			class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-3xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 xl:p-8 space-y-10"
			>
				<div class="space-y-10 min-h-60 max-w-sm mx-auto">
					<div class="space-y-3">
						<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
							Congratulations
						</h2>
						<p class="text-sm text-center leading-snug">
							Your domain has been successfully created and your tracking server is now being
							created.
						</p>
					</div>
					<Icon data={Icons.successfulIndicationIcon} class="w-32 h-30 mx-auto" />

					<p class="text-sm text-center leading-snug">
						We will inform you by e-mail as soon as your SSL certificate has been completed.
					</p>
				</div>

				<div class="flex gap-4 justify-center">
					<button
						on:click={closeModal}
						type="button"
						class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-6 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
						><span class="relative z-10 leading-none">Done</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
