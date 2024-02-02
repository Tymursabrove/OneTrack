<script lang="ts">
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { closeModal, openModal } from 'svelte-modals';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import configrationModal from './configrationModal.svelte';
	import { fly } from 'svelte/transition';
	

	function handleBack() {
		closeModal();
		openModal(configrationModal, {});
	}

	export let isOpen: boolean;

    const selectOption = [
        {
            id:'cogs',
            label:'Only missing COGS',
        }, 
        {
            id:'sold',
            label:'Recently sold',
        },
        {
            id:'draft',
            label:'Show draft',
        },
    ]

	const productionCost = [
		{
			icon: Icons.shopifyFill,
			productName: 'Product Name',
			productId: '#HU1244256',
			sellingPrice: '$499',
			itemsQuantity: '1',
			 
		},
        {
			icon: Icons.singleCustomerIcon,
			productName: 'Product Name',
			productId: '#HU1244256',
			sellingPrice: '$499',
			itemsQuantity: '1',
			 
		},
        {
			icon: Icons.shopifyFill,
			productName: 'Product Name',
			productId: '#HU1244256',
			sellingPrice: '$499',
			itemsQuantity: '1',
			 
		},
        {
			icon: Icons.shopifyFill,
			productName: 'Product Name',
			productId: '#HU1244256',
			sellingPrice: '$499',
			itemsQuantity: '1',
			 
		},
        {
			icon: Icons.shopifyFill,
			productName: 'Product Name',
			productId: '#HU1244256',
			sellingPrice: '$499',
			itemsQuantity: '1',
			 
		},
	];

//  if (isOpen){
//     document.body.classList.add('overflow-hidden')
//  }
//  else if (!isOpen) {
//     document.body.classList.remove('overflow-hidden') 
//  }

</script>
 
{#if isOpen}

	<div
		class="fixed inset-0 z-50 flex p-3 items-center justify-center "
		in:fly={{ y: -50, duration: 500 }}
		out:fly={{ y: -50, duration: 300 }}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true" >
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed inset-0 bg-black/70 transition-opacity cursor-default"
			on:click={closeModal} />
		<div class="relative max-h-full flex flex-col p-3 text-left transition-all sm:my-5 w-full max-w-4xl rounded-3xl border border-grey-4 backdrop-blur-md before:bg-dropdown-2 before:opacity-30 before:shadow-dropdown-2 before:ease-in-out before:duration-300 before:absolute before:inset-0 before:rounded-3xl"
		>
			<div class="relative max-w-full flex-1 flex flex-col rounded-3xl " >
				<div class="flex flex-wrap justify-between gap-3 py-3 sm:p-5 xl:p-10 xl:pb-6">
					<h3 class="text-2xl 2xl:text-4xl font-bold text-white">Data Settings</h3>
					<div class="flex gap-2">
						<button  on:click={handleBack}
							type="button"
							class="relative inline-flex items-center justify-center rounded-full bg-transparent sm:min-w-28 p-3 px-5 text-sm font-medium text-white shadow-sm hover:border-green hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:opacity-0 after:rounded-full after:inset-0 after:bg-radial-red after:absolute hover:shadow-glow-red before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute"
						>
							<span class="relative z-10 leading-none">Back</span>
						</button>
						<button on:click={closeModal}
							type="button"
							class="  relative inline-flex items-center justify-center rounded-full border-0 shadow-glow-blue hover:shadow-glow-green text-white sm:min-w-28 p-3 px-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green ring-offset-color ease-in-out duration-300 focus:ring-offset-2 before:bg-blue-box before:rounded-full before:ease-in-out before:duration-300 after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:opacity-0 after:opacity-0 after:rounded-full after:bg-radial-green-2 before:inset-0 after:inset-0 before:absolute after:absolute "
						>
							<span class="relative z-10 leading-none">
								<span class="relative z-10 leading-none">Save</span>
							</span>
						</button>
					</div>
				</div>
                
				<div class="space-y-5 overflow-auto on-hover-scroll flex-1 max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-15rem)] pb-3 sm:p-5 sm:pt-0 xl:p-10 xl:pt-0">
                    <div class="space-y-3">
                    <div class="flex flex-wrap justify-between gap-5">
                        <div class="space-y-2">
                            <h3 class="text-xl sm:text-2xl font-semibold leading-tight">
                                What are your production costs?
                            </h3>
                            <p class="text-sm">
                                Fill in empty fields in the Cost Per Item column below.
                            </p>
                        </div>
                        <div class="relative w-56 flex items-center">
                            <label for="search" class="sr-only">Search</label>
                            <div class="pointer-events-none absolute inset-y-0 left-0 w-10 hidden xs:flex items-center justify-center z-10" >
                                <Icon data={Icons.searchIcon} stroke="transparent" class="w-4 h-4  text-white" />
                            </div>
                            <div class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full" >
                                <input
                                    class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3 xs:pl-10 outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
                                    type="search"
                                    id="search"
                                    placeholder="Search"
                                    name="search"
                                    
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3 md:gap-5">
                        {#each selectOption as option}
                        <div class="relative">
                            <CheckBox
                                labelClass="relative z-10 leading-none font-medium"
                                id={option.id}
                                span="before:w-5 before:h-5 relative before:border before:border-grey before:rounded-sm block after:left-1.5 after:top-1.5 after:-mt-px after:-ml-px after:absolute after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:before:bg-blue-box peer-checked:before:border-blue pl-7 before:absolute before:left-0"
                                label={option.label}
                                classes="relative cursor-pointer "
                            />
                        </div>
                        {/each}
                    </div>
                    </div>
					<div class="space-y-4">                     
                        
                            <div class="hidden md:grid md:grid-cols-12 gap-4 p-3 pb-0 md:p-5 md:pb-0  ">
                                <div class="text-sm font-semibold shrink-0 col-span-4">Product</div>
                                <div class="text-sm font-semibold shrink-0 col-span-2">Selling Price</div>
                                <div class="text-sm font-semibold shrink-0 col-span-2">Items</div>
                                <div class="text-sm font-semibold shrink-0 col-span-2">Source</div>
                                <div class="text-sm font-semibold shrink-0 col-span-2 truncate">Cost per Item</div>
                            </div>
                      
						{#each productionCost as cost}
							<div class="w-full bg-transparent rounded-3xl relative before:absolute before:bg-glass hover:ring-blue hover:ring-2 before:backdrop-blur-2.5xl before:rounded-3xl before:shadow-glass-dropdown before:opacity-30 before:inset-0 before:ease-in-out before:duration-300">
								<div class="relative z-10 flex flex-wrap justify-between md:grid md:grid-cols-12 gap-2 md:gap-4 p-3 md:p-5 items-center">
                                    <div class="shrink-0 md:col-span-4 flex gap-2 md:gap-4 items-center">                                        
                                            <div class="flex-shrink-0">
                                              <img class="md:h-14 md:w-14 h-10 w-10 rounded-md" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                                            </div>
                                            <div class="min-w-0 flex-1 space-y-0.5">                                              
                                                <p class="text-sm font-semibold">{cost.productName}</p>
                                                <p class="truncate text-sm text-grey-2">{cost.productId}</p>                                             
                                            </div>                                       
                                    </div>
                                    <div class="text-sm font-semibold shrink-0 col-span-2">
                                        <p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Last update</p>
                                        {cost.sellingPrice}</div>
                                    <div class="text-sm font-semibold shrink-0 col-span-2">
                                        <p class="text-xs text-grey-2 md:hidden whitespace-nowrap">Last update</p>
                                        {cost.itemsQuantity}</div>
                                    <div class="text-sm font-semibold shrink-0 col-span-2"><Icon data={cost.icon} class="w-6" stroke="transparent" /></div>
                                    <div class="text-sm font-semibold shrink-0 col-span-2 flex gap-1.5 md:gap-3 items-center">
                                        <div class="relative w-20 max-w-full flex items-center">
                                            <label for={'id'} class="sr-only">$9</label>
                                            <div
                                                class="relative before:rounded-md before:shadow-glass-2 before:absolute before:inset-0 before:bg-dropdown before:opacity-70 before:backdrop-blur-2.5xl w-full"
                                            >
                                                <input
                                                    class="border relative z-10 border-transparent ease-in-out duration-500 bg-transparent block max-w-full text-left placeholder-white focus:outline-none rounded-md focus:border-blue focus:ring-blue text-sm p-3  outline-none leading-none peer invalid:border-red invalid:text-red h-11 w-full"
                                                    type="text"
                                                    id={'id-2'}
                                                    placeholder="$9"
                                                    name={'id-2'}
                                                />
                                            </div>
                                        </div>
                                        <button
                                        class="w-8 h-8 shrink-0 rounded-full flex justify-center items-center relative after:ease-in-out after:duration-300 hover:after:opacity-100 hover:before:after-100 after:opacity-0 after:rounded-full after:bg-radial-green-2 after:absolute after:inset-0"
                                        ><span class="relative z-10 leading-none">
                                            <Icon data={Icons.reload} stroke="transparent" class="w-4" /></span
                                        ></button> 
                                    </div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
