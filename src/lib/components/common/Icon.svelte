<script lang="ts" context="module">
	import type { SpriteIconName } from '$lib/common/SpriteIcons';
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Icons } from '$lib/common/SpriteIcons';

	export let name: SpriteIconName | undefined;
	export let size: 'small' | 'medium' | 'big' | 'large' = 'medium';
	export let filled = false;
	export let interactive = false;

	function insertDefs() {
		if (!document.getElementById('icon-defs')) {
			const div = document.createElement('div');
			div.setAttribute(
				'style',
				'position: absolute; top: -999px; left: -999px; width: 0; height: 0;'
			);

			div.innerHTML = `<svg id="icon-defs">
        <defs>
          <linearGradient id="icon-fill-gradient" x1="3.33398" y1="2.5" x2="18.5748" y2="7.39875" gradientUnits="userSpaceOnUse">
            <stop stop-color="#007DF2"/>
            <stop offset="1" stop-color="#46A6FF"/>
          </linearGradient>
        </defs>
      </svg>`;

			document.body.appendChild(div);
		}
	}

	onMount(() => insertDefs());
</script>

{#if name}
	{#if Icons.includes(name) && !name.endsWith(':static')}
		<svg
			{...$$restProps}
			class="icon is-{size} {$$restProps.class ?? ''}"
			class:is-filled={filled}
			class:is-interactive={interactive}
			on:click
		>
			<use xlink:href="/sprite.svg#{name}" />
		</svg>
	{:else}
		<img
			{...$$restProps}
			class="icon is-{size} {$$restProps.class ?? ''}"
			class:is-interactive={interactive}
			src="/icons/{name.replace(':static', '')}.svg"
			alt=""
			on:click
		/>
	{/if}
{/if}

<style lang="scss">
	.icon {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
		fill: currentColor;
		stroke: currentColor;

		&.is-filled {
			fill: url(#icon-fill-gradient);
			stroke: url(#icon-fill-gradient);
		}

		&.is-interactive {
			cursor: pointer;
			&:hover {
				opacity: 0.7;
			}
		}

		&.is-small {
			width: 16px;
			height: 16px;
		}

		&.is-medium {
			width: 20px;
			height: 20px;
		}

		&.is-big {
			width: 24px;
			height: 24px;
		}
		&.is-large {
			width: 40px;
			height: 40px;
		}
	}
</style>
