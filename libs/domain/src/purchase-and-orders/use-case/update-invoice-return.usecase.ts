import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { InvoiceReturnGateway } from '../gateway/invoice-return.gateway';
import { InvoiceReturnModel } from '../model/invoice-return.model';

export class UpdateInvoiceReturnUseCase
    implements UseCase<InvoiceReturnModel, InvoiceReturnModel> {
    readonly #invoiceReturnGateway = inject(InvoiceReturnGateway);
    readonly #appStore = inject(AppStore);

    execute(params: InvoiceReturnModel): Observable<InvoiceReturnModel> {
        params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
        params.attachedFiles?.forEach((file) => {
            file.relatedEntity = 'RETURN_INVOICE';
        })
        return this.#invoiceReturnGateway.update(params);
    }
}
