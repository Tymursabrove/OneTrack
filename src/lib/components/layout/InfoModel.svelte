<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';

	export let isOpen: boolean;
	export let shouldHaveReadMoreSection: boolean = false;
	export let heading: string;
	export let mainHtml: string;
	export let readMoreHtml: string = '';

	let readMore = false;
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 bg-black/90 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div
			class="relative max-h-full flex flex-col rounded-3xl bg-color text-left shadow-xl transition-all sm:my-5 p-2 w-full max-w-4xl"
		>
			<div
				class="relative max-w-full flex-1 flex flex-col rounded-3xl p-5 xl:px-10 space-y-5 max-h-screen overflow-y-auto on-hover-scroll"
			>
				<div class="space-y-3">
					<h3 class="text-3xl font-bold leading-none">{heading}</h3>
					<p class="text-sm text-grey-2">
						{@html mainHtml}
					</p>
				</div>
				{#if readMore}
					<div class="space-y-3">
						<p class="text-sm text-grey-2">
							{@html readMoreHtml}
						</p>
					</div>
				{/if}
				{#if shouldHaveReadMoreSection}
					<div class="flex justify-start">
						<button
							type="button"
							on:click={() => {
								readMore = !readMore;
							}}
							class="text-blue font-semibold inline-flex gap-2 items-center text-lg"
							><span>Read {readMore ? 'less' : 'more'} </span>
							<Icon
								data={Icons.AngleDown}
								stroke="transparent"
								class="w-4 ease-in-out duration-300 {readMore ? 'rotate-180' : ''}"
							/></button
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
