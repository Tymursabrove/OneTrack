<script>
    import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import ReadmoreCard from '../ReadmoreCard.svelte';
    import { fly, slide } from 'svelte/transition';
    import Tooltip from '$lib/components/layout/MTooltip.svelte';
    const readmorecards = [
    {
        image:'/images/placeholder.jpg',
        title:'Fancy Sports Car T3',
        price:'$123.99',
        id:'id-xyz123abc45',
        link:'',
        quantity:'2',
        variant:'12gsw4fws3',
        sku:'12345',
    },
    {
        image:'/images/placeholder.jpg',
        title:'Fancy Sports Car T3',
        price:'$123.99',
        id:'id-xyz123abc45',
        link:'',
        quantity:'2',
        variant:'12gsw4fws3',
        sku:'12345',
    },
    {
        image:'/images/placeholder.jpg',
        title:'Fancy Sports Car T3',
        price:'$123.99',
        id:'id-xyz123abc45',
        link:'',
        quantity:'2',
        variant:'12gsw4fws3',
        sku:'12345',
    }, 
  ]
    let readMore = false;

</script>
<!-- Cards -->
<div class="relative rounded-2xl border border-grey-4 bg-bglinear-4 shadow-sidebar p-5 " >
    <div class="relative z-10 space-y-3">
        <div class="flex justify-between items-center sm:px-3 xl:px-6 gap-2">
            <div class="flex items-center gap-3">
                <div class="flex justify-start items-center xl:w-10 shrink-0">
					<Icon data={Icons.desktopError} class="w-6 text-white" stroke="transparent" />
				</div>

                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <h3
                            class="text-sm sm:text-base 2xl:text-lg text-white leading-none font-medium"
                        >
                        Error
                        </h3>

                          <Tooltip top>
                            <Icon data={Icons.infoIcon} stroke="transparent" class="w-3" />
                            <span slot="tip" class="flex gap-2 leading-tight text-xs"
                                ><Icon
                                    data={Icons.infoIcon}
                                    stroke="transparent"
                                    class="w-4 shrink-0"
                                />Information goes here</span
                            >
                        </Tooltip>
                    </div>
                    
                </div>
            </div>
            <div class="text-white text-right font-medium text-sm xl:text-base">
                25.04.2022, 16:27
            </div>
        </div>
        <div class="w-full rounded-full leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar" >
            <div class="relative z-10 flex justify-between py-2 px-3 xl:px-6">
                <div class="flex items-center gap-3">
                    <div class="xl:w-10 shrink-0">
                        <Icon
                            data={Icons.exclamation}
                            stroke="transparent"
                            class="w-4 sm:w-7 shrink-0"
                        />
                    </div>
                    <div class="flex gap-2">
                        <p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">Error</p>
                        <p  class="font-medium flex items-center text-left gap-1 text-xs xl:text-sm leading-snug" >
                            Error Message Lorem ipsum
                        </p>
                    </div>
                </div>
                 
            </div>
        </div>
        
    </div>
</div>

<!-- Cards End-->
