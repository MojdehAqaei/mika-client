import { UserRoleModel } from '@domain/lib/user-management';
import { UserRoleDto } from '../../dto';
import { Mapper } from '../../misc';
import { PermissionMapper } from './permission.mapper';
import { UserContentAccessMapper } from './user-content-access.mapper';


export class UserRoleMapper implements Mapper<UserRoleModel, UserRoleDto> {

    mapFrom(param: UserRoleModel): UserRoleDto {
        return {
            id: param.id,
            user: {
                id: param.userId,
                firstName: param.userName,
                lastName: param.userLName,
                nationalCode: param.userNationalNumber,
                status: param.isUSerActive == true ? 1 : param.isUSerActive == false ? 2 : undefined,
                organization: { id: param.organizationId, name: param.organizationName, code: param.organizationCode }
            },
            role: { id: param.roleId, title: param.roleName },
            accessExpireDate: param.expiryDate,
            status: param.isActive == true ? 1 : param.isActive == false ? 2 : undefined,
            contentPermissions: param.contentAccessLevel?.map(each => new UserContentAccessMapper().mapFrom(each)),
            permissions: param.permissions?.map(permission => new PermissionMapper().mapFrom(permission))
        };
    }

    mapTo(param: UserRoleDto): UserRoleModel {
        param.contentPermissions = [
            { userRoleId: param.id, goodsServiceCategories: [] },
            { userRoleId: param.id, organizations: [] },
            { userRoleId: param.id, inventories: [] },
            { userRoleId: param.id, personCompanies: [] },
        ];
        return {
            id: param.id,
            // @ts-ignore
            expiryDate: new Date(param.accessExpireDate),
            roleId: param.role?.id,
            roleName: param.role?.title,
            userId: param.user?.id,
            userName: param.user?.firstName,
            userLName: param.user?.lastName,
            isUSerActive: param.user?.status == 1,
            userNationalNumber: param.user?.nationalCode,
            organizationId: param.user?.organization?.id,
            organizationName: param.user?.organization?.name,
            organizationCode: param.user?.organization?.code,
            isActive: param.status == 1,
            totalElements: param.totalElements,
            contentAccessLevel: param.contentPermissions?.map(each => new UserContentAccessMapper().mapTo(each)),
            permissions: param.permissions?.map(permission => new PermissionMapper().mapTo(permission))
        };
    }

}
