import { FeatureModel, FeatureTypeEnum } from '@domain/lib/base-data';
import { FeatureDto } from '../../dto';
import { Mapper } from '../../misc';

export class FeatureMapper implements Mapper<FeatureModel, FeatureDto> {
    mapFrom(param: FeatureModel): FeatureDto {
        return {
            id: param.id,
            title: param.label,
            type: param.type,
            status: param.isActive == true ? 'ACTIVE' : param.isActive == false ? 'IN_ACTIVE' : undefined,
            description: param.description,
            values: param.values?.map(val => { return { id: typeof val.value == 'number' ? val.value : undefined, title: val.label } })
        };
    }

    mapTo(param: FeatureDto): FeatureModel {
        return {
            id: param.id,
            label: param.title,
            type: param.type,
            typeLabel: param.type == FeatureTypeEnum.LIST ? 'لیست' : 'عددی',
            isActive: param.status == 'ACTIVE',
            description: param.description,
            values: param.values?.map(val => { return { value: val.id, label: val.title } }),
            totalElements: param.totalElements
        };
    }
}
