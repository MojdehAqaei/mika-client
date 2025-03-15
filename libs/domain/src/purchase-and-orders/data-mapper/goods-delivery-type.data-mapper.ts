import { GoodsDeliveryTypeEnum } from '../enum/goods-delivery-type.enum';
import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export const goodsDeliveryTypeDataMapper = new Map<GoodsDeliveryTypeEnum, string>([
  [GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION, 'خرید و تحویل به واحد سازمانی'],
  [GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION, 'برگشت از خرید واحد سازمانی'],
  [GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY, 'خرید و تحویل به انبار'],
  [GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY, 'برگشت از خرید انبار'],
  [GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION, 'تحویل از انبار به واحد سازمانی'],
  [GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY, 'برگشت از واحد سازمانی به انبار'],
  [GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY, 'انتقال از انبار به انبار'],
]);


export const GOODS_DELIVERY_TYPE = new InjectionToken<ClSelectItem[]>('Goods Delivery Type');

export const deliveryTypeOptions: ClSelectItem[] = Object.keys(GoodsDeliveryTypeEnum)
    .map(each => {
      return  {value: each, label: goodsDeliveryTypeDataMapper.get(each as GoodsDeliveryTypeEnum)};
});
