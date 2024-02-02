<script>
	import Icon from '$lib/local-packages/Svelte-Icon.svelte';
	import Chart from '$lib/components/charts/DonutChart.svelte';
	import { TransformCurrencyValue } from '$lib/helpers/MiscHelpers';

	export let id;
	export let connectorName;
	export let iconRaw;
	export let adSpendTotal = 0;
	export let overAllAdspend = 0;
	export let roas = 0;
	export let orderValue = 0;
	export let orders = 0;
	export let averageOrderValue = 0;

	export let cpc = 0;
	export let cpm = 0;
	export let cpp = 0;
	export let ctr = 0;
	export let cpo = 0;
</script>

<div class="hf social-info-cards">
	<div class="vf social-info-card glass">
		<h2>{connectorName}</h2>
		<div style="width: 124px; height: 124px; float: left; position: relative; align-self:center;">
			<div
				style="width: 100%; height: 65px; position: absolute; top: 50%; left: 0; margin-top: -20px; line-height:19px; text-align: center; z-index: 9; display: flex;align-items: center;justify-content: center;"
				data={iconRaw}
			>
				<Icon data={iconRaw} width="40px" height="40px" />
			</div>
			<Chart
				id="meta-pie-{id}"
				height="124"
				series={[overAllAdspend - adSpendTotal, adSpendTotal]}
				labels={['Total', connectorName]}
				showLegend={false}
			/>
		</div>
		<div class="ad-spend vf">
			<p>Ad spend</p>
			<h2 class="spend-value">
				{`${TransformCurrencyValue(adSpendTotal, 2)}`}
			</h2>
		</div>
		<div class="hf tb-head">
			<p>OneTrack</p>
			<p>Meta</p>
		</div>
		<div class="info vf">
			<h3>ROAS</h3>
			<div class="info-btns hf">
				<button class="good">N/A</button>
				<button class="bad">{`${roas}`} </button>
			</div>
		</div>
		<div class="info vf">
			<h3>Attribution</h3>
			<div class="info-btns hf">
				<button class="good">N/A</button>
				<button class="bad">N/A</button>
			</div>
		</div>
		<div class="info vf">
			<h3>Order value</h3>
			<div class="info-btns hf">
				<button class="good">N/A</button>
				<button class="bad">
					{`${TransformCurrencyValue(orderValue, 2)}`}
				</button>
			</div>
		</div>
		<div class="info vf">
			<h3>Orders</h3>
			<div class="info-btns hf">
				<button class="good">N/A</button>
				<button class="bad"> {`${orders}`} </button>
			</div>
		</div>
		<div class="info vf">
			<h3>Average order value</h3>
			<div class="info-btns hf">
				<button class="good">N/A</button>
				<button class="bad">
					{`${TransformCurrencyValue(averageOrderValue, 2)}`}
				</button>
			</div>
		</div>
		<div class="info-columns vf">
			<div class="info-column hf">
				<p class="field">CPC</p>
				<p class="value">{`${TransformCurrencyValue(cpc, 2)}`}</p>
			</div>
			<div class="info-column hf">
				<p class="field">CPM</p>
				<p class="value">{`${TransformCurrencyValue(cpm, 2)}`}</p>
			</div>
			<div class="info-column hf">
				<p class="field">CPP</p>
				<p class="value">{`${TransformCurrencyValue(cpp, 2)}`}</p>
			</div>
			<div class="info-column hf">
				<p class="field">CTR</p>
				<p class="value">{`${TransformCurrencyValue(ctr, 2)}`}</p>
			</div>
			<div class="info-column hf">
				<p class="field">CPO</p>
				<p class="value">{`${TransformCurrencyValue(cpo, 2)}`}</p>
			</div>
		</div>
		<div class="result-info vf">
			<h3>Status</h3>
			<button class="good">Good</button>
		</div>
	</div>
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
	.glass {
		border-radius: 1rem;
		backdrop-filter: blur(100px);
		-webkit-backdrop-filter: blur(100px);
		background: linear-gradient(
			116.02deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.02) 100%
		);
		box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1), inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.1),
			inset 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
	}
	.vf {
		display: flex;
		flex-direction: column;
	}
	.hf {
		display: flex;
		flex-direction: row;
	}
	.social-info-card {
		width: 290px;
		border-radius: 0.5rem;
		margin-top: 20px;
		& h2 {
			margin-top: 0.6rem;
			margin-left: 0.3rem;
			padding: 0 0.4rem;
			font-size: 1.1rem;
			text-transform: capitalize;
		}
		& .ad-spend {
			margin-top: 1rem;
			width: 100%;
			background: radial-gradient(
				63.52% 63.52% at 68.03% 31.76%,
				#46a6ff 0%,
				#007df2 0.01%,
				#004a8f 100%,
				#004a8f 100%
			);
			& p {
				margin: 0.3rem 0;
				text-align: center;
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
			}
			& .spend-value {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: bolder;
				font-size: 24px;
				line-height: 20px;
				text-align: center;
				margin-bottom: 5px;
			}
		}
		& .tb-head {
			justify-content: space-between;
			padding-top: 0.6rem;
			margin: 0 0.4rem;
			padding-bottom: 0.3rem;
			border-bottom: 1px solid var(--text-color-light);
			& p {
				font-size: 0.7rem;
			}
		}
		& .info {
			font-size: 0.7rem;
			text-align: center;
			padding: 0.6rem 0.3rem;
			& h3 {
				margin-bottom: 5px;
			}
			& .info-btns {
				justify-content: space-between;
				& button {
					width: 47.5%;
					height: 25px;
					border-radius: 0.4rem;
					font-family: 'Montserrat';
					font-style: normal;
					font-weight: 600;
					font-size: 18px;
					line-height: 20px;
				}
			}
		}
		& .info:hover {
			backdrop-filter: blur(100px);
			-webkit-backdrop-filter: blur(100px);
			background: linear-gradient(
				116.02deg,
				rgba(255, 255, 255, 0.05) 0%,
				rgba(255, 255, 255, 0.02) 100%
			);
			box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1), inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.1),
				inset 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
		}
		& .info-columns {
			padding: 0.1rem;

			padding-top: 0.2rem;
			margin: 0 0.3rem;
			padding-bottom: 0.3rem;
			border-top: 1px solid var(--text-color-light);
			& .info-column {
				justify-content: space-between;
				align-items: center;
				align-content: center;
				margin: 0.2rem 0rem;

				& .field {
					font-size: 0.7rem;
					color: var(--text-color);
				}
				& .value {
					font-size: 0.7rem;
					color: var(--text-color-light);
				}
			}
		}
		& .result-info {
			padding-top: 0.4rem;
			margin: 0 0.3rem;
			padding-bottom: 0.3rem;
			border-top: 1px solid var(--text-color-light);
			justify-content: center;
			align-items: center;
			& h3 {
				font-size: 1rem;
			}
			& button {
				border-radius: 0.9rem;
				padding: 3px 10px;
				margin-top: 5px;
				margin-bottom: 5px;

				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;

				text-align: center;
				text-transform: uppercase;
			}
		}
	}
	.good {
		background: var(--good-state);
		color: var(--text-color);
		border: none;
	}
	.bad {
		background: var(--bad-state);
		color: var(--text-color);
		border: none;
	}
	@media (max-width: 767px) {
		.social-info-card {
			width: 90vw;
		}
	}
	@media (min-width: 768px) and (max-width: 992px) {
		.social-info-card {
			width: 44vw;
		}
	}
</style>
