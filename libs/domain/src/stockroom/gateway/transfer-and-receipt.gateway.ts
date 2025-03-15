import { Gateway } from '../../gateway';
import { TransferAndReceiptModel } from '../model/transfer-and-receipt.model';
import { Observable } from 'rxjs';
import { AttachmentModel } from '../../document-management';

export abstract class TransferAndReceiptGateway extends Gateway<TransferAndReceiptModel> {
  abstract updateState(params: TransferAndReceiptModel): Observable<TransferAndReceiptModel>;
  abstract exportExcel(filters: TransferAndReceiptModel): Observable<AttachmentModel>;
  abstract exportTransferAndReceiptItemPdf(id: number): Observable<AttachmentModel>;
}
