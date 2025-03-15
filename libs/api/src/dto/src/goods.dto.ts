import { Pagination } from '@view/lib/models';
import { CountingUnitDto } from './counting-unit.dto';
import { GoodsAccessTypeDto } from './goods-access-type.dto';
import { GoodsFeatureDto } from './goods-feature.dto';
import { GoodsGroupDto } from './goods-group.dto';

export interface GoodsDto extends Pagination {
  id?: number;
  code?: string;
  title?: string;
  serialType?: 'INFORMATICS_SERIES'  | 'SEALS_SERIES'  | 'PRESS_NUMBER'  | 'PRESS_ZERO_SERIES'  | 'NO_SERIAL_NUMBER';
  barcode?: string;
  isDecimal?: boolean;
  status?: 'ACTIVE' | 'IN_ACTIVE';
  description?: string;
  goodsServiceAccType?: GoodsAccessTypeDto;
  goodsServiceCategory?: GoodsGroupDto;
  measurement?: CountingUnitDto;
  goodsServiceProperties?: GoodsFeatureDto[];
  quantityInvoice?:number;
}
