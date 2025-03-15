import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AttachmentModel } from '@domain/lib/document-management';
import { TransferAndReceiptGateway } from '../gateway/transfer-and-receipt.gateway';


export class ExportTransferAndReceiptItemPdfFileUseCase implements UseCase<number, AttachmentModel> {
  readonly #transferAndReceiptGateway = inject(TransferAndReceiptGateway);

  execute(itemId: number): Observable<AttachmentModel> {
    return this.#transferAndReceiptGateway.exportTransferAndReceiptItemPdf(itemId);
  }
}
