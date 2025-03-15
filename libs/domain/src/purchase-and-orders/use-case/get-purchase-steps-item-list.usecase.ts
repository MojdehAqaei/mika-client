import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsItemGateway } from '../gateway/purchase-steps-item.gateway';
import { PurchaseStepsItemModel } from '../model/purchase-steps-item.model';

export class GetPurchaseStepsItemListUseCase
  implements UseCase<PurchaseStepsItemModel, PurchaseStepsItemModel[]> {
  readonly #purchaseStepsItemGateway = inject(PurchaseStepsItemGateway);

  execute(filters: PurchaseStepsItemModel): Observable<PurchaseStepsItemModel[]> {
    return this.#purchaseStepsItemGateway.filterAll(filters);
  }
}
