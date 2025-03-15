import { Pagination } from '@view/lib/models';
import { PersonTypeEnum } from '../enum/person-type.enum';
import { ContactInfoModel } from './contact-info.model';
import { AddressModel } from './address.model';
import { BankAccountInfoModel } from './bank-account-info.model';

export interface PersonCompanyModel extends Pagination {
  id?: number;
  type?: PersonTypeEnum;
  isActive?: boolean;
  name?: string;
  nationalNumber?: string;
  economicNumber?: string;
  ceoName?: string;
  ceoNationalNumber?: string;
  ownershipTypeId?: number;
  email?: RegExp;
  description?: string;
  contactInfo?: ContactInfoModel;
  address?: AddressModel;
  bankAccountInfo?: BankAccountInfoModel;
}


export type PersonCompanyModelFilter = keyof PersonCompanyModel;
