import { OrderItemModel } from '@domain/lib/purchase-and-orders';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { OrderItemDto } from '../../dto';
import { Mapper } from '../../misc';
import { GoodsMapper } from './goods.mapper';

export class OrderItemMapper implements Mapper<OrderItemDto, OrderItemModel> {
  mapFrom(param: OrderItemModel): OrderItemDto {
    return {
      id: param.id,
      goodsService: param.goods ? new GoodsMapper().mapFrom(param.goods) : param.goodsId ? { id: param.goodsId } : undefined,
      quantity: param.quantity,
      requestLetterNumber: param.requestLetterNumber,
      requestLetterDate: param.requestLetterDate,
      description: param.description,
      measurement: {
        id: param.countingUnitId
      },
      remainingQuantity: param.remainingQuantity,
      applicantOrganization: {
        id: param.applicantOrganizationId
      }
    };
  }

  mapTo(param: OrderItemDto): OrderItemModel {
    return {
      id: param.id,
      goods: param.goodsService ? new GoodsMapper().mapTo(param.goodsService) : undefined,
      goodsId: param.goodsService?.id,
      goodsLabel: param.goodsService?.title,
      goodsCode: param.goodsService?.code,
      quantity: param.quantity,
      requestLetterNumber: param.requestLetterNumber,
      requestLetterDate: param.requestLetterDate,
      requestLetterDatePersian: param.requestLetterDate ? formatDate(param.requestLetterDate, 'YYYY/MM/DD') : '',
      description: param.description,
      countingUnitId: param.measurement?.id,
      countingUnitTitle: param.measurement?.title,
      remainingQuantity: param.remainingQuantity,
      applicantOrganizationId: param.applicantOrganization?.id,
      applicantOrganizationLabel: `${param.applicantOrganization?.typeName} ${param.applicantOrganization?.name}`,
    };
  }


}
