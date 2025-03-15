import { AttachmentModel } from '@domain/lib/document-management';
import { Pagination } from '@view/lib/models';
import { PurchaseStepTypeModel } from './purchase-step-type.model';
import { PurchaseStepsModel } from './purchase-steps.model';

export interface PurchaseStepsItemModel extends Pagination {
  id?: number;
  description?: string;
  purchaseStep?: PurchaseStepsModel;
  purchaseStepType?: PurchaseStepTypeModel;
  attachedFiles?: AttachmentModel[];
}
