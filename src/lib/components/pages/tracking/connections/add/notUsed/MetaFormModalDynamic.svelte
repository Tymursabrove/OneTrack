<script>
	import { closeModal } from 'svelte-modals';
	import { onMount } from 'svelte';
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import { Icons } from '$lib/resources/IconResources';
	import { goto } from '$app/navigation';
	import { uniqueId } from '$lib/helpers/MiscHelpers';
	export let isOpen;

	let pixelsIds = [];
	let conversionAPIs = [];
	let accountName = '';
	let showError = false;
	let errorMessage = '';
	let errorHeading = '';
	let userName = null;

	onMount(async () => {
		pixelsIds = [];
		conversionAPIs = [];
		addEmptyItemInPixelIDs();
		addEmptyItemInConverAPIs();
	});
	function addEmptyItemInPixelIDs() {
		pixelsIds.push({ name: '', value: '', id: uniqueId() });
		pixelsIds = pixelsIds;
	}
	function addEmptyItemInConverAPIs() {
		conversionAPIs.push({ name: '', value: '', id: uniqueId() });
		conversionAPIs = conversionAPIs;
	}
	function removeItemFromPixelIds(id) {
		pixelsIds = pixelsIds.filter((x) => x.id != id);
	}
	function removeItemFromConversionApis(id) {
		conversionAPIs = conversionAPIs.filter((x) => x.id != id);
	}





	
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			{#if !showError}
				<div class="main-wrapper">
					<div class="hf logoIcon">
						<Icon data={Icons.metaLogoIcon} width="50" height="40" color="transparent" />
						<p>Meta</p>
					</div>
					<div class="inputs-wrapper">
						<div class="input-group">
							<label for="workspace">Account Name</label>
							<div class="input-container">
								<input
									class="input-field"
									type="text"
									placeholder="Name"
									bind:value={accountName}
								/>
							</div>
						</div>
					</div>

					<div class="divider" />
					<div class="hf heading">
						<h2>Pixel ID</h2>
						<button on:click={addEmptyItemInPixelIDs}>+</button>
					</div>
					{#each pixelsIds as item (item.id)}
						<div class="inputs-wrapper">
							<div class="input-group">
								<label for="workspace">Pixel Name</label>
								<div class="input-container">
									<input
										class="input-field"
										type="text"
										placeholder="Name"
										bind:value={item.name}
									/>
								</div>
							</div>
							<div class="input-group">
								<label for="workspace">Pixel value</label>
								<div class="input-container">
									<input
										class="input-field"
										type="text"
										placeholder="value"
										bind:value={item.value}
									/>
								</div>
							</div>
							<button
								on:click={() => {
									removeItemFromPixelIds(item.id);
								}}>-</button
							>
						</div>
					{/each}

					<div class="divider" />
					<div class="hf heading">
						<h2>Conversion API</h2>
						<button on:click={addEmptyItemInConverAPIs}>+</button>
					</div>
					{#each conversionAPIs as item (item.id)}
						<div class="inputs-wrapper">
							<div class="input-group">
								<label for="workspace">Conversion API Name</label>
								<div class="input-container">
									<input class="input-field" type="text" placeholder="Name" />
								</div>
							</div>
							<div class="input-group">
								<label for="workspace">Conversion API value</label>
								<div class="input-container">
									<input class="input-field" type="text" placeholder="value" />
								</div>
							</div>
							<button
								on:click={() => {
									removeItemFromConversionApis(item.id);
								}}>-</button
							>
						</div>
					{/each}
				</div>
				<div class="hf footer">
					<button class="wrapper-btn" type="reset" id="btn" on:click={closeModal}>clear</button>
					<button class="wrapper-btn save" type="reset" id="btn" on:click={closeModal}>save</button>
				</div>
			{:else}
				<div class="vf">
					<h2 style="align-self:center;">{errorHeading}</h2>
					<p style="text-align: center;">{errorMessage}</p>
					<button
						class="wrapper-btn save"
						style="align-self:center;margin-top:35px;margin-left:0;"
						id="btn-cancel"
						on:click={closeModal}>cancel</button
					>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		pointer-events: none;
	}
	.contents {
		background: #111a2d;
		border-radius: 24px;
		padding: 25px;
		width: 800px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
		@media (max-width: 768px) and (min-width: 480px) {
			width: 450px;
		}
		@media (max-width: 479px) {
			width: 300px;
		}
		h2 {
			display: flex;
			justify-content: flex-start;
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 700;
			font-size: 24px;
			line-height: 20px;
			margin-bottom: 10px;
			@media (max-width: 768px) and (min-width: 480px) {
				font-size: 20px;
			}
			@media (max-width: 479px) {
				font-size: 18px;
			}
		}
	}

	.wrapper-btn {
		margin-left: 0.5rem;
		width: 23%;
		text-transform: capitalize;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		border: 1px solid var(--text-color-light);
		padding: 0.4rem;
		background-color: transparent;
		cursor: pointer;
		color: var(--text-color);
		border-radius: 1.5rem;
		@media (max-width: 768px) and (min-width: 480px) {
			width: 20%;
			font-size: 13px;
		}
		@media (max-width: 479px) {
			width: 40%;
			font-size: 12px;
		}
	}
	.save {
		border-color: #1087f5;
		background-color: #1087f5;
		box-shadow: 0 0 25px 1px #359cfc;
	}

	.footer {
		justify-content: end;
		margin-top: 40px;
	}
	.main-wrapper {
		max-height: 600px;
		overflow-y: auto;
		width: 100%;
	}
	.logoIcon {
		align-items: center;
		& p {
			margin-left: 0.7rem;
			font-weight: bold;
		}
	}
	.inputs-wrapper {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		width: 100%;
		align-items: flex-end;
		.input-group {
			width: 40%;
			margin-right: 20px;
		}
		label {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
			margin-bottom: 5px;
		}
		input::placeholder {
			color: var(--text-color-light);
		}

		.input-container {
			display: flex;
			width: 100%;
			background-color: transparent;
			border-radius: 6px;
			border: 1.5px solid var(--text-color-light);
			align-items: center;
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 30px;
			height: 40px;
		}

		.input-field {
			width: 100%;
			padding: 7px;
			outline: none;
			background-color: transparent;
			border: none;
			color: var(--text-color);
		}

		.input-field:focus {
			border: none;
		}
		.input-container:focus-within {
			border: 1.5px solid var(--text-color);
		}
	}
	.heading {
		align-items: flex-end;
		& :nth-child(1) {
			width: 185px;
		}
		& :nth-child(2) {
			margin-left: 20px;
		}
	}
	button {
		padding: 7px;
		outline: none;
		color: var(--text-color);
		font-weight: bolder;
		font-size: 20px;
		background-color: transparent;
		border-radius: 6px;
		border: 1.5px solid var(--text-color-light);
		width: 40px;
		height: 40px;
		margin-top: 10px;
	}
	button:hover {
		border: 1.5px solid var(--text-color);
		cursor: pointer;
	}

	.divider {
		border-bottom: 1px solid var(--text-color-light);
		width: 100%;
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
