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
		ApexCharts = (await import('../../local-packages/apexCharts/apexcharts')).default;
		InitChart();
	});

	async function InitChart() {
		let options = {
			series: series,
			chart: {
				type: 'donut',
				height: 340,
				width: 340,			
				sparkline: {
					enabled: true
				}
			},
			// legend: {
            // show:true,
			// 	fontFamily: 'Montserrat, Arial'
			// },

            legend: {
                show:true,
                floating: false,
                fontSize: '16x',
                position: 'top',
				fontWeight: 600,
                horizontalAlign: 'center', 
                fontFamily: 'Montserrat, Arial',
				methodName: 'uppercase',
                colors:'#fff',
				markers: {
					width: 20,
					height: 20,
					strokeWidth: '1px',
					strokeColor:['#C1F3EA','#F16161', ],
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
				},	  
        	},


			labels: labels,
			colors: ['#22DFBD', '#E14343', '#BD1616', '#0EBF9F', '#61F5DB', '#8804C9'],
			fill: {
				type: 'gradient',
				gradient: {
                    shade: 'dark' , 
					shadeIntensity: 0.35, 
					opacityFrom:205,
					opacityTo: 155,
					 
				}
			},
           
			stroke: {
				show: true,
				curve: 'smooth',
				lineCap: 'butt',
				colors: ['#94EADB','#F67A7A', ],
				width: 1,
				dashArray: 0
			},
			dataLabels: {
				enabled: false,
     		 
			},
			tooltip: {
				enabled: true,

				style: {
					fontSize: '12px',
					fontFamily: 'Montserrat',

				}
			},
      

			plotOptions: {
				pie: {
					expandOnClick: false,
					donut:{
						labels:{
						show:true,
						background: 'transparent',
						total:{
							show:true,
							
							label:'Total Traffic',
							name: {
								label:'Total Traffic',
								color:'#fff',
								formatter: function (val) {
      				 		 return val + "%"
    		 					 },
            						},
							}	
						}
					}
				}
			},

			responsive: [
				{
   					 breakpoint: 1290,
   					 options: {
					 chart: {				 
						height: 250,
						width: 250,
						},
					},			
				},
			{
   				 breakpoint: 1024,
    		options: {
		chart: {				 
				height: 300,
				width: 300,
				},
			},			
		},	
	]





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
<style lang="scss" >
	#summeryDonut {
		.apexcharts-pie-series path{
			stroke-width: 3px
		}
	}


		#summeryDonut > div{
			@apply w-full #{!important}
		}
	#summeryDonut .apexcharts-legend{
	 
		@apply flex-col px-0 capitalize tracking-wider leading-relaxed #{!important};
		.apexcharts-legend-series{
			@apply gap-2;
			.apexcharts-legend-marker {
				@apply bg-radial-green #{!important}
			}
		.apexcharts-legend-text{
			@apply tracking-wider  leading-relaxed #{!important}
		}
		
	}
}
.apexcharts-pie{ 
	@apply flex items-center justify-center bg-blue;
	circle {
		fill : radial-gradient(63.52% 63.52% at 68.03% 31.76%, #46A6FF 0%, #007DF2 100%) !important
	}
}
	.apexcharts-datalabels-group{
		.apexcharts-text {
	fill: #fff  !important ;
	@apply font-sans text-sm xl:text-xl xl:leading-none font-semibold w-10 flex break-words #{!important};

}
 
	}
	
</style>
</svelte:head>
<div {id} />
