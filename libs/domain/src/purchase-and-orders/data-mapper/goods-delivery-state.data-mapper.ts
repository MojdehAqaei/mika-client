import { GoodsDeliveryStateEnum } from '../enum/goods-delivery-state.enum';
import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export const goodsDeliveryStateDataMapper = new Map<GoodsDeliveryStateEnum, string>([
  [GoodsDeliveryStateEnum.INITIAL_SUBMIT, 'ثبت اولیه'],
  [GoodsDeliveryStateEnum.READY_FOR_DELIVERY, 'آماده تحویل'],
  [GoodsDeliveryStateEnum.SENT_FROM_SOURCE, 'ارسال شده از مبدا'],
  [GoodsDeliveryStateEnum.RECEIVED_AT_DESTINATION, 'دریافت شده در مقصد'],
  [GoodsDeliveryStateEnum.CANCELED, 'ابطال شده'],
]);


export const GOODS_DELIVERY_STATE = new InjectionToken<ClSelectItem[]>('Goods Delivery state');

export const deliveryStateOptions: ClSelectItem[] = Object.keys(GoodsDeliveryStateEnum)
  .filter(i => goodsDeliveryStateDataMapper.has(i as GoodsDeliveryStateEnum))
  .map(each => {
    return  {value: each, label: goodsDeliveryStateDataMapper.get(each as GoodsDeliveryStateEnum)};
  });
