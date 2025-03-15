import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { PurchaseMethodEnum } from '../enum/purchase-method.enum';

export const purchaseMethodDataMapper = new Map<PurchaseMethodEnum, string>(
  [
    [PurchaseMethodEnum.DIRECT_PURCHASE, 'خرید مستقیم'],
    [PurchaseMethodEnum.PUBLIC_NOTICE, 'اعلان عمومی'],
  ]
);
export const PURCHASE_Method = new InjectionToken<ClSelectItem[]>('Purchase Method');
export const purchaseMethodOptions: ClSelectItem[] = Object.keys(
  PurchaseMethodEnum
).map((each) => {
  return {
    value: each,
    label: purchaseMethodDataMapper.get(each as PurchaseMethodEnum),
  };
});
