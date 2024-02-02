<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import Confetti from '$lib/local-packages/Confetti.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { UserPostRequestItem } from '$lib/types/Types';
	import LoadingWithCaption from '$lib/components/layout/LoadingWithCaption.svelte';
	import { PostNewUser } from '$lib/services/HttpRequests';
	import { showErrorMessage } from '$lib/services/ToastService';
	import { goto } from '$app/navigation';

	let loading: boolean = true;
	export let userToPost: UserPostRequestItem;

	onMount(async () => {
		userToPost.address.country = userToPost.address.countryCode;
		userToPost.address.province = userToPost.address.provinceCode;
		let response = await PostNewUser(userToPost);
		if (response?.error) {
			showErrorMessage('Having difficulty connecting to backend servers.');
		} else {
			loading = false;
		}
	});
</script>

{#if !loading}
	<div
		style="position: fixed; top: -50px; left: 0; height: 100vh; width: 100vw; display: flex; justify-content: center; overflow: hidden; pointer-events: none;"
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			infinite
			duration={5000}
			amount={500}
			fallDistance="100vh"
		/>
	</div>
{/if}
<div
	class="absolute inset-0 flex flex-col justify-start items-center"
	in:fly={{ x: 200, duration: 1000 }}
	out:fly={{ x: -300, duration: 200 }}
>
	<div
		class="flex items-center flex-1 justify-center lg:justify-between w-full gap-12 xl:gap-20 2xl:gap-32"
	>
		<div class="relative flex-1 items-stretch justify-center hidden lg:flex shrink-0">
			<img
				src="/images/illustration-5.png"
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
						in:fly={{ x: 300, duration: 400 }}
						out:fly={{ x: -300, duration: 200 }}
						src={Icons.svgUrls.purpleCircleUrl}
						alt="bg-circles-purple"
						class="aspect-square -translate-y-1/2 -translate-x-1/2 w-1/4"
					/>
					<img
						in:fly={{ x: 300, duration: 400 }}
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
							<div class="space-y-6 w-full">
								<div class="flex flex-col gap-4">
									<Icon
										data={Icons.oneTrackLightGreyFullNameIcon}
										class="max-w-full h-7 "
										stroke="transparent"
										color="currentColor"
									/>
									{#if !loading}
										<h1
											class="text-3xl xl:text-4xl leading-none font-bold text-center tracking-wider"
										>
											Account Setup successful
										</h1>
									{/if}
								</div>
								{#if loading}
									<LoadingWithCaption caption="Saving changes on server ⇅" />
								{:else}
									<div class="space-y-4">
										<p class="text-grey-2 font-medium">
											Congratulations, we have now adjusted the dashboard to your personal needs!
										</p>

										<p class="text-grey-2 font-medium">
											You can always change those details in your account settings, if needed.
										</p>

										<p class="text-grey-2 font-medium">
											But for now, let’s have a first look at your dashboard.
										</p>

										<Icon
											data={Icons.confettiBucketIcon}
											class="w-32 h-30 mx-auto"
											alt="successful"
											stroke="transparent"
											color="currentColor"
										/>
									</div>
									<div class="flex gap-4 xl:pt-5 justify-center">
										<button
											type="button"
											on:click={() => {
												goto('/');
											}}
											class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
											><span class="relative z-10 leading-none">Let’s go!</span></button
										>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
