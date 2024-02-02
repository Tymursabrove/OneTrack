<script lang="ts">
    import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
    import { onMount, tick } from 'svelte';
    import { hideLoader } from '$lib/helpers/MiscHelpers';
    import Swiper, { Navigation, Pagination } from 'swiper';
	// import Swiper and modules styles
	import 'swiper/swiper-bundle.css';
	//   import 'swiper/css/navigation';
	//   import 'swiper/css/pagination';
    // export let type = 'other';
	onMount(async () => {
	 
     await tick();
     hideLoader();

     const swiper = new Swiper('.swiper', {
         // Optional parameters
         slidesPerView: 1,
         spaceBetween: 0,
         modules: [Navigation, Pagination],
         // direction: 'vertical',
         loop: true,

         // If we need pagination
         pagination: {
             el: '.swiper-paginations',
             type: 'fraction',
             formatFractionCurrent: function (number) {
             return number + " - " + (number + 3);
                 }
             },

         // Navigation arrows
         navigation: {
             nextEl: '.swiper-next',
             prevEl: '.swiper-prev'
         },

         // And if we need scrollbar
         scrollbar: {
             el: '.swiper-scrollbar'
         },



         breakpoints: {
         
           640: {
            slidesPerView: 2,              
        },
           992: {
            slidesPerView: 3,              
        },
           1024: {
            slidesPerView: 2,              
        },
           1280: {
            slidesPerView: 3,              
        },
           1540: {
            slidesPerView: 4,              
        },
       
    },


     });
 });

 const bestsellers = [
		{
			productName: 'Product with a long descriptive Least Profitable',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive Least Profitable',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive Least Profitable',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive Least Profitable',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive name',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive name',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		},
		{
			productName: 'Product with a long descriptive name',
			sales: {
				title: 'Sales',
				value: '23'
			},
			totalSales: {
				title: 'Total Sales',
				value: '$1,234.56'
			},
			profit: {
				title: 'Profit',
				value: '$1,234.56'
			},
			profitMargin: {
				title: 'Profit Margin',
				value: '23%'
			}
		}
	];
</script>
<div class="flex flex-col">
    <div class="flex justify-end py-2 xs:py-0 xs:h-11">
        <div class="flex flex-wrap gap-3 items-center">
            <div class="relative flex gap-1">
                <label
                    for="products"
                    class="text-white relative group cursor-default flex items-center px-2 gap-2 "
                >
                    <input
                        type="radio"
                        id="products"
                        name="add-option"
                        class="peer sr-only"
                        value="products"
                        
                    />
                    <span
                        class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
                        ><span class="sr-only">Products</span></span
                    >
                    <span class="text-sm">Products</span>
                </label>
                <label
                    for="variants"
                    class="text-white relative group cursor-default flex items-center px-2 gap-2"
                >
                    <input
                        type="radio"
                        id="variants"
                        name="add-option"
                        class="peer sr-only"
                        value="variants"
                    />
                    <span
                        class="border-2 border-white w-6 h-6 rounded-full inline-flex items-center justify-center relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-blue-box after:opacity-0 peer-checked:after:opacity-100 after:transitions gruop-hover:after:opacity-100"
                        ><span class="sr-only">Variants</span></span
                    >
                    <span class="text-sm">Variants</span>
                </label>
            </div>
            <div class="flex gap-3 justify-center xs:justify-end items-center">
                <div class="swiper-paginations text-sm font-medium hidden xs:block"></div>
                <div class="flex gap-1">
                    <div
                        class="swiper-prev bg-white/10 ease-in-out duration-300 border border-white/10 w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue"
                    >
                        <Icon
                            data={Icons.triangleSymbolIcon}
                            stroke="transparent"
                            class="h-2 rotate-90 -ml-0.5"
                        />
                    </div>
                    <div
                        class="swiper-next bg-white/10 ease-in-out duration-300 border border-white/10 w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue"
                    >
                        <Icon
                            data={Icons.triangleSymbolIcon}
                            stroke="transparent"
                            class="h-2 -rotate-90 -mr-0.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-transparent rounded-b-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-b-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col" >
        <div class="relative z-10 px-5 pt-3 pb-1 flex-col flex flex-1">
            <div class="w-full">
                <div class="swiper -mr-3">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        {#each bestsellers as bestseller}
                            <div class="swiper-slide">                       
                                <div class="py-2 pl-3 pr-5 pb-7">
                                    <div class="bg-transparent rounded-3xl relative before:absolute before:bg-glass before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 flex flex-col" >
                                        <div class="relative z-10 divide-y divide-grey">
                                            <div class="flex gap-4 p-3 2xl:p-5 items-center">
                                                <span class="rounded-md bg-blue-box w-12 h-8 block" />
                                                <p class="text-sm leading-tight max-w-full line-clamp-2 w-52">
                                                    {bestseller.productName}
                                                </p>
                                            </div>
                                            <div class="grid grid-cols-2 gap-y-5 gap-x-1 p-3 2xl:p-5 ">
                                                <div class="space-y-1.5">
                                                    <p class="leading-none text-sm font-medium">
                                                        {bestseller.sales.title}
                                                    </p>
                                                    <p class="text-xl md:text-2xl leading-none font-bold">
                                                        {bestseller.sales.value}
                                                    </p>
                                                </div>
                                                <div class="space-y-1.5">
                                                    <p class="leading-none text-sm font-medium">
                                                        {bestseller.totalSales.title}
                                                    </p>
                                                    <p class="text-xl md:text-2xl leading-none font-bold">
                                                        {bestseller.totalSales.value}
                                                    </p>
                                                </div>
                                                <div class="space-y-1.5">
                                                    <p class="leading-none text-sm font-medium">
                                                        {bestseller.profit.title}
                                                    </p>
                                                    <p class="text-xl md:text-2xl leading-none font-bold">
                                                        {bestseller.profit.value}
                                                    </p>
                                                </div>
                                                <div class="space-y-1.5">
                                                    <p class="leading-none text-sm font-medium">
                                                        {bestseller.profitMargin.title}
                                                    </p>
                                                    <p class="text-xl md:text-2xl leading-none font-bold">
                                                        {bestseller.profitMargin.value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        {/each}                
                    </div>                              
                </div>
            </div>
        </div>
    </div>
</div>