import { Pagination } from '@view/lib/models';

export interface CountingUnitModel extends Pagination {
  id?: number;
  code?: string;
  title?: string;
  type?: string;
  isActive?: boolean;
  countingUnitTypeId?: number; // for search filter schema
  countingUnitType?: {
    value?: {
      id?: number
    };
    label?: string;
  };
}


export type CountingUnitModelFilter = keyof CountingUnitModel;
