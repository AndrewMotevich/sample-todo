export enum Filter {
  title = 'title',
  date = 'date',
}

export enum FilterOrder {
  ascend = 'ascend',
  descend = 'descend',
}

export interface IFilterInfoObject {
  order: FilterOrder;
  filter: Filter;
}
