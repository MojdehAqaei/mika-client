import { OrganizationModel } from '@domain/lib/organization';
import { OrganizationDto } from '../../dto';
import { Mapper } from '../../misc';

export class OrganizationMapper extends Mapper<OrganizationModel, OrganizationDto> {

    mapFrom(param: OrganizationModel): OrganizationDto {
        return {
            id: param.id,
            code: param.code,
            status: param?.isActive == true ? 'ACTIVE' : param?.isActive == false ? 'IN_ACTIVE' : undefined,
            name: param.label,
            typeName: param.type
        }
    }

    mapTo(param: OrganizationDto): OrganizationModel {
        return {
            id: param.id,
            code: param.code,
            type: param.typeName,
            label: param.name,
            isActive: param.status == 'ACTIVE'
        }
    }
}
