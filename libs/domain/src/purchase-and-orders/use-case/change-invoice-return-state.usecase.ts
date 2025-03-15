import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { InvoiceReturnGateway } from '../gateway/invoice-return.gateway';
import { InvoiceReturnModel } from '../model/invoice-return.model';

export class ChangeInvoiceReturnStateUseCase implements UseCase<InvoiceReturnModel, InvoiceReturnModel> {
    readonly #InvoiceReturnGateway = inject(InvoiceReturnGateway);

    execute(params: InvoiceReturnModel): Observable<InvoiceReturnModel> {
        return this.#InvoiceReturnGateway.updateInvoiceReturnState(params);
    }
}
