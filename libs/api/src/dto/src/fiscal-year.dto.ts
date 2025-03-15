import { Pagination } from '@view/lib/models';

export interface FiscalYearDto extends Pagination {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  description?: string;
}
