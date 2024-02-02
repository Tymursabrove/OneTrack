<script>
    import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
    import { goto } from '$app/navigation';
	import ReadmoreCardInputForm from '../ReadmoreCardInputForm.svelte';
    import { fly, slide } from 'svelte/transition';
    import Tooltip from '$lib/components/layout/MTooltip.svelte';
    import Button from '$lib/components/library/Button.svelte';
    const readmorecards = [
        {         
            name:'Name',
            type:'',
            label:'Value'        
        }, 
        {         
            name:'Name',
            type:'',
            label:'Value'        
        },  
        {         
            name:'Name',
            type:'',
            label:'Value'        
        },  
        {         
            name:'Name',
            type:'',
            label:'Value'        
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
					<Icon data={Icons.screenResolation} class="w-7 text-white" stroke="transparent" />
				</div>

                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <h3
                            class="text-sm sm:text-base 2xl:text-lg text-white leading-none font-medium"
                        >
                        Input Form: NameXYZ
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
                    <p class="text-xs leading-none text-grey-2">
                        Order ID: <b class="font-medium">xfg3245wr35</b>
                    </p>
                </div>
            </div>
            <div class="text-white text-right font-medium text-sm xl:text-base">
                25.04.2022, 16:27
            </div>
        </div>
        <div class="w-full rounded-2xl leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar" >
			<div class="relative z-10 flex justify-between p-3 xl:px-6">
				<div class="flex flex-1 items-start gap-3">
					<div class="xl:w-10 shrink-0">
						<Icon data={Icons.worldWideWebIcon} stroke="transparent" class="w-4 sm:w-7 shrink-0" />
					</div>
					<div class="space-y-1 flex-1">
					    <p class="leading-none text-xs xl:text-base font-medium text-white">Page Title Page XYZ</p>						 
						<div class="flex flex-wrap 2xl:flex-nowrap gap-2">
							<p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">Page URL</p>
							<button class="text-transparent bg-clip-text bg-radial-blue hover:bg-radial-green-2 group font-semibold text-left gap-1 text-xs xl:text-sm leading-snug"
								on:click={() => {
									goto(`https://www.one-track.io/pricing`);
								}} >
								<span class="underline inline ease-in-out duration-300 border-b border-blue group-hover:border-green">https://www.one-track.io/pricing</span>
								<Icon data={Icons.outputArrow}
                                class="w-3 shrink-0 inline text-blue group-hover:text-green ease-in-out duration-300 relative bottom-[2px]"
									stroke="transparent" />
							</button>
						</div>
						 		 		 
					</div>
				</div>
			</div>
		</div>  
        <div class="space-y-3">
            {#if readMore}
                <div class="pt-1 gap-3 flex flex-col sm:grid sm:grid-cols-2" transition:slide>
                    {#each readmorecards as item}
                    <ReadmoreCardInputForm  name={item.name} type={item.type} label={item.label} />
                    {/each}
                </div>
            {/if}
            <div class="flex justify-end px-3 xl:px-6">
                <Button label="Read {readMore ? 'Less' : 'More'}" theme="!shadow-none !border-0 !p-0 !h-7 " labelClass="text-transparent bg-clip-text bg-radial-blue font-semibold text-sm xl:text-base" iconRight={Icons.triangleSymbolIcon} iconRightClass="w-3 h-3 text-blue {readMore ? 'rotate-180' : ''}" onClickFunc={() => {
                    readMore = !readMore;
                }} />
            </div>
        </div>
    </div>
</div>

<!-- Cards End-->
