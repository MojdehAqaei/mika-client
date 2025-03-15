import { PurchaseInvoiceItemModel } from "@domain/lib/purchase-and-orders";
import { InvoiceItemDto } from "../../dto/src/invoice-item.dto";
import { Mapper } from '../../misc';
import { GoodsMapper } from "./goods.mapper";

export class PurchaseInvoiceItemMapper implements Mapper<InvoiceItemDto, PurchaseInvoiceItemModel> {
  mapFrom(param: PurchaseInvoiceItemModel): InvoiceItemDto {
    return {
      id: param.id,
      additionsAmount: param.additionsAmount || 0,
      deductionsAmount: param.deductionsAmount || 0,
      description: param.description,
      fee: param.fee || 0,
      quantity: param.quantity,
      taxAmount: param.taxAmount || 0,
      discountAmount: param.discountAmount || 0,
      goodsService: param.goods ? new GoodsMapper().mapFrom(param.goods) : undefined,
      measurement: { id: param.countingUnitId },
      isDeleted: param.isDeleted,
    };
  }

  mapTo(param: InvoiceItemDto): PurchaseInvoiceItemModel {
    const totalPrice = (param.quantity || 0) * (param.fee || 0) - (param.discountAmount || 0) + (param.taxAmount || 0) + (param.additionsAmount || 0) - (param.deductionsAmount || 0)
    return {
      id: param.id,
      additionsAmount: param.additionsAmount,
      deductionsAmount: param.deductionsAmount,
      description: param.description,
      fee: param.fee,
      countingUnitModel: param.measurement,
      quantity: param.quantity,
      taxAmount: param.taxAmount,
      discountAmount: param.discountAmount,
      goods: param.goodsService ? new GoodsMapper().mapTo(param.goodsService) : undefined,
      countingUnitId: param.measurement?.id,
      countingUnitTitle: param.measurement?.title,
      totalPrice: totalPrice,
      totalPriceGrouped: totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      isDeleted: param.isDeleted,
    };
  }
}
