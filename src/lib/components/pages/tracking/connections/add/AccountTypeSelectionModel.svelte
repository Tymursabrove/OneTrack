<script lang="ts">
	import { goto } from '$app/navigation';
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/common/Button.svelte';

	export let isOpen = false;

	function gotoPage(page: 'source' | 'destination') {
		closeModal();
		goto(`/tracking/connections/add/${page}`);
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
			class="relative transform max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-md rounded-2xl border border-grey-4 before:backdrop-blur-md before:bg-bglinear-5 before:shadow-sidebar before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-2xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform p-5 md:px-8 space-y-3"
			>
				<div class="space-y-1">
					<h2 class="text-lg md:text-2xl text-white leading-none font-semibold text-center">
						What do you want to do?
					</h2>
				</div>
				<div class="relative space-y-4 flex-1">
					<Button
						on:click={() => {
							gotoPage('source');
						}}
						class="w-full"
						leftIcon="outload"
						text="Add new Source"
						action="secondary"
					/>
					<Button
						on:click={() => {
							gotoPage('destination');
						}}
						class="w-full"
						leftIcon="inload"
						text="Add destination"
						action="secondary"
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
