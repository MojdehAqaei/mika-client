import { Pagination } from "@view/lib/models";
import { AttachmentDto } from "./attachment.dto";
import { FiscalYearDto } from "./fiscal-year.dto";
import { OrderDto } from "./order.dto";
import { PriceEstimateItemDto } from "./price-estimate-item.dto";

export interface PriceEstimateDto extends Pagination {
  documentNumber?: number;
  order?: OrderDto;
  estimateDate?: Date;
  fiscalPeriod?: FiscalYearDto;
  priceEstimateItems?: PriceEstimateItemDto[];
  priceEstimateDocuments?: AttachmentDto[];
}
