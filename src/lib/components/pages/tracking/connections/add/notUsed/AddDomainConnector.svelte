<script lang="ts">
	import AddAuthBase from '../AddAuthBase.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { openModal } from 'svelte-modals';
	import sourceDomainModel from '$lib/components/pages/tracking/connections/add/notUsed/sourceDomainStep1Model.svelte';

	function domainOpen() {
		openModal(sourceDomainModel, {});
	}
</script>

<AddAuthBase name="Google" iconString={Icons.globalSearchIcon} onClickHandler={domainOpen} />
