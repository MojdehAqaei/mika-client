import { FormControl, FormGroup } from '@angular/forms';
import { PersonCompanyModel } from '@domain/lib/base-data';
import { ContactInfoForm } from './contact-info.form';
import { AddressForm } from './address.form';
import { BankAccountInfoForm } from './bank-account-info.form';

export type PersonCompanyForm = {
  [field in keyof Partial<PersonCompanyModel>]: FormControl<PersonCompanyModel[field] | null> | FormGroup<ContactInfoForm | AddressForm | BankAccountInfoForm>
}
