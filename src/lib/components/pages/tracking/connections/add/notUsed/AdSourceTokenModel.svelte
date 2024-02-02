<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import TokenSuccessModal from './TokenSuccessModal.svelte';
	import { Icons } from '$lib/resources/IconResources';
	export let isOpen = false;

	function handleSuccess() {
		closeModal();
		openModal(TokenSuccessModal, {});
	}

	const refresh = [
		{
			brandLogo: Icons.metaLogoIcon,
			message: 'Refresh Facebook Token'
		}
	];
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
			class="relative transform max-h-full flex flex-col rounded-3xl p-3 text-left transition-all sm:my-5 w-full max-w-md rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div
				class="relative overflow-auto max-w-full flex-1 max-h-full on-hover-scroll transform rounded-3xl py-3 xs:p-5 sm:py-7 space-y-7"
			>
				<div class="space-y-1 ">
					<h2 class="text-lg md:text-2xl text-white leading-none font-bold text-center">
						1 Token needs to be refreshed
					</h2>
				</div>
				<div class="relative space-y-4 flex-1 min-h-72">
					{#each refresh as brand, i}
						<!-- When it need to have red border ==> please change 'border-green' to 'border-red' -->
						<button
							type="button"
							on:click={handleSuccess}
							class="relative rounded-3xl before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 border border-green flex items-center p-3 2xl:px-5 2xl:py-4 after:absolute after:inset-0 after:rounded-3xl after:ease-in-out after:duration-500  w-full hover:before:shadow-glass"
						>
							<div class="flex gap-3 items-center justify-start relative z-10">
								<Icon data={brand.brandLogo} class="w-9 " />
								<span class="font-medium text-left">{brand.message}</span>
							</div>
						</button>
					{/each}
				</div>

				<div class="flex gap-4 justify-center">
					<button
						type="button"
						on:click={closeModal}
						class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-6 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						><span class="relative z-10 leading-none">Cancel</span></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
