import { StockroomModel } from '@domain/lib/stockroom';
import { StockroomDto } from '../../dto';
import { Mapper } from '../../misc';


export class StockroomMapper implements Mapper<StockroomModel, StockroomDto> {
    mapFrom(param: StockroomModel): StockroomDto {
        return {
            id: param.id,
            code: param.code,
            title: param.title,
            description: param.description,
            inventoryType: {
                id: param.inventoryTypeId,
                title: param.inventoryTypeTitle
            },
            organization: {
                id: param.organizationId,
                name: param.organizationName
            },
            status: param.isActive == true ? 'ACTIVE' : param.isActive == false ? 'IN_ACTIVE' : undefined,
        };
    }

    mapTo(param: StockroomDto): StockroomModel {
        return {
            id: param.id,
            code: param.code?.trim(),
            title: param.title,
            isActive: param.status == 'ACTIVE',
            description: param.description,
            organizationId: param.organization?.id,
            organizationName: param.organization?.name,
            inventoryTypeId: param.inventoryType?.id,
            inventoryTypeTitle: param.inventoryType?.title,
            totalElements: param.totalElements
        };
    }


}
