<script lang="ts">
	import 'typeface-montserrat/index.css';
	import '../app.scss';
	import '$lib/local-packages/apexCharts/apexcharts.css';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import {
		UserTokenContainer,
		LoadingState,
		Error500,
		FullScreenView,
		USER_TOKENS_STORE_LOCAL_STORAGE_KEY,
		enableUserTokensLocalStorage,
		InitAttributionStores
	} from '$lib/store';
	import { get as getLocalStorage } from '$lib/local-packages/LocalStorage';
	import LoadingWithCaption from '$lib/components/layout/LoadingWithCaption.svelte';
	import TopNav from '$lib/components/layout/TopNav.svelte';
	import UserManagementScreen from '$lib/components/userManagement/UserManagementScreen.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { initHandlers } from '$lib/handlers/initHandlers';
	import { Modals, closeModal } from 'svelte-modals';
	import Error500Page from '$lib/components/layout/500Error.svelte';
	import type { UserTokensContainer } from '$lib/types/Types';
	import { HandleErrorResponse, RefreshToken } from '$lib/services/HttpCognitoRequests';
	import FlatToast from '$lib/local-packages/toasts/FlatToast.svelte';
	import ToastContainer from '$lib/local-packages/toasts/ToastContainer.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { showErrorMessage } from '$lib/services/ToastService';
	import { InitDataFlow } from '$lib/services/WorkspaceService';
	import { showLoader, sleep } from '$lib/helpers/MiscHelpers';

	let user: null | 'init' | UserTokensContainer = 'init';
	let refreshAPITokenInterval: null | NodeJS.Timer = null;
	let endUserSubscription: Unsubscriber;

	onMount(async () => {
		showLoader('Verifying user session');
		await sleep(2000);
		initHandlers();
		InitAttributionStores();
		endUserSubscription = UserTokenContainer.subscribe(async (u) => {
			if (u == 'init') {
				return;
			}
			user = u;
			await InitDataFlow(user);
			window.onbeforeunload = removeTokenRefreshInterval;
		});
		await runAuthFlow();
	});
	async function runAuthFlow() {
		enableUserTokensLocalStorage();
		let storedUser = getLocalStorage(USER_TOKENS_STORE_LOCAL_STORAGE_KEY);
		user = storedUser;
		await refreshTokenOnInterval();
		refreshAPITokenInterval = setInterval(refreshTokenOnInterval, 3500000);
	}

	onDestroy(removeTokenRefreshInterval);

	function removeTokenRefreshInterval() {
		if (refreshAPITokenInterval) {
			clearInterval(refreshAPITokenInterval);
		}
		if (endUserSubscription) {
			endUserSubscription();
		}
		return null;
	}

	async function refreshTokenOnInterval() {
		if (user != null && user != 'init') {
			let response = await RefreshToken(user.refreshToken);
			if (response.error) {
				HandleErrorResponse(response);
				UserTokenContainer.set(null);
				showErrorMessage('Your session has expired, you will need to login again.');
				return;
			}
			let parsedResponse = response.json as UserTokensContainer;
			let newTokens: UserTokensContainer = {
				email: user.email,
				accessToken: parsedResponse.accessToken,
				refreshToken: user.refreshToken,
				idToken: parsedResponse.idToken
			};
			UserTokenContainer.set(newTokens);
		}
	}
</script>

<div class="bg-color">
	<div
		class="app relative overflow-hidden min-h-screen min-w-screen flex bg-main bg-fixed bg-no-repeat bg-center-center bg-cover text-white"
	>
		{#if user == null}
			<UserManagementScreen />
		{:else if $FullScreenView}
			<slot />
		{:else}
			<div class="root flex flex-col flex-1 lg:pl-64 max-w-full pt-14">
				{#if user != null && user != 'init'}
					<TopNav />
				{/if}

				<div
					class="loader flex-1 flex-col py-3 px-2.5 md:p-4 xl:p-7 items-center {$LoadingState &&
					$LoadingState.show == true
						? 'flex'
						: 'hidden'}"
					>
					<LoadingWithCaption
						caption={$LoadingState && $LoadingState.caption ? $LoadingState.caption : ''}
					/>
				</div>

				<!-- 3xl:max-w-screen-3xl 3xl:mx-auto for fixed with on wide screen -->
				<div
					class="flex flex-1 flex-col py-3 px-2.5 md:p-4 xl:p-7  {$LoadingState &&
					$LoadingState.show == false
						? ''
						: 'hidden'}"
					>
					{#if $Error500}
						<Error500Page />
					{:else}
						<slot />
					{/if}
				</div>
			</div>

			{#if user != null && user != 'init'}
				<SideNav />
			{/if}
		{/if}

		<Modals>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				slot="backdrop"
				class="backdrop fixed inset-0 bg-black/50 z-50 hidden"
				on:click={closeModal}
			/>
		</Modals>
		<ToastContainer let:data>
			<FlatToast {data} />
		</ToastContainer>
	</div>
</div>
