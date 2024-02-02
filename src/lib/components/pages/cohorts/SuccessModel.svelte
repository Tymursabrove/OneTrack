<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { fly } from 'svelte/transition';
	import { Icons } from '$lib/resources/IconResources';
	export let isOpen: boolean;
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
		<button
			type="button"
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>

		<div
			class="relative max-w-md mx-auto transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 sm:w-full sm:max-w-lg rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform  rounded-3xl  sm:p-10 space-y-8"
			>
				<div class="relative flex justify-center min-h-60">
					<div class="space-y-10">
						<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
							our export was successful!
						</h2>
						<Icon class="w-32 h-30 mx-auto" data={Icons.successfulIndicationIcon} />
						<div class="flex gap-4 justify-center">
							<button
								class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
								type="button"
								on:click={closeModal}><span class="relative z-10 leading-none">Done</span></button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
