export interface BankAccountInfoModel {
  id?: number;
  title?: string;
  bankId?: number;
  bankName?: string;
  accountNumber?: number;
  iban?: string; // sheba
  cardNumber?: string;
  description?: string;
  isDefault?: boolean;
  list?: BankAccountInfoModel[];
}
