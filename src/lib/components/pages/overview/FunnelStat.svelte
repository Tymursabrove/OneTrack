<script>
	import Chart from '$lib/components/charts/Chart.svelte';
	export let id;
	export let series;
	export let height;
	export let funnelLevel = '';
</script>

<div class="vf funnel-stat">
	<div class="chart vf">
		<p class="funnel-label">{funnelLevel}</p>
		<Chart
			id="funnel-main-{id}"
			type="area"
			{height}
			showGrid={false}
			showScales={false}
			sparkLine={true}
			{series}
			border="0"
		/>
	</div>
	<div class="hf upper">
		<h2>4,000</h2>
		<select class="glass">
			<option value="all" selected>page views</option>
		</select>
	</div>
	<div class="hf lower">
		<p>$200</p>
		<select class="glass">
			<option value="all" selected>CPC</option>
		</select>
	</div>
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
	.hf {
		display: flex;
		flex-direction: row;
	}
	.chart {
		margin-bottom: 10px;
	}
	.funnel-stat {
		width: 23%;
		justify-content: flex-end;
		flex-wrap: wrap;

		& .upper {
			justify-content: space-between;
			padding-bottom: 0.3rem;
			border-bottom: 1px solid var(--text-color-light);
			align-items: center;
			& h2 {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 700;
				font-size: 25px;
				line-height: 20px;
			}
			& select {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
				border: none;
				color: var(--text-color);
				padding: 0.2rem 0.6rem;
				margin-left: 0.8rem;
				border-radius: 0.3rem;
				width: 55%;
			}
		}
		& .lower {
			justify-content: space-between;
			padding-top: 0.3rem;
			align-items: center;

			& p {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 700;
				font-size: 18px;
				line-height: 20px;
			}
			& select {
				font-family: 'Montserrat';
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
				border: none;
				color: var(--text-color);
				padding: 0.2rem 0.6rem;
				margin-left: 0.8rem;
				border-radius: 0.3rem;
				width: 55%;
			}
		}
	}
	@media (max-width: 768px) {
		.funnel-stat {
			width: 80%;
			margin: 20px;
		}
	}
	@media (min-width: 768px) and (max-width: 992px) {
		.funnel-stat {
			width: 35%;
			margin: 20px;
		}
	}
</style>
