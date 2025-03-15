import { RoleModel } from '@domain/lib/user-management';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { RoleDetailDto, RoleDto } from '../../dto';
import { Mapper } from '../../misc';
import { PermissionMapper } from './permission.mapper';

export class RoleDetailMapper implements Mapper<RoleDetailDto, RoleModel> {
    mapFrom(param: RoleModel): RoleDetailDto {
        return {
            id: param.id,
            title: param.label,
            status: param.isActive == true ? 1 : param.isActive == false ? 2 : undefined,
        };
    }
    mapTo(param: RoleDetailDto): RoleModel {
        return {
            id: param.id,
            label: param.title,
            isActive: param.status == 1,
            createDate: param.createOnDate ? formatDate(param.createOnDate, 'YYYY/MM/DD') : ''
        };
    }
}

export class RoleMapper implements Mapper<RoleModel, RoleDto> {
    mapFrom(param: RoleModel): RoleDto {
        return {
            role: new RoleDetailMapper().mapFrom(param),
            permissions: param.permissions?.map(permission => new PermissionMapper().mapFrom(permission))
        };
    }
    mapTo(param: RoleDto): RoleModel {
        return {
            id: param.role?.id,
            label: param.role?.title,
            isActive: param.role?.status === 1,
            value: param.role?.id,
            createDate: param.role?.createOnDate ? formatDate(param.role?.createOnDate, 'YYYY/MM/DD') : '',
            permissions: param.permissions?.map(
                permission => new PermissionMapper().mapTo(permission))
        };
    }
}


export class RoleMapper2 implements Mapper<RoleModel, RoleDto> {
    mapFrom(param: RoleModel): RoleDto {
        const permissionsObj: { object: { id: number; }; behaviors: { id: number; }[] }[] = []
        param.permissions?.forEach(ids => {
            if (/000/.test(ids.toString())) {
                const [parentId, childId] = ids.toString().split('000');
                const index = permissionsObj.findIndex(permission => permission.object.id === Number(parentId));

                if (index > -1) {
                    permissionsObj[index].behaviors.push({ id: Number(childId) });
                } else {
                    permissionsObj.push({ object: { id: Number(parentId) }, behaviors: [{ id: Number(childId) }] })
                }
            }
        });

        return {
            role: new RoleDetailMapper().mapFrom(param),
            permissions: permissionsObj
        };
    }

    mapTo(param: RoleDto): RoleModel {
        return {
            label: param.role?.title,
            isActive: param.role?.status === 1,
            value: param.role?.title,
            id: param.role?.id,
            createDate: param.role?.createOnDate ? formatDate(param.role?.createOnDate, 'YYYY/MM/DD') : '',
            totalElements: param.totalElements,
            permissions: param.permissions?.map(permission => new PermissionMapper().mapTo(permission))
        };
    }
}
