import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsGateway } from '../gateway/purchase-steps.gateway';
import { PurchaseStepsModel } from '../model/purchase-steps.model';

export class GetPurchaseStepsListUseCase
  implements UseCase<PurchaseStepsModel, PurchaseStepsModel[]> {
  readonly #purchaseStepsGateway = inject(PurchaseStepsGateway);

  execute(filters: PurchaseStepsModel): Observable<PurchaseStepsModel[]> {
    return this.#purchaseStepsGateway.filterAll(filters);
  }
}
