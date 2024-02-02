<script lang="ts">
	import Tab from '$lib/components/pages/analysis/customer-details/Tab.svelte';
	import ProfilesListPage from '$lib/components/pages/analysis/customer-profiles/ProfilesListPage.svelte';
	import { set as setLocalStorage, get as getLocalStorage } from '$lib/local-packages/LocalStorage';
	import RadioButtonDropdown from '$lib/components/library/dropdowns/RadioButtonDropdown.svelte';
	import { CUSTOMER_PROFILES_EVENT_TYPE_LOCAL_STORAGE_KEY } from '$lib/common/Constants';
	import Button from '$lib/components/common/Button.svelte';
	//TODO: render analysis page when available
	//import ProfilesAnalysisPage from '$lib/components/pages/analysis/customer-profiles/ProfilesAnalysisPage.svelte';

	let tabItems = ['Customer Profiles'];
	let activeItem = 'Customer Profiles';
	let listPageComponent: ProfilesListPage;
	let EventType: 'lead' | 'purchase' =
		getLocalStorage(CUSTOMER_PROFILES_EVENT_TYPE_LOCAL_STORAGE_KEY) ??
		('lead' as 'lead' | 'purchase');

	const triggerTabChange = (event: { detail: string }) => {
		//TODO: Enable tabs when Analysis page is done
		return;
		activeItem = event.detail;
	};
</script>

<main class="p-0 max-w-screen-xl mx-auto w-full flex-1 flex flex-col">
	<div class="flex flex-wrap gap-3 border-b border-grey-4 pb-5 justify-between">
		<Tab {tabItems} {activeItem} on:tabChange={triggerTabChange} />

		<div class="flex gap-2">
			<div class="flex gap-2">
				<Button
					action="secondary"
					size="small"
					leftIcon="download"
					on:click={() => {
						listPageComponent.downloadEventsAsCSV();
					}}
				/>
				<Button
					action="secondary"
					size="small"
					leftIcon="reloadIcon"
					on:click={async () => {
						await listPageComponent.reloadSendLocalDataRequest();
					}}
				/>
			</div>

			<RadioButtonDropdown
				id="event-type-setting-toggle-selection-dropdown"
				classes="relative w-[200px]"
				title="Event Type"
				list={[
					{
						id: 'lead',
						state: EventType == 'lead',
						name: 'Lead'
					},
					{
						id: 'purchase',
						state: EventType == 'purchase',
						name: 'Purchase'
					}
				]}
				on:selectionChange={(e) => {
					EventType = e.detail.changedItem.id;
					setLocalStorage(CUSTOMER_PROFILES_EVENT_TYPE_LOCAL_STORAGE_KEY, EventType);
				}}
			/>
		</div>
	</div>
	<!-- Tab Content -->
	<div class="flex flex-col flex-1">
		<ProfilesListPage {EventType} bind:this={listPageComponent} />
	</div>
</main>
