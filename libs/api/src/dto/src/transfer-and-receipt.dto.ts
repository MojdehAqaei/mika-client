import { Pagination } from "@view/lib/models";
import { TransferAndReceiptItemDto } from './transfer-and-receipt-item.dto';
import { TransferAndReceiptStateEnum } from '@domain/lib/stockroom';
import { StockroomDto } from './stockroom.dto';
import { GoodsDeliveryDto } from './goods-delivery.dto';
import { FiscalYearDto } from './fiscal-year.dto';
import { TransferAndReceiptDocumentTypeDto } from './transfer-and-receipt-document-type.dto';

export interface TransferAndReceiptDto extends Pagination {
  id?: number;
  documentNumber?: number;
  issueDate?: Date;
  issueDateFrom?: Date;
  issueDateTo?: Date;
  documentType?: TransferAndReceiptDocumentTypeDto;
  stage?: TransferAndReceiptStateEnum;
  inventory?: StockroomDto;
  delivery?: GoodsDeliveryDto;
  fiscalPeriod?: FiscalYearDto;
  description?: string;
  inventoryDocumentItems?: TransferAndReceiptItemDto[];
}
