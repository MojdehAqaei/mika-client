import { PurchaseStepsItemModel } from '@domain/lib/purchase-and-orders';
import { PurchaseStepsItemDto } from '../../dto';
import { Mapper } from '../../misc';
import { AttachmentMapper } from './attachment.mapper';
import { PurchaseStepTypeMapper } from './purchase-step-type.mapper';
import { PurchaseStepsMapper } from './purchase-steps.mapper';

export class PurchaseStepsItemMapper implements Mapper<PurchaseStepsItemModel, PurchaseStepsItemDto> {
  mapFrom(param: PurchaseStepsItemModel): PurchaseStepsItemDto {
    return {
      id: param.id,
      description: param.description,
      purchaseReference: param.purchaseStep ? new PurchaseStepsMapper().mapFrom(param.purchaseStep) : undefined,
      purchaseReferenceStepType: param.purchaseStepType ? new PurchaseStepTypeMapper().mapFrom(param.purchaseStepType) : undefined,
      purchaseReferenceAttachments: param.attachedFiles?.map(each => new AttachmentMapper().mapFrom(each))
    };
  }


  mapTo(param: PurchaseStepsItemDto): PurchaseStepsItemModel {
    return {
      id: param.id,
      description: param.description,
      purchaseStep: param.purchaseReference ? new PurchaseStepsMapper().mapTo(param.purchaseReference) : undefined,
      purchaseStepType: param.purchaseReferenceStepType ? new PurchaseStepTypeMapper().mapTo(param.purchaseReferenceStepType) : undefined,
      attachedFiles: param.purchaseReferenceAttachments?.map(each => new AttachmentMapper().mapTo(each))
    };
  }
}
