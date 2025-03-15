import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { InvoiceReturnGateway } from '../gateway/invoice-return.gateway';
import { InvoiceReturnModel } from '../model/invoice-return.model';


export class SaveInvoiceReturnUseCase implements UseCase<InvoiceReturnModel, InvoiceReturnModel> {
    readonly #InvoiceReturnGateway = inject(InvoiceReturnGateway);
    readonly #appStore = inject(AppStore);
    execute(params: InvoiceReturnModel): Observable<InvoiceReturnModel> {
        params.attachedFiles?.forEach((file) => {
            file.relatedEntity = 'RETURN_INVOICE';
        })
        params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
        return this.#InvoiceReturnGateway.create(params);
    }
}
