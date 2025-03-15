import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { PurchaseStepsStateEnum } from '../enum/purchase-steps-state.enum';

export const purchaseStepsStateDataMapper = new Map<PurchaseStepsStateEnum, string>(
  [
    [PurchaseStepsStateEnum.INITIAL_SUBMIT, 'ثبت اولیه'],
    [PurchaseStepsStateEnum.BUYING, 'در حال خرید'],
    [PurchaseStepsStateEnum.FINISH_BUY, 'اتمام خرید'],
    [PurchaseStepsStateEnum.CANCEL_BUY, 'لغو خرید'],
  ]
);
export const PURCHASE_STEPS_STATE = new InjectionToken<ClSelectItem[]>('Purchase Steps State');
export const purchaseStepsStateOptions: ClSelectItem[] = Object.keys(
  PurchaseStepsStateEnum
).map((each) => {
  return {
    value: each,
    label: purchaseStepsStateDataMapper.get(each as PurchaseStepsStateEnum),
  };
});
