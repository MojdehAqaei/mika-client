import { WarehousingItemModel } from '@domain/lib/stockroom';
import { WarehousingItemDto } from '../../dto';
import { Mapper } from '../../misc';
import { GoodsMapper } from './goods.mapper';
import { CountingUnitMapper } from './counting.unit.mapper';

export class WarehousingItemMapper implements Mapper<WarehousingItemModel, WarehousingItemDto> {
  mapFrom(param: WarehousingItemModel): WarehousingItemDto {
    return {
      id: param.id,
      counterQuantity: param.countedQuantity,
      counterStep: param.countingRound,
      description: param.description,
      stock: param.stock,
      goodsService: param.goods ? new GoodsMapper().mapFrom(param.goods) : undefined,
      measurement: param.countingUnit ? new CountingUnitMapper().mapFrom(param.countingUnit) : undefined
    };
  }

  mapTo(param: WarehousingItemDto): WarehousingItemModel {
    return {
      id: param.id,
      stock: param.stock,
      description: param.description,
      countedQuantity: param.counterQuantity,
      countingRound: param.counterStep,
      countingUnit: param.measurement ? new CountingUnitMapper().mapTo(param.measurement) : undefined,
      goods: param.goodsService ? new GoodsMapper().mapTo(param.goodsService) : undefined
    };
  }

}
