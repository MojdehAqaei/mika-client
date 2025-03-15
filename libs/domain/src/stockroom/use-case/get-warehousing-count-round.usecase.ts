import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { WarehousingItemModel } from '../model/warehousing-item.model';
import { WarehousingCountingRoundEnum } from '../enum/warehousing-counting-round.enum';
import { WarehousingItemGateway } from '../gateway/warehousing-item.gateway';

export class GetWarehousingCountRoundUseCase implements UseCase<WarehousingCountingRoundEnum, WarehousingItemModel[]>{
  readonly #warehousingItemGateway = inject(WarehousingItemGateway);

  execute(round: WarehousingCountingRoundEnum): Observable<WarehousingItemModel[]> {
    return this.#warehousingItemGateway.getWarehousingItemsByCountingRound(round);
  }
}
