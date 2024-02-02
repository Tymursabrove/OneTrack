<script lang="ts">
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
	import Icon from '$lib/components/common/Icon.svelte';
	export let icon: SpriteIconName | null = null;
	export let device: string | null = null;
	export let system: string | null = null;
	export let browser: string | null = null;
	export let screen: string | null = null;
	export let window: string | null = null;
	export let osVersion: string | null = null;
	export let browserVersion: string | null = null;
</script>

<div
	class="w-52 shrink-0 bg-transparent relative border border-grey-4 rounded-xl bg-bglinear-4 shadow-sidebar"
>
	<div class="relative z-10 p-3 space-y-1">
		<p class="text-xs font-semibold text-white flex gap-2">
			<Icon name={icon ?? 'mobile'} />
			<span class="tracking-wider drop-shadow-md">{device}</span>
		</p>

		<div class="grid grid-cols-2 gap-2 gap-y-3 py-1">
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">OS</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">{system ?? '-'}</p>
			</div>
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">OS Version</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">
					{osVersion ?? '-'}
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">Browser</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">{browser ?? '-'}</p>
			</div>
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">Browser Version</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">
					{browserVersion ?? '-'}
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">Screen Res</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">{screen ?? '-'}</p>
			</div>
			<div class="flex flex-col gap-1">
				<p class="text-xs font-light leading-none drop-shadow-md">Window Res</p>
				<p class="font-semibold text-xs text-left leading-none drop-shadow-md">{window ?? '-'}</p>
			</div>
		</div>
	</div>
</div>
