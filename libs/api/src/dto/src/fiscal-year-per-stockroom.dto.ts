import { FiscalYearStatusEnum } from '@domain/lib/stockroom';
import { Pagination } from '@view/lib/models';
import { StockroomDto } from './stockroom.dto';
import { FiscalYearDto } from './fiscal-year.dto';

export interface FiscalYearPerStockroomDto extends Pagination {
  id?: number;
  inventory?: StockroomDto;
  fiscalPeriod?: FiscalYearDto;
  determineDate?: Date;
  determineStatus?: FiscalYearStatusEnum;
}
