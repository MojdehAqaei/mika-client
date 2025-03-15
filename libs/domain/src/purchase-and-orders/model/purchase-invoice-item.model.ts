import { CountingUnitModel, GoodsModel } from "@domain/lib/base-data";

export interface PurchaseInvoiceItemModel {
  id?: number;
  creatorUserId?: number;
  goods?: GoodsModel;
  quantity?: number;
  remainQuantity?: number;
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
  remainingQuantity?: number;
  isDeleted?: boolean;
}
export type PurchaseInvoiceItemModelFilter = keyof PurchaseInvoiceItemModel;
