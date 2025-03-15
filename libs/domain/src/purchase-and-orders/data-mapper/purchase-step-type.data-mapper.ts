import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { PurchaseStepTypeEnum } from '../enum/purchase-step-type.enum';

export const purchaseStepTypeDataMapper = new Map<PurchaseStepTypeEnum, string>(
  [
    [PurchaseStepTypeEnum.HEADQUARTERS_SYSTEM, 'سامانه ستاد'],
    [PurchaseStepTypeEnum.REFER_TO_THE_SELLER, 'مراجعه به فروشنده'],
  ]
);
export const PURCHASE_STEPS_TYPE = new InjectionToken<ClSelectItem[]>('Purchase Step Type');
export const purchaseStepsTypeOptions: ClSelectItem[] = Object.keys(
  PurchaseStepTypeEnum
).map((each) => {
  return {
    value: each,
    label: purchaseStepTypeDataMapper.get(each as PurchaseStepTypeEnum),
  };
});
