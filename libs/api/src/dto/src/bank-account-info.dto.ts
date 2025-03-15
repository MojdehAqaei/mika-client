import { BaseInfoDto } from './base-info.dto';

export interface BankAccountInfoDto {
  id?: number;
  bankBaseInfo?: BaseInfoDto;
  accountNumber?: number;
  cardNumber?: string;
  title?: string;
  iban?: string;
  isDefault?: boolean;
  description?: string;
}
