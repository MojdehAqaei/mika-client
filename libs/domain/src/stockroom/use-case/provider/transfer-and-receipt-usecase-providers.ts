import { TransferAndReceiptGateway } from '../../gateway/transfer-and-receipt.gateway';
import { GetTransfersAndReceiptsUseCase } from '../get-transfers-and-receipts.usecase';
import { ChangeTransferAndReceiptStateUseCase } from '../change-transfer-and-receipt-state.usecase';
import { ExportTransferAndReceiptListExcelFileUseCase } from '../export-transfer-and-receipt-list-excel-file.usecase';
import { ExportTransferAndReceiptItemPdfFileUseCase } from '../export-transfer-and-receipt-item-pdf-file.usecase';

const getTransfersAndReceiptsUseCaseFactory = () => new GetTransfersAndReceiptsUseCase();
export const getTransfersAndReceiptsUseCaseProvider = {
  provide: GetTransfersAndReceiptsUseCase,
  useFactory: getTransfersAndReceiptsUseCaseFactory,
  deps: [TransferAndReceiptGateway]
}



const changeTransferAndReceiptStateUseCaseFactory = () => new ChangeTransferAndReceiptStateUseCase();
export const changeTransferAndReceiptStateUseCaseProvider = {
  provide: ChangeTransferAndReceiptStateUseCase,
  useFactory: changeTransferAndReceiptStateUseCaseFactory,
  deps: [TransferAndReceiptGateway]
}




const exportTransferAndReceiptListExcelFileUseCaseFactory = () => new ExportTransferAndReceiptListExcelFileUseCase();
export const exportTransferAndReceiptListExcelFileUseCaseProvider = {
  provide: ExportTransferAndReceiptListExcelFileUseCase,
  useFactory: exportTransferAndReceiptListExcelFileUseCaseFactory,
  deps: [TransferAndReceiptGateway]
}



const exportTransferAndReceiptItemPdfFileUseCaseFactory = () => new ExportTransferAndReceiptItemPdfFileUseCase();
export const exportTransferAndReceiptItemPdfFileUseCaseProvider = {
  provide: ExportTransferAndReceiptItemPdfFileUseCase,
  useFactory: exportTransferAndReceiptItemPdfFileUseCaseFactory,
  deps: [TransferAndReceiptGateway]
}

