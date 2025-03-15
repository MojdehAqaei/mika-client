import { Pagination } from "@view/lib/models";
import { GoodsModel } from '../../base-data';

export interface OrderItemModel extends Pagination {
  id?: number;
  goods?: GoodsModel;
  goodsId?: number;
  goodsLabel?: string;
  goodsCode?: string;
  isGoodsFloat?: boolean;
  applicantOrganizationId?: number;
  applicantOrganizationLabel?: string;
  quantity?: number;
  requestLetterNumber?: string;
  requestLetterDate?: Date;
  requestLetterDatePersian?: string;
  description?: string;
  remainingQuantity?: number;
  countingUnitId?: number;
  countingUnitTitle?: string;
}

export type OrderItemModelFilter = keyof OrderItemModel;
