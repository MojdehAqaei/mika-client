import { GoodsGroupModel } from '@domain/lib/base-data';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { GoodsGroupDto } from '../../dto';
import { Mapper } from '../../misc';

export class GoodsGroupMapper implements Mapper<ClTreeNode<GoodsGroupModel>, GoodsGroupDto> {
    mapFrom(param: ClTreeNode<GoodsGroupModel>): GoodsGroupDto {
        return {
            id: param.data?.id,
            level: param.data?.level,
            title: param.data?.title,
            code: param.data?.code,
            description: param.data?.description,
            status: param.data?.isActive == true ? 'ACTIVE' : param.data?.isActive == false ? 'IN_ACTIVE' : undefined,
            parent: {
                id: Number(param.parent?.key) || param.data?.parentId,
                code: param.parent?.data.code
            },
            children: param.children?.map(c => new GoodsGroupMapper().mapFrom(c))
        };
    }

    mapTo(param: GoodsGroupDto): ClTreeNode<GoodsGroupModel> {
        return {
            key: (param.id)?.toString(),
            label: param.title,
            icon: param.level == 0 ? 'view_in_ar' : param.level == 1 ? param.code == '1' ? 'deployed_code' : 'settings' : '',
            badgeLabel: param.status == 'IN_ACTIVE' ? 'غیرفعال' : undefined,
            badgeType: 'error',
            data: {
                id: param.id,
                level: param.level,
                title: param.title,
                // @ts-ignore
                code: param.code?.replace(param.parent?.code, ''),
                fullCode: param.code,
                codeLength: param.level != undefined ? param.level == 1 || param.level == 2 ? 1 : param.level - 1 : 0,
                childCodeLength: param.level != undefined ? param.level : 0,
                isActive: param.status == 'ACTIVE',
                isRoot: param.level == 0,
                description: param.description,
                parentId: param.parent?.id,
            },
            expanded: param.level == 0,
            leaf: !param.expandable,
            parent: {
                key: param.parent?.id?.toString(),
                data: { id: param.parent?.id, code: param.parent?.code, fullCode: param.parent?.code }
            },
            children: param.children?.map(c => new GoodsGroupMapper().mapTo(c))
        };
    }
}
