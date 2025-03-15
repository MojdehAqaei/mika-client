import { PurchaseInvoiceItemModel } from "./purchase-invoice-item.model";

export interface PurchaseInvoiceDetailModel {
  deductionsAmount?: number;
  additionsAmount?: number;
  finalAmount?: number;
  finalAmountGrouped?: string;
  invoiceItemList?: PurchaseInvoiceItemModel[];
}
