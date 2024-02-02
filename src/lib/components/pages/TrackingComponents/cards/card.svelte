<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	export let heading;
	export let detail;
	export let Icons;
	export let IconColor;
	export let border;

</script>

<div
	class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-1 before:rounded-3xl before:shadow-dropdown before:opacity-30 before:inset-0 rounded-3xl after:rounded-3xl after:absolute after:inset-0 after:border {border}"
>
	<div class="relative z-10 p-5 px-7 text-left space-y-3">
		<div class="flex gap-4">
			<Icon data={Icons} stroke="transparent" class="w-7 shrink-0 {IconColor}" />
			<h4 class="text-lg font-semibold text-white leading-snug">
				{heading}
			</h4>
		</div>
		<p class="text-sm leading-snug">
			{detail}
		</p>
	</div>
</div>
