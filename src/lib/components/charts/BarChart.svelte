<script>
	import { onMount } from 'svelte';
	let ApexCharts;
	import { dispatchResize } from '$lib/helpers/MiscHelpers';
	export let id;
	export let height;
	export let showGrid;
	export let showScales;
	export let series;
	export let border = '0 0 1rem 1rem';
	export let sparkLine = false;
	export let showTooltip = true;
	onMount(async () => {
		ApexCharts = (await import('../../../lib/local-packages/apexCharts/apexcharts')).default;
		InitChart();
	});
	async function InitChart() {
		let options = getOptions();
		let chartElm = document.querySelector(`#${id}`);
		let chart = new ApexCharts(chartElm, options);
		if (!chartElm || !options || !chart) {
			return;
		}
		chart.render().then(() => {
			setTimeout(dispatchResize, 1000);
			setTimeout(dispatchResize, 3000);
		});
	}

	function getOptions() {
		let options = {
			chart: {
				toolbar: false,
				height: height,
				type: 'bar',
				foreColor: '#ffffff',
				stacked: true
				// borderRadius: 5,
			},
			plotOptions: {
				// borderRadius: 5,
				bar: {
                    horizontal: true,
					borderRadius: 5,
					columnWidth: '45%',
					dataLabels: {
						total: {
							enabled: true,
							style: {
								fontSize: '13px',
								fontWeight: 900
							}
						}
					}
				}
			},
			dataLabels: {
				enabled: false
			},
			series: series,
			colors: ['#46A6FF'],
			 
			fill: {
				type: 'gradient',
				gradient: {
					type: 'horizontal',
					shadeIntensity: 0.4,
					opacityFrom: 0.99,
					opacityTo: 0.9,
					inverseColors: true,
					stops: [0, 100, 100]
				}
			},

			grid: {
				show: false,
				position: 'back',
				padding: {
					bottom: 0
				},
				xaxis: {
					lines: {
						show: false
					}
				},
				yaxis: {
					lines: {
						show: false
					}
				}
			},
			onDatasetHover: {
				highlightDataSeries: true
			},
			markers: {
				size: 0
			},
			xaxis: {
				show: false,
				type: 'datetime'
			},
			yaxis: {
				show: false
			}
		};
		options.tooltip = {
			enabled: showTooltip,
			theme: 'dark',
			x: {
				show: showTooltip,
				format: 'dd MMM yyyy'
			},
			y: {
				show: showTooltip
			}
		};
		if (sparkLine) {
			options.chart.sparkline = {
				enabled: true
			};
			options.plotOptions = {
				pie: {
					expandOnClick: false
				}
			};
			return options;
		}
		if (showScales) {
			options.xaxis = {
				show: true,
				labels: {
					style: {
						cssClass: 'apexcharts-scales-label'
					}
				}
			};
			options.yaxis = {
				show: true,
				labels: {
					style: {
						cssClass: 'apexcharts-scales-label'
					}
				}
			};
		}
		if (showGrid) {
			options.grid = {
				position: 'back',
				show: true,

				xaxis: {
					lines: {
						show: true
					}
				},
				yaxis: {
					lines: {
						show: true
					}
				}
			};
		}

		return options;
	}
</script>

<svelte:head>
	<style lang="scss">
		#id-column-bot {
			.apexcharts-series path {
				stroke-width: 3px;
				// stroke-linecap:round;
				@apply overflow-hidden rounded-md;
			}
			line {
				&.apexcharts-xaxis-tick {
					@apply hidden #{!important};
				}
			}
			.apexcharts-datalabels {
				@apply hidden #{!important};
			}
		}
	</style>
</svelte:head>

<div {id} style="border-radius:{border};" />
