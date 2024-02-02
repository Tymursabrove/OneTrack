<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { hideLoader } from '$lib/helpers/MiscHelpers';
	import { onMount, onDestroy } from 'svelte';
	import { Workspace, DeleteQue } from '$lib/store';
	import { openModal, Modals, closeModal } from 'svelte-modals';
	import CheckBox from '$lib/components/layout/CheckBox.svelte';
	import Modal from '$lib/components/pages/domains/AddDomainModal.svelte';
	import deleteModal from '$lib/components/layout/DeleteModel.svelte';

	let data = null;
	let unsub;

	onMount(() => {
		unsub = Workspace.subscribe(async (ws) => {
			try {
				if (!ws) {
					return;
				}
				if (ws.connectors && ws.connectors.length > 0) {
					ws.connectors = ws.connectors.map((x) => {
						x.selected = true;
						return x;
					});
				}
				data = ws;
			} catch (err) {
				console.error(err);
			} finally {
				hideLoader();
			}
		});
	});
	onDestroy(() => {
		if (unsub) {
			unsub();
		}
	});
	function handleOpen() {
		openModal(Modal, {});
	}
	const handleOpenDeleteModal = (id) => {
		DeleteQue.set({ type: 'domain-connector', id });
		openModal(deleteModal, {});
	};
	function handleAllSelectionChange(e) {
		data.connectors = data.connectors.map((x) => {
			x.selected = e;
			return x;
		});
		data = data;
	}
</script>

<div class="main">
	<div class="hf header">
		<h2>Domains</h2>
		<div class="hf">
			<button type="submit" on:click={handleOpen}>+ Add new domain</button>
		</div>
	</div>
	<table>
		<tr>
			<th>
				<CheckBox
					checked={true}
					id="select-all-domains"
					span="w-5 h-5 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
					labelClass="sr-only"
					classes="relative cursor-pointer "
					onChange={handleAllSelectionChange}
				/>
			</th>
			<th>Domain</th>
			<th>Actions</th>
		</tr>
		{#if data}
			{#each data.connectors as connector}
				{#if connector.type == 'event-data'}
					<tr>
						<td>
							<CheckBox
								checked={connector.selected}
								id="select-all-domains"
								span="w-5 h-5 relative border border-grey rounded-sm block flex justify-center items-center after:-mt-0.5 after:border-l-2 after:border-b-2 after:border-white after:w-2.5 after:h-1.5 after:-rotate-45 after:block after:opacity-0 peer-checked:after:opacity-100 peer-checked:bg-blue-box peer-checked:border-blue"
								labelClass="sr-only"
								classes="relative cursor-pointer "
							/>
						</td>
						<td> {connector.domain} </td>
						<td>
							<div class="hf actions">
								<Icon data={Icons.settingsGearSolid} width="20" height="20" />
								<span
									on:click={() => {
										handleOpenDeleteModal(connector.id);
									}}
								>
									<Icon data={Icons.crossIcon} width="20" height="20" color="currentColor" />
								</span>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		{/if}
	</table>
</div>

<style lang="scss">
	html:root {
		--bg-color: #111a2d;
		--bg-color-light: transparent;
		--text-color: rgb(255, 255, 255);
		--text-color-light: rgb(183, 183, 183);
		--blue-heading-color: rgb(25, 120, 211);
		--default-font: 'Montserrat';
		--data-grid-header-footer-bg: #181c2a;
		--blue-flash-color: linear-gradient(104.64deg, #007df2 0%, #46a6ff 100%);
		--blue-flash-color-shadow: 0px 0px 20px rgba(0, 125, 242, 0.8);
		--good-state: radial-gradient(circle, #11c1a2, #0db396, #08a68a, #04987e, #008b72);
		--bad-state: radial-gradient(circle, #e14343, #d83938, #cf2f2d, #c62322, #bd1616);
		--okay-state: radial-gradient(63.52% 63.52% at 68.03% 31.76%, #eeb85f 0%, #cf8916 100%);
		--data-grid-top-offset: 330px;
	}

	.hf {
		display: flex;
		flex-direction: row;
	}
	h2 {
		font-size: revert;
		font-weight: revert;
	}
	.main {
		padding: 18px 60px;
		min-width: 900px;
		@media (max-width: 480px) {
			padding: 10px 20px;
			min-width: 400px;
		}
		@media (min-width: 481px) and (max-width: 767px) {
			padding: 10px 20px;
			min-width: 700px;
		}
		@media (min-width: 768px) and (max-width: 992px) {
			padding: 10px 20px;
			min-width: 850px;
		}
		@media (min-width: 1100px) and (max-width: 1919px) {
			min-width: 70vw;
		}
	}
	.header {
		justify-content: space-between;
		align-items: center;
		margin-top: 2rem;
		@media (max-width: 480px) {
			flex-wrap: wrap !important;
			flex-direction: column !important;
		}
		& h2 {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 700;
			font-size: 36px;
			line-height: 20px;
			@media (min-width: 768px) and (max-width: 991px) {
				font-size: 25px !important;
			}
			@media (min-width: 481px) and (max-width: 767px) {
				font-size: 26px !important;
			}
			@media (max-width: 480px) {
				font-size: 24px !important;
			}
		}
		& div {
			width: 60%;
			justify-content: flex-end;
			@media (max-width: 480px) {
				justify-content: center;
			}
		}
	}
	button {
		font-size: 0.7em;
		color: var(--text-color);
		padding: 0.75rem 0;
		margin-left: 0.8rem;
		border-radius: 0.3rem;
		width: 40%;
		background: var(--blue-flash-color);
		color: var(--text-color);
		border-radius: 1.5rem;
		border: none;
		box-shadow: var(--blue-flash-color-shadow);
		@media (min-width: 481px) and (max-width: 767px) {
			width: 55% !important;
		}
		@media (min-width: 768px) and (max-width: 991px) {
			width: 60% !important;
		}
		@media (max-width: 480px) {
			width: 70% !important;
			margin-top: 27px !important;
		}
	}
	table {
		width: 100%;
		margin-top: 2rem;
		border-collapse: collapse;
		& th {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 16px;
			line-height: 20px;
			border-bottom: 1px solid var(--text-color-light);
			@media (max-width: 480px) {
				font-size: 14px !important;
			}
		}
		& th,
		& td {
			text-align: left;
			padding: 0.6rem 0;
			vertical-align: top;
		}
		& td {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
			padding: 1rem 0;
			vertical-align: top;
		}
		& td:last-child {
			text-align: right;
			float: right;
		}
		& th:last-child {
			text-align: right;
		}
	}
	.actions {
		width: 4rem;
		justify-content: space-between;
		@media (max-width: 480px) {
			width: 3rem !important;
		}
		@media (min-width: 481px) and (max-width: 768px) {
			width: 3rem !important;
		}
		span {
			cursor: pointer;
		}
	}
</style>
