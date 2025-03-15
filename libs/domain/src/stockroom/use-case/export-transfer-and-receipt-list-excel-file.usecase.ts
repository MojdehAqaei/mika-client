import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { AttachmentModel } from '@domain/lib/document-management';
import { TransferAndReceiptModel } from '../model/transfer-and-receipt.model';
import { TransferAndReceiptGateway } from '../gateway/transfer-and-receipt.gateway';


export class ExportTransferAndReceiptListExcelFileUseCase implements UseCase<TransferAndReceiptModel, AttachmentModel> {
  readonly #transferAndReceiptGateway = inject(TransferAndReceiptGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: TransferAndReceiptModel): Observable<AttachmentModel> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#transferAndReceiptGateway.exportExcel(filters);
  }
}
