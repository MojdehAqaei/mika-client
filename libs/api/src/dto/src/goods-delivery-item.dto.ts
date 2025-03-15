import { GoodsDto } from './goods.dto';
import { CountingUnitDto } from './counting-unit.dto';
import { GoodsDeliveryDto } from './goods-delivery.dto';
import { InformaticsSerialNumberDto } from './informatics-serial-number.dto';

export interface GoodsDeliveryItemDto {
  id?: number;
  delivery?: GoodsDeliveryDto;
  goodsService?: GoodsDto;
  measurement?: CountingUnitDto;
  quantity?: number;
  fee?: number;
  serialStart?: string;
  serialEnd?: string;
  serialNumbers?: InformaticsSerialNumberDto[];
  description?: string;
}
