<script lang="ts">
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
	import SlotButton from '$lib/components/common/SlotButton.svelte';
	import Icon from '$lib/components/common/Icon.svelte';

	export let onClickHandler: () => void;
	export let iconString: SpriteIconName;
	export let name: string;
	export let isNew: boolean = false;
</script>

<SlotButton onClickFunc={onClickHandler} theme="before:bg-bglinear-4 after:bg-linear-blue">
	<div
		class="relative z-10 flex flex-col gap-4 text-center h-40 justify-center items-center shrink-0"
	>
		<div class="w-20 h-20 rounded-full flex justify-center items-center">
			<Icon name={iconString} size="large" interactive={true}/>
		</div>
		<h3 class="text-white text-base font-semibold">{name}</h3>
		{#if isNew}
			<span
				class="border rounded inline-flex uppercase px-1.5 text-xs gap-1 py-1 mr-1 leading-none border-white text-white bg-transparent"
				>New
				<Icon name="testtube" size="small" />
			</span>
		{/if}
	</div>
</SlotButton>
