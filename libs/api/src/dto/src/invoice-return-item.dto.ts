import { CountingUnitDto } from "./counting-unit.dto";
import { GoodsDto } from "./goods.dto";

export interface InvoiceReturnItemDto {
  id?: number;
  goodsService?: GoodsDto;
  quantity?: number;
  fee?: number;
  discountAmount?: number;
  taxAmount?: number;
  additionsAmount?: number;
  deductionsAmount?: number;
  description?: string;
  measurement?: CountingUnitDto;
  isDeleted?: boolean;
}
