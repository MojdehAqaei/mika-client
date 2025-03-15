import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { OrderTypeEnum } from '../enum/order-type.enum';

export const orderTypeDataMapper = new Map<OrderTypeEnum, string>([
  [OrderTypeEnum.GOODS, 'کالا'],
  [OrderTypeEnum.SERVICE, 'خدمت'],
]);

export const ORDER_TYPE = new InjectionToken<ClSelectItem[]>('Order Type');
export const orderTypeOptions: ClSelectItem[] = Object.keys(OrderTypeEnum).map(
  (each) => {
    return {
      value: each,
      label: orderTypeDataMapper.get(each as OrderTypeEnum),
    };
  }
);
