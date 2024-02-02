<script lang="ts">
	import type { Unsubscriber } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { FullScreenView, Workspace } from '$lib/store';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import Welcome from '$lib/components/pages/onboarding/Welcome.svelte';
	import PersonalInformation from '$lib/components/pages/onboarding/PersonalInformation.svelte';
	import WorkspaceComponent from '$lib/components/pages/onboarding/Workspace.svelte';
	import Address from '$lib/components/pages/onboarding/Address.svelte';
	import Thanks from '$lib/components/pages/onboarding/Thanks.svelte';
	import PasswordForm from '$lib/components/pages/onboarding/PasswordForm.svelte';
	import { showMessage } from '$lib/services/ToastService';
	import type { UserPostRequestItem } from '$lib/types/Types';
	import { sendLocalRequest } from '$lib/services/HttpsBaseRequests';

	const steps = [
		{
			id: 1,
			component: Welcome
		},
		{
			id: 2,
			component: PersonalInformation
		},
		{
			id: 3,
			component: WorkspaceComponent
		},
		{
			id: 4,
			component: Address
		},
		{
			id: 5,
			component: Thanks
		}
	];
	let userToPost: UserPostRequestItem = {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		dateOfBirth: '',
		gender: 'm',
		address: {
			street: '',
			streetAlternative: '',
			streetNumber: '',
			zip: '',
			city: '',
			province: '',
			country: '',
			company: '',
			countryCode: '',
			provinceCode: ''
		}
	};
	let checkPassword = true;
	let selectedStep = steps[0];
	let endSubscription: Unsubscriber;

	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
				FullScreenView.set(true);
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});
	onDestroy(() => {
		if (endSubscription) {
			endSubscription();
		}
	});

	async function next() {
		selectedStep = steps.find((x) => x.id == selectedStep.id + 1) ?? steps[0];
	}
	async function previous() {
		selectedStep = steps.find((x) => x.id == selectedStep.id - 1) ?? steps[0];
	}
	function handleNav(e: { detail: { navigation: string; password?: string } }) {
		if (e.detail.navigation == 'next') {
			next();
		} else if (e.detail.navigation == 'passwordCheck') {
			verifyPassword(e.detail.password || '');
		} else {
			previous();
		}
	}
	export async function verifyPassword(password: string) {
		try {
			let json = await sendLocalRequest(
				'POST',
				'/server/admin/password_check',
				JSON.stringify({
					password
				})
			);
			if (json.check == true) {
				checkPassword = false;
			} else {
				showMessage('Wrong password', '', 'error');
			}
		} catch (error) {
			console.error(error);
			showMessage('Error while checking verifying password', '', 'error');
		}
	}
</script>

<svelte:head>
	<title>On-boarding - OneTrack</title>
</svelte:head>

<div class="space-y-10 flex-1 relative flex flex-col overflow-y-auto overflow-x-hidden">
	<div
		class="relative w-full flex-1 flex flex-col justify-start max-w-md md:max-w-screen-2xl mx-auto p-5 md:px-10 "
	>
		<div class="flex flex-1 relative ">
			{#if checkPassword}
				<PasswordForm on:navEvent={handleNav} />
			{:else}
				<svelte:component this={selectedStep.component} on:navEvent={handleNav} {userToPost} />
			{/if}
		</div>
	</div>
</div>
