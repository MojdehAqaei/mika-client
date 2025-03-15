import { PurchaseStepsModel } from '@domain/lib/purchase-and-orders';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { PurchaseStepsDto } from '../../dto';
import { Mapper } from '../../misc';
import { OrderMapper } from './order.mapper';
import { PurchaseStepsItemMapper } from './purchase-steps-item.mapper';

export class PurchaseStepsMapper implements Mapper<PurchaseStepsModel, PurchaseStepsDto> {
  mapFrom(param: PurchaseStepsModel): PurchaseStepsDto {
    return {
      id: param?.id,
      stage: param?.state,
      //@ts-ignore
      order: new OrderMapper().mapFrom(param.order?.value || param.order || {}),
      documentNumber: param.autoGeneratedCode,
      description: param.description,
      fiscalPeriod: {
        id: param.fiscalYearId
      },
      purchaseReferenceDate: param.date,
      purchaseReferenceNumber: param.purchaseStepNumber,
      purchaseReferenceType: param.purchaseStepType,
      purchaseScale: param.purchaseScale,
      purchaseMethod: param.purchaseMethod,
      purchaseReferenceStepItems: param.purchaseStepsItems?.map(each => new PurchaseStepsItemMapper().mapFrom(each))
    };
  }


  mapTo(param: PurchaseStepsDto): PurchaseStepsModel {
    return {
      id: param.id,
      order: { label: String(param.order?.documentNumber), value: new OrderMapper().mapTo(param.order || {}) },
      state: param.stage,
      autoGeneratedCode: param.documentNumber,
      date: new Date(param.purchaseReferenceDate || new Date()),
      description: param.description,
      fiscalYearId: param.fiscalPeriod?.id,
      purchaseStepNumber: param.purchaseReferenceNumber,
      purchaseStepType: param.purchaseReferenceType,
      purchaseScale: param.purchaseScale,
      purchaseMethod: param.purchaseMethod,
      totalElements: param.totalElements,
      datePersian: param.purchaseReferenceDate
        ? formatDate(param.purchaseReferenceDate, 'YYYY/MM/DD')
        : '',
      purchaseStepsItems: param.purchaseReferenceStepItems?.map(each => new PurchaseStepsItemMapper().mapTo(each))
    };
  }
}
