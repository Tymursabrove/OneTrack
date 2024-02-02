import type { SpriteIconName } from '$lib/common/SpriteIcons';

export type RowType = $$Generic<Record<string, any>>;

export interface ITableVScroll {
    range: { startAt: number; endAt: number; };
    offsets: { top: number; bottom: number; };
};

export interface ITableColumn {
    id?: number;
    name: string;
    icon?: SpriteIconName;
    title: string;
    info?: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    type?: 'roas';
    controlsDisabled?: boolean;
    ascSortFn?: IAscSortFn;
    getValue: (row: RowType) => any;
    getSummary?: (data: RowType[]) => any;
    display?: (value: any) => any;
};

export interface ITableSettingsColumn extends ITableColumn {
    isVisible: boolean;
    isPinned: boolean;
};

export interface ITableSettingsRoas {
    page: string;
    title: string;
    value: number | string | null;
};

export interface ITableSetup {
    _selectedIds?: string[];

    title: string;
    icon?: SpriteIconName;
    name: string;

    rowHeight: number;
    rowsPerView: number;
    startScrollPosition?: number;

    order: string[];
    pinned: string[];
    visible: string[];

    cols: ITableColumn[];
};

export interface ITableBus {
    tableEl: HTMLDivElement;
    unpinnedCols: ITableColumn[];
    pinnedCols: ITableColumn[];
    orderedCols: ITableColumn[];
    visibleCols: ITableColumn[];
    setScrollPosition: (scrollTop: number) => ITableVScroll;
    toggleVisibility: (colName: string) => boolean;
    togglePin: (colName: string) => boolean;
    getDataAsCSV: () => string;
    sort: (
      sortData: ISortData,
      display: ITableColumnDisplay,
      ascSortFn?: IAscSortFn
    ) => RowType[];
    removeStorageKeys: () => void;
};

export type ITableColumnDisplay = (row: RowType) => any;

export type ISortDir = 'asc' | 'desc' | null;

export type ISortData = {
  colName: string;
  dir: ISortDir;
};

export type IAscSortFn = (
  valueA: any,
  valueB: any,
  display: ITableColumnDisplay,
  sortData: ISortData
) => -1|1;
