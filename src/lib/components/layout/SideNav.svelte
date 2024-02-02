<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher, tick } from 'svelte';
	import { slide, fly } from 'svelte/transition';
	import { menus } from '$lib/resources/SideNavResources';
	import { closeModal } from 'svelte-modals';

	export let hidden = true;

	const dispatch = createEventDispatcher();

	let title = 'Home';

	function gotoUrl(link: { href: string; title: string }) {
		title = link.title;
		dispatch('didRouting', { url: link.href });
		goto(link.href);
	}
	async function handleCloseClick() {
		hidden = true;
		await tick();
		closeModal();
	}
</script>

<svelte:head>
	<title>{title} - OneTrack</title>
</svelte:head>
<!-- transition:slide -->
<aside
	in:fly={{ x: -50, duration: 250 }}
	out:fly={{ x: -50, duration: 250 }}
	class="md:w-64 flex-col max-h-full fixed inset-0 z-40 lg:flex"
	class:hidden
>
	<div class="fixed inset-0 bg-color opacity-50 lg:hidden" />

	<div
		class="flex flex-col flex-1 w-64 lg:w-auto max-w-full relative z-20 max-h-full min-h-screen bg-color/50 lg:bg-transparent before:bg-bglinear-5 before:shadow-sidebar before:absolute before:inset-x-0 before:-inset-y-3 backdrop-blur-md border-r border-grey-4"
	>
		<div class="lg:mx-5 flex justify-center items-stretch border-b border-grey gap-1 relative z-10">
			<h1 class="sr-only uppercase">OneTrack</h1>
			<button
				type="button"
				class="py-5 px-3 flex-1 flex justify-center items-center cursor-pointer outline-none"
				on:click|preventDefault={() => {
					gotoUrl({
						href: '/',
						title: 'Home'
					});
				}}
			>
				<Icon
					data={Icons.oneTrackLightGreyFullNameIcon}
					class="lg:h-10 h-7"
					fill="currentColor"
					stroke="currentColor"
				/>
			</button>
			<button
				class="border-l border-grey py-2 px-5 flex justify-center items-center lg:hidden outline-none"
				on:click={handleCloseClick}
			>
				<Icon data={Icons.crossIcon} class="w-6 h-6" color="currentColor" />
			</button>
		</div>

		<nav
			class="overflow-y-auto overflow-x-hidden on-hover-scroll no-scroll-track flex-1 py-5 gap-5 flex flex-col max-h-full relative z-10"
		>
			{#each menus as menu}
				<section class="flex flex-col gap-3">
					{#if menu.heading != null}
						<h3 class="text-transparent bg-clip-text bg-radial-blue font-semibold uppercase px-4">
							{menu.heading}
						</h3>
					{/if}
					<ul class="space-y-1">
						{#each menu.links as link}
							<li>
								<button
									type="button"
									class="py-2.5 pr-4 cursor-pointer w-full flex items-center justify-start rounded leading-snug relative pl-14 transition-all ease-in-out duration-300 disabled:opacity-25 outline-none {link.href ==
									$page.url.pathname
										? 'shadow-glow-blue text-white bg-blue-box'
										: 'text-grey-2 hover:text-white hover:bg-white/3'}"
									on:click|preventDefault={() => {
										gotoUrl(link);
									}}
									disabled={link.href === ''}
								>
									<span
										class="absolute inset-y-0 left-0 inline-flex items-center w-16 justify-center"
									>
										<Icon data={link.svg} class="w-5 h-5" stroke="transparent" />
									</span>
									<span class="flex-1 text-left">{link.title}</span>

									{#if link.showBadge}
										{#if link.isInBeta}
											<span
												class="border rounded inline-flex uppercase px-1.5 text-xs gap-1 py-1 mr-1 leading-none {link.href ==
												$page.url.pathname
													? 'border-white text-white bg-transparent'
													: 'text-grey-2 border-grey bg-radial-gray'}"
												>New <Icon
													data={Icons.testtube}
													class="w-3 shrink-0"
													stroke="transparent"
												/>
											</span>
										{:else}
											<span
												class="border rounded inline-flex uppercase px-1.5 text-xs gap-1 py-1 mr-1 leading-none {link.href ==
												$page.url.pathname
													? 'border-white text-white bg-transparent'
													: 'text-grey-2 border-grey bg-radial-gray'}"
												>Soon <Icon data={Icons.rocket} class="w-3 shrink-0" stroke="transparent" />
											</span>
										{/if}
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</nav>
	</div>
</aside>
