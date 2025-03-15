import { FormControl } from '@angular/forms';
import { BankAccountInfoModel } from '@domain/lib/base-data';

export type BankAccountInfoForm = {
  [field in keyof Partial<BankAccountInfoModel>]: FormControl<BankAccountInfoModel[field] | null>
}
