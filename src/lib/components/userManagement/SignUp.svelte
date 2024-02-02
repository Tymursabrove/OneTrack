<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		SignUp,
		ConfirmSignUpCode,
		HandleErrorResponse,
		ResendConfirmSignUpCode
	} from '$lib/services/HttpCognitoRequests';
	import { checkPasswordValidation } from '$lib/helpers/MiscHelpers';
	import {
		showPasswordValidationToast,
		showErrorMessage,
		showMessage
	} from '$lib/services/ToastService';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import type { SignUpUser, ConfirmUserCode } from '$lib/types/CognitoTypes';

	const dispatch = createEventDispatcher();

	let password = '';
	let repeatPassword = '';
	let email = '';
	let name = '';
	let confirmationCode = '';
	let consent = false;
	let showSignUpForm = true;

	function gotoSignIn() {
		dispatch('openSignIn', {});
	}

	async function handleSignUpSubmit() {
		if (password != repeatPassword) {
			showPasswordValidationToast('Password and repeat password do not match');
			return;
		}
		let passwordValidationError = checkPasswordValidation(password);
		if (passwordValidationError) {
			showPasswordValidationToast(passwordValidationError);
			return;
		}
		if (!consent) {
			showErrorMessage('Did not agree to the Terms of Service and Privacy Policy.');
			return;
		}

		let user: SignUpUser = {
			username: email,
			password: password
		};
		let response = await SignUp(user);

		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showSignUpForm = false;
	}

	async function handleConfirmCodeSubmit() {
		let confirmation: ConfirmUserCode = {
			username: email,
			code: confirmationCode
		};
		let response = await ConfirmSignUpCode(confirmation);

		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showMessage(
			'Signup successful.',
			'You have successfully signed up for the OneTrack, please Sign In to continue',
			'success',
			5000
		);
		gotoSignIn();
	}
	async function handleResendConfirmCodeSubmit() {
		let response = await ResendConfirmSignUpCode(email);
		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showMessage('', 'New confirmation code has been sent.', 'success', 3000);
	}
</script>

<svelte:head>
	<title>Sign Up - OneTrack</title>
</svelte:head>

{#if showSignUpForm}
	<form class="pt-2" on:submit|preventDefault={handleSignUpSubmit}>
		<div class="space-y-7">
			<p class="text-sm text-grey-2 font-semibold">
				Already have an account? <button
					on:click={gotoSignIn}
					class="font-bold text-sm text-blue hover:text-blue-400 ease-in-out duration-300"
					>Sign in</button
				>
			</p>

			<div class="space-y-5">
				<div class="relative">
					<label for="name" class="block text-sm font-medium text-gray-700 sr-only">Full name</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Full name"
							autocomplete="Name"
							required
							bind:value={name}
							class="border relative border-transparent z-10 ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11"
						/>
					</div>
				</div>
				<div class="relative">
					<label for="email" class="block text-sm font-medium text-gray-700 sr-only">E-Mail</label>
					<div
						class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="E-Mail"
							autocomplete="email"
							bind:value={email}
							required
							class="border relative border-transparent z-10 ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="password" class="block text-sm font-medium text-gray-700 sr-only"
						>Password</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							autocomplete="new-password"
							bind:value={password}
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
						/>
					</div>
				</div>
				<div class="relative">
					<label for="repeatPassword" class="block text-sm font-medium text-gray-700 sr-only"
						>Password</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							id="repeatPassword"
							name="repeatPassword"
							type="password"
							placeholder="Repeat Password"
							autocomplete="new-password"
							bind:value={repeatPassword}
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap gap-y-7 items-center justify-between">
				<CheckBox
					labelClass="relative z-10 leading-none"
					id="tnc"
					span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0 "
					label="I agree to the Terms of Service and Privacy Policy"
					checked={consent}
					onChange={(e) => {
						consent = e;
					}}
					classes="relative cursor-pointer text-sm "
				/>

				<div class="flex-1 w-full flex justify-center">
					<button
						type="submit"
						class="relative inline-flex items-center justify-center rounded-md bg-transparent p-4 px-6 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-md after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-md before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute min-w-44"
						><span class="relative z-10 leading-none">Create free account</span></button
					>
				</div>
			</div>
		</div>
	</form>
{:else}
	<form class="pt-2" on:submit|preventDefault={handleConfirmCodeSubmit}>
		<div class="space-y-7">
			<p class="text-sm text-grey-2 font-semibold">
				Please enter confirmation code sent to your email inbox
			</p>
			<p class="text-sm text-grey-2 font-semibold">
				Resend confirmation code? <button
					on:click={handleResendConfirmCodeSubmit}
					class="font-bold text-sm text-blue hover:text-blue-400 ease-in-out duration-300"
					>Resend</button
				>
			</p>
			<div class="space-y-5">
				<div class="relative">
					<label for="code" class="block text-sm font-medium text-gray-700 sr-only"
						>Confirmation code</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							name="code"
							type="text"
							placeholder="Confirmation code"
							required
							bind:value={confirmationCode}
							class="border relative border-transparent z-10 ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap gap-y-7 items-center justify-between">
				<div class="flex-1 w-full flex justify-center">
					<button
						type="submit"
						class="relative inline-flex items-center justify-center rounded-md bg-transparent p-4 px-6 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-md after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-md before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute min-w-44"
						><span class="relative z-10 leading-none">Confirm code</span></button
					>
				</div>
			</div>
		</div>
	</form>
{/if}
