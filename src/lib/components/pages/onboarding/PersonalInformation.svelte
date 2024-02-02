<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import type { UserPostRequestItem } from '$lib/types/Types';
	import { showErrorMessage } from '$lib/services/ToastService';

	const dispatch = createEventDispatcher();

	export let userToPost: UserPostRequestItem;
	let emailInput: HTMLInputElement;

	function next() {
		if (!areInputValuesValid()) {
			return;
		}
		dispatch('navEvent', { navigation: 'next' });
	}
	function previous() {
		dispatch('navEvent', { navigation: 'previous' });
	}
	function areInputValuesValid() {
		if (!userToPost.firstName) {
			showErrorMessage('First name is required.');
			return false;
		}
		if (!userToPost.lastName) {
			showErrorMessage('Last name is required.');
			return false;
		}
		if (!userToPost.email) {
			showErrorMessage('E-mail is required.');
			return false;
		}
		if (!emailInput.checkValidity()) {
			showErrorMessage('E-mail is not in correct format.');
			return false;
		}
		if (!userToPost.phone) {
			showErrorMessage('Telephone number is required.');
			return false;
		}
		if (!validatePhoneForE164(userToPost.phone)) {
			showErrorMessage('Telephone number is not in correct format.');
			return false;
		}
		return true;
	}
	function validatePhoneForE164(phoneNumber: string) {
		const regEx = /^\+[1-9]\d{10,14}$/;
		return regEx.test(phoneNumber);
	}
</script>

<div
	class="absolute inset-0 flex flex-col justify-start items-center "
	in:fly={{ x: 200, duration: 1000 }}
	out:fly={{ x: -300, duration: 200 }}
>
	<div
		class="flex items-center flex-1 justify-center lg:justify-between w-full gap-12 xl:gap-20 2xl:gap-32"
	>
		<div class="relative flex-1 items-stretch justify-center hidden lg:flex shrink-0 ">
			<img
				src="/images/illustration-2.png"
				alt="Welcome"
				class="aspect-square object-cover"
				in:fade={{ delay: 500 }}
				out:fade={{ delay: 200 }}
			/>
		</div>
		<div class="relative flex flex-col justify-center items-center max-w-lg xl:max-w-xl w-full">
			<div class="relative w-full">
				<div class="absolute inset-0 hidden md:flex flex-col justify-between">
					<img
						in:fly={{ x: 300, duration: 500 }}
						out:fly={{ x: -300, duration: 200 }}
						src={Icons.svgUrls.purpleCircleUrl}
						alt="bg-circles-purple"
						class="aspect-square -translate-y-1/2 -translate-x-1/2 w-1/4"
					/>
					<img
						in:fly={{ x: 300, duration: 500 }}
						out:fly={{ x: -300, duration: 200 }}
						src={Icons.svgUrls.blueCircleUrl}
						alt="bg-circles-blue"
						class="aspect-square mt-auto ml-auto w-1/2 translate-y-1/2 relative -top-10 translate-x-1/2"
					/>
				</div>
				<div
					class="relative w-full lg:min-h-72 z-10 flex items-stretch before:absolute before:inset-0 before:rounded-3xl before:backdrop-blur-2.5xl before:bg-linear before:shadow-glass-dropdown max-w-xl"
				>
					<div class="relative z-10 flex-1 p-5 sm:p-10 lg:p-14 xl:px-20">
						<div
							class="relative text-white flex justify-center"
							in:fly={{ x: 300, duration: 1100 }}
							out:fly={{ x: -300, duration: 200 }}
						>
							<!-- Form -->
							<form>
								<div class="gap-y-5 min-h-150 flex flex-col w-full">
									<div class="space-y-6 flex-1 w-full">
										<div class="flex flex-col gap-4">
											<Icon
												data={Icons.oneTrackLightGreyFullNameIcon}
												class="max-w-full h-7 "
												stroke="transparent"
												color="currentColor"
											/>
											<h1
												class="text-3xl xl:text-4xl leading-none font-bold text-center tracking-wider"
											>
												Your contact data
											</h1>
											<p class="text-grey-2 font-semibold">
												Fill out your personal information to get started.
											</p>
										</div>
										<div class="flex flex-col gap-4 w-full ">
											<div class="relative w-full">
												<label for="firstName" class="sr-only">First name</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.singleCustomerIcon} class="w-5 h-5 text-white" />
													</div>

													<div
														class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="text"
															placeholder="First name"
															name="firstName"
															id="firstName"
															bind:value={userToPost.firstName}
														/>
													</div>
												</div>
											</div>
											<div class="relative w-full">
												<label for="firstName" class="sr-only">Last name</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.singleCustomerIcon} class="w-5 h-5 text-white" />
													</div>

													<div
														class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="text"
															placeholder="Last name"
															name="lastName"
															id="lastName"
															bind:value={userToPost.lastName}
														/>
													</div>
												</div>
											</div>
											<div class="relative w-full">
												<label for="email" class="sr-only">Email</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
													>
														<Icon data={Icons.emailIcon} class="w-5 h-5 text-white" />
													</div>

													<div
														class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="email"
															placeholder="Email"
															name="email"
															id="email"
															bind:value={userToPost.email}
															bind:this={emailInput}
														/>
													</div>
												</div>
											</div>
											<div class="relative w-full">
												<label for="telephone" class="sr-only">Phone</label>
												<div class="relative mt-1">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10">
														<Icon data={Icons.telephoneIcon} class="w-5 h-5 text-white" />
													</div>
													<div
														class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
													>
														<input
															class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
															type="tel"
															placeholder="+000000000000"
															name="telephone"
															id="telephone"
															bind:value={userToPost.phone}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="flex flex-col gap-4 mt-auto ">
										<div class="flex gap-3 justify-center items-start py-2">
											<button type="button" class="relative w-4 h-4 rounded-full bg-blue-box"
												><span class="sr-only">Step 1</span></button
											>
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 2</span></button
											>
											<button
												type="button"
												class="relative w-4 h-4 rounded-full bg-glass shadow-glass"
												><span class="sr-only">Step 3</span></button
											>
										</div>
										<div class="flex justify-center gap-4">
											<button
												on:click={previous}
												type="button"
												class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
												><span class="relative z-10 leading-none">Cancel</span></button
											>

											<button
												on:click={next}
												type="button"
												class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
												><span class="relative z-10 leading-none">Next</span></button
											>
										</div>
									</div>
								</div>
							</form>
							<!--End Form -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
