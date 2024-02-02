import type { ITableSetup, ITableColumn } from '$lib/components/table/types'

export function getTableSetup (
  getSharedCols: () => ITableColumn[],
  setupSource: any
): ITableSetup {
  const { title, icon, name, insertCols, insertAt } = setupSource

  let cols = getSharedCols()
  cols.splice(insertAt ?? 0, 0, ...insertCols)

  return {
    title,
    icon,
    name,

    rowHeight: 66,
    rowsPerView: 10,
    startScrollPosition: 0,

    order: cols.map(col => col.name),
    pinned: ['id'],
    visible: cols.map(col => col.name),

    cols: cols.map(col => {
      col.info = col.info?.replaceAll('{table_title}', title)
      return col
    }),
  }
}

export function getTableSetups (
  getSharedCols: () => ITableColumn[],
  getSetupSources: () => {
    campaigns: any;
    adSets: any;
    ads: any;
  }
): {
  campaigns: ITableSetup;
  adSets: ITableSetup;
  ads: ITableSetup;
} {
  const setupSources = getSetupSources()

  return {
    campaigns: getTableSetup(getSharedCols, setupSources.campaigns),
    adSets: getTableSetup(getSharedCols, setupSources.adSets),
    ads: getTableSetup(getSharedCols, setupSources.ads),
  }
}
