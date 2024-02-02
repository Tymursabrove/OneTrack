<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { get } from 'svelte/store';
	import { Workspace } from '$lib/store';
	import { ReloadWorkspaces } from '$lib/services/WorkspaceService';
	export let isOpen: boolean;
	let domain = '';
	async function handleSubmit() {
		let ws = get(Workspace);
		if (!ws) {
			return;
		}
		let workspaceId = ws.id;
		await ReloadWorkspaces();
		closeModal();
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<div class="hf header">
				<div class="vf">
					<h2>New domain</h2>
					<p>For sub-domains (track.example.com), create CNAME record pointing to xxx.xxx.io</p>
				</div>
			</div>
			<form class="vf" on:submit|preventDefault={handleSubmit}>
				<label for="url">URL</label>
				<input type="url" name="url" id="url" placeholder="https://" bind:value={domain} required />
				<label for="domain-url">Root domain URL</label>
				<input
					type="text"
					name="domain-url"
					id="domain-url"
					placeholder="Leave blank to redirect to 404 by default"
				/>
				<p class="dim">
					Redirect all visitors to the root URL of your tracking domain (URL without a campaign ID)
					to 404 page (by default) or to custom URL
				</p>
				<div class="hf buttons">
					<button type="reset" id="btn" on:click={closeModal}>clear</button>
					<button type="submit" id="btn" class="submit">submit</button>
				</div>
			</form>
		</div>
	</div>
{/if}

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
	.vf {
		display: flex;
		flex-direction: column;
	}
	.hf {
		display: flex;
		flex-direction: row;
	}
	h1,
	h2,
	h3 {
		font-size: revert;
		font-weight: revert;
	}
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 27.5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45vw;
		pointer-events: none;
	}
	.contents {
		background: #111a2d;
		border-radius: 24px;
		padding: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}
	.ssl-selection {
		& p {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
		}
		& label {
			margin-left: 2rem;
		}
	}
	form {
		& input,
		& textarea {
			background-color: transparent;
			color: var(--text-color);
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
			border: 1px solid var(--text-color-light);
			border-radius: 0.3rem;
			padding: 5px 8px;
		}
		& label {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
			margin-top: 1rem;
			margin-bottom: 0.07rem;
		}
		& .buttons {
			justify-content: flex-end;
			& button {
				margin-top: 1.5rem;
				margin-left: 0.5rem;
				width: 28%;
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
			}
			& .submit {
				box-shadow: var(--blue-flash-color-shadow);
				background: var(--blue-flash-color);
				border: none;
			}
			#btn {
				@media (max-width: 768px) {
					font-size: 12px;
				}
				@media (max-width: 425px) {
					font-size: 12px;
				}
			}
		}
		input {
			@media (max-width: 480px) {
				padding: 5px 80px 5px 0px;
			}
		}
	}
	h2 {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 20px;
		color: var(--text-color);
	}
	p {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		color: var(--text-color);
		padding: 1rem 0;
	}
	.dim {
		color: var(--text-color-light);
		font-size: 14px;
		padding: 0;
	}
</style>
