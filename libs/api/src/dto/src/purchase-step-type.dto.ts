import { PurchaseMethodEnum, PurchaseScaleEnum, PurchaseStepTypeEnum } from "@domain/lib/purchase-and-orders";
import { BaseInfoDto } from "./base-info.dto";

export interface PurchaseStepTypeDto extends BaseInfoDto {
  purchaseReferenceType?: PurchaseStepTypeEnum;
  purchaseScale?: PurchaseScaleEnum;
  purchaseMethod?: PurchaseMethodEnum;
}
