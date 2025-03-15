import { GoodsFeatureModel } from '@domain/lib/base-data';
import { GoodsFeatureDto } from '../../dto';
import { Mapper } from '../../misc';

export class GoodsFeatureMapper implements Mapper<GoodsFeatureModel, GoodsFeatureDto> {
    mapFrom(param: GoodsFeatureModel): GoodsFeatureDto {
        return {
            id: param.id,
            value: param.value || param.label ? {
                id: param.value ? Number(param.value) : null,
                title: param.label
            } : null,
            description: param.description,
            categoryProperty: {
                id: param.goodsGroupFeatureId,
                isMandatory: param.goodsGroupFeatureRequired,
                displayOrder: param.goodsGroupFeatureOrder,
                property: {
                    id: param.featureId,
                    type: param.featureType,
                    title: param.featureLabel,
                }
            }
        }
    }

    mapTo(param: GoodsFeatureDto): GoodsFeatureModel {
        return {
            id: param.id,
            value: param.value?.id,
            label: param.value?.title,
            featureId: param.categoryProperty?.property?.id,
            featureValues: param.categoryProperty?.property?.values?.map(val => { return { value: val.id, label: val.title } }),
            featureLabel: param.categoryProperty?.property?.title,
            featureType: param.categoryProperty?.property?.type,
            goodsGroupFeatureRequired: param.categoryProperty?.isMandatory,
            goodsGroupFeatureOrder: param.categoryProperty?.displayOrder,
            description: param.description,
            goodsGroupFeatureId: param.categoryProperty?.id,
        };
    }
}
