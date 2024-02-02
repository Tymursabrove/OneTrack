<script lang="ts">
	export let name: string;
	export let type: string;
	export let label: string;
</script>

<!-- Cards -->

<div
	class="w-full rounded-2xl leading-snug relative ease-in-out duration-300 before:ease-in-out before:duration-500 before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0"
>
	<div class="relative z-10 py-3 px-5 space-y-2">
		<h3 class="font-medium text-sm 2xl:text-base text-white leading-snug">
			{name}
		</h3>
		<div class="flex gap-2">
			<p class="w-16 xl:w-20 shrink-0 leading-none text-xs sm:text-sm text-white">Type</p>
			<p class="font-medium flex items-center text-left gap-1 text-xs sm:text-sm leading-snug">
				{type}
			</p>
		</div>
		<div class="flex gap-2">
			<p class="w-16 xl:w-20 shrink-0 leading-none text-xs sm:text-sm text-white">Label</p>
			<p class="font-medium flex items-center text-left gap-1 text-xs sm:text-sm leading-snug">
				{label}
			</p>
		</div>
	</div>
</div>

<!-- Cards End-->
