import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '../../use-case';
import { TransferAndReceiptModel } from '../model/transfer-and-receipt.model';
import { TransferAndReceiptGateway } from '../gateway/transfer-and-receipt.gateway';
import { AppStore } from '@state/lib/store';

export class GetTransfersAndReceiptsUseCase implements UseCase<TransferAndReceiptModel, TransferAndReceiptModel[]> {
  readonly #transferGateway = inject(TransferAndReceiptGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: TransferAndReceiptModel): Observable<TransferAndReceiptModel[]> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#transferGateway.filterAll(filters);
  }
}
