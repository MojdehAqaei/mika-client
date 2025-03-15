import { GoodsDto } from './goods.dto';
import { CountingUnitDto } from './counting-unit.dto';

export interface WarehousingItemDto {
  id?: number;
  goodsService?: GoodsDto;
  measurement?: CountingUnitDto;
  counterStep?: number;
  stock?: number;
  counterQuantity?: number;
  description?: string;
}
