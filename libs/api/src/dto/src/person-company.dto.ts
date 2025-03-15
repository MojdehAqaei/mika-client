import { Pagination } from '@view/lib/models';
import { ContactInfoDto } from './contact-info.dto';
import { AddressDto } from './address.dto';
import { BankAccountInfoDto } from './bank-account-info.dto';
import { BaseInfoDto } from './base-info.dto';

export interface PersonCompanyDto extends Pagination {
  id?: number;
  isCompany?: boolean;
  title?: string;
  nationalCode?: string;
  ceoName?: string;
  ceoNationalCode?: string;
  economicCode?: string;
  email?: RegExp; // EmailValidator
  status?: 'ACTIVE' | 'IN_ACTIVE';
  description?: string;
  ownershipBaseInfo?: BaseInfoDto;
  contactInfos?: ContactInfoDto[];
  addressInfos?: AddressDto[];
  accountInfos?: BankAccountInfoDto[];
}
