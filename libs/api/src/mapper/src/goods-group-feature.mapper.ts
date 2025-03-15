import { GoodsGroupFeatureModel } from '@domain/lib/base-data';
import { GoodsGroupFeatureDto } from '../../dto';
import { Mapper } from '../../misc';

export class GoodsGroupFeatureMapper implements Mapper<GoodsGroupFeatureModel, GoodsGroupFeatureDto> {
    mapFrom(param: GoodsGroupFeatureModel): GoodsGroupFeatureDto {
        return {
            id: param.id,
            isMandatory: param.required,
            displayOrder: param.order,
            goodsServiceCategory: {
                id: param.goodsGroupId
            },
            property: {
                id: param.featureId,
                description: param.description,
                title: param.featureLabel,
                type: param.featureType,
                values: param.featureValues?.map(val => { return { id: typeof val.value == 'number' ? val.value : undefined, title: val.label } })
            }
        };
    }

    mapTo(param: GoodsGroupFeatureDto): GoodsGroupFeatureModel {
        return {
            id: param.id,
            order: param.displayOrder,
            required: param.isMandatory,
            description: param.property?.description,
            featureId: param.property?.id,
            featureValues: param.property?.values?.map(val => { return { value: val.id, label: val.title } }),
            featureLabel: param.property?.title,
            featureType: param.property?.type,
            goodsGroupId: param.goodsServiceCategory?.id
        };
    }


}
