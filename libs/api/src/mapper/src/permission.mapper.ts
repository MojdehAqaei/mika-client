import { RolePermissionModel } from '@domain/lib/user-management';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { RolePermissionDto } from '../../dto';
import { Mapper } from '../../misc';

export class PermissionMapper implements Mapper<ClTreeNode<RolePermissionModel>, RolePermissionDto> {
    mapFrom(param: ClTreeNode<RolePermissionModel>): RolePermissionDto {
        return {
            object: {
                id: param.data.id,
                title: param.label,
                name: param.data.name,
                categoryName: param.data.upperMenuName
            },
            behaviors: []
        };
    }

    mapTo(param: RolePermissionDto): ClTreeNode<RolePermissionModel> {
        return {
            data: {
                id: param.object?.id,
                name: param.object?.name,
                value: param.behaviors?.map(b => b.name),
                upperMenuName: param.object?.categoryName,
            },
            label: param.object?.title,
            key: String(param.object?.id),
            children: param.behaviors?.map(behavior => ({
                data: {
                    id: Number(`${param.object?.id}000${behavior.id}`),
                    name: behavior.name,
                },
                label: behavior.title,
                key: String(behavior.id),
                leaf: true,
            })).sort((a, b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))
        };
    }

}
