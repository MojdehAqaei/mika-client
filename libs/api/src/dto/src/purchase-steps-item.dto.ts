import { Pagination } from "@view/lib/models";
import { AttachmentDto } from './attachment.dto';
import { PurchaseStepTypeDto } from "./purchase-step-type.dto";
import { PurchaseStepsDto } from './purchase-steps.dto';

export interface PurchaseStepsItemDto extends Pagination {
  id?: number;
  description?: string;
  purchaseReference?: PurchaseStepsDto;
  purchaseReferenceStepType?: PurchaseStepTypeDto;
  purchaseReferenceAttachments?: AttachmentDto[];
}
