<script lang="ts">
	import type { ExtendedCustomerProfileSummary } from '../helpers';
	import { Icons } from '$lib/resources/IconResources';
	import { openModal } from 'svelte-modals';
	import MarkAsFraudModal from '$lib/components/pages/analysis/customer-details/MarkAsFraudModal.svelte';
	import { goto } from '$app/navigation';

	const showMarkAsFraudPopup = false;

	export let profile: ExtendedCustomerProfileSummary;

	function markAsFraudOpen() {
		openModal(MarkAsFraudModal, {});
	}
	async function gotoDetailsPage(id: string) {
		await goto(`/analysis/customer-details?id=${id}`);
	}
</script>

<!-- <div class="relative rounded-3xl bg-glass border-2 border-transparent hover:border-blue" -->
<div
	class="relative rounded-3xl ease-in-out duration-300 border border-grey-4 hover:border-transparent
	bg-bglinear-4 shadow-sidebar after:absolute after:inset-0 after:rounded-3xl after:shadow-glow-blue after:ease-in-out after:duration-300 after:border-2 after:border-blue after:opacity-0 hover:after:opacity-100"
	on:dblclick={() => {
		gotoDetailsPage(profile.onetrackId);
	}}
>
	<div
		class="relative z-10 gap-1.5 flex-1 py-3 pl-4 xs:py-5 xl:pl-6 {showMarkAsFraudPopup
			? 'pr-20'
			: 'pr-4 xl:pr-6'}"
	>
		<div class="relative pl-12">
			<div
				class="h-12 w-12 absolute left-0 top-0 rounded-full flex justify-center items-center bg-white/10 shrink-0"
			>
				<img src={Icons.svgUrls.avatarUrl} class="object-cover aspect-square w-full" alt="Avatar" />
			</div>

			<div class="space-y-1 pl-2 xs:pl-4 xl:pl-5">
				<h3 class="block text-sm font-semibold text-white" title={profile.email ?? ''}>
					<a
						class="text-white hover:text-blue-400 ease-in-out duration-300 block truncate"
						href="/analysis/customer-details?id={profile.onetrackId}">{profile.email ?? ''}</a
					>
				</h3>
				<p class="text-sm leading-none truncate">{profile.ipAddress ?? 'N/A'}</p>
				<p class="text-sm leading-none" title={profile.onetrackId ?? 'N/A'}>
					<a
						class="text-white block hover:text-blue-400 ease-in-out duration-300 truncate pb-1"
						href="/analysis/customer-details?id={profile.onetrackId}"
						>{profile.onetrackId ?? 'N/A'}</a
					>
				</p>
			</div>
		</div>
	</div>
</div>
