<script>
    import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
    import { fly } from 'svelte/transition';   
 
</script>
<div class="w-48 z-50 rounded-xl border border-grey-4 bg-bglinear-4 shadow-sidebar absolute bottom-full mb-2 p-3 -right-14 backdrop-blur-md" transition:fly >
    <div class="flex gap-1 items-center">
        <div class="w-8 h-8 shrink-0 flex justify-center items-center text-white relative" >
            <Icon
                data={Icons.shopify}
                class="object-cover aspect-square w-full"
                stroke="transparent"
            />
        </div>
        <div class="space-y-0.5 text-left">
            <h2 class="text-white text-sm leading-none font-medium capitalize  "
            >
                Purchase
            </h2>
            <p class="text-xs text-grey w-40 truncate">Order Id: xsf5jjg</p>
        </div>
    </div>
    <p class="text-sm py-2 text-left">25.04.2022, 16:27</p>
    <div class="flex gap-1 ">
        <Icon data={Icons.cartCheck} stroke="transparent" class="h-5" />
        <p class="text-sm">3 Items</p>
    </div>
    <p class="pt-2 text-left"><span class="text-xs">Total:</span> $1234.99</p>
</div>