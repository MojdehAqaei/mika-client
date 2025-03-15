import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseInvoiceGateway } from '../gateway/purchase-invoice.gateway';

export class DeletePurchaseInvoiceUseCase implements UseCase<number, null> {
  readonly #goodsDeliveryGateway = inject(PurchaseInvoiceGateway);
  execute(id: number): Observable<null> {
    return this.#goodsDeliveryGateway.deleteById(id);
  }
}
