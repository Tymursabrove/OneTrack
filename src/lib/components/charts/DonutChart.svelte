<script lang="ts">
	import { onMount } from 'svelte';
	import { dispatchResize } from '$lib/helpers/MiscHelpers';

	let ApexCharts: any;

	export let id: string;
	export let series: number[];
	export let labels: string[];
	export let showLegend = false;
	export let legendPosition = 'right';

	onMount(async () => {
		ApexCharts = (await import('../../local-packages/apexCharts/apexcharts')).default;
		InitChart();
	});

	async function InitChart() {
		let options = {
			series: series,
			chart: {
				type: 'donut',
				height: 200,
				width: 500,
				sparkline: {
					enabled: true
				}
			},
			legend: {
				show: true,
				floating: true,
				fontSize: '12x',
				position: 'right',
				fontWeight: 600,
				horizontalAlign: 'left',
				fontFamily: 'Montserrat, Arial',
				methodName: 'uppercase',
				colors: '#fff',
				markers: {
					width: 15,
					height: 15,
					strokeWidth: '1px',
					strokeColor: ['#46A6FF', '#46A6FF', '#61F5DB', '#DF9EFF', '#A929E8', '#46A6FF'],
					fillColors: '#E14343',
					radius: 12,
					customHTML: undefined,
					onClick: undefined,
					offsetX: 0,
					offsetY: 0
				},

				labels: {
					colors: '#fff',
					useSeriesColors: false
				}
			},

			labels: labels,
			colors: ['#46A6FF', '#94EADB', '#16CCAC', '#CA6CF9', '#CA6CF9', '#5AAEFC'],
			fill: {
				opacity: 0.9,
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'diagonal2',
					shadeIntensity: 0.4,
					opacityFrom: 10,
					opacityTo: 20
				}
			},
			stroke: {
				show: true,
				curve: 'smooth',
				lineCap: 'butt',
				colors: ['#2393F7', '#ACEFE3', '#4AE8CB', '#DD99FE', '#BD52F1', '#67AFFC'],
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
					expandOnClick: false,
					donut: {
						labels: {
							show: true,
							total: {
								show: true,
								label: 'Total',
								enabled: true,
								name: {
									label: 'Total',
									color: '#fff'
								}
							}
						}
					}
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


<svelte:head>
	<style lang="scss">
		#meta-events > div {
			@apply w-full #{!important};
		}
		#meta-events .apexcharts-legend {
			@apply flex-col px-0 capitalize tracking-wider leading-relaxed #{!important};
			.apexcharts-legend-series {
				@apply gap-1;
				.apexcharts-legend-marker {
					@apply bg-radial-green #{!important};
				}
				.apexcharts-legend-text {
					@apply tracking-wider leading-relaxed #{!important};
				}
			}
		}

		#events-donut-chart .apexcharts-legend.apx-legend-position-right{right:15px !important;}
		.apexcharts-pie {
			@apply flex items-center justify-center bg-blue;
		}
		.apexcharts-datalabels-group {
			.apexcharts-text {
				fill: #fff !important ;
				@apply font-sans text-sm leading-none font-semibold w-10 flex break-words #{!important};
				&:first-child {
					y: 77.5 !important;
				}
				&:last-child {
					y: 95.5 !important;
				}
			}
		}
		#events-donut-chart .apexcharts-legend-marker{
			@apply top-0.5 mr-2 #{!important}
		}
		#events-donut-chart .apexcharts-legend-text{
			@apply text-sm capitalize
		}
	</style>
</svelte:head>
<div {id} />
