<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';

	const consent = [
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Facebook'
		},
		{
			icon: Icons.checkIcon,
			iconColor: 'text-green',
			platform: 'Google'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'TikTok'
		},
		{
			icon: Icons.checkIcon,
			iconColor: 'text-green',
			platform: 'LinkedIn'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Twitter'
		},
		{
			icon: Icons.checkIcon,
			iconColor: 'text-green',
			platform: 'Pinterest'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Instagram'
		},
		{
			icon: Icons.checkIcon,
			iconColor: 'text-green',
			platform: 'YouTube'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Snapchat'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Google Ads'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Google Analytics 3'
		},
		{
			icon: Icons.crossIcon,
			iconColor: 'text-red',
			platform: 'Google Analytics 4'
		}
	];
</script>

<!-- Cards -->
<div class="relative rounded-2xl border border-grey-4 bg-bglinear-4 shadow-sidebar p-5 " >
	<div class="relative z-10 space-y-3">
		<div class="flex justify-between items-center sm:px-3 xl:px-6 gap-2">
			<div class="flex items-center gap-3">
				<div class="flex justify-start items-start xl:w-10 shrink-0">
					<Icon data={Icons.securityHand} class="w-7 text-white" stroke="transparent" />
				</div>

				<div class="space-y-1">
					<div class="flex items-center gap-2">
						<h3 class="text-sm sm:text-base 2xl:text-lg text-white leading-none font-medium">
							Consent
						</h3>

						<Tooltip top>
							<Icon data={Icons.infoIcon} stroke="transparent" class="w-3" />
							<span slot="tip" class="flex gap-2 leading-tight text-xs"
								><Icon data={Icons.infoIcon} stroke="transparent" class="w-4 shrink-0" />Information
								goes here</span
							>
						</Tooltip>
					</div>
				</div>
			</div>
			<div class="text-white text-right font-medium text-sm xl:text-base">25.04.2022, 16:27</div>
		</div>
		<div class="sm:grid sm:grid-cols-2 flex flex-col gap-3">
			{#each consent as consent}
				<div
					class="w-full rounded-full leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar">
					<div class="relative z-10 gap-2 flex items-center py-2 px-3 xl:px-6">
						<div class="xl:w-10 shrink-0 {consent.iconColor}">
							<Icon data={consent.icon} stroke="transparent" class="w-5" />
						</div>
						<p class="font-medium text-sm 2xl:text-base">{consent.platform}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Cards End-->
