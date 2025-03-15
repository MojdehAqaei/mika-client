import { TransferAndReceiptItemModel } from '@domain/lib/stockroom';
import { TransferAndReceiptItemDto } from '../../dto';
import { Mapper } from '../../misc';

export class TransferAndReceiptItemMapper implements Mapper<TransferAndReceiptItemModel, TransferAndReceiptItemDto> {
  mapFrom(param: TransferAndReceiptItemModel): TransferAndReceiptItemDto {
    return {
      id: param.id,
      goodsService: { id: param.goodsId },
      measurement: { id: param.countingUnitId },
      quantity: param.quantity,
      fee: param.price,
      pricingDate: param.currencyConversionDate,
      description: param.description
    };
  }

  mapTo(param: TransferAndReceiptItemDto): TransferAndReceiptItemModel {
    return {
      id: param.id,
      price: param.fee,
      quantity: param.quantity,
      description: param.description,
      countingUnitId: param.measurement?.id,
      countingUnitTitle: param.measurement?.title,
      goodsId: param.goodsService?.id,
      goodsLabel: param.goodsService?.title,
      goodsCode: param.goodsService?.code,
      currencyConversionDate: param.pricingDate
    };
  }
}
