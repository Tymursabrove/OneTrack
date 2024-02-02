<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import Tooltip from '$lib/components/layout/MTooltip.svelte';
	import type {
		CustomerProfileEvent,
		ProfileEventImageClickData
	} from '$lib/types/HttpResponsesTypes';
	import TruncatedLink from '../TruncatedLink.svelte';
	import { getProfileEventTooltipText } from '../../helpers';

	export let event: CustomerProfileEvent | null = null;
	let data: ProfileEventImageClickData | null = null;

	function assignData(assignedEvent: CustomerProfileEvent | null) {
		if (assignedEvent) {
			data = assignedEvent.data as ProfileEventImageClickData;
		}
	}
	$: {
		assignData(event);
	}
</script>

{#if event && data}
<div class="relative rounded-2xl border border-grey-4 bg-bglinear-4 shadow-sidebar p-5 " >
		<div class="relative z-10 space-y-3">
			<div class="flex justify-between items-center sm:px-3 xl:px-6 gap-2">
				<div class="flex items-center gap-3">
					<div class="flex justify-start items-center xl:w-10 shrink-0">
						<Icon name="pointer" size="big"/>
					</div>

					<div class="space-y-1">
						<div class="flex items-center gap-2">
							<h3 class="text-sm sm:text-base 2xl:text-lg text-white leading-none font-medium">
								Image Click
							</h3>

							<Tooltip top>
								<Icon name="info" size="small"/>
								<span slot="tip" class="flex gap-2 leading-tight text-xs"
									><Icon
										name="info"
										size="small"
									/>{getProfileEventTooltipText(event.event)}</span
								>
							</Tooltip>
						</div>
					</div>
				</div>
				<div class="text-white text-right font-medium text-sm xl:text-base">
					{event.timestampFormatted}
				</div>
			</div>
			<div
				class="w-full rounded-2xl leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar">
				<div class="relative z-10 p-3">
					<div
						class="sm:items-center flex-wrap 2xl:flex-nowrap flex flex-col sm:flex-row gap-3 2xl:gap-5 sm:pl-2"
					>
						<div class="w-16 shrink-0">
							<img
								src={data.info?.link ?? '/images/placeholder.jpg'}
								alt=""
								class="object-cover rounded-md shadow-sidebar"
							/>
						</div>
						<div class="space-y-1 w-full sm:w-auto">
							<h3 class="font-medium text-xs 2xl:text-sm text-white leading-snug">
								Page Title {data.pageInfo?.title ?? ''}
							</h3>
							<div class="flex flex-wrap 2xl:flex-nowrap gap-2">
								<p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">
									Page URL
								</p>
								<TruncatedLink url={data?.pageInfo?.url ?? '/'} />
							</div>

							<div class="flex flex-wrap 2xl:flex-nowrap gap-2">
								<p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">
									Alt Text
								</p>
								<p
									class="font-medium flex items-center text-left gap-1 text-xs xl:text-sm leading-snug"
								>
									-
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
