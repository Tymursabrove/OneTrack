<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	// import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import configrationModal from './configrationModal.svelte';
	import { fly } from 'svelte/transition';
	// import { data } from 'jquery';
	let formEdit = false;
	let newExpense = false;

	function handleBack() {
		closeModal();
		openModal(configrationModal, {});
	}

	export let isOpen: boolean;

	const expenses = [
		{
			icon: Icons.settingsGearSolid,
			name: 'Name of Expense',
			percent: '7.61%',
			fixed: '$49.99',
			formId: 'form-edit-1'
		},
		{
			icon: Icons.settingsGearSolid,
			name: 'Name of Expense',
			percent: '7.61%',
			fixed: '$49.99',
			formId: 'form-edit-2'
		},
		{
			icon: Icons.settingsGearSolid,
			name: 'Name of Expense',
			percent: '7.61%',
			fixed: '$49.99',
			formId: 'form-edit-3'
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
				<div class="space-y-3 pt-3 sm:p-5 sm:pb-0 xl:p-10 xl:pb-0">
					<div class="flex flex-wrap justify-between gap-3">
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
					<div class="space-y-1">
						<h3 class="text-xl font-semibold text-left">Other Expenses</h3>
						<p class="text-xs text-grey-2">xxx</p>
					</div>
				</div>

				<div
					class="overflow-auto on-hover-scroll flex-1 max-h-[calc(100vh-14rem)] lg:max-h-[calc(100vh-15rem)] pb-y sm:p-5   xl:p-10 xl:pt-7 flex flex-col" >
                    <div class="space-y-5 flex-1">
					{#each expenses as expense}
						<div class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:ring-blue hover:ring-2 before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300" >

                        {#if formEdit}
                        <div class="relative z-10 p-5 space-y-3">
                            <div class="flex gap-2">
                                <Icon data={expense.icon} class="w-4" />
                                <p class="text-lg font-medium">Manual</p>
                            </div>
                            <div class="space-y-3">
                                <div class="relative w-full flex items-center">
                                    <label for="name" class="sr-only">Name of Expense</label>
                                    <div
                                        class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
                                        <input
                                            class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
                                            type="text"
                                            id="name"
                                            placeholder="Name of Expense"
                                            name="name" />
                                    </div>
                                </div>
                                <div class="grid gap-5 grid-cols-2">
                                    <div class="relative w-full flex items-center">
                                        <label for="name" class="sr-only">% of Transaction</label>
                                        <div
                                            class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
                                            <input
                                                class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
                                                type="text"
                                                id="name"
                                                placeholder="% of Transaction"
                                                name="name" />
                                        </div>
                                    </div>
                                    <div class="relative w-full flex items-center">
                                        <label for="name" class="sr-only">Fixed Fee </label>
                                        <div
                                            class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
                                            <input
                                                class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
                                                type="text"
                                                id="name"
                                                placeholder="Fixed Fee"
                                                name="name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-2 pt-2 justify-end">
                                    <button
                                    on:click={() => {
                                        formEdit = !formEdit;
                                    }}
                                        type="button"
                                        class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-24 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
                                    >
                                        <span class="relative z-10 leading-none">Cancel</span>
                                    </button>
                                    <button
                                    on:click={() => {
                                        formEdit = !formEdit;
                                    }}
                                        type="button"
                                        class="  relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-24 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
                                    >
                                        <span class="relative z-10 leading-none">
                                            <span class="relative z-10 leading-none">Save</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {:else}
						<div class="flex flex-wrap gap-3 items-center justify-between relative z-10 p-5">
								<div class="flex gap-2">
									<Icon data={expense.icon} class="w-5" />
									<p class="text-lg font-medium">{expense.name}</p>
								</div>
								<div class="space-y-0.5">
									<p class="text-xs font-medium text-grey-2 leading-snug">Percent of Transaction:</p>
									<p class="text-lg font-medium leading-snug">{expense.percent}</p>
								</div>
								<div class="space-y-0.5">
									<p class="text-xs font-medium text-grey-2 leading-snug">Fixed Fee:</p>
									<p class="text-lg font-medium leading-snug">{expense.fixed}</p>
								</div>
								<div class="flex">
									<button
										on:click={() => {
											formEdit = !formEdit;
										}}
										class="w-8 h-8 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
										><span class="relative z-10 leading-none">
											<Icon data={Icons.pencilIcon} class="w-4" />
										</span>
									</button>
								</div>
						</div>
                        {/if}
                          
						</div>
					{/each}

						{#if newExpense}
						<div class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:ring-blue hover:ring-2 before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300" >
								<div class="relative z-10 p-5 space-y-3">
									<div class="flex gap-2">
										<Icon data={Icons.settingsGearSolid} class="w-4" />
										<p class="text-lg font-medium">Manual</p>
									</div>
									<div class="space-y-3">
										<div class="relative w-full flex items-center">
											<label for="name" class="sr-only">Name of Expense</label>
											<div
												class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
												<input
													class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
													type="text"
													id="name"
													placeholder="Name of Expense"
													name="name" />
											</div>
										</div>
										<div class="grid gap-5 grid-cols-2">
											<div class="relative w-full flex items-center">
												<label for="name" class="sr-only">% of Transaction</label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id="name"
														placeholder="% of Transaction"
														name="name" />
												</div>
											</div>
											<div class="relative w-full flex items-center">
												<label for="name" class="sr-only">Fixed Fee </label>
												<div
													class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
													<input
														class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 px-5 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
														type="text"
														id="name"
														placeholder="Fixed Fee"
														name="name" />
												</div>
											</div>
										</div>
										<div class="flex gap-2 pt-2 justify-end">
											<button
											on:click={() => {
												newExpense = !newExpense;
											}}
												type="button"
												class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-24 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
											>
												<span class="relative z-10 leading-none">Cancel</span>
											</button>
											<button
											on:click={() => {
												newExpense = !newExpense;
											}}
												type="button"
												class="  relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-24 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
											>
												<span class="relative z-10 leading-none">
													<span class="relative z-10 leading-none">Save</span>
												</span>
											</button>
										</div>
									</div>
								</div>
						</div>
						{/if}



					 

					<div class="flex justify-center items-center flex-1">
						<button
							class="md:w-44 flex justify-center items-center xl:max-w-sm bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-5 py-7 before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 hover:before:bg-blue-box hover:before:opacity-100 before:ease-in-out before:duration-300"
							on:click={() => {
								newExpense = !newExpense;
							}}
						>
							<div class="relative z-10 space-y-4 flex justify-center flex-col items-center">
								<Icon data={Icons.plus} class="w-12" />
								<p class="text-center text-xl font-semibold leading-none ">Add another expense</p>
							</div>
						</button>
					</div>
                </div>
                <div class="flex gap-2 justify-end pt-4">
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

               


			</div>
		</div>
	</div>
{/if}
