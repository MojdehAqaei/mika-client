import { InventoryTypeModel } from '@domain/lib/stockroom';
import { InventoryTypeDto } from '../../dto';
import { Mapper } from '../../misc';
import { GoodsGroupDetailMapper } from './goods-group-detail.mapper';

export class InventoryTypeMapper implements Mapper<InventoryTypeModel, InventoryTypeDto> {
    mapFrom(param: InventoryTypeModel): InventoryTypeDto {
        return {
            id: param.id,
            title: param.title,
            code: param.code,
            status: param.isActive == true ? 'ACTIVE' : param.isActive == false ? 'IN_ACTIVE' : undefined,
            description: param.description,
            categoryListRequestDTO: {
                inventoryTypeCategoryList: param.relatedGoodsGroups?.map(i => i.id)
            }
        };
    }

    mapTo(param: InventoryTypeDto): InventoryTypeModel {
        return {
            id: param.id,
            title: param.title,
            code: param.code?.trim(),
            isActive: param.status == 'ACTIVE',
            description: param.description,
            totalElements: param.totalElements,
            // relatedGoodsGroups: param.goodsServiceCategory?.map(i => new GoodsGroupDetailMapper().mapTo(i))
            relatedGoodsGroups: param.categoryResponseListDTO?.goodsServiceExposedDTOS?.map(each => new GoodsGroupDetailMapper().mapTo(each)),
        };
    }
}
