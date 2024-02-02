<script lang="ts" context="module">
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
</script>

<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';

	export let action: 'primary' | 'secondary' = 'primary';
	export let variant: 'info' | 'success' | 'error' | 'warn' = 'info';
	export let size: 'medium' | 'small' = 'medium';

	export let state: 'default' | 'hover' | 'active' = 'default';
	export let role: 'button' | 'dropdown' = 'button';

	export let leftIcon: SpriteIconName | undefined = undefined;
	export let text: string | undefined = undefined;
	export let rightIcon: SpriteIconName | undefined = undefined;

	export let disabled = false;
	export let rounded = false;
</script>

<button
	{...$$restProps}
	class="btn is-{action} is-{variant} is-{size} is-{state} is-{role} {$$restProps.class ?? ''}"
	class:is-disabled={disabled}
	class:rounded
	on:click
>
	{#if $$slots['left-icon'] || leftIcon}
		<div class="btn__icon">
			<slot name="left-icon">
				<Icon name={leftIcon} size="big" />
			</slot>
		</div>
	{/if}

	{#if $$slots['default'] || text}
		<div class="btn__text">
			<slot>
				{text}
			</slot>
		</div>
	{/if}

	{#if $$slots['right-icon'] || rightIcon || role === 'dropdown'}
		<div class="btn__icon" class:-caret={role === 'dropdown'}>
			<slot name="right-icon">
				<Icon name={rightIcon ?? 'tringle'} size={role === 'dropdown' ? 'small' : 'big'} />
			</slot>
		</div>
	{/if}
</button>

<style lang="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
		padding: 10px 21px;
		text-align: center;
		border-radius: 6px;
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.6);
		min-height: 45px;

		&.rounded {
			border-radius: 25px !important;
		}
		&.is-small {
			padding: 4px 21px;
		}

		&.is-active {
			.btn__icon.-caret {
				transform: scaleY(-1);
			}
		}

		&.is-disabled {
			pointer-events: none;
			filter: contrast(0.5) brightness(0.8);
		}

		&__icon {
			&.-caret {
				margin-left: -4px;
			}
		}

		&__text {
			font-size: 16px;
			font-weight: 600;
			line-height: 150%;
			&:not(:last-child) {
				margin-right: auto;
			}
		}

		&.is-secondary {
			border: 1px solid var(--card-background-stroke, #6f6e6e);
			background: var(
				--card-background-fill,
				linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.2) 100%)
			);
		}

		&.is-primary,
		&.is-hover,
		&:hover,
		&.is-active,
		&:active {
			border: 1px solid rgba(255, 255, 255, 0.5);
		}

		&.is-info {
			&.is-primary {
				background: linear-gradient(135deg, rgba(0, 125, 242, 0.4) 0%, #46a6ff 100%);
			}
			&.is-hover,
			&:hover {
				// TODO: wrong background is exported from figma: discuss with Sandra. Yet apply a random background for demo
				background: linear-gradient(
					135deg,
					rgba(0, 125, 242, 0.8) 0%,
					rgba(70, 166, 255, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #007df2, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
			&.is-active,
			&:active {
				background: linear-gradient(
					135deg,
					rgba(0, 125, 242, 0.2) 0%,
					rgba(70, 166, 255, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #007df2, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
		}

		&.is-success {
			&.is-primary {
				background: linear-gradient(135deg, rgba(0, 139, 114, 0.4) 0%, #11c1a2 100%);
			}
			&.is-hover,
			&:hover {
				// TODO: wrong background is exported from figma: discuss with Sandra. Yet apply a random background for demo
				background: linear-gradient(
					135deg,
					rgba(0, 139, 114, 0.8) 0%,
					rgba(17, 193, 162, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #008b72, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
			&.is-active,
			&:active {
				background: linear-gradient(
					135deg,
					rgba(0, 139, 114, 0.2) 0%,
					rgba(17, 193, 162, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #008b72, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
		}

		&.is-error {
			&.is-primary {
				background: linear-gradient(135deg, rgba(134, 10, 10, 0.4) 0%, #e14343 100%);
			}
			&.is-hover,
			&:hover {
				// TODO: wrong background is exported from figma: discuss with Sandra. Yet apply a random background for demo
				background: linear-gradient(135deg, rgba(134, 10, 10, 0.8) 0%, rgba(225, 67, 67, 0.9) 100%);
				box-shadow: 0px 0px 18px 0px #860a0a, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
			&.is-active,
			&:active {
				background: linear-gradient(135deg, rgba(134, 10, 10, 0.2) 0%, rgba(225, 67, 67, 0.9) 100%);
				box-shadow: 0px 0px 18px 0px #860a0a, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
		}

		&.is-warn {
			&.is-primary {
				background: linear-gradient(135deg, rgba(207, 137, 22, 0.4) 0%, #eeb85f 100%);
			}
			&.is-hover,
			&:hover {
				// TODO: wrong background is exported from figma: discuss with Sandra. Yet apply a random background for demo
				background: linear-gradient(
					135deg,
					rgba(207, 137, 22, 0.8) 0%,
					rgba(238, 184, 95, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #cf8916, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
			&.is-active,
			&:active {
				background: linear-gradient(
					135deg,
					rgba(207, 137, 22, 0.2) 0%,
					rgba(238, 184, 95, 0.9) 100%
				);
				box-shadow: 0px 0px 18px 0px #cf8916, 0px 4px 20px 0px rgba(0, 0, 0, 0.6),
					0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
		}
	}
</style>
