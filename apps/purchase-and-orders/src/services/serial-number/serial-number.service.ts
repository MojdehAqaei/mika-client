import { Injectable } from '@angular/core';
import { GoodsDeliveryTypeEnum } from '@domain/lib/purchase-and-orders';
import { GoodsSerialType } from '@domain/lib/base-data';

@Injectable({
  providedIn: 'root'
})
export class SerialNumberService {

  static validate(deliveryType: GoodsDeliveryTypeEnum = GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION,
                  serialType: GoodsSerialType,
                  quantity: number,
                  serialListLength: number = 0,
                  availableSerialListLength: number = 0): boolean {
    let isValid: boolean = true;
    if (serialType == 'INFORMATICS_SERIES') {

      switch (deliveryType) {
        case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION:
        case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY:
          if (serialListLength > 0 && serialListLength != quantity) {
            isValid = false;
          }
          break;
        case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION:
        case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY:
        case GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION:
        case GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY:
        case GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY:
          if (availableSerialListLength > 0 && availableSerialListLength != quantity) {
            isValid = false;
          }
          break;
        default:
          isValid = true;
          break;
      }
    }

    return isValid;
  }

  static setAvailableInformaticsSerialNumbersListParams(deliveryType?: GoodsDeliveryTypeEnum, delivererId?: number): (number | undefined)[] {
    let stockroomId;
    let organizationId;

    if (deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION ||
        deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY ||
        deliveryType == GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION ||
        deliveryType == GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY ||
        deliveryType == GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY
    ) {
      organizationId = deliveryType == GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION ||
      deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION
        ? delivererId : undefined;

      stockroomId = deliveryType == GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY ||
      deliveryType == GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY ||
      deliveryType == GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY
        ? delivererId : undefined;
    }

    return [stockroomId, organizationId];
  }

}
