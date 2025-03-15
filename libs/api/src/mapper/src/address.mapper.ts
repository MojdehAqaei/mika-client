import { AddressModel } from '@domain/lib/base-data';
import { AddressDto } from '../../dto';
import { Mapper } from '../../misc';

export class AddressMapper implements Mapper<AddressModel, AddressDto> {
    mapFrom(param: AddressModel): AddressDto {
        return {
            id: param.id,
            address: param.address,
            addressTypeBaseInfo: {
                id: param.typeId
            },
            description: param.description,
            geo: {
                id: param.provinceId
            },
            postalCode: param.postalCode,
            title: param.title,
            isDefault: param.isDefault
        };
    }

    mapTo(param: AddressDto): AddressModel {
        return {
            id: param.id,
            address: param.address,
            description: param.description,
            provinceId: param.geo?.id,
            postalCode: param.postalCode,
            title: param.title,
            typeId: param.addressTypeBaseInfo?.id,
            typeTitle: param.addressTypeBaseInfo?.title,
            isDefault: param.isDefault
        };
    }

}
