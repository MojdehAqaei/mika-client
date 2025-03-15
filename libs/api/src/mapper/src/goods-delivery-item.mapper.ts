import { Mapper } from '../../misc';
import { GoodsDeliveryItemDto } from '../../dto';
import { GoodsDeliveryItemModel } from '@domain/lib/purchase-and-orders';

export class GoodsDeliveryItemMapper implements Mapper<GoodsDeliveryItemModel, GoodsDeliveryItemDto> {
  mapFrom(param: GoodsDeliveryItemModel): GoodsDeliveryItemDto {
    return {
      id: param.id,
      delivery: {
        id: param.deliveryId
      },
      goodsService: {
        id: param.goodsId
      },
      measurement: {
        id: param.countingUnitId
      },
      quantity: param.quantity,
      fee: param.price,
      serialNumbers: param.serialNumbers?.length
        ? param.serialNumbers.map(each => {return {serialNumber: each.value}})
        : param.availableSerialNumbers?.length
        ? param.availableSerialNumbers.map(each => {return {id: each.value}})
        : undefined,
      // serialStart: param.serialNumber?.split('-')[0],
      // serialEnd: param.serialNumber?.split('-')[0],
      description: param.description || '-'
    };
  }

  mapTo(param: GoodsDeliveryItemDto): GoodsDeliveryItemModel {
    return {
      id: param.id,
      deliveryId: param.delivery?.id,
      quantity: param.quantity,
      price: param.fee,
      totalPrice: Number(param.fee) * Number(param.quantity),
      serialNumbers: param.serialNumbers?.map(val => {return {value: val.serialNumber, label: val.serialNumber}}),
      availableSerialNumbers: param.serialNumbers?.map(val => {return {value: val.id, label: val.serialNumber}}),
      countingUnitId: param.measurement?.id,
      countingUnitTitle: param.measurement?.title,
      description: param.description || '-',
      goodsId: param.goodsService?.id,
      goodsLabel: param.goodsService?.title,
      goodsCode: param.goodsService?.code,
      serialType: param.goodsService?.serialType,
      isGoodsFloat: param.goodsService?.isDecimal
    };
  }

}
