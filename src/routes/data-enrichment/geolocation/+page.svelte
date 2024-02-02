<script lang="ts">
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import Cards from '$lib/components/pages/TrackingComponents/cards/card.svelte';
	import { onMount, tick } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	let after = true;
	let topicExpand = false;
	const toggle = () => (topicExpand = !topicExpand);
	onMount(async () => {
		await tick();
		hideLoader();
	});

	const beforeCards = [
		{
			heading: 'Risk of Reduced Data Precision',
			detail:
				'Without IP Enrichment, your user tracking and attribution might lack essential location-specific IP insights. This could lead to less accurate data, potentially affecting your decision-making and overall business performance.'
		},
		{
			heading: 'Potential Decrease in Advertiser Matching Rates',
			detail:
				'Choosing not to enable IP Enrichment may impact your advertiser matching rates. Without enriched IP data in your postback to advertisers, audience matching might be less precise, leading to less effective advertising campaigns and sub-optimal utilization of your partnerships.'
		},
		{
			heading: 'Possible Rise in Acquisition Costs & Security Threats',
			detail:
				'Without IP Enrichment, your marketing budget might not work as efficiently, potentially resulting in higher CPC, CPL, and CPO values. Additionally, you could miss out on the invaluable security benefits of VPN, Tor, and bot detection, leaving your platform more vulnerable to potential threats and harmful traffic.'
		}
	];

	const afterCards = [
		{
			heading: 'Boosted Data Precision',
			detail:
				'IP Enrichment enriches your user tracking and attribution by integrating granular, location-based IP data. It provides comprehensive data on geographic details, ISP, and currency for every lead, addToCart, and purchase event, enabling a more accurate decision-making process.'
		},
		{
			heading: 'Enhanced Advertiser Matching Rates',
			detail:
				'With our IP Enrichment feature, your postback to advertisers becomes more accurate. The enriched IP data enables more precise audience matching, increasing the effectiveness of your advertising campaigns and maximizing the value from your partnerships.'
		},
		{
			heading: 'Cost Reduction and Advanced Security',
			detail:
				'IP Enrichment is designed to make your marketing budget more efficient by helping to lower CPC, CPL, and CPO values. Plus, it includes advanced VPN, Tor, and bot detection capabilities, adding an additional layer of security to your platform by identifying potential threats and harmful traffic.'
		}
	];
</script>

<div class="px-0.5 flex flex-col flex-1">
	<div class="flex flex-col flex-1 space-y-5 md:space-y-10 ">
		 
		<div class="flex flex-col xl:grid xl:grid-cols-20 gap-5">
			<div class="xl:col-span-8">
				<div class="space-y-6 flex-1 xl:max-w-2xl">
					<div class="md:space-y-1.5 text-left">
						<h2 class="text-lg xs:text-xl md:text-2xl xl:text-3xl font-semibold text-center sm:text-left">
						IP Intelligence
						</h2>
						<h3 class="md:text-lg xl:text-xl text-white font-semibold text-center sm:text-left">Boost Audience Matching with Enriched IP Data Insights</h3>
						<p class="text-white text-center text-sm sm:text-left">
							Venture into data capabilities' forefront with our IP Enrichment feature. This innovative technology leverages IP data to amplify audience matching, curb costs, and boost your ROAS. Explore a future with precision-enhanced user profiles, transforming your data capabilities
						</p>
					</div>
					<div class="flex justify-between gap-5">
						<p class="text-lg leading-none">Activate IP Intelligence</p>
						<div class="relative">
							<CheckBox
								labelClass="relative z-10 leading-none"
								label=""
								id="securityPreferences"
								classes="relative cursor-pointer block"
								span="w-11 h-6 bg-white/10 flex border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:-translate-x-px peer-checked:after:border-white after:absolute after:scale-110 after:top-[2px] after:left-[3px] after:bg-grey after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-box peer-checked:after:border-transparent"
							/>
						</div>
					</div>
				</div>

			</div>
			<div class="xl:col-span-12">
				<div
				class="flex justify-between sm:justify-end xl:justify-center items-center w-full max-w-full flex-1 xl:w-2/3 ml-auto xl:pl-20 md:pt-12"
				>
				<button
					on:click={toggle}
					aria-expanded={topicExpand}
					type="button"
					class="relative sm:hidden inline-flex items-center justify-center rounded-full bg-transparent px-3 p-2.5 text-sm font-medium text-white shadow-sm hover:border-blue hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue ring-offset-color focus:ring-offset-2 after:ease-in-out after:duration-300 hover:after:opacity-100 after:rounded-full after:inset-0 after:bg-radial-blue after:absolute hover:shadow-glow-blue before:rounded-full before:ease-in-out before:duration-300 hover:before:opacity-0 before:inset-0 before:border before:border-grey before:absolute {topicExpand
						? 'after:opacity-100'
						: 'after:opacity-0'}"
				>
					<span class="relative z-10 leading-none"
						><span class="relative z-10 leading-none inline-flex gap-2 items-center"
							><Icon
								data={Icons.AngleDown}
								stroke="transparent"
								class="w-3 text-white shrink-0 ease-in-out duration-300 {topicExpand
									? 'rotate-180'
									: ''}"
							/>Cards</span
						></span
					>
				</button>
				<div
					class="bg-transparent relative before:absolute before:bg-glass before:backdrop-blur-2.5xl p-0.5 md:p-1 before:rounded before:shadow-dropdown before:opacity-30 before:inset-0 xl:-translate-x-1/2"
				>
					<!-- After/Before Buttons -->
					<div
						class="flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800 gap-2 relative z-10"
					>
						<button
							class="md:px-4 p-2 md:py-1 md:h-14 text-sm md:text-base items-center inline-flex justify-center rounded font-bold {after
								? ''
								: 'bg-blue-box'}"
							on:click={() => {
								after = false;
							}}><span class="">Before Pro</span></button
						>
						<button
							class="md:px-4 p-2 md:py-1 md:h-14 text-sm md:text-base items-center inline-flex justify-center rounded font-bold {after
								? 'bg-blue-box'
								: ''} "
							on:click={() => {
								after = true;
							}}><span class="">After Pro</span></button
						>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="flex flex-col xl:grid xl:grid-cols-20 gap-5 flex-1">
			<!-- After -->
			{#if after}
				<div class="hidden sm:flex gap-4 md:gap-8 flex-col sm:flex-row xl:flex-col xl:col-span-8">
					{#each afterCards as listItem}
						<Cards
							Icons={Icons.tick}
							IconColor={'text-green'}
							border={'after:border-green'}
							heading={listItem.heading}
							detail={listItem.detail}
						/>
					{/each}
				</div>
				{#if topicExpand}
					<div class="sm:hidden flex gap-4 md:gap-8 flex-col sm:flex-row xl:flex-col"
						transition:slide={{ duration: 300 }}
						>
						{#each afterCards as listItem}
							<Cards
								Icons={Icons.tick}
								IconColor={'text-green'}
								border={'after:border-green'}
								heading={listItem.heading}
								detail={listItem.detail}
							/>
						{/each}
					</div>
				{/if}
			{:else}
				<!-- before -->
				<div class="hidden sm:flex gap-4 md:gap-8 flex-col sm:flex-row xl:flex-col xl:col-span-8">
					{#each beforeCards as listItem}
						<Cards
							Icons={Icons.crossIcon}
							IconColor={'text-red'}
							border={'after:border-red'}
							heading={listItem.heading}
							detail={listItem.detail}
						/>
					{/each}
				</div>
				{#if topicExpand}
					<div class="sm:hidden flex gap-4 md:gap-8 flex-col sm:flex-row xl:flex-col"
						transition:slide={{ duration: 300 }}
							>
						{#each beforeCards as listItem}
							<Cards
								Icons={Icons.crossIcon}
								IconColor={'text-red'}
								border={'after:border-red'}
								heading={listItem.heading}
								detail={listItem.detail}
							/>
						{/each}
					</div>
				{/if}
			{/if}
			<div class="xl:col-span-12 flex-1 flex items-start justify-end">
				<div class="overflw-hidden relative xl:-mr-8">
					<img src="/images/geolocation.png" alt="" class="opacity-0 invisible" />
					{#if after}
						<div class="absolute inset-0" transition:fade>
							<img src="/images/geolocation-on.png" alt="" />
						</div>
					{:else}
						<div class="absolute inset-0" transition:fade>
							<img src="/images/geolocation.png" alt="" />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
