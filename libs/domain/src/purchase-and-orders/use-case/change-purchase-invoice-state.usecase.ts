import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseInvoiceGateway } from '../gateway/purchase-invoice.gateway';
import { PurchaseInvoiceModel } from '../model/purchase-invoice.model';

export class ChangePurchaseInvoiceStateUseCase implements UseCase<PurchaseInvoiceModel, PurchaseInvoiceModel> {
    readonly #purchaseInvoiceGateway = inject(PurchaseInvoiceGateway);

    execute(params: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel> {
        return this.#purchaseInvoiceGateway.updatePurchaseInvoiceState(params);
    }
}
