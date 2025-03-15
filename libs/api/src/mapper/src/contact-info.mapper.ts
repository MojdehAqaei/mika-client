import { ContactInfoModel } from '@domain/lib/base-data';
import { ContactInfoDto } from '../../dto';
import { Mapper } from '../../misc';

export class ContactInfoMapper implements Mapper<ContactInfoModel, ContactInfoDto> {
    mapFrom(param: ContactInfoModel): ContactInfoDto {
        return {
            id: param.id,
            title: param.title,
            phoneNumber: param.phoneNumber,
            description: param.description,
            phoneNumberBaseInfo: {
                id: param.typeId
            },
            isDefault: param.isDefault
        };
    }

    mapTo(param: ContactInfoDto): ContactInfoModel {
        return {
            id: param.id,
            typeId: param.phoneNumberBaseInfo?.id,
            typeTitle: param.phoneNumberBaseInfo?.title,
            description: param.description,
            phoneNumber: param.phoneNumber,
            title: param.title,
            isDefault: param.isDefault
        };
    }

}
