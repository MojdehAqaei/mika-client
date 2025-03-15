import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { PurchaseScaleEnum } from '../enum/purchase-scale.enum';

export const purchaseScaleDataMapper = new Map<PurchaseScaleEnum, string>(
  [
    [PurchaseScaleEnum.SMALL, 'کوچک'],
    [PurchaseScaleEnum.AVERAGE, 'متوسط'],
    [PurchaseScaleEnum.MACRO, 'کلان'],
  ]
);
export const PURCHASE_SCALE = new InjectionToken<ClSelectItem[]>('Purchase Scale');
export const purchaseScaleOptions: ClSelectItem[] = Object.keys(
  PurchaseScaleEnum
).map((each) => {
  return {
    value: each,
    label: purchaseScaleDataMapper.get(each as PurchaseScaleEnum),
  };
});
