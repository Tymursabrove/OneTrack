<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { slide } from 'svelte/transition';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount } from 'svelte';
	import { Workspace } from '$lib/store';
	import { goto } from '$app/navigation';

	let topicExpand = false;
	let onthispage = false;

	onMount(async () => {
		Workspace.subscribe(async (ws) => {
			try {
			} catch (err) {
			} finally {
				hideLoader();
			}
		});
	});

	const toggle = () => (topicExpand = !topicExpand);
	const pointer = () => (onthispage = !onthispage);
</script>

<div class="-my-3 -mx-2.5 md:-m-4 xl:-m-7 flex flex-col flex-1">
	<div class="md:grid md:grid-cols-20 divide-y md:divide-y-0 md:divide-x divide-grey flex-1">
		<div class="md:col-span-5 xl:col-span-4 2xl:col-span-3 ">
			<div class="p-3 py-5 2xl:p-5 space-y-4">
				<div class="flex justify-between items-center">
					<button
						on:click={() => {
							goto('/help');
						}}
						class="text-transparent bg-clip-text bg-radial-blue hover:bg-radial-green hover:underline ease-in-out duration-300 font-semibold outline-none text-sm"
						>Back to Help Center</button
					>

					<button
						on:click={toggle}
						aria-expanded={topicExpand}
						type="button"
						class="relative md:hidden inline-flex items-center justify-center rounded-full bg-transparent min-w-24 px-4 p-2.5 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute {topicExpand
							? 'after:opacity-100'
							: 'after:opacity-0'}"
					>
						<span class="relative z-10 leading-none"
							><span class="relative z-10 leading-none inline-flex gap-2 items-center"
								><Icon
									data={Icons.AngleDown}
									stroke="transparent"
									class="w-3 text-white shrink-0 ease-in-out duration-300 {topicExpand
										? 'rotate-180'
										: ''}"
								/>Topics</span
							></span
						>
					</button>
				</div>

				{#if !topicExpand}
					<div class="hidden md:block space-y-10">
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Getting started</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block text-transparent bg-clip-text bg-radial-blue font-semibold before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Introduction</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Prerequisites</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Installation</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Serving</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Development</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Directory structure</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Component structure</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Starter kit</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Deployment</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Customization</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Theme layouts</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Page layouts</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>TailwindCSS</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Theming</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Component theming</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Splash screen</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Authentication</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>JWT</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Second thing</button
									>
								</li>
							</ul>
						</div>
					</div>
				{/if}

				{#if topicExpand}
					<div
						class="gap-y-10 gap-x-5 flex flex-col xs:grid xs:grid-cols-2 md:hidden"
						transition:slide={{ duration: 300 }}
					>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Getting started</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block text-transparent bg-clip-text bg-radial-blue font-semibold before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Introduction</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Prerequisites</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Installation</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Serving</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Development</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Directory structure</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Component structure</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Starter kit</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Deployment</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Customization</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Theme layouts</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Page layouts</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>TailwindCSS</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Theming</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Component theming</button
									>
								</li>
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Splash screen</button
									>
								</li>
							</ul>
						</div>
						<div class="space-y-4">
							<h3 class="text-sm uppercase font-medium">Authentication</h3>
							<ul class="border-l border-grey space-y-4 text-sm ml-2">
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>JWT</button
									>
								</li>
								<!-- if (topic == completed || topic == ongoing) -->
								<!-- {(topic == completed || topic == ongoing) ? 'text-transparent bg-clip-text bg-radial-blue font-semibold' : 'before:opacity-0 text-grey-2 hover:text-white'} -->
								<li class="relative">
									<button
										type="button"
										class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block before:opacity-0 text-grey-2 hover:text-white before:w-2 before:h-2 before:bg-blue-box before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:ml-[-1px]"
										>Second thing</button
									>
								</li>
							</ul>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="md:col-span-15 xl:col-span-16 2xl:col-span-17 flex-1 ">
			<div class="max-w-screen-xl mx-auto p-3 xs:p-5 xl:px-16 md:pt-14">
				<div class="flex flex-col md:flex-row gap-3 justify-between ">
					<!-- Right Sidebar on Mobile -->
					<div class="relative md:hidden">
						<button
							type="button"
							on:click={pointer}
							aria-expanded={topicExpand}
							class="relative md:hidden inline-flex ease-in-out duration-300 outline-none"
						>
							<span
								class="relative z-10 leading-none inline-flex gap-2 items-center text-sm uppercase font-medium py-2"
								>On this page<Icon
									data={Icons.AngleDown}
									stroke="transparent"
									class="w-3 text-white shrink-0 ease-in-out duration-300 {onthispage
										? 'rotate-180'
										: ''}"
								/></span
							>
						</button>
						{#if onthispage}
							<div
								class="absolute mt-3 left-0 z-10 w-full top-full bg-color focus:outline-none text-sm before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl before:shadow-glass-dropdown before:ease-in-out before:duration-300 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md rounded-md shadow-dropdown max-w-xs"
								transition:slide={{ duration: 300 }}
							>
								<div
									class="max-h-60 on-hover-scroll overflow-auto rounded-md space-y-4 relative z-10 p-5"
								>
									<h4 class="text-transparent bg-clip-text bg-radial-blue font-bold">Thank you</h4>
									<ul class="space-y-3 text-sm">
										<li class="relative">
											<button
												type="button"
												class="pl-3 relative text-left outline-none ease-in-out duration-300 w-full block text-white "
												>Lorem ipsum</button
											>
										</li>
										<li class="relative">
											<button
												type="button"
												class="pl-3 relative text-left outline-none ease-in-out duration-300 w-full block text-white "
												>Lorem ipsum</button
											>
										</li>
									</ul>
									<h4 class="text-white font-semibold">Main libraries</h4>
									<ul class="space-y-3 text-sm">
										<li class="relative">
											<button
												type="button"
												class="pl-3 relative text-left outline-none ease-in-out duration-300 w-full block text-white "
												>Lorem ipsum</button
											>
										</li>

										<li class="relative">
											<button
												type="button"
												class="pl-3 relative text-left outline-none ease-in-out duration-300 w-full block text-white "
												>Lorem ipsum</button
											>
										</li>
									</ul>
								</div>
							</div>
						{/if}
					</div>

					<div class="flex-1 max-w-4xl divide-y divide-grey space-y-10 ">
						<div class="space-y-3">
							<div class="space-y-1">
								<h2 class="text-transparent bg-clip-text bg-radial-blue font-semibold">
									Introduction
								</h2>
								<h3 class="text-2xl font-semibold">Thank you.</h3>
							</div>
							<p class="text-sm">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
								tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
								eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
							</p>

							<p class="text-sm">
								Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
								diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
								kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
							</p>
						</div>
						<div class="space-y-3 pt-9">
							<h3 class="text-2xl font-semibold">Main libraries</h3>

							<p class="text-sm">
								Fuse powered by 3 main libraries; Angular, Angular Material and TailwindCSS:
							</p>

							<ul class="list-disc list-inside space-y-3">
								<li>
									<span class="text-sm">Angular</span>
									<p class="text-sm">
										It is the core of the Fuse. This version only works with Angular.
									</p>
								</li>
								<li>
									<span class="text-sm">Angular Material</span>
									<p class="text-sm">
										Provides the main UI components such as Buttons, Form fields, Tabs, Progress
										bars and more.
									</p>
								</li>
								<li>
									<span class="text-sm">TailwindCSS</span>
									<p class="text-sm">
										It is the core of the style configuration and it provides utility classes for
										almost every CSS rule available.
									</p>
								</li>
							</ul>

							<div class="py-5">
								<div
									class="rounded-3xl overflow-hidden flex justify-between items-center shadow-thumbnail"
								>
									<img
										src="/images/daniel-j-schwarz.png"
										alt=""
										class="aspect-[1/0.652] w-full object-cover"
									/>
								</div>
							</div>

							<p class="text-sm">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
								tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
								eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
							</p>

							<p class="text-sm">
								Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
								diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
								kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
							</p>
							<div class="py-5">
								<div
									class="rounded-3xl outline-none bg-transparent relative p-5 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300  ease-in-out duration-300 "
								>
									<pre class="relative z-10"><code
											class="leading-relaxed flex flex-col max-w-full overflow-auto on-hover-scroll">							
									<div class="text-grey italic">// cache-advance.config.js</div>
									<div class="pl-5"><span class="text-purple-500 font-semibold">export default</span> <span
													class="text-grey">&lcub;</span
												> </div>
								<div class="pl-10"><span class="text-blue font-semibold">strategy</span><span class="text-grey"
													>:</span
												> <span class="text-blue font-semibold">'predictive'</span><span
													class="text-grey">,</span
												></div>
								<div class="pl-10"><span class="text-blue font-semibold">engine</span><span class="text-grey"
													>:</span
												> <span class="text-grey">&lcub;</span></div>
									<div class="pl-14"><span class="text-blue font-semibold">cpus</span><span class="text-grey">:</span
												> 12<span class="text-grey">,</span></div>
									<div class="pl-14"><span class="text-blue font-semibold">backups</span><span class="text-grey"
													>:</span
												> <span class="text-grey">&lsqb;</span><span class="text-blue font-semibold"
													>'./storage/cache.wtf'</span
												><span class="text-grey">&rsqb;,</span></div>
									<div class="pl-10"><span class="text-grey">&rcub;,</span></div>
									<div class="text-grey pl-5">&rcub;</div>
								</code></pre>
								</div>
							</div>
							<p class="text-sm">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
								tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
								eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
							</p>

							<p class="text-sm">
								Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
								diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
								kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
							</p>
							<div class="py-5">
								<div
									class="rounded-3xl outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300  ease-in-out duration-300 "
								>
									<div class="relative z-10 p-7 flex items-start gap-3">
										<div class="shirink-0">
											<img src={Icons.bulbOnIcon} alt="" class="w-7 h-7" />
										</div>
										<div class="space-y-2 flex-1">
											<h3
												class="text-2xl font-semibold text-transparent bg-clip-text bg-radial-blue"
											>
												<span>You should know!</span>
											</h3>
											<p class="text-sm">
												Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
												sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
												magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
												dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
												Lorem ipsum dolor sit amet.
											</p>
										</div>
									</div>
								</div>
							</div>

							<p class="text-sm">
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
								tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
								eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
							</p>

							<p class="text-sm">
								Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
								diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
								kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
							</p>

							<div class="py-5">
								<div
									class="rounded-3xl outline-none bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300  ease-in-out duration-300 "
								>
									<div class="relative z-10 p-7 flex items-start gap-3">
										<div class="shirink-0 pt-1">
											<img src={Icons.exclamationColoredIcon} alt="" class="w-6 h-6" />
										</div>
										<div class="space-y-2 flex-1">
											<h3
												class="text-2xl font-semibold text-transparent bg-clip-text bg-radial-yellow"
											>
												<span>Oh no! Something bad happened!</span>
											</h3>
											<p class="text-sm">
												Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
												sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
												magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
												dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
												Lorem ipsum dolor sit amet.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Right Side on Desktop-->
					<div class="space-y-4 shirink-0 relative hidden md:block">
						<h3 class="text-sm uppercase font-medium">On this page</h3>
						<h4 class="text-transparent bg-clip-text bg-radial-blue font-bold">Thank you</h4>
						<ul class="space-y-3 text-sm">
							<li class="relative">
								<button
									type="button"
									class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block  text-grey-2 hover:text-white"
									>Lorem ipsum</button
								>
							</li>
							<li class="relative">
								<button
									type="button"
									class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block text-grey-2 hover:text-white"
									>Lorem ipsum</button
								>
							</li>
						</ul>
						<h4 class="text-grey-2 font-semibold">Main libraries</h4>
						<ul class="space-y-3 text-sm">
							<li class="relative">
								<button
									type="button"
									class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block  text-grey-2 hover:text-white"
									>Lorem ipsum</button
								>
							</li>
							<li class="relative">
								<button
									type="button"
									class="pl-6 relative text-left outline-none ease-in-out duration-300 w-full block  text-grey-2 hover:text-white "
									>Lorem ipsum</button
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
