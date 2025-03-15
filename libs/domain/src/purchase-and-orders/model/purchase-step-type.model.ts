import { PurchaseMethodEnum } from '../enum/purchase-method.enum';
import { PurchaseScaleEnum } from '../enum/purchase-scale.enum';
import { PurchaseStepTypeEnum } from '../enum/purchase-step-type.enum';

export interface PurchaseStepTypeModel {
  id?: number;
  title?: string;
  displayOrder?: number;
  purchaseReferenceType?: PurchaseStepTypeEnum;
  purchaseScale?: PurchaseScaleEnum;
  purchaseMethod?: PurchaseMethodEnum;
}

export type PurchaseStepTypeModelFilter = keyof PurchaseStepTypeModel;
