import { PriceEstimateItemDto } from "@api/lib/dto";
import { Mapper } from "@api/lib/misc";
import { PriceEstimateItemModel } from "@domain/lib/purchase-and-orders";
import { GoodsMapper } from "./goods.mapper";

export class PriceEstimateItemMapper implements Mapper<PriceEstimateItemModel, PriceEstimateItemDto> {
    mapFrom(param: PriceEstimateItemModel): PriceEstimateItemDto {
        return {
            goodsService: param.goods ? new GoodsMapper().mapFrom(param.goods) : undefined,
            estimateFee: param.estimateFee,
            taxPercent: param.taxPercent,
            deductionsAmount: param.deductionsAmount,
            description: param.description,
        };
    }

    mapTo(param: PriceEstimateItemDto): PriceEstimateItemModel {
        return {
            goods: param.goodsService ? new GoodsMapper().mapTo(param.goodsService) : undefined,
            estimateFee: param.estimateFee,
            taxPercent: param.taxPercent,
            deductionsAmount: param.deductionsAmount,
            description: param.description,
        };
    }

}
