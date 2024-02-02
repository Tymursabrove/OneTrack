<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { currencyCustomSymbolFormatter } from '$lib/helpers/MiscHelpers';
	export let image: string;
	export let title: string;
	export let price: number;
	export let id: string;
	export let link: string;
	export let currency: string;
	export let quantity: number;
	export let variant: string;
	export let sku: string;
	export let categories: string[];
</script>

<!-- Cards -->
<div
	class="w-full rounded-2xl leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar"
>
	<div
		class="relative z-10 p-3 flex flex-col sm:grid sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 divide-grey-4"
	>
		<div class="shrink-0 flex gap-3 2xl:gap-5">
			<div class="w-20 2xl:w-24">
				<img src={image} alt="" class="object-cover rounded-md shadow-sidebar" />
			</div>
			<div class="space-y-2 pb-4 sm:pb-0 sm:pr-2">
				<h3 class="font-medium text-xs 2xl:text-sm text-white leading-snug">
					{title}
				</h3>
				<p class="text-sm 2xl:text-lg leading-none font-semibold text-white">
					{currencyCustomSymbolFormatter(price, currency)}
				</p>
				<p class="text-xs leading-none text-grey-2">{id}</p>
				''
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="text-transparent bg-clip-text bg-radial-blue font-semibold flex items-center text-left gap-1 text-xs leading-snug cursor-pointer"
					on:click={() => {
						window.open(`${link}`, '_blank');
					}}
				>
					<span>Product Page</span>
					<Icon size="small" name="output-arrow" class=" text-blue" stroke="transparent" />
				</div>
			</div>
		</div>
		<div class="sm:pl-5 pt-5 sm:pt-0 space-y-3">
			<!-- Tag -->
			<div class="flex gap-2">
				{#each categories as category}
					<div
						class="shadow-glass bg-blue-box py-0.5 px-3 leading-none rounded-full text-white font-medium text-xs"
					>
						{category}
					</div>
				{/each}
			</div>
			<div
				class="space-y-1 max-w-full w-40 grid grid-cols-2 gap-1 items-center text-xs leading-none"
			>
				<p class="text-white">Quantity</p>
				<p class="font-semibold text-white">{quantity}</p>
				<p class="text-white">Variant</p>
				<p class="font-semibold text-white">{variant}</p>
				<p class="text-white">SKU</p>
				<p class="font-semibold text-white">{sku}</p>
			</div>
		</div>
	</div>
</div>

<!-- Cards End-->
