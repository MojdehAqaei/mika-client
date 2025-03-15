import { CountingUnitModel, GoodsModel } from '../../base-data';
import { WarehousingCountingRoundEnum } from '../enum/warehousing-counting-round.enum';

export interface WarehousingItemModel {
  id?: number;
  countingRound?: WarehousingCountingRoundEnum;
  goods?: GoodsModel;
  countingUnit?: CountingUnitModel;
  stock?: number;
  countedQuantity?: number;
  description?: string;
}
