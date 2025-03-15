import { Pagination } from "@view/lib/models";
import { StockroomDto } from './stockroom.dto';
import { FiscalYearDto } from './fiscal-year.dto';
import { WarehousingStateEnum } from '@domain/lib/stockroom';
import { WarehousingItemDto } from './warehousing-item.dto';
import { AttachmentDto } from './attachment.dto';

export interface WarehousingDto extends Pagination {
  id?: number;
  inventory?: StockroomDto;
  fiscalPeriod?: FiscalYearDto;
  stage?: WarehousingStateEnum;
  documentNumber?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  inventoryCountItems?: WarehousingItemDto[];
  inventoryCountAttachments?: AttachmentDto[];
}
