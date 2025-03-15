import { GoodsGroupModel } from '@domain/lib/base-data';
import { GoodsGroupDto } from '../../dto';
import { Mapper } from '../../misc';

export class GoodsGroupDetailMapper implements Mapper<GoodsGroupModel, GoodsGroupDto> {
    mapFrom(param: GoodsGroupModel): GoodsGroupDto {
        return {
            id: param?.id,
            level: param?.level,
            title: param?.title,
            code: param?.code,
            description: param?.description,
            status: param?.isActive == true ? 'ACTIVE' : param?.isActive == false ? 'IN_ACTIVE' : undefined,
        };
    }

    mapTo(param: GoodsGroupDto): GoodsGroupModel {
        return {
            id: param.id,
            level: param.level,
            title: param.title,
            fullCode: param.code,
            isActive: param.status == 'ACTIVE',
            isRoot: param.level == 0,
            description: param.description,
            parentId: param.parent?.id
        }
    }
}
