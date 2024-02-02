<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import configrationModal from './configrationModal.svelte';
	import { fly } from 'svelte/transition';

	function handleBack() {
		closeModal();
		openModal(configrationModal, {});
	}

	export let isOpen: boolean;

	const processingFees = [
		{
			icon: Icons.settingsGearSolid,
			title: 'Manual',
			textFieldID: 'manual-per',
			textFieldFixedID: 'manual-fixed-fees',
			checkbox1ID: 'manual',
			checkbox2ID: 'manual-fixed'
		},
		{
			icon: Icons.amazon,
			title: 'Amazon Pay',
			textFieldID: 'amazon-per',
			textFieldFixedID: 'amazon-fixed-fees',
			checkbox1ID: 'amazon',
			checkbox2ID: 'amazon-fixed'
		},
		{
			icon: Icons.cashinhand,
			title: 'Rechnung mit Klarna',
			textFieldID: 'rechnung-per',
			textFieldFixedID: 'rechnung-fixed-fees',
			checkbox1ID: 'rechnung',
			checkbox2ID: 'rechnung-fixed'
		},
		{
			icon: Icons.cashinhand,
			title: 'Sofort bezahlen mit Klarna',
			textFieldID: 'sofort-per',
			textFieldFixedID: 'sofort-fixed-fees',
			checkbox1ID: 'sofort',
			checkbox2ID: 'sofort-fixed'
		},
		{
			icon: Icons.cashinhand,
			title: 'Rechnung mit Klarna',
			textFieldID: 'mit-per',
			textFieldFixedID: 'mit-fixed-fees',
			checkbox1ID: 'mit',
			checkbox2ID: 'mit-fixed'
		}
	];

	//  if (isOpen){
	//     document.body.classList.add('overflow-hidden')
	//  }
	//  else if (!isOpen) {
	//     document.body.classList.remove('overflow-hidden')
	//  }
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
			class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal}
		/>
		<div
			class="relative max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-4xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div class="relative max-w-full flex-1 flex flex-col rounded-3xl ">
				<div class="flex flex-wrap justify-between gap-3 py-3 sm:p-5 xl:p-10">
					<h3 class="text-2xl 2xl:text-4xl font-bold text-white">Data Settings</h3>
					<div class="flex gap-2">
						<button
							on:click={handleBack}
							type="button"
							class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-28 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						>
							<span class="relative z-10 leading-none">Back</span>
						</button>
						<button
							on:click={closeModal}
							type="button"
							class="  relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
						>
							<span class="relative z-10 leading-none">
								<span class="relative z-10 leading-none">Save</span>
							</span>
						</button>
					</div>
				</div>

				<div
					class="space-y-5 overflow-auto on-hover-scroll flex-1 max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-15rem)] pb-3 sm:p-5 sm:pt-0 xl:p-10 xl:pt-0"
				>
					<div class="space-y-2">
						<h3 class="text-xl sm:text-2xl font-semibold leading-tight">
							Are you using any external payment gateways?
						</h3>
						<p class="text-sm">
							Please provide the per-transaction fee rates you pay (Not sure? Ask your payment
							gateway provider)
						</p>
					</div>
					<div class="space-y-4">
						{#each processingFees as process}
							<div
								class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:ring-blue hover:ring-2 before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300"
							>
								<div class="relative z-10 space-y-3 p-3 md:p-5 md:px-7">
									<div class="flex gap-2">
										<Icon data={process.icon} class="shrink-0 w-5" stroke="transparent" />
										<h4 class="text-lg font-medium">{process.title}</h4>
									</div>
									<div class="flex flex-col xs:grid xs:grid-cols-2 gap-5">
										<div class="space-y-3">
											<div class="relative w-full flex items-center">
												<label for={process.textFieldID} class="sr-only">% of Transaction</label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
												>
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id={process.textFieldID}
														placeholder="% of Transaction"
														name={process.textFieldID}
													/>
												</div>
											</div>
											<div class="relative">
												<CheckBox
													labelClass="relative z-10 leading-none"
													id={process.checkbox1ID}
													span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0"
													label="No fees apply"
													classes="relative cursor-pointer "
												/>
											</div>
										</div>
										<div class="space-y-3">
											<div class="relative w-full flex items-center">
												<label for={process.textFieldFixedID} class="sr-only">Fixed Fees</label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
												>
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id={process.textFieldFixedID}
														placeholder="Fixed Fees"
														name={process.textFieldFixedID}
													/>
												</div>
											</div>
											<div class="relative">
												<CheckBox
													labelClass="relative z-10 leading-none"
													id={process.checkbox2ID}
													span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0"
													label="No fees apply"
													classes="relative cursor-pointer "
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
