import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsGateway } from '../gateway/purchase-steps.gateway';

export class DeletePurchaseStepsUseCase implements UseCase<number, null> {
  readonly #purchaseStepsGateway = inject(PurchaseStepsGateway);
  execute(id: number): Observable<null> {
    return this.#purchaseStepsGateway.deleteById(id);
  }
}
