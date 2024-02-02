<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import ReadMoreCard from '../ReadmoreCard.svelte';
	import { slide } from 'svelte/transition';
	import { getProfileEventTooltipText } from '../../helpers';
	import TruncatedLink from '../TruncatedLink.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
	import {
		camelToSentence,
		currencyCustomSymbolFormatter,
		getSumRaw
	} from '$lib/helpers/MiscHelpers';
	import type {
		CustomerProfileEvent,
		ProfileEventButtonClickData,
		ProfileEventIPAddressData,
		ProfileEventLeadData,
		ProfileEventPageViewData,
		ProfileEventPersonalData,
		ProfileEventScreenResolutionData,
		ProfileEventUserAgentData,
		ProfileEventViewPortData,
		CartItem,
		ProfileEventPurchaseData,
		ProfileEventAddToCartData
	} from '$lib/types/HttpResponsesTypes';

	interface EventDataPoint {
		title: string;
		icon: SpriteIconName;
		accessor: () => string | null | undefined;
	}
	interface SummaryEventDataPoint extends EventDataPoint {
		isLink?: boolean;
		isTitle?: boolean;
		isText?: boolean;
		isImage?: boolean;
	}
	interface ItemsEventData {
		event: string;
		listAccessor: () => UpdatedItemCart[];
		totalAccessor: () => string;
		readMore: boolean;
		orderId?: string;
	}
	interface UpdatedItemCart extends CartItem {
		link: string;
		currency: string;
	}

	export let event: CustomerProfileEvent | null = null;

	const INFO_EVENTS_ASSOCIATIONS: { event: string; dataPoints: EventDataPoint[] }[] = [
		{
			event: 'ipAddress',
			dataPoints: [
				{
					title: 'IPv4',
					icon: 'map-location',
					accessor: () => {
						let d = event?.data as ProfileEventIPAddressData;
						return d.ipv4 ?? '-';
					}
				},
				{
					title: 'IPv6',
					icon: 'map-location',
					accessor: () => {
						let d = event?.data as ProfileEventIPAddressData;
						return d.ipv6;
					}
				}
			]
		},
		{
			event: 'screenResolution',
			dataPoints: [
				{
					title: 'Resolution',
					icon: 'desktop',
					accessor: () => {
						let d = event?.data as ProfileEventScreenResolutionData;
						return `${d.resolution?.width ?? 'Unknown'} x ${d.resolution?.height ?? 'Unknown'}`;
					}
				}
			]
		},
		{
			event: 'viewPort',
			dataPoints: [
				{
					title: 'Resolution',
					icon: 'desktop',
					accessor: () => {
						let d = event?.data as ProfileEventViewPortData;
						return `${d.resolution?.width ?? 'Unknown'} x ${d.resolution?.height ?? 'Unknown'}`;
					}
				}
			]
		}
	];

	const SUMMARY_EVENTS_ASSOCIATIONS: { event: string; dataPoints: SummaryEventDataPoint[] }[] = [
		{
			event: 'pageView',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				},
				{
					title: 'Referrer',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.referrer;
					},
					isLink: true,
					isTitle: false
				}
			]
		},
		{
			event: 'userAgent',
			dataPoints: [
				{
					title: 'Name',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.name ?? '-';
					},
					isTitle: true
				},
				{
					title: 'Version',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.device ?? '-';
					},
					isText: true
				},
				{
					title: 'OS',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.os ?? '-';
					},
					isText: true
				},
				{
					title: 'OS Version',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.osVersion ?? '-';
					},
					isText: true
				},
				{
					title: 'Device',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.device ?? '-';
					},
					isText: true
				},
				{
					title: 'Raw',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventUserAgentData;
						return d.raw ?? '-';
					},
					isText: true
				}
			]
		},
		{
			event: 'buttonClick',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventButtonClickData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventButtonClickData;
						return d.pageInfo?.url;
					},
					isLink: true
				},
				{
					title: 'Button',
					icon: 'world-wide-web',
					accessor: () => {
						return 'Submit';
					},
					isText: true
				}
			]
		},
		{
			event: 'lead',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventLeadData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				}
			]
		},
		{
			event: 'textClick',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventLeadData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				},
				{
					title: 'Text Clicked',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as any;

						return d.info?.text ?? '-';
					},
					isText: true
				}
			]
		},
		{
			event: 'linkClick',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventLeadData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				}
			]
		},
		{
			event: 'viewContent',
			dataPoints: [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventLeadData;
						return d.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						let d = event?.data as ProfileEventPageViewData;
						return d.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				}
			]
		}
	];

	const LIST_EVENTS_ASSOCIATIONS: ItemsEventData[] = [
		{
			event: 'purchase',
			listAccessor: () => {
				let d = event?.data as ProfileEventPurchaseData;
				let list =
					d.info?.items?.map((x) => {
						let obj: UpdatedItemCart = {
							...x,
							link: d.pageInfo?.url ?? '/',
							currency: d.currency ?? 'EUR'
						};
						return obj;
					}) ?? [];
				return list;
			},
			totalAccessor: () => {
				let d = event?.data as ProfileEventPurchaseData;
				let val = d.value ?? getSumRaw(d?.info?.items?.map((x) => x.price) ?? []);
				return currencyCustomSymbolFormatter(val, d.currency ?? 'EUR');
			},
			readMore: false,
			orderId: event?.id
		},
		{
			event: 'addToCart',
			listAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let list =
					d.info?.items?.map((x) => {
						let obj: UpdatedItemCart = {
							...x,
							link: d.pageInfo?.url ?? '/',
							currency: d.currency ?? 'EUR'
						};
						return obj;
					}) ?? [];
				return list;
			},
			totalAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let val = d.value ?? getSumRaw(d?.info?.items?.map((x) => x.price) ?? []);
				return currencyCustomSymbolFormatter(val, d.currency ?? 'EUR');
			},
			readMore: false
		},
		{
			event: 'viewItem',
			listAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let list =
					d.info?.items?.map((x) => {
						let obj: UpdatedItemCart = {
							...x,
							link: d.pageInfo?.url ?? '/',
							currency: d.currency ?? 'EUR'
						};
						return obj;
					}) ?? [];
				return list;
			},
			totalAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let val = d.value ?? getSumRaw(d?.info?.items?.map((x) => x.price) ?? []);
				return currencyCustomSymbolFormatter(val, d.currency ?? 'EUR');
			},
			readMore: false
		},
		{
			event: 'checkout',
			listAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let list =
					d.info?.items?.map((x) => {
						let obj: UpdatedItemCart = {
							...x,
							link: d.pageInfo?.url ?? '/',
							currency: d.currency ?? 'EUR'
						};
						return obj;
					}) ?? [];
				return list;
			},
			totalAccessor: () => {
				let d = event?.data as ProfileEventAddToCartData;
				let val = d.value ?? getSumRaw(d?.info?.items?.map((x) => x.price) ?? []);
				return currencyCustomSymbolFormatter(val, d.currency ?? 'EUR');
			},
			readMore: false
		}
	];

	let infoRows: EventDataPoint[] | null = null;
	let summaryRows: SummaryEventDataPoint[] | null = null;
	let listEvent: ItemsEventData | null = null;

	function getIcon(): SpriteIconName {
		if (
			event?.event == 'screenResolution' ||
			event?.event == 'ipAddress' ||
			event?.event == 'viewPort'
		) {
			return 'screen-resolation';
		}
		if (event?.event == 'pageView') {
			return 'world-wide-web';
		}
		if (
			event?.event == 'userAgent' ||
			['name', 'email', 'phone', 'gender', 'birthday', 'address'].includes(event?.event ?? '')
		) {
			return 'user-agent';
		}
		if (
			event?.event == 'buttonClick' ||
			event?.event == 'textClick' ||
			event?.event == 'viewItem'
		) {
			return 'pointer';
		}
		if (event?.event == 'purchase') {
			return 'money-bag';
		}
		if (event?.event == 'addToCart' || event?.event == 'checkout') {
			return 'shopping-cart';
		}
		return 'target';
	}

	function getHeading() {
		return camelToSentence(event?.event ?? 'Event');
	}

	function assignRows(e: CustomerProfileEvent | null) {
		if (!e) {
			return;
		}
		if (['name', 'email', 'phone', 'gender', 'birthday', 'address'].includes(event?.event ?? '')) {
			infoRows = [];
			let d = event?.data as ProfileEventPersonalData;
			if (d.email) {
				infoRows.push({ icon: 'email', title: 'E-Mail', accessor: () => d.email });
			}
			if (d.zip) {
				infoRows.push({ icon: 'building', title: 'Zip', accessor: () => d.zip });
			}
			if (d.street) {
				infoRows.push({
					icon: 'building',
					title: 'Street',
					accessor: () => `${d.streetNumber ?? ''} ${d.street}`
				});
			}
			if (d.city) {
				infoRows.push({ icon: 'building', title: 'City', accessor: () => d.city });
			}
			if (d.country) {
				infoRows.push({ icon: 'building', title: 'Country', accessor: () => d.country });
			}
			if (d.gender) {
				infoRows.push({ icon: 'building', title: 'Gender', accessor: () => d.gender });
			}
			if (d.firstName || d.lastName) {
				infoRows.push({
					icon: 'man-user',
					title: 'Name',
					accessor: () => `${d.firstName ?? ''} ${d.lastName ?? ''}`
				});
			}
			if (d.phone) {
				infoRows.push({ icon: 'telephone', title: 'Phone', accessor: () => d.phone });
			}
			if (d.birthday) {
				infoRows.push({ icon: 'cake', title: 'Birthday', accessor: () => d.birthday });
			}
			infoRows = infoRows;
			return;
		}
		let info = INFO_EVENTS_ASSOCIATIONS.find((x) => x.event == e.event) ?? null;
		if (info) {
			infoRows = [];
			for (let point of info.dataPoints) {
				if (point.accessor()) {
					infoRows.push(point);
				}
			}
			infoRows = infoRows;
			return;
		}
		let summary = SUMMARY_EVENTS_ASSOCIATIONS.find((x) => x.event == e.event) ?? null;
		if (summary) {
			summaryRows = [];
			for (let point of summary.dataPoints) {
				if (point.accessor()) {
					summaryRows.push(point);
				}
			}
			summaryRows = summaryRows;
			return;
		}
		listEvent = LIST_EVENTS_ASSOCIATIONS.find((x) => x.event == e.event) ?? null;
		if (listEvent) {
			return;
		}
		let data = event?.data as any;
		if (Object.hasOwn(data, 'pageInfo')) {
			summaryRows = [
				{
					title: 'Page Title',
					icon: 'world-wide-web',
					accessor: () => {
						return data.pageInfo?.title ?? '-';
					},
					isLink: false,
					isTitle: true
				},
				{
					title: 'Page URL',
					icon: 'world-wide-web',
					accessor: () => {
						return data.pageInfo?.url;
					},
					isLink: true,
					isTitle: false
				}
			];
			return;
		}
	}

	$: {
		assignRows(event);
	}
</script>

{#if event}
	<div class="relative rounded-2xl border border-grey-4 bg-bglinear-4 shadow-sidebar p-5">
		<div class="relative z-10 space-y-3">
			<div class="flex justify-between items-center sm:px-3 xl:px-6 gap-2">
				<div class="flex items-center gap-3">
					<div class="flex justify-start items-center xl:w-10 shrink-0">
						<Icon name={getIcon()} size="big" />
					</div>

					<div class="space-y-1">
						<div class="flex items-center gap-2">
							<h3 class="text-sm sm:text-base 2xl:text-lg text-white leading-none font-medium">
								{getHeading()}
							</h3>

							<Tooltip>
								<Icon
								  name="info"
								  interactive={true}
								  size="small"
								/>
								<svelte:fragment slot="content">
								  {getProfileEventTooltipText(event.event)}
								</svelte:fragment>
							  </Tooltip>
						</div>
						{#if listEvent && listEvent.orderId}
							<p class="text-xs leading-none text-grey-2">
								Order ID: <b class="font-medium">{listEvent.orderId}</b>
							</p>
						{/if}
					</div>
				</div>
				<div class="text-white text-right font-medium text-sm xl:text-base">
					{event.timestampFormatted}
				</div>
			</div>
			<div class="space-y-3">
				{#if infoRows && infoRows.length > 0}
					{#each infoRows as row}
						<div
							class="w-full rounded-full leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar"
						>
							<div class="relative z-10 flex justify-between py-2 px-3 xl:px-6">
								<div class="flex items-center gap-3">
									<div class="xl:w-12 shrink-0">
										<Icon name={row.icon} />
									</div>
									<div class="flex gap-2">
										<p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">
											{row.title}
										</p>
										<p
											class="font-medium flex items-center text-left gap-1 text-xs xl:text-sm leading-snug"
										>
											{row.accessor()}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
				{#if summaryRows && summaryRows.length > 0}
					<div
						class="w-full leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar rounded-2xl"
					>
						<div class="relative z-10 flex justify-between p-3 xl:px-6">
							<div class="flex items-start gap-3">
								<div class="xl:w-10 shrink-0">
									<Icon name={getIcon()} />
								</div>
								<div class="space-y-1">
									{#each summaryRows as row}
										{#if row.isTitle}
											<p class="leading-none text-xs xl:text-base font-medium text-white">
												{row.title}: {row.accessor() ?? '-'}
											</p>
										{:else}
											<div class="flex flex-wrap 2xl:flex-nowrap gap-2">
												<p class="w-20 xl:w-24 shrink-0 leading-none text-xs xl:text-sm text-white">
													{row.title}
												</p>
												{#if row.isLink}
													<TruncatedLink url={row.accessor() ?? '/'} />
												{/if}
												{#if row.isText}
													<p
														class="font-medium break-word flex items-center text-left gap-1 text-xs xl:text-sm leading-snug"
													>
														{row.accessor()}
													</p>
												{/if}
											</div>
										{/if}
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/if}
				{#if listEvent}
					<div
						class="w-full rounded-full leading-snug relative ease-in-out duration-300 text-white border border-grey-4 bg-bglinear-4 shadow-sidebar"
					>
						<div class="relative z-10 flex justify-between py-2 px-3 XL:px-6">
							<div class="flex items-center gap-3">
								<div class="xl:w-10 shrink-0">
									<Icon name="checkout" />
								</div>
								<p class="leading-none text-xs xl:text-base text-white">
									{listEvent.listAccessor().length ?? '0'} Item(s)
								</p>
							</div>
							<div class="flex gap-5 items-center">
								<p class="leading-none text-xs xl:text-base text-grey-2">Total:</p>
								<p class="font-semibold leading-none text-white text-right text-sm xl:text-lg">
									{listEvent.totalAccessor()}
								</p>
							</div>
						</div>
					</div>
					<div class="space-y-3">
						{#if listEvent.readMore}
							<div class="pt-1 space-y-3" transition:slide>
								{#each listEvent.listAccessor() as item}
									<ReadMoreCard
										image={item.imageUrl ?? '/'}
										title={item.productName ?? '-'}
										price={item.price ?? 0}
										id={item.productId ?? '-'}
										link={item.link}
										quantity={item.quantity ?? 1}
										variant={item.variantId ?? '-'}
										sku={item.sku ?? '-'}
										categories={item.categories ?? []}
										currency={item.currency}
									/>
								{/each}
							</div>
						{/if}
						<div class="flex justify-end pl-3 lg:px-6">
							<Button
								role="dropdown"
								rounded={true}
								text="Read {listEvent.readMore ? 'Less' : 'More'}"
								on:click={() => {
									if (listEvent) {
										listEvent.readMore = !listEvent?.readMore;
									}
								}}
							/>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
