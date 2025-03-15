import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseInvoiceGateway } from '../gateway/purchase-invoice.gateway';
import { PurchaseInvoiceModel } from '../model/purchase-invoice.model';

export class GetPurchaseInvoiceListUseCase
  implements UseCase<PurchaseInvoiceModel, PurchaseInvoiceModel[]>
{
  readonly #purchaseInvoiceGateway = inject(PurchaseInvoiceGateway);

  execute(filters: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel[]> {
    return this.#purchaseInvoiceGateway.filterAll(filters);
  }
}
