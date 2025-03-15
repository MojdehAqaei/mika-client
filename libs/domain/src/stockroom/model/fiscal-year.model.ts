import { Pagination } from '@view/lib/models';

export interface FiscalYearModel extends Pagination {
  id?: number;
  startDate?: Date;
  startDatePersian?: string;
  endDate?: Date;
  endDatePersian?: string;
  title?: string;
  description?: string;
}

export type FiscalYearModelFilter = keyof FiscalYearModel;
