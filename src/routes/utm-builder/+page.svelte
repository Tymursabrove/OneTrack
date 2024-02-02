<script lang="ts">
	import UtmCard from '$lib/components/pages/utm-builder/UTMCard.svelte';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import type { utmDataItem } from '$lib/types/Types';
	import { onMount, tick } from 'svelte';

	let sources: utmDataItem[] = [
		{
			isExpanded: false,
			isOdd: true,
			logo: "meta",
			name: 'meta',
			text: 'Meta supports the forwarding of dynamic UTM parameters. For example, the name of a campaign is automatically appended to the URL when a user clicks on the ad. The dynamic UTM parameters must be set in Meta for each ad.',
			fromText: 'For Meta, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'utm_source=meta&utm_medium=cpc&campaign_id={{campaign.id}}&ad_id={{ad.id}}&adset_id={{adset.id}}&placement={{placement}}&site_source={{site_source_name}}'
		},
		{
			isExpanded: false,
			isOdd: false,
			logo: "google",
			name: 'google',
			text: 'Google supports the forwarding of dynamic UTM parameters. For example, the name of a campaign is automatically appended to the URL when a user clicks on the ad. The dynamic UTM parameters must be set for each ad in TikTok.',
			fromText: 'For Google, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'{lpurl}?utm_source=google&utm_medium={network}&campaign_id={campaignid}&adset_id={adgroupid}&ad_id={creative}&placement={placement}&utm_term={keyword}'
		},
		{
			isExpanded: false,
			isOdd: true,
			logo: "tik-tok",
			name: 'tikTok',
			text: 'TikTok supports the forwarding of dynamic UTM parameters. For example, the name of a campaign is automatically appended to the URL when a user clicks on the ad. The dynamic UTM parameters must be set for each ad in TikTok.',
			fromText: 'For TikTok, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'utm_source=tiktok&utm_medium=cpc&campaign_id=_CAMPAIGN_ID_&ad_id=_CID_&adset_id=_AID_&placement=_PLACEMENT_&ttclid=__CLICKID__',
			displayUtm:
				'utm_source=tiktok&utm_medium=cpc&campaign_id= _CAMPAIGN_ID_ &ad_id= _CID_ &adset_id= _AID_ &placement= _PLACEMENT_ &ttclid= __CLICKID__ '
		},
		{
			isExpanded: false,
			isOdd: false,
			logo: "snapchat",
			name: 'snapchat',
			text: 'Snapchat supports the forwarding of dynamic UTM parameters. For example, the name of a campaign is automatically appended to the URL when a user clicks on the ad. The dynamic UTM parameters must be set for each ad on Snapchat.',
			fromText: 'For Snapchat, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'utm_source=snapchat&utm_medium=cpc&campaign_id={{campaign.id}}&ad_id={{ad.id}}&adset_id={{adSet.id}}'
		},
		{
			isExpanded: false,
			isOdd: true,
			logo: "bing",
			name: 'microsoft Bing Ads',
			text: 'Microsoft Bing supports the forwarding of dynamic UTM parameters. For example, the name of a campaign is automatically appended to the URL when a user clicks on the ad. The dynamic UTM parameters must be set for each ad in Microsoft Bing.',
			fromText:
				'For Microsoft Bing, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'utm_source=bing&utm_medium={ifsearch:search}{ifcontent:content}&campaign_id={campaignid}&adset_id={adgroupid}&ad_id={adid}&placement={placement}&utm_term={keyword}'
		},
		{
			isExpanded: false,
			isOdd: false,
			logo: "pinterest",
			name: 'pinterest',
			text: 'Pinterest supports the forwarding of dynamic UTM parameters. For example, the name of a Pin can be automatically appended to the URL when a user clicks on the promoted Pin. The dynamic UTM parameters must be set for each promoted Pin in Pinterest.',
			fromText: 'For Pinterest, you can copy and paste the following UTM parameters to your ads:',
			utmCode: 'utm_source=pinterest&ad_id={adid}&pin_id={pin_id}'
		},
		{
			isExpanded: false,
			isOdd: true,
			logo: "twitter",
			name: 'twitter',
			text: 'Currently, Twitter Ads does not offer support for dynamic UTM parameters. This means that parameters such as utm_campaign and any other custom UTM parameters need to be manually added for each campaign in Twitter Ads. Unlike some platforms, at this time, Twitter Ads cannot automatically append the name of a campaign to the URL when a user clicks on an ad.',
			fromText: 'For Twitter, you can copy and paste the following UTM parameters to your ads:',
			utmCode: 'utm_source=twitter&utm_mediuem=cpc&utm_campaign=_YOUR_CAMPAIGN_NAME_'
		},
		{
			isExpanded: false,
			isOdd: false,
			logo: "redditIcon",
			name: 'reddit',
			text: 'Reddit supports the forwarding of dynamic UTM parameters. In this case, when a user clicks on an ad, the name of the campaign is automatically appended to the URL. It`s necessary to set the dynamic UTM parameters for each individual ad within Reddit.',
			fromText: 'For Reddit, you can copy and paste the following UTM parameters to your ads:',
			utmCode:
				'utm_source=reddit&ad_id={{AD_ID}}}&adset_id={{ADGROUP_ID}}&campaign_id={{CAMPAIGN_ID}}&redditclid={{CLICK_ID}}'
		},
		{
			isExpanded: false,
			isOdd: true,
			logo: "customer",
			name: 'affiliate',
			text: `With OneTrack’s Affiliate tracking, you can effectively monitor the performance of individual creators who promote your products. This feature utilizes dynamic UTM parameters, allowing the unique ID of each creator to be automatically appended to the URL each time a user clicks on their affiliate link.Please double click the above UTM parameter template to copy it, then paste it into your creator’s affiliate link.`,
			fromText:
				'Be sure to replace <mark>{CreatorID}</mark> with the actual ID assigned to each creator.By doing this, you’ll be able to precisely attribute each sale to the specific creator responsible for it, providing a clear understanding of each creator’s effectiveness and impact on your product’s sales. <br> <br> To set this up, use the following UTM parameters in your affiliate links:',
			utmCode: 'utm_source=affiliate&affId={CreatorID}'
		}
	];
	onMount(async () => {
		await tick();
		hideLoader();
	});
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex flex-col">
	<div class="gap-y-5 flex-1 flex-col flex">
		<h1 class="text-xl md:text-3xl text-white leading-none font-bold flex gap-1 pt-2">
			UTM Builder
		</h1>

		<!-- Desktop View -->
		<div class="hidden sm:grid sm:grid-cols-2 gap-5">
			<div class="flex flex-col gap-5">
				{#each sources.filter((x) => x.isOdd) as source}
					<UtmCard {source} />
				{/each}
			</div>
			<div class="flex flex-col gap-5">
				{#each sources.filter((x) => !x.isOdd) as source}
					<UtmCard {source} />
				{/each}
			</div>
		</div>

		<!-- Mobile View -->
		<div class="flex flex-col gap-5 sm:hidden">
			{#each sources as source}
				<UtmCard {source} />
			{/each}
		</div>
	</div>
</main>
