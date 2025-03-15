import { CountingUnitModel, GoodsModel } from "@domain/lib/base-data";

export interface InvoiceReturnItemModel {
  id?: number;
  creatorUserId?: number;
  goods?: GoodsModel;
  quantity?: number;
  remainingQuantity?: number;
  fee?: number;
  discountAmount?: number;
  taxAmount?: number;
  additionsAmount?: number;
  deductionsAmount?: number;
  description?: string;
  countingUnitModel?: CountingUnitModel;
  countingUnitId?: number;
  countingUnitTitle?: string;
  totalPrice?: number;
  totalPriceGrouped?: string;
  isGoodsFloat?: boolean;
  isDeleted?: boolean;
}
export type InvoiceReturnItemModelFilter = keyof InvoiceReturnItemModel;
