import { GoodsModel } from "@domain/lib/base-data";
import { Pagination } from "@view/lib/models";

export interface PriceEstimateItemModel extends Pagination {
    goods?: GoodsModel;
    estimateFee?: number;
    taxPercent?: number;
    deductionsAmount?: number;
    description?: string;
}

export type PriceEstimateItemModelFilter = keyof PriceEstimateItemModel;
