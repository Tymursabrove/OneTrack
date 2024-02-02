<script lang="ts">
	// import { goto } from '$app/navigation';
	import { closeModal } from 'svelte-modals';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { fly } from 'svelte/transition';
	import { Icons } from '$lib/resources/IconResources';
	export let isOpen = false;
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
			class="fixed inset-0 bg-black/90 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative transform max-h-full flex flex-col rounded-3xl bg-color p-3 text-left shadow-xl transition-all sm:my-5 w-full max-w-md "
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
							Your facebook token has successfully been refreshed for 60 days!
						</p>
					</div>
					<div class="min-h-40 flex items-cen">
						<Icon data={Icons.successfulIndicationIcon} class="w-32 h-30 mx-auto" />
					</div>
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
