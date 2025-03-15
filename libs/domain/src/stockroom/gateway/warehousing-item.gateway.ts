import { WarehousingCountingRoundEnum } from '../enum/warehousing-counting-round.enum';
import { Observable } from 'rxjs';
import { WarehousingItemModel } from '../model/warehousing-item.model';

export abstract class WarehousingItemGateway {
  abstract getWarehousingItemsByCountingRound(round: WarehousingCountingRoundEnum): Observable<WarehousingItemModel[]>;
  abstract saveWarehousingItems(params: WarehousingItemModel[]): Observable<WarehousingItemModel[]>;
}
