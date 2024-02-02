<script>
	import { createEventDispatcher } from 'svelte';
	import {
		HandleErrorResponse,
		SendForgetPasswordCode,
		ResetPassword
	} from '$lib/services/HttpCognitoRequests';
	import { showMessage } from '$lib/services/ToastService';

	const dispatch = createEventDispatcher();

	let showCodeInputsScreen = false;
	let resetEmail = '';
	let newPassword = '';
	let verificationCode = '';
	function gotoSignIn() {
		dispatch('openSignIn', {});
	}
	async function handleEmailSubmit() {
		let response = await SendForgetPasswordCode(resetEmail);
		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showCodeInputsScreen = true;
	}
	async function handleResetPasswordSubmit() {
		let response = await ResetPassword({
			username: resetEmail,
			newPassword,
			code: verificationCode
		});
		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showMessage('Password has been reset successfully.', '', 'success');
		gotoSignIn();
	}
</script>

{#if showCodeInputsScreen == false}
	<form class="pb-7 pt-2" on:submit|preventDefault={handleEmailSubmit}>
		<div class="space-y-7">
			<p class="text-sm text-grey-2 font-semibold">Fill the form to reset your password</p>
			<div class="space-y-5">
				<div class="relative">
					<label for="email" class="block text-sm font-medium text-gray-700 sr-only">E-Mail</label>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="E-Mail"
							bind:value={resetEmail}
							autocomplete="email"
							required
							class="border relative  border-transparent z-10  ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11 "
						/>
					</div>
				</div>

				<div class="flex-1 w-full flex justify-center">
					<button
						type="submit"
						class="relative inline-flex items-center justify-center rounded-md bg-transparent p-4 px-6 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-md after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-md before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute min-w-44"
						><span class="relative z-10 leading-none">Send reset code</span></button
					>
				</div>
			</div>
		</div>
	</form>
{:else}
	<form class="pb-7 pt-2" on:submit|preventDefault={handleResetPasswordSubmit}>
		<div class="space-y-7">
			<p class="text-sm text-grey-2 font-semibold">
				An email with password reset code has been sent to {resetEmail}. Please enter the code and
				new password in this form to reset your password.
			</p>
			<div class="space-y-5">
				<div class="relative">
					<label for="password" class="block text-sm font-medium text-gray-700 sr-only"
						>New password</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							name="password"
							type="password"
							placeholder="12 digit password"
							bind:value={newPassword}
							required
							class="border relative  border-transparent z-10  ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11 "
						/>
					</div>
				</div>
				<div class="relative">
					<label for="code" class="block text-sm font-medium text-gray-700 sr-only"
						>Verification code</label
					>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							name="code"
							type="text"
							placeholder="Code"
							bind:value={verificationCode}
							required
							class="border relative  border-transparent z-10  ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 px-4 outline-none leading-none peer h-11 "
						/>
					</div>
				</div>
				<div class="flex-1 w-full flex justify-center">
					<button
						type="submit"
						class="relative inline-flex items-center justify-center rounded-md bg-transparent p-4 px-6 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-md after:inset-0 after:bg-blue-box after:absolute hover:shadow-glow-blue before:rounded-md before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute min-w-44"
						><span class="relative z-10 leading-none">Reset password</span></button
					>
				</div>
			</div>
		</div>
	</form>
{/if}

<p class="text-sm text-grey-2 font-semibold">
	Go back to: <button
		on:click={gotoSignIn}
		class="font-bold text-sm text-blue hover:text-blue-400 ease-in-out duration-300">Sign in</button
	>
</p>
