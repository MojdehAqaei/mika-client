import { PersonCompanyModel, PersonTypeEnum } from '@domain/lib/base-data';
import { PersonCompanyDto } from '../../dto';
import { Mapper } from '../../misc';
import { AddressMapper } from './address.mapper';
import { BankAccountInfoMapper } from './bank-account-info.mapper';
import { ContactInfoMapper } from './contact-info.mapper';

export class PersonCompanyMapper implements Mapper<PersonCompanyModel, PersonCompanyDto> {
    mapFrom(param: PersonCompanyModel): PersonCompanyDto {
        return {
            id: param.id,
            isCompany: param.type == PersonTypeEnum.LEGAL_PERSON ? true : param.type == PersonTypeEnum.NATURAL_PERSON ? false : undefined,
            title: param.name,
            nationalCode: param.nationalNumber,
            email: param.email,
            status: param.isActive == true ? 'ACTIVE' : param.isActive == false ? 'IN_ACTIVE' : undefined,
            description: param.description,
            ceoName: param.ceoName,
            ceoNationalCode: param.ceoNationalNumber,
            economicCode: param.economicNumber,
            ownershipBaseInfo: {
                id: param.ownershipTypeId
            },
            contactInfos: param.contactInfo?.list?.map(each => new ContactInfoMapper().mapFrom(each)),
            addressInfos: param.address?.list?.map(each => new AddressMapper().mapFrom(each)),
            accountInfos: param.bankAccountInfo?.list?.map(each => new BankAccountInfoMapper().mapFrom(each)),
        };
    }

    mapTo(param: PersonCompanyDto): PersonCompanyModel {
        return {
            id: param.id,
            totalElements: param.totalElements,
            type: param.isCompany ? PersonTypeEnum.LEGAL_PERSON : PersonTypeEnum.NATURAL_PERSON,
            nationalNumber: param.nationalCode,
            name: param.title,
            email: param.email,
            isActive: param.status == 'ACTIVE',
            description: param.description,
            economicNumber: param.economicCode,
            ceoNationalNumber: param.ceoNationalCode,
            ceoName: param.ceoName,
            ownershipTypeId: param.ownershipBaseInfo?.id,
            contactInfo: {
                list: param.contactInfos?.map(each => new ContactInfoMapper().mapTo(each))
            },
            address: {
                list: param.addressInfos?.map(each => new AddressMapper().mapTo(each))
            },
            bankAccountInfo: {
                list: param.accountInfos?.map(each => new BankAccountInfoMapper().mapTo(each))
            },
        };
    }

}
