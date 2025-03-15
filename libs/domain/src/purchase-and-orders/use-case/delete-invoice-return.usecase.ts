import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { InvoiceReturnGateway } from '../gateway/invoice-return.gateway';

export class DeleteInvoiceReturnUseCase implements UseCase<number, null> {
    readonly #goodsDeliveryGateway = inject(InvoiceReturnGateway);
    execute(id: number): Observable<null> {
        return this.#goodsDeliveryGateway.deleteById(id);
    }
}
