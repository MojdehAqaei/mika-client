import { TransferAndReceiptTypeEnum } from '@domain/lib/stockroom';

export interface TransferAndReceiptDocumentTypeDto {
  id?: number;
  title?: string;
  code?: number;
  parentName?: TransferAndReceiptTypeEnum
}
