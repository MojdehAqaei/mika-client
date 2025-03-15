import { ClSelectItem } from '@sadad/component-lib/src/models';
import { SupplyMethodEnum } from '../enum/supply-method.enum';
import { InjectionToken } from '@angular/core';

export const supplyMethodDataMapper = new Map<SupplyMethodEnum, string>(
  [
    [SupplyMethodEnum.BUY, 'خرید'],
    [SupplyMethodEnum.DELIVER_FROM_INVENTORY, 'تحویل از انبار'],
  ]
);

export const SUPPLY_METHOD = new InjectionToken<ClSelectItem[]>('Supply Method');
export const supplyMethodOptions: ClSelectItem[] = Object.keys(
  SupplyMethodEnum
).map((each) => {
  return {
    value: each,
    label: supplyMethodDataMapper.get(each as SupplyMethodEnum),
  };
});
