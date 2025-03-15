import { PurchaseMethodEnum, PurchaseScaleEnum, PurchaseStepsStateEnum, PurchaseStepTypeEnum } from "@domain/lib/purchase-and-orders";
import { Pagination } from "@view/lib/models";
import { FiscalYearDto } from "./fiscal-year.dto";
import { OrderDto } from "./order.dto";
import { PurchaseStepsItemDto } from "./purchase-steps-item.dto";

export interface PurchaseStepsDto extends Pagination {
  id?: number;
  order?: OrderDto;
  fiscalPeriod?: FiscalYearDto;
  documentNumber?: number;
  purchaseReferenceDate?: Date;
  purchaseReferenceNumber?: number;
  purchaseReferenceType?: PurchaseStepTypeEnum;
  purchaseScale?: PurchaseScaleEnum;
  purchaseMethod?: PurchaseMethodEnum;
  purchaseReferenceStepItems?: PurchaseStepsItemDto[];
  stage?: PurchaseStepsStateEnum;
  description?: string;
  issueDateStart?: Date;
  issueDateEnd?: Date;
}
