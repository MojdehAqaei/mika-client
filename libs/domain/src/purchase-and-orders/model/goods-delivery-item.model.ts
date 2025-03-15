import { GoodsSerialType } from '@domain/lib/base-data';
import { SelectItem } from '@view/lib/models';

export interface GoodsDeliveryItemModel {
  id?: number;
  deliveryId?: number;
  goodsId?: number;
  goodsLabel?: string;
  goodsCode?: string;
  isGoodsFloat?: boolean;
  quantity?: number;
  price?: number;
  totalPrice?: number; // quantity * price
  serialNumbers?: SelectItem[];
  availableSerialNumbers?: SelectItem[];
  countingUnitId?: number;
  countingUnitTitle?: string;
  description?: string;
  serialType?: GoodsSerialType;
}
