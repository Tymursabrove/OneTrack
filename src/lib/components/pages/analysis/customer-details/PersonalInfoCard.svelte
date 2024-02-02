<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { GetCustomersProfileDetails } from '$lib/services/HtpCustomerJourneyRequests';
	import { Workspace } from '$lib/store';
	import type { CustomerProfileDetails } from '$lib/types/HttpResponsesTypes';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import type { SpriteIconName } from '$lib/common/SpriteIcons';

	const dispatch = createEventDispatcher();
	const columns: {
		iconName: SpriteIconName;
		accessor: (data: CustomerProfileDetails) => string | null | undefined;
		title: string;
		showAsTag?: boolean;
	}[] = [
		{
			iconName: 'man-user',
			accessor: (data: CustomerProfileDetails) => data.onetrackId,
			title: 'OneTrack ID'
		},
		{
			iconName: 'man-user',
			accessor: (data: CustomerProfileDetails) => data.firstName,
			title: 'First Name'
		},
		{
			iconName: 'man-user',
			accessor: (data: CustomerProfileDetails) => data.lastName,
			title: 'Last Name'
		},
		{
			iconName: 'gender',
			accessor: (data: CustomerProfileDetails) => data.gender,
			title: 'Gender'
		},
		{
			iconName: 'building',
			accessor: (data: CustomerProfileDetails) =>
				data.city ? `${data.street ?? ''} ${data.city}` : data.city,
			title: 'Address'
		},
		{
			iconName: 'telephone',
			accessor: (data: CustomerProfileDetails) => data.phone,
			title: 'Telephone'
		},
		{
			iconName: 'email',
			accessor: (data: CustomerProfileDetails) => data.email,
			title: 'E-Mail',
			showAsTag: true
		}
	];

	export let profile_id: string | null;

	let profileDetails: CustomerProfileDetails | null = null;
	let workspaceId: null | string = null;
	let unsubscribeWorkspace: Unsubscriber;

	onMount(async () => {
		unsubscribeWorkspace = Workspace.subscribe(async (ws) => {
			try {
				if (ws == 'init') {
					return;
				}
				if (!ws) {
					throw 'No workspace found';
				}
				workspaceId = ws.id;
				await loadData(profile_id);
			} catch (err) {
				console.error(err);
			}
		});
	});
	onDestroy(() => {
		if (unsubscribeWorkspace) {
			unsubscribeWorkspace();
		}
	});
	async function loadData(profileId: string | null) {
		if (!workspaceId) {
			return;
		}
		if (!profileId) {
			return;
		}
		profileDetails = await GetCustomersProfileDetails(workspaceId, profileId);
		if (profileDetails) {
			dispatch('data_load', profileDetails);
		}
	}
	$: {
		loadData(profile_id);
	}
</script>

{#if profileDetails}
	<div class="gap-y-4 text-white flex flex-col justify-start flex-1">
		{#each columns as column}
			{#if column.accessor(profileDetails)}
				<div class="relative rounded-3xl border border-grey-4 bg-bglinear-4 shadow-sidebar">
					<div
						class="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col xl:grid xl:grid-cols-2 2xl:grid-cols-12 gap-2 ml:items-start py-3 px-6 ml:justify-between relative z-10"
					>
						<div class="flex items-center gap-2 ml:gap-x-3 2xl:col-span-4">
							<span class="shirink-0">
								<Icon name={column.iconName} size="medium" />
							</span>
							<h3 class="font-semibold text-sm 2xl:text-md tracking-wider">{column.title}</h3>
						</div>

						{#if column.showAsTag}
							<div class="gap-2 flex flex-wrap items-center 2xl:col-span-8">
								<p
									class="truncate shadow-glass bg-blue-box py-1 px-3 leading-none rounded-full text-white font-medium text-xs"
								>
									{profileDetails.email}
								</p>
							</div>
						{:else}
							<div class="space-y-2 2xl:col-span-8">
								<p class="truncate text-white/70 font-medium text-sm">
									{column.accessor(profileDetails)}
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
