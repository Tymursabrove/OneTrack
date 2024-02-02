<script lang="ts">
	import { onMount } from 'svelte';
	import { dispatchResize } from '$lib/helpers/MiscHelpers';

	let ApexCharts: any;

	export let id;
	export let series;
	export let labels;
	export let showLegend = false;
	export let legendPosition = 'right';

	onMount(async () => {
		ApexCharts = (await import('../../../../local-packages/apexCharts/apexcharts')).default;
		InitChart();
	});

	async function InitChart() {
		let options = {
			series: series,
			chart: {
				type: 'donut',
				height: 320,
				width: 320,
				sparkline: {
					enabled: true
				}
			},
			legend: {
				fontFamily: 'Montserrat, Arial'
			},
			labels: labels,
			colors: ['#46A6FF', '#007DF2', '#C663F7', '#0EBF9F', '#61F5DB', '#8804C9'],
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 0, -100]
				}
			},

			stroke: {
				show: true,
				curve: 'smooth',
				lineCap: 'butt',
				colors: ['#fff'],
				width: 1,
				dashArray: 0
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				enabled: true,

				style: {
					fontSize: '12px',
					fontFamily: 'Montserrat'
				}
			},

			plotOptions: {
				pie: {
					expandOnClick: false
				}
			}
		};
		if (showLegend) {
			options.chart.sparkline.enabled = false;
			options.legend = {
				show: true,
				position: legendPosition,
				labels: {
					colors: ['#fff']
				}
			};
		}
		let chartElm = document.querySelector(`#${id}`);
		if (!chartElm || !options || !series) {
			return;
		}
		let chart = new ApexCharts(chartElm, options);

		chart.render().then(() => {
			setTimeout(dispatchResize, 1000);
			setTimeout(dispatchResize, 3000);
		});
	}
</script>

<div {id} />
