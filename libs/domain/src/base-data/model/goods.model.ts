import { Pagination } from '@view/lib/models';
import { GoodsSerialType } from '../enum/goods-serial-type.enum';
import { GoodsFeatureModel } from './goods-feature.model';

export interface GoodsModel extends Pagination {
  id?: number;
  code?: string;
  label?: string;
  barcode?: string;
  description?: string;
  isActive?: boolean;
  isFloat?: boolean;
  serialType?: GoodsSerialType;
  accessTypeId?: number; // تجهیزات /  ملزومات / اثاثیه
  accessTypeTitle?: string;
  goodsGroupId?: number;
  goodsGroupLabel?: string;
  countingUnitId?: number;
  countingUnitTitle?: string;
  countingUnitTypeId?: number;
  // features?: GoodsGroupFeatureModel[];
  features?: GoodsFeatureModel[];
  remainingQuantity?:number;
}



export type GoodsModelFilter = keyof GoodsModel;
