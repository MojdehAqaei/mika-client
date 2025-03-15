import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { WarehousingItemModel } from '../model/warehousing-item.model';
import { WarehousingItemGateway } from '../gateway/warehousing-item.gateway';

export class SaveWarehousingItemsUseCase implements UseCase<WarehousingItemModel[], WarehousingItemModel[]>{
  readonly #warehousingItemGateway = inject(WarehousingItemGateway);

  execute(params: WarehousingItemModel[]): Observable<WarehousingItemModel[]> {
    return this.#warehousingItemGateway.saveWarehousingItems(params);
  }
}
