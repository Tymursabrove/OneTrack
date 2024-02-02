<script>
 
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	export let logo;
	export let platform;
	export let label;
	export let value;


 
 
 
    
</script>


		<div class="flex flex-row-reverse items-start justify-between gap-2">
			<div class="flex gap-2">
				<Icon data={Icons.infoIcon} stroke="transparent" class="w-4" />
				<Icon data={Icons.sideMenuIcon} stroke="transparent" class="w-5" />
			</div>
			<p class="text-sm font-semibold text-white flex items-center gap-2 capitalize">
				<Icon data={logo} stroke="transparent" class="text-white w-4 h-4"/><span class="tracking-wider">{platform}</span>
			</p>		      
		</div>

		<div class="space-y-0.5 text-center">
			<p class="text-sm">{label}</p>
			<p class="text-xl leading-none font-semibold ">{value}</p>
		</div>
        	 
	 
