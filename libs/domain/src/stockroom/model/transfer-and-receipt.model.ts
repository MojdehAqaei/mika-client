import { Pagination, SelectItem } from '@view/lib/models';
import { TransferAndReceiptItemModel } from './transfer-and-receipt-item.model';
import { TransferAndReceiptStateEnum } from '../enum/transfer-and-receipt-state.enum';
import { TransferAndReceiptTypeEnum } from '../enum/transfer-and-receipt-type.enum';

export interface TransferAndReceiptModel extends Pagination {
  id?: number;
  parentType?: TransferAndReceiptTypeEnum;
  typeId?: number;
  typeLabel?: string;
  autoGeneratedCode?: number;
  state?: TransferAndReceiptStateEnum;
  nextState?: TransferAndReceiptStateEnum;
  date?: Date;
  datePersian?: string;
  fromDate?: Date;
  toDate?: Date;
  stockroomId?: number;
  stockroomTitle?: string;
  fiscalYearId?: number;
  description?: string;
  transferAndReceiptItems?: TransferAndReceiptItemModel[];
}


export type TransferAndReceiptModelFilter = keyof TransferAndReceiptModel;
