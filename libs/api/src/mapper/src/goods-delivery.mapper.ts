import { Mapper } from '../../misc';
import { GoodsDeliveryDto } from '../../dto';
import {
  goodsDeliveryBaseDocumentTypeDataMapper,
  GoodsDeliveryModel,
  goodsDeliveryStateDataMapper,
  goodsDeliveryTypeDataMapper,
  GoodsDeliveryTypeEnum
} from '@domain/lib/purchase-and-orders';
import { GoodsDeliveryItemMapper } from './goods-delivery-item.mapper';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';

export class GoodsDeliveryMapper implements Mapper<GoodsDeliveryDto, GoodsDeliveryModel> {

  mapFrom(param: GoodsDeliveryModel): GoodsDeliveryDto {
    return {
      id: param.id,
      deliveryDate: param.date,
      deliveryDateFrom: param.fromDate,
      deliveryDateTo: param.toDate,
      documentNumber: param.autoGeneratedCode,
      deliveryType: param.deliveryType,
      stage: param.state,
      fiscalPeriod: {
        id: param.fiscalYearId
      },
      deliveryInventory:
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY ||
        param.deliveryType == GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION ||
        param.deliveryType == GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY ||
        param.delivererType?.value == 'inventories'
          ? {
            id: param.delivererId,
            title: param.delivererLabel
          }
          : undefined,
      deliveryOrganization:
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION ||
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY ||
        param.delivererType?.value == 'organizations'
          ? {
            id: param.delivererId,
            name: param.delivererLabel
          }
          : undefined,
      deliveryPersonCompany:
        param.deliveryType == GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY ||
        param.deliveryType == GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION ||
        param.delivererType?.value == 'prs-corps'
          ? {
            id: param.delivererId,
            title: param.delivererLabel
          }
          : undefined,
      receiverInventory:
        param.deliveryType == GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY ||
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY ||
        param.deliveryType == GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY ||
        param.receiverType?.value == 'inventories'
          ? {
            id: param.receiverId,
            title: param.receiverLabel
          }
          : undefined,
      receiverOrganization:
        param.deliveryType == GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION ||
        param.deliveryType == GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION ||
        param.receiverType?.value == 'organizations'
          ? {
            id: param.receiverId,
            name: param.receiverLabel
          }
          : undefined,
      receiverPersonCompany:
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION ||
        param.deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY ||
        param.receiverType?.value == 'prs-corps'
          ? {
            id: param.receiverId,
            title: param.receiverLabel
          }
          : undefined,
      relatedDocumentType: param.baseDocumentType,
      relatedDocumentNumber: param.baseDocumentNumber,
      relatedDocumentDate: param.baseDocumentDate,
      description: param.description,
      deliveryItems: param.deliveryItemsList?.map(each => new GoodsDeliveryItemMapper().mapFrom(each)),

      // nextState == SOURCE_DELIVERY_CONFIRMATION
      sendToFullName: param.receiverFullName,
      sendDescription: param.sourceAdditionalComments,
      sendDate: param.sendDate,

      // nextState == DESTINATION_DELIVERY_CONFIRMATION
      receiveFromFullName: param.delivererFullName,
      receiveDescription: param.destinationAdditionalComments,
      receiveDate: param.receiveDate
    };
  }

  mapTo(param: GoodsDeliveryDto): GoodsDeliveryModel {
    return {
      id: param.id,
      deliveryType: param.deliveryType,
      deliveryTypeString: param.deliveryType? goodsDeliveryTypeDataMapper.get(param.deliveryType) : '',
      autoGeneratedCode: param.documentNumber,
      state: param.stage,
      stateString: param.stage && goodsDeliveryStateDataMapper.has(param.stage) ? goodsDeliveryStateDataMapper.get(param.stage) : '',
      // @ts-ignore
      date: new Date(param.deliveryDate),
      fromDate: param.deliveryDateFrom,
      toDate: param.deliveryDateTo,
      datePersian: param.deliveryDate ? formatDate(param.deliveryDate, 'YYYY/MM/DD') : '',
      delivererId: param.deliveryInventory?.id || param.deliveryOrganization?.id || param.deliveryPersonCompany?.id,
      delivererLabel: param.deliveryInventory?.title || param.deliveryPersonCompany?.title || (`${param.deliveryOrganization?.typeName || ''} ${param.deliveryOrganization?.name}`),
      receiverId: param.receiverInventory?.id || param.receiverOrganization?.id || param.receiverPersonCompany?.id,
      receiverLabel: param.receiverInventory?.title || param.receiverPersonCompany?.title || (`${param.receiverOrganization?.typeName || ''} ${param.receiverOrganization?.name}`),
      baseDocumentType: param.relatedDocumentType,
      baseDocumentTypeString: param.relatedDocumentType ? goodsDeliveryBaseDocumentTypeDataMapper.get(param.relatedDocumentType) : '',
      baseDocumentNumber: param.relatedDocumentNumber,
      // @ts-ignore
      baseDocumentDate: param.relatedDocumentDate ? new Date(param.relatedDocumentDate) : null,
      baseDocumentDatePersian: param.relatedDocumentDate ? formatDate(param.relatedDocumentDate, 'YYYY/MM/DD') : '',
      description: param.description,
      totalElements: param.totalElements,
      fiscalYearId: param.fiscalPeriod?.id,
      deliveryItemsList: param.deliveryItems?.map(each => new GoodsDeliveryItemMapper().mapTo(each)),

      // nextState == SOURCE_DELIVERY_CONFIRMATION
      receiverFullName: param.sendToFullName,
      sourceAdditionalComments: param.sendDescription,
      sendDate: param.sendDate,

      // nextState == DESTINATION_DELIVERY_CONFIRMATION
      delivererFullName: param.receiveFromFullName,
      destinationAdditionalComments: param.receiveDescription,
      receiveDate: param.receiveDate
    };
  }

}
