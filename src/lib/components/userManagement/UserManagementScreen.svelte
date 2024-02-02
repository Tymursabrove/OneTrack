<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import ResetPassword from './ResetPassword.svelte';
	import SignIn from './SignIn.svelte';
	import SignUp from './SignUp.svelte';
	import { Icons } from '$lib/resources/IconResources';

	let viewForm = 'SignIn';
</script>

<div class="flex min-h-screen w-full items-center justify-center relative">
	<div class="relative w-full max-w-md md:max-w-screen-xl mx-auto p-5 md:px-10">
		<div class="relative">
			<div class="absolute inset-0 flex flex-col justify-between">
				<img
					src={Icons.svgUrls.purpleCircleUrl}
					alt="bg-circles-purple"
					class="aspect-square -translate-y-1/2 -translate-x-1/2 purpleCircle"
					loading="lazy"
				/>
				<img
					src={Icons.svgUrls.blueCircleUrl}
					alt="bg-circles-blue"
					class="aspect-square mt-auto ml-auto blueCircle"
					loading="lazy"
				/>
			</div>
			<div
				class="relative w-full min-h-72 z-10 flex items-stretch before:absolute before:inset-0 before:rounded-3xl before:backdrop-blur-2.5xl before:bg-linear before:shadow-glass-2 "
				>
				<div class="relative z-10 divide-x divide-grey md:grid md:grid-cols-12 flex-1">
					<div
						class="md:col-span-6 lg:col-span-5 xl:col-span-4 flex flex-col p-5 sm:p-10 space-y-5"
						>
						<!-- Logo -->
						<div class="relative text-white flex justify-center">
							<Icon
								data={Icons.oneTrackLightGreyFullNameIcon}
								class="max-w-full h-11"
								color="currentColor"
							/>
						</div>
						<div class="flex-1 relative">
							{#if viewForm == 'SignUp'}
								<h1 class="text-xl font-bold">Sign Up</h1>

								<SignUp
									on:openSignIn={() => {
										viewForm = 'SignIn';
									}}
								/>
							{:else if viewForm == 'ResetPassword'}
								<h1 class="text-xl font-bold">Forgot password?</h1>
								<ResetPassword
									on:openSignIn={() => {
										viewForm = 'SignIn';
									}}
								/>
							{:else}
								<h1 class="text-xl font-bold">Sign In</h1>
								<SignIn
									on:openSignUp={() => {
										viewForm = 'SignUp';
									}}
									on:openPasswordReset={() => {
										viewForm = 'ResetPassword';
									}}
								/>
							{/if}
						</div>
					</div>
					<div
						class="md:col-span-6 lg:col-span-7 xl:col-span-8 p-10 hidden md:flex items-center justify-center"
						>
						<div class="max-w-lg pl-12 space-y-10 w-full">
							<div class="space-y-5 ">
								<h2 class="text-3xl font-bold lg:pr-20">Welcome to OneTrack</h2>
								<p class="text-sm text-grey-2 font-medium lg:pr-5">
									Scale digital ads - without guessing or wasting money.
								</p>
							</div>
							<!-- <div class="flex lg:flex-nowrap flex-wrap items-center gap-1">
								<div class="isolate flex -space-x-2 overflow-hidden p-2 -ml-2">
									<img class="relative z-30 inline-block h-9 w-9 rounded-full ring-4 ring-color" src="/images/profile-photo.png" alt="">
									<img class="relative z-20 inline-block h-9 w-9 rounded-full ring-4 ring-color" src="/images/profile-photo.png" alt="">
									<img class="relative z-10 inline-block h-9 w-9 rounded-full ring-4 ring-color" src="/images/profile-photo.png" alt="">
									<img class="relative z-0 inline-block h-9 w-9 rounded-full ring-4 ring-color" src="/images/profile-photo.png" alt="">
								  </div>
								  <p class="text-xs text-grey-2 font-medium">More than 17k people joined us, it's your turn</p>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 
<div class="wrapper hidden ">
	<div class="glass card hf">
		<div class="vf form">
			<div class="logo">
				<Icon
					data={Icons.oneTrackLightGreyFullNameIcon}
					class="logo-icon"
					fill="white"
					stroke="white"
					color="white"
					width="230"
					height="40"
				/>
			</div>
			{#if viewForm == 'SignUp'}
				<h1>Sign Up</h1>
				<SignUp
					on:openSignIn={() => {
						viewForm = 'SignIn';
					}}
				/>
			{:else if viewForm == 'ResetPassword'}
				<h1>Forgot password?</h1>
				<ResetPassword
					on:openSignIn={() => {
						viewForm = 'SignIn';
					}}
				/>
			{:else}
				<h1>Sign In</h1>
				<SignIn
					on:openSignUp={() => {
						viewForm = 'SignUp';
					}}
					on:openPasswordReset={() => {
						viewForm = 'ResetPassword';
					}}
				/>
			{/if}
		</div>
		<div class="vf info">
			<h1>Welcome to OneTrack</h1>
			<p>Scale digital ads - without guessing or wasting money.</p>
		</div>
	</div>
</div> -->
