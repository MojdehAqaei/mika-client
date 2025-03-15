import { BankAccountInfoModel } from '@domain/lib/base-data';
import { BankAccountInfoDto } from '../../dto';
import { Mapper } from '../../misc';

export class BankAccountInfoMapper implements Mapper<BankAccountInfoModel, BankAccountInfoDto> {
    mapFrom(param: BankAccountInfoModel): BankAccountInfoDto {
        return {
            id: param.id,
            description: param.description,
            accountNumber: param.accountNumber,
            cardNumber: param.cardNumber?.replace(/\s/g, ''),
            title: param.title,
            iban: param.iban,
            bankBaseInfo: {
                id: param.bankId
            },
            isDefault: param.isDefault
        };
    }

    mapTo(param: BankAccountInfoDto): BankAccountInfoModel {
        return {
            id: param.id,
            description: param.description,
            accountNumber: param.accountNumber,
            cardNumber: param.cardNumber?.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim(),
            title: param.title,
            iban: param.iban,
            bankId: param.bankBaseInfo?.id,
            bankName: param.bankBaseInfo?.title,
            isDefault: param.isDefault
        };
    }

}
