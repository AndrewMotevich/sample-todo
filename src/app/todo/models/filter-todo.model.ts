export type FilterType = 'title' | 'date';

export type FilterOrderType = 'ascend' | 'descend';

export type FilterInfoObject = {
  order: FilterOrderType;
  filter: FilterType;
};
