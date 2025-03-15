import { GoodsDeliveryBaseDocumentTypeEnum } from '../enum/goods-delivery-base-document-type.enum';
import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export const goodsDeliveryBaseDocumentTypeDataMapper = new Map<GoodsDeliveryBaseDocumentTypeEnum, string>([
  [GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_INVOICE, 'فاکتور خرید'],
  [GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_RETURN_INVOICE, 'فاکتور برگشت از خرید'],
  [GoodsDeliveryBaseDocumentTypeEnum.GOODS_ORDER, 'سفارش کالا'],
  [GoodsDeliveryBaseDocumentTypeEnum.GOODS_DELIVERY, 'تحویل کالا'],
]);


export const GOODS_DELIVERY_BASE_DOCUMENT_TYPE = new InjectionToken<ClSelectItem[]>('Goods Delivery Base Document Type');

export const baseDocumentTypeOptions: ClSelectItem[] = Object.keys(GoodsDeliveryBaseDocumentTypeEnum)
  .filter(i => goodsDeliveryBaseDocumentTypeDataMapper.has(i as GoodsDeliveryBaseDocumentTypeEnum))
  .map(each => {
    return  {value: each, label: goodsDeliveryBaseDocumentTypeDataMapper.get(each as GoodsDeliveryBaseDocumentTypeEnum)};
  });
