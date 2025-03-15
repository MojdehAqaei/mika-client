import { InvoiceReturnItemModel } from "./Invoice-return-item.model";

export interface InvoiceReturnDetailModel {
  deductionsAmount?: number;
  additionsAmount?: number;
  finalAmount?: number;
  finalAmountGrouped?: string;
  invoiceItemList?: InvoiceReturnItemModel[];
}
