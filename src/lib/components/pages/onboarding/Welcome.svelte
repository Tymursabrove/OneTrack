<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function next() {
		dispatch('navEvent', { navigation: 'next' });
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
				src="/images/illustration-1.png"
				alt="Welcome"
				class="aspect-square object-cover"
				in:fade={{ delay: 500 }}
				out:fade={{ delay: 200 }}
			/>
		</div>
		<div class="relative flex flex-col justify-center items-center max-w-lg xl:max-w-xl w-full ">
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
							<div class="space-y-6 w-full">
								<div class="flex flex-col gap-2">
									<h1 class="text-3xl xl:text-4.5xl leading-none font-bold text-center">
										Welcome to
									</h1>
									<Icon
										data={Icons.oneTrackLightGreyFullNameIcon}
										class="max-w-full h-10 xl:h-14"
										stroke="transparent"
										color="currentColor"
									/>
								</div>
								<div class="space-y-4">
									<p class="text-grey-2 font-medium">Thank you for choosing OneTrack!</p>

									<p class="text-grey-2 font-medium">
										We’re almost ready! We only need to adjust your dashboard to your certain needs.
									</p>

									<p class="text-grey-2 font-medium">
										Please fill out the following details so we can start.
									</p>
								</div>
								<div class="flex gap-4 xl:pt-5 justify-center">
									<button
										on:click={next}
										type="button"
										class="relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white min-w-24 px-4 p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute"
										><span class="relative z-10 leading-none">Let's go!</span></button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
