<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import Icon from '$lib/components/common/Icon.svelte';
	import { showCopiedToClipboardToast } from '$lib/services/ToastService';
	import type { utmDataItem } from '$lib/types/Types';
	import { slide } from 'svelte/transition';

	export let source: utmDataItem;
</script>

<div
	class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col py-3 px-4 xs:py-5 xs:px-6 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500 after:border-3 {source.isExpanded
		? 'after:border-blue'
		: 'after:border-transparent'} "
>
	<div class="relative flex flex-col gap-3 z-10 flex-1">
		<div class="flex justify-between gap-5">
			<div class="flex gap-2 xl:gap-4 items-center">
				<span class="shirink-0"><Icon name={source.logo} size="big" /></span>
				<h2 class="capitalize text-xl xl:text-2xl font-bold">{source.name}</h2>
			</div>
			<div class="flex gap-2 items-center">
				<p class="text-md text-grey text-right leading-none">Click to copy</p>
				<Icon
					name="copy"
					size="big"
					filled={true}
					interactive={true}
					on:click={async () => {
						await navigator.clipboard.writeText(source.utmCode);
						showCopiedToClipboardToast();
					}}
				/>
			</div>
		</div>
		<div class="flex flex-col gap-3 flex-1 relative">
			<div class="flex-1 space-y-3">
				<p class="text-sm text-white break-words">
					{@html source.text}
				</p>

				{#if source.isExpanded}
					<div class="space-y-3 flex-col flex" transition:slide={{ duration: 300 }}>
						<p class="text-sm text-white">
							{@html source.fromText}
						</p>

						<div
							class="border-2 border-grey text-blue rounded-md p-3 font-semibold bg-color/20 break-words hover:bg-color/40 ease-in-out duration-300 hover:border-white/70"
							on:dblclick|preventDefault={async () => {
								await navigator.clipboard.writeText(source.utmCode);
								showCopiedToClipboardToast();
							}}
						>
							{#if source.displayUtm}
								{source.displayUtm}
							{:else}
								{source.utmCode}
							{/if}
						</div>
					</div>
				{/if}
			</div>
			<div
				class="flex gap-4"
				class:justify-between={source.isExpanded}
				class:justify-end={!source.isExpanded}
			>
				<p class="text-md text-grey leading-none" class:hidden={!source.isExpanded}>
					Double click to copy
				</p>

				<Button
					text="Read {!source.isExpanded ? 'more' : 'less'}"
					rounded={true}
					role="dropdown"
					size="small"
					on:click={() => {
						source.isExpanded = !source.isExpanded;
					}}
				/>
			</div>
		</div>
	</div>
</div>
