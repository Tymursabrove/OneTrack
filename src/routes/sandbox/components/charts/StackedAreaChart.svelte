<script lang="ts" context="module">
  import type { default as ApexCharts, ApexOptions } from 'apexcharts'

  export type ChartValueType = [number, number | null]
  export type ChartFillType = 'blue'|'violet'|'green'|'yellow'|'red'
  export type ChartDimensionType = '5m'|'1h'|'1d'
  export type ChartGroupType = {
    title: string;
    color?: ChartFillType;
    values: ChartValueType[];
  }

  export interface IChartSetup {
    height: number;
    dimension: ChartDimensionType;
    showLabels?: boolean;
    groups: ChartGroupType[];
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import Charts from 'apexcharts'

  export let setup: IChartSetup

  let chartEl: HTMLDivElement
  let chart: ApexCharts
  const toolbarHeight = 30 // Apexcharts bug: with toolbar = false, the chart offset top remains same

  let options: ApexOptions = {
    chart: {
      height: setup.height,
      width: '100%',
      type: "area",
      toolbar: { show: false },
      animations: { enabled: false },
      sparkline: { enabled: !setup.showLabels },
      parentHeightOffset: 0,
      offsetY: setup.showLabels ? -toolbarHeight : 0,
      zoom: { enabled: false },
      dropShadow: {
        enabled: true,
        top: -2,
        left: 0,
        blur: 4,
        color: setup.groups.map(({ color }) => getColor(color).fill) as string & string[],
        opacity: .7,
      }
    },
    series: getSeries(),
    stroke: getStroke(),
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: .1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
        type: "vertical",
      }
    },
    legend: { show: false },
    tooltip: {
      theme: "ot-custom",
      x: { format: getTooltipFormat() },
    },
    dataLabels: { enabled: false },
    grid: { show: setup.showLabels, borderColor: '#737c88' },
    xaxis: {
      type: 'datetime',
      min: getLimits().min,
      max: getLimits().max,
      labels: { show: setup.showLabels, maxHeight: 20, style: { colors: '#d3d4d7' } },
      axisTicks: { show: false },
      axisBorder: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: { show: setup.showLabels, maxWidth: 20, style: { colors: '#d3d4d7' } },
      axisTicks: { show: false },
      axisBorder: { show: false },
      tooltip: { enabled: false },
    },
  }

  function getColor (color?: ChartFillType) {
    if (color === 'blue') return { fill: '#007DF2', stroke: '#C1E1FF' }
    if (color === 'violet') return { fill: '#A221E1', stroke: '#EAC5FC' }
    if (color === 'green') return { fill: '#16CCAC', stroke: '#C5FBF2' }
    if (color === 'red') return { fill: '#BD1616', stroke: '#F7CACA' }
    if (color === 'yellow') return { fill: '#F9AF35', stroke: '#FDE7C4' }
    return { fill: '#8B939E', stroke: '#E0E0E0' }
  }

  function getSeries (): ApexOptions['series'] {
    return setup.groups.map(group => ({
      type: 'area',
      name: group.title,
      color: getColor(group.color).fill,
      data: group.values
    }))
  }

  function getStroke (): ApexOptions['stroke'] {
    return {
      show: true,
      curve: 'smooth',
      lineCap: 'round',
      colors: setup.groups.map(({ color }) => getColor(color).stroke + '80'),
      width: setup.groups.map(({ color }) => color ? 2 : 2),
      dashArray: setup.groups.map(({ color }) => color ? 0 : 3.5),
    }
  }

  function getLimits () {
    const timestamps = setup.groups
      .map(({ values }) => values)
      .flat(1)
      .map(([ timestamp ]) => timestamp)

    return {
      min: Math.min(...timestamps),
      max: Math.max(...timestamps),
    }
  }

  function getTooltipFormat () {
    if (setup.dimension === '5m') return 'dd MMM HH:mm'
    if (setup.dimension === '1h') return 'dd MMM HH:mm'
    return 'dd MMM'
  }

  onMount(() => {
    chart = new Charts(chartEl, options)
    chart.render()

    return () => chart.destroy()
  })
</script>

<div
  class="stack-area-chart"
  class:is-simple={!setup.showLabels}
  style="height: {setup.height - (setup.showLabels ? toolbarHeight : 0)}px"
  bind:this={chartEl}
></div>

<style lang="scss" global>
  .stack-area-chart {
    min-height: unset!important;
    color: #fff;
    [stroke-dasharray="3.5"] {
      fill: none; // Gradient will 
    }
    svg {
      overflow: visible;
    }
  }
</style>