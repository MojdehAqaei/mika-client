import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { TransferAndReceiptModel } from '../model/transfer-and-receipt.model';
import { TransferAndReceiptGateway } from '../gateway/transfer-and-receipt.gateway';

export class ChangeTransferAndReceiptStateUseCase implements UseCase<TransferAndReceiptModel, TransferAndReceiptModel> {
  readonly #transferAndReceiptGateway = inject(TransferAndReceiptGateway);

  execute(params: TransferAndReceiptModel): Observable<TransferAndReceiptModel> {
    return this.#transferAndReceiptGateway.updateState(params)
  }
}
