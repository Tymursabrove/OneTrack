<script>
	import { onMount } from 'svelte';

	let klass = '';
	export { klass as class };
	export let color = 'default';
	export let active = false;
	export let top = false;
	export let bottom = false;
	export let left = false;
	export let right = false;

	let innerWidth;
	let innerHeight;
	let scrollX;
	let scrollY;
	let activator;
	let tooltip;

	const themeColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];

	const calcXOverflow = (calculatedLeft, width) => {
		const xOverflow = calculatedLeft + width - innerWidth + 12;
		let newLeft = calculatedLeft;

		if ((!left || right) && xOverflow > 0) {
			newLeft = Math.max(calculatedLeft - xOverflow, 0);
		} else {
			newLeft = Math.max(calculatedLeft, 12);
		}

		return newLeft + scrollX;
	};

	const calcYOverflow = (calculatedTop) => {
		const toTop = scrollY + innerHeight;
		const tooltipHeight = tooltip.offsetHeight;
		const totalHeight = calculatedTop + tooltipHeight;
		const isOverflowing = toTop < totalHeight;
		let newTop = calculatedTop;

		// If overflowing bottom and offset
		if (isOverflowing && activator.top > tooltipHeight) {
			newTop = scrollY + (activator.top - tooltipHeight);
			// If overflowing bottom
		} else if (isOverflowing) {
			newTop = toTop - tooltipHeight - 12;
			// If overflowing top
		} else if (calculatedTop < scrollY) {
			newTop = scrollY + 12;
		}

		return newTop < 12 ? 12 : newTop;
	};

	const calculateLeft = () => {
		const activatorLeft = activator.getBoundingClientRect().x + scrollX;
		let calculatedLeft = 0;

		if (top || bottom) {
			calculatedLeft = activatorLeft + activator.offsetWidth / 2 - tooltip.offsetWidth / 2;
		} else if (left || right) {
			calculatedLeft =
				activatorLeft + (right ? activator.offsetWidth : -tooltip.offsetWidth) + (right ? 10 : -10);
		}

		return `${calcXOverflow(calculatedLeft, tooltip.offsetWidth)}px`;
	};

	const calculateTop = () => {
		const activatorTop = activator.getBoundingClientRect().y + scrollY;
		let calculatedTop = 0;

		if (top || bottom) {
			calculatedTop =
				activatorTop +
				(bottom ? activator.offsetHeight : -tooltip.offsetHeight) +
				(bottom ? 10 : -10);
		} else if (left || right) {
			calculatedTop = activatorTop + activator.offsetHeight / 2 - tooltip.offsetHeight / 2;
		}

		return `${calcYOverflow(calculatedTop)}px`;
	};

	const updateTooltipPosition = () => {
		document.body.appendChild(tooltip);
		tooltip.style.left = calculateLeft();
		tooltip.style.top = calculateTop();
	};

	const handleMouseEnter = () => {
		active = true;
	};

	const handleMouseLeave = () => {
		active = false;
	};

	const handleResize = () => {
		if (active) {
			updateTooltipPosition();
		}
	};

	const handleActiveUpdate = () => ({
		update: () => {
			if (active) {
				updateTooltipPosition();
			}
		}
	});

	const BackgroundColor = (node, text) => {
		let klass;
		if (typeof text === 'string') {
			klass = setBackgroundColor(node, text);
		}

		return {
			update(newText) {
				if (klass) {
					node.classList.remove(...klass);
				} else {
					node.style.backgroundColor = null;
				}

				if (typeof newText === 'string') {
					klass = setBackgroundColor(node, newText);
				}
			}
		};
	};
	function setBackgroundColor(node, text) {
		if (/^(#|rgb|hsl|currentColor)/.test(text)) {
			// This is a CSS hex.
			node.style.backgroundColor = text;
			return false;
		}

		if (text.startsWith('--')) {
			// This is a CSS variable.
			node.style.backgroundColor = `var(${text})`;
			return false;
		}

		const klass = formatClass(text);
		node.classList.add(...klass);
		return klass;
	}
	function formatClass(klass) {
		return klass.split(' ').map((i) => {
			if (themeColors.includes(i)) return `${i}-color`;
			return i;
		});
	}
	onMount(() => {
		updateTooltipPosition();

		return () => tooltip.remove();
	});
</script>

<svelte:window
	bind:innerWidth
	bind:innerHeight
	bind:scrollX
	bind:scrollY
	on:resize={handleResize}
/>

<div
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	bind:this={activator}
	class="s-tooltip__wrapper"
>
	<!-- Slot for the element that display the tooltip -->
	<slot />
</div>

<span
	bind:this={tooltip}
	class="s-tooltip {klass}"
	class:active
	class:bottom
	class:top
	class:left
	class:right
	use:handleActiveUpdate={active}
	use:BackgroundColor={color}
>
	<!-- Slot for the content of the tooltip -->
	<slot name="tip" />
</span>

<style lang="scss" src="./Tooltip.scss" global>
	:global(.s-tooltip__wrapper) {
		display: inline-block;
		cursor: pointer;
	}
	:global(.s-tooltip) {
		background: rgba(97, 97, 97, 0.9);
		color: #fff;
		border-radius: 4px;
		font-size: 14px;
		line-height: 22px;
		z-index: 1000;
		display: inline-block;
		padding: 5px 16px;
		position: absolute;
		text-transform: none;
		text-align: center;
		width: auto;
		opacity: 0;
		pointer-events: none;
		transform-origin: center;
		transform: scale(0);
		transition-property: opacity, transform;
		transition-duration: 0.3s, 0s;
		transition-delay: 0s, 0.3s;
		transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	}
	:global(.s-tooltip.active) {
		opacity: 0.9;
		transform: scale(1);
		transition-property: transform, opacity;
		transition-duration: 0.3s;
		transition-delay: 0s;
	}
</style>
