import { PersonCompanyModel } from '@domain/lib/base-data';
import { AttachmentModel } from '@domain/lib/document-management';
import { Pagination, SelectItem } from '@view/lib/models';
import { InvoiceStateEnum } from '../enum/invoice-state.enum';
import { OrderItemModel } from './order-item.model';
import { PurchaseInvoiceDetailModel } from './purchase-invoice-detail.model';

export interface PurchaseInvoiceModel extends Pagination {
  id?: number;
  autoGeneratedCode?: string;
  description?: string;
  seller?: PersonCompanyModel;
  orderAutoGeneratedCode?: string;
  invoiceNumber?: string;
  date?: Date;
  datePersian?: string;
  fromDate?: Date;
  toDate?: Date;
  order?: SelectItem;
  orderItems?: SelectItem<OrderItemModel>[];
  invoiceSelectItems?: SelectItem<OrderItemModel>[];
  state?: InvoiceStateEnum;
  invoiceStateString?: string;
  invoiceDetail?: PurchaseInvoiceDetailModel
  fiscalYearId?: number;
  finalAmount?: number;
  nextState?: InvoiceStateEnum;
  attachedFiles?: AttachmentModel[];
}

export type PurchaseInvoiceModelFilter = keyof PurchaseInvoiceModel;
