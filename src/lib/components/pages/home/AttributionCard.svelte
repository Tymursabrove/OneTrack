<script>
	import Chart from '$lib/components/charts/Chart.svelte';
	import { GetSeriesForMetricsChart } from '$lib/helpers/MetricsChartsHelpers';
	export let id;
	export let heading;
	export let value;
	export let data;
	let series = [];
	$: TransformData(data, heading);
	function TransformData(dataSet, label) {
		if (!dataSet || dataSet.length == 0) {
			return;
		}
		series = GetSeriesForMetricsChart(dataSet, label);
	}
</script>

<div class="vf fullheight glass">
	<div class="data">
		<p class="key">{heading}</p>
		<p class="value">{value}</p>
	</div>
	<Chart
		id="attribution-{id}"
		height={50}
		type="area"
		showGrid={false}
		showScales={false}
		sparkLine={true}
		{series}
	/>
</div>

<style lang="scss">
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
	.fullheight {
		margin-top: 0.5rem;
		height: 120px;
		width: 290px;

		justify-content: space-between;
		& .data {
			padding: 10px;
			& .key {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
				padding-bottom: 5px;
				margin-bottom: 5px;
			}
			& .value {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 700;
				font-size: 40px;
				line-height: 20px;
			}
		}
	}
	@media (max-width: 768px) {
		.fullheight {
			width: 80vw !important;
			margin-top: 20px;
		}
	}
	@media (min-width: 768px) and (max-width: 992px) {
		.fullheight {
			width: 40vw !important;
		}
	}
</style>
