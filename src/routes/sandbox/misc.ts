import type { IDndListSetup } from "./components/DndList"

export const homeDndList1: IDndListSetup = {
  name: 'homeDndList1',
  itemsSize: 'small',
  items: [{
    name: 'adSpend',
    title: 'Ad Spend',
    info: 'Tooltip body',
    fullWidthContent: true,
  },{
    name: 'revenue',
    title: 'Revenue',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'sales',
    title: 'Sales',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'leeds',
    title: 'Leeds',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'roas',
    title: 'ROAS',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'aov',
    title: 'AOV',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'cpp',
    title: 'CPP',
    info: 'Item Info Text',
    // fullWidthContent: true,
  },{
    name: 'cpl',
    title: 'CPL',
    info: 'Item Info Text',
    // fullWidthContent: true,
  }]
}

export const homeDndList2: IDndListSetup = {
  name: 'homeDndList2',
  itemsSize: 'medium',
  items: [{
    name: 'conversionMetrics',
    title: 'Conversion Metrics',
    info: 'Tooltip body',
    description: 'Here are your Ad Spend, profits and ROAS over all platforms.',
  },{
    name: 'cpsCpl',
    title: 'CPS/CPL',
    info: 'Item Info Text',
    description: 'Here are xxx',
  }]
}

export const homeDndList3: IDndListSetup = {
  name: 'homeDndList3',
  itemsSize: 'small',
  items: [{
    name: 'currentVisitors',
    title: 'Current Visitors',
    info: 'Tooltip body',
    online: true,
  },{
    name: 'traffic',
    title: 'Traffic',
    info: 'Item Info Text',
  },{
    name: 'uniqueTraffic',
    title: 'Unique Traffic',
    info: 'Item Info Text',
  },{
    name: 'cvr',
    title: 'CVR',
    info: 'Item Info Text',
  }]
}

export const homeDndList4: IDndListSetup = {
  name: 'homeDndList4',
  itemsSize: 'small',
  items: [{
    name: 'meta',
    title: 'Meta',
    info: 'Tooltip body',
    online: true,
  },{
    name: 'google',
    title: 'Google',
    info: 'Item Info Text',
  },{
    name: 'tiktok',
    title: 'TikTok',
    info: 'Item Info Text',
  },{
    name: 'snapchat',
    title: 'Snapchat',
    info: 'Item Info Text',
  }]
}

export function getChartValues (unit: '5m'|'1h' = '1h') {
  let data: [number, number][] = []

  if (unit === '5m') data.length = 24 * (60 / 5)
  if (unit === '1h') data.length = 24

  const now = new Date()
  now.setUTCHours(0,0,0,0)

  function getTimestamp (index: number) {
    if (unit === '5m') return now.getTime() + (5 * index * 60 * 1000)
    if (unit === '1h') return now.getTime() + (60 * index * 60 * 1000)
  }

  return data.fill([0, 0]).map((_, index) => [
    getTimestamp(index),
    Math.ceil(Math.random() * 100),
  ]) as [number, number][]
}