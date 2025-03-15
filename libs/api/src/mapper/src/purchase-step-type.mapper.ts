import { PurchaseStepTypeModel } from '@domain/lib/purchase-and-orders';
import { PurchaseStepTypeDto } from '../../dto';
import { Mapper } from '../../misc';

export class PurchaseStepTypeMapper implements Mapper<PurchaseStepTypeDto, PurchaseStepTypeModel> {
  mapFrom(param: PurchaseStepTypeModel): PurchaseStepTypeDto {
    return {
      id: param.id,
      title: param.title,
      displayOrder: param.displayOrder,
      purchaseReferenceType: param.purchaseReferenceType,
      purchaseScale: param.purchaseScale,
      purchaseMethod: param.purchaseMethod
    };
  }


  mapTo(param: PurchaseStepTypeDto): PurchaseStepTypeModel {
    return {
      id: param.id,
      title: param.title,
      displayOrder: param.displayOrder,
      purchaseReferenceType: param.purchaseReferenceType,
      purchaseScale: param.purchaseScale,
      purchaseMethod: param.purchaseMethod
    };
  }
}
