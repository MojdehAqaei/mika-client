import { FiscalYearStatusEnum } from '../enum/fiscal-year-status.enum';
import { Pagination } from '@view/lib/models';

export interface FiscalYearPerStockroomModel extends Pagination {
  id?: number;
  stockroomId?: number;
  stockroomTitle?: string;
  fiscalYearId?: number;
  fiscalYearTitle?: string;
  date?: Date;
  datePersian?: string;
  state?: FiscalYearStatusEnum;
  stateString?: string;
}

export type FiscalYearPerStockroomModelFilter = keyof FiscalYearPerStockroomModel;
