import { CountingUnitModel } from '@domain/lib/base-data';
import { CountingUnitDto } from '../../dto';
import { Mapper } from '../../misc';

export class CountingUnitMapper extends Mapper<CountingUnitModel, CountingUnitDto> {

    mapFrom(param: CountingUnitModel): CountingUnitDto {
        return {
            id: param.id,
            title: param.title,
            status: param.isActive == true ? 'ACTIVE' : param.isActive == false ? 'IN_ACTIVE' : undefined,
            measurementType: { id: param.countingUnitType?.value?.id || param.countingUnitTypeId, title: param.countingUnitType?.label }
        }
    }

    mapTo(param: CountingUnitDto): CountingUnitModel {
        return {
            id: param.id,
            title: param.title,
            isActive: param.status == 'ACTIVE',
            countingUnitTypeId: param.measurementType?.id,
            countingUnitType: {
                value: { id: param.measurementType?.id },
                label: param.measurementType?.title
            },
            totalElements: param.totalElements
        };
    }
}
