import { GoodsDto } from './goods.dto';
import { CountingUnitDto } from './counting-unit.dto';

export interface TransferAndReceiptItemDto {
  id?: number;
  goodsService?: GoodsDto;
  measurement?: CountingUnitDto;
  quantity?: number;
  fee?: number;
  pricingDate?: Date;
  serialStart?: string;
  serialEnd?: string;
  description?: string;
}
