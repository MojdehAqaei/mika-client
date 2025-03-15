import { Pagination } from "@view/lib/models";
import { GoodsDto } from "./goods.dto";

export interface PriceEstimateItemDto extends Pagination {
    goodsService?: GoodsDto;
    estimateFee?: number;
    taxPercent?: number;
    deductionsAmount?: number;
    description?: string;
}
