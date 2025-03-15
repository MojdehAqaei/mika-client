import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsItemGateway } from '../gateway/purchase-steps-item.gateway';

export class DeletePurchaseStepsItemUseCase implements UseCase<number, null> {
  readonly #purchaseStepsItemGateway = inject(PurchaseStepsItemGateway);
  execute(id: number): Observable<null> {
    return this.#purchaseStepsItemGateway.deleteById(id);
  }
}
