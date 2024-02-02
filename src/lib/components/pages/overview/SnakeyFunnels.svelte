<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { fade } from 'svelte/transition';
	const funnelTag = [
		{
			icon: Icons.clockIcon,
			text: '2d 16h'
		},
		{
			icon: Icons.clockIcon,
			text: '1d 23h'
		},
		{
			icon: Icons.clockIcon,
			text: '1d 04h'
		},
		{
			icon: Icons.clockIcon,
			text: '1d 02h'
		},
		{
			icon: Icons.clockIcon,
			text: '0d 12h'
		},
		{
			icon: Icons.clockIcon,
			text: 'sr only'
		}
	];

	const funnelListCol1 = [
		{
			logo: Icons.meta,
			brand: 'Facebook'
		},
		{
			logo: Icons.tiktok,
			brand: 'TikTok'
		},
		{
			logo: Icons.pointer,
			brand: 'Direct traffic'
		}
	];
	let purchaseModel = false;
</script>

<div
	class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
>
	<div class="relative z-20 flex flex-col ">
		<div
			class="overflow-auto 2xl:overflow-visible on-hover-scroll shrink-0 max-w-ful before:bg-dropdown before:absolute before:inset-x-0 before:bottom-0 before:rounded-b-3xl before:opacity-70 before:backdrop-blur-2.5xl before:h-full before:max-h-[200px] after:border-t-4 after:border-blue after:absolute after:inset-x-0 after:bottom-[196px] after:h-1 after:z-10"
		>
			<div class="min-w-[1500px] 2xl:min-w-0   ">
				<div class="relative p-5 pb-0">
					<div class="relative">
						<h2 class="absolute text-xl text-white font-bold">Funnel</h2>
						<div class="grid grid-cols-6 divide-x divide-grey">
							{#each funnelTag as tag, i}
								<div class="flex justify-end shrink-0">
									<div
										class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:backdrop-blur-2.5xl w-32 translate-x-1/2 {i <
										funnelTag.length - 1
											? 'opacity-100 visible'
											: 'opacity-0 invisible'}"
									>
										<div class="relative z-10 flex justify-center text-sm py-2.5 px-3 gap-2">
											<Icon data={tag.icon} class="w-4 shrink-0" stroke="transparent" /><span
												>{tag.text}</span
											>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div
						class="flex-1 xl:max-h-[calc(100vh-26.5rem)] xl:overflow-auto on-hover-scroll mr-[-6px] relative "
					>
						<div class="grid grid-cols-6 divide-x divide-grey">
							<div class="space-y-3 py-5 pl-9 ml-px">
								{#each funnelListCol1 as listItem}
									<div
										class="bg-transparent rounded-full first-of-type:rounded-r-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-full first-of-type:before:rounded-r-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
									>
										<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
											<Icon data={listItem.logo} class="w-5 shrink-0" stroke="transparent" />
											<span>{listItem.brand}</span>
										</div>
									</div>
								{/each}
							</div>
							<div class="space-y-3 py-5 pl-9">
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<button
									on:click={() => {
										purchaseModel = !purchaseModel;
									}}
									type="button"
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl {purchaseModel
										? 'ring-green ring-1'
										: ''} before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-green ease-in-out duration-300"
								>
									<span class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</span>
								</button>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
							</div>

							<div class="space-y-3 py-5 pl-9">
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-l-md rounded-r-full  relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-l-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchasehh</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
							</div>

							<div class="space-y-3 py-5 pl-9">
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.tiktok} class="w-5 shrink-0" stroke="transparent" />
										<span>TikTok </span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
							</div>

							<div class="space-y-3 py-5 pl-9">
								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.meta} class="w-5 shrink-0" stroke="transparent" />
										<span>Facebook</span>
									</div>
								</div>
								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>

								<div
									class="bg-transparent rounded-md relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.pointer} class="w-5 shrink-0" stroke="transparent" />
										<span>Direct traffic</span>
									</div>
								</div>
							</div>

							<div class="space-y-3 py-5 pl-9">
								<div
									class="bg-transparent rounded-md rounded-r-full relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-md before:rounded-r-full shadow-glass-2 before:opacity-30 before:inset-0 w-48 hover:ring-1 hover:ring-blue ease-in-out duration-300"
								>
									<div class="relative z-10 items-center flex text-sm py-2.5 px-4 gap-2">
										<Icon data={Icons.shopifyIcon} class="w-5 shrink-0" stroke="transparent" />
										<span>Purchase</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{#if purchaseModel}
						<div
							transition:fade
							class="bg-color rounded-md before:rounded-md shadow-glass-2 before:absolute before:inset-0 before:opacity-70 before:bg-dropdown before:backdrop-blur-2.5xl w-56 absolute bottom-2 left-2"
						>
							<div class="relative z-10 px-4 py-3 space-y-2.5">
								<p class="flex gap-1.5 items-center text-sm font-semibold leading-none">
									Facebook <Icon data={Icons.arrowRight} class="w-3" stroke="transparent" /> Purchase
								</p>
								<p class="flex text-sm justify-between gap-1 w-full">
									<span>Count</span><b>123</b>
								</p>
								<p class="flex text-sm justify-between gap-1 w-full">
									<span>CV</span><b>$1,234.56</b>
								</p>
							</div>
						</div>
					{/if}
				</div>
				<div class="flex-1 xl:max-h-[200px] p-5 pt-0 relative ">
					<div class="grid grid-cols-6 divide-x divide-grey relative z-10">
						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>
						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left invisible">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>
						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left invisible">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>
						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left invisible">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>

						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left invisible">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>

						<div class="flex flex-col p-5 pt-7 space-y-3 shrink-0">
							<h3 class="text-sm font-semibold text-left invisible">Total through channel</h3>
							<div class="mt-auto w-full">
								<table class="w-full">
									<tr
										><td class="py-2 text-xs text-left">Purchased</td><th
											class="py-2 text-xs text-right font-semibold">234</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion value</td><th
											class="py-2 text-xs text-right font-semibold">$12,345.67</th
										></tr
									>
									<tr
										><td class="py-2 text-xs text-left">Conversion rate</td><th
											class="py-2 text-xs text-right font-semibold">100.00%</th
										></tr
									>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
