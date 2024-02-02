<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import AccountSettings from '$lib/components/pages/profile/AccountSettings.svelte';
	import Notifications from '$lib/components/pages/profile/Notifications.svelte';
	import PlansAndBilling from '$lib/components/pages/profile/PlansAndBilling.svelte';
	import TeamSettings from '$lib/components/pages/profile/TeamSettings.svelte';
	import SecuritySettings from '$lib/components/pages/profile/SecuritySettings.svelte';
	import { onMount } from 'svelte';
	import { showLoader, hideLoader } from '$lib/helpers/MiscHelpers';
	import { Workspace } from '$lib/store';

	let activated = 'account';
	const menuList = [
		{
			key: 'account',
			icon: Icons.settingsGearSolid,
			heading: 'Account',
			detail: 'Manage your public profile and private information'
		},
		{
			key: 'security',
			icon: Icons.lockIcon,
			heading: 'Security',
			detail: 'Manage your password and 2-step verification preferences'
		},
		{
			key: 'billing',
			icon: Icons.cardIcon,
			heading: 'Plans & Billing',
			detail: 'Manage your subscription, payment and billing information'
		},
		{
			key: 'notifications',
			icon: Icons.notificationIcon,
			heading: 'Notifications',
			detail: "Manage when you'll be notified on which channels"
		},
		{
			key: 'team',
			icon: Icons.threeCustomersSymbolIcon,
			heading: 'Team & Partner',
			detail: 'Manage your existing team and change roles/permissions'
		}
	];
	onMount(() => {
		showLoader('Fetching your preferences...');
		Workspace.subscribe(async (ws) => {
			hideLoader();
		});
	});
</script>

<svelte:head>
	<title>Profile Settings - OneTrack</title>
</svelte:head>
<div class="-my-3 -mx-2.5 md:-m-4 xl:-m-7 flex flex-col flex-1">
	<div class="space-y-4 flex flex-col flex-1">
		<div class="md:grid md:grid-cols-20 divide-y md:divide-y-0 md:divide-x divide-grey flex-1">
			<div class="md:col-span-7 lg:col-span-6 xl:col-span-4 divide-y divide-grey">
				<h2 class="text-2xl xl:text-3xl text-white leading-none font-bold py-7 px-8 flex gap-1">
					<span>Settings</span>
				</h2>
				<!-- class:active={menu.key == activated} -->
				<div class="relative">
					<ul class="divide-y divide-grey border-b border-grey hidden md:block">
						{#each menuList as menu}
							<li class="">
								<button
									type="button"
									class="text-white relative after:absolute after:inset-0 after:bg-radial-blue  hover:after:opacity-100 group after:ease-in-out after:duration-300 text-left py-2 w-full flex items-center justify-center min-h-32 {menu.key ==
									activated
										? 'after:opacity-100'
										: 'after:opacity-0'}"
									on:click={() => {
										activated = menu.key;
									}}
								>
									<span class="flex flex-1 gap-x-4 max-w-70 relative z-10 pl-8 pr-5">
										<span
											class="relative  top-1 ease-in-out duration-300 group-hover:text-white {menu.key ==
											activated
												? 'text-white'
												: 'text-blue'}"
										>
											<Icon
												data={menu.icon}
												stroke="transparent"
												class="w-4 h-4 "
												color="currentColor"
											/>
										</span>
										<span class="flex flex-col gap-1 text-sm">
											<b class="font-semibold capitalize">{menu.heading}</b>
											<span>{menu.detail}</span>
										</span>
									</span>
								</button>
							</li>
						{/each}
					</ul>
					<ul class="divide-x divide-grey flex flex-nowrap md:hidden">
						{#each menuList as menu}
							<li class="flex-1 flex items-stretch">
								<button
									class="py-2 px-1  text-xs sm:text-sm w-full flex items-center justify-center relative after:absolute after:inset-0 after:bg-radial-blue  hover:after:opacity-100 group after:ease-in-out after:duration-300 {menu.key ==
									activated
										? 'after:opacity-100'
										: 'after:opacity-0'}"
									type="button"
									on:click={() => {
										activated = menu.key;
									}}
								>
									<span class="relative z-10">{menu.heading}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div
				class="md:col-span-13 lg::col-span-14 xl:col-span-16 flex-1 flex items-center justify-center "
			>
				<div class="md:max-w-4xl mx-auto p-3 ml:p-5 flex-1 flex flex-col">
					{#if activated == 'account'}
						<AccountSettings />
					{:else if activated == 'security'}
						<SecuritySettings />
					{:else if activated == 'notifications'}
						<!-- <Notifications />  -->
						<div class="bg-slate-800 rounded-xl p-8  ">
							Notifications settings are being configured right now. These will be available soon.
						</div>
					{:else if activated == 'billing'}
						<!-- <PlansAndBilling />  -->
						<div class="bg-slate-800 rounded-xl p-8 ">
							Billing related settings are being configured right now. These will be available soon.
						</div>
					{:else if activated == 'team'}
						<!-- <TeamSettings /> -->
						<div class="bg-slate-800 rounded-xl p-8 ">
							Team and Workspace related settings are being configured right now. These will be
							available soon.
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
