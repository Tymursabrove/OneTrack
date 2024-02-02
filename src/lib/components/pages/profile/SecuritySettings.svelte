<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { checkPasswordValidation } from '$lib/helpers/MiscHelpers';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import {
		showPasswordValidationToast,
		showMessage,
		showErrorMessage
	} from '$lib/services/ToastService';
	import { HandleErrorResponse, UpdatePassword } from '$lib/services/HttpCognitoRequests';
	import { GetUserTokens } from '$lib/services/HttpsBaseRequests';

	let password = '';
	let currentPassword = '';
	let repeatPassword = '';
	async function handleSubmit() {
		if (password != repeatPassword) {
			showPasswordValidationToast('New password and confirm password do not match');
			return;
		}
		let passwordValidationError = checkPasswordValidation(password);
		if (passwordValidationError) {
			showPasswordValidationToast(passwordValidationError);
			return;
		}
		let tokens = GetUserTokens();
		if (tokens == null || tokens == 'init') {
			showErrorMessage("Couldn't get username");
			return;
		}
		let response = await UpdatePassword({
			username: tokens.email,
			oldPassword: currentPassword,
			newPassword: password
		});
		if (response.error) {
			HandleErrorResponse(response);
			return;
		}
		showMessage(
			'Successfully Updated',
			`Your password has been updated successfully, use the new password from next session`,
			'success'
		);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-8 divide-y divide-grey">
	<div class="space-y-8 divide-y divide-grey">
		<div class="space-y-6">
			<div class="space-y-5">
				<h1 class="text-2xl font-bold text-white">Security</h1>
				<div class="space-y-1">
					<h2 class="text-xl text-white leading-none font-medium flex gap-1">
						Change your password
					</h2>
					<p class="text-sm leading-none text-grey-2">
						You can only change your password twice within 24 hours!
					</p>
				</div>
			</div>

			<div class="relative">
				<label class="block text-sm font-semibold text-white sr-only" for="current-password"
					>Current password</label
				>
				<div class="mt-1 relative">
					<div
						class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
					>
						<Icon
							data={Icons.singleCustomerIcon}
							stroke="transparent"
							class="w-5 h-5  text-white"
						/>
					</div>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="password"
							bind:value={currentPassword}
							required
							placeholder="Current password"
							name="current-password"
						/>
					</div>
				</div>
			</div>

			<div class="relative">
				<label class="block text-sm font-semibold text-white sr-only" for="new-password"
					>New password</label
				>
				<div class="mt-1 relative">
					<div
						class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
					>
						<Icon
							data={Icons.singleCustomerIcon}
							stroke="transparent"
							class="w-5 h-5  text-white"
						/>
					</div>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="password"
							bind:value={password}
							required
							placeholder="New password"
							name="new-password"
						/>
					</div>
				</div>
				<p class="text-sm leading-none text-grey-2 pt-2">
					Minimum 12 characters. Must include numbers, letters and special characters.
				</p>
			</div>

			<div class="relative">
				<label class="block text-sm font-semibold text-white sr-only" for="confirm-password"
					>Confirm new password</label
				>
				<div class="mt-1 relative">
					<div
						class="pointer-events-none absolute inset-y-0 left-0 w-14 flex items-center justify-center z-10"
					>
						<Icon data={Icons.singleCustomerIcon} stroke="transparent" class="w-5 h-5 text-white" />
					</div>
					<div
						class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl"
					>
						<input
							class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm py-3 pl-14 outline-none leading-none peer invalid:border-red invalid:text-red h-11"
							type="password"
							bind:value={repeatPassword}
							required
							placeholder="Confirm new password"
							name="confirm-password"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="space-y-6 pt-8">
			<div class="space-y-1">
				<h2 class="text-xl text-white leading-none font-semibold flex gap-1">
					Security Preferences
				</h2>
				<p class="text-sm leading-none text-grey-2">
					Keep your account more secure with following preferences.
				</p>
			</div>
			<div class="flex justify-between gap-5">
				<div class="space-y-1 flex-1">
					<h3 class="text-white leading-none text-sm font-semibold flex gap-1">
						Security Preferences
					</h3>
					<p class="text-sm leading-none text-grey-2">
						Keep your account more secure with following preferences.
					</p>
				</div>
				<div class="relative">
					<CheckBox
						labelClass="relative z-10 leading-none"
						label=""
						id="securityPreferences"
						classes="relative cursor-pointer"
						span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
					/>
				</div>
			</div>
		</div>

		<div class="pt-8 pb-4 gap-4 flex justify-end">
			<button
				type="reset"
				class="relative inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-3 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
				><span class="relative z-10 leading-none">Cancel</span></button
			>

			<button
				type="submit"
				class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
				><span class="relative z-10 leading-none">Save</span></button
			>
		</div>
	</div>
</form>
