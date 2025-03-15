import { GoodsModel } from '@domain/lib/base-data';
import { GoodsDto } from '../../dto';
import { Mapper } from '../../misc';
import { GoodsFeatureMapper } from './goods-feature.mapper';

export class GoodsMapper implements Mapper<GoodsModel, GoodsDto> {
    mapFrom(param: GoodsModel): GoodsDto {
        return {
            id: param.id,
            code: param.code,
            title: param.label,
            serialType: param.serialType,
            barcode: param.barcode,
            isDecimal: param.isFloat,
            status: param?.isActive == true ? 'ACTIVE' : param?.isActive == false ? 'IN_ACTIVE' : undefined,
            description: param.description,
            goodsServiceAccType: {
                id: param.accessTypeId,
                title: param.accessTypeTitle
            },
            goodsServiceCategory: {
                id: param.goodsGroupId,
                title: param.goodsGroupLabel
            },
            measurement: {
                id: param.countingUnitId,
                title: param.countingUnitTitle,
                measurementType: {
                    id: param.countingUnitTypeId
                }
            },
            quantityInvoice: param.remainingQuantity,
            goodsServiceProperties: param.features?.map(each => new GoodsFeatureMapper().mapFrom(each)),
        };
    }

    mapTo(param: GoodsDto): GoodsModel {
        return {
            id: param.id,
            code: param.code,
            label: param.title,
            barcode: param.barcode,
            description: param.description,
            isActive: param.status == 'ACTIVE',
            isFloat: param.isDecimal,
            serialType: param.serialType,
            accessTypeId: param.goodsServiceAccType?.id,
            accessTypeTitle: param.goodsServiceAccType?.title,
            goodsGroupId: param.goodsServiceCategory?.id,
            goodsGroupLabel: `${param.goodsServiceCategory?.title} ${param.goodsServiceCategory?.code}`,
            features: param.goodsServiceProperties?.map(each => new GoodsFeatureMapper().mapTo(each)),
            countingUnitId: param.measurement?.id,
            countingUnitTitle: param.measurement?.title,
            countingUnitTypeId: param.measurement?.measurementType?.id,
            totalElements: param.totalElements,
            remainingQuantity: param.quantityInvoice
        };
    }
}
