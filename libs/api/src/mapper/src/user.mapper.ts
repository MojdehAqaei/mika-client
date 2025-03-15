import { UserModel } from '@domain/lib/user-management';
import { UserDto } from '../../dto';
import { Mapper } from '../../misc';
import { RoleDetailMapper } from './role.mapper';

export class UserMapper implements Mapper<UserModel, UserDto> {
    mapFrom(param: UserModel): UserDto {
        return {
            id: param.id,
            firstName: param.name,
            lastName: param.lName,
            ssoId: param.nationalNumber,
            permissions: param.permissions,
            organization: {
                id: param.organizationId,
                name: param.organizationName,
                code: param.organizationCode
            },
            nationalCode: param.nationalNumber,
            status: param.isActive == true ? 1 : param.isActive == false ? 2 : undefined,
            description: param.description,
            personnelCode: param.employeeNumber,
            loginRole: new RoleDetailMapper().mapFrom(param.currentRole || {}),
            loginUserRoleId: param.currentRole?.id
        };
    }

    mapTo(param: UserDto): UserModel {
        return {
            id: param.id,
            name: param.firstName,
            lName: param.lastName,
            isActive: param.status == 1,
            organizationId: param.organization?.id,
            organizationName: param.organization?.name,
            organizationCode: param.organization?.code,
            permissions: param.permissions,
            nationalNumber: param.nationalCode || param.ssoId,
            description: param.description,
            employeeNumber: param.personnelCode,
            currentRole: new RoleDetailMapper().mapTo(param.loginRole || {}),
            totalElements: param.totalElements
        };
    }

}
