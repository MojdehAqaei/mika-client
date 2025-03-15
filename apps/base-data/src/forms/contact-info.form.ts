import { FormControl } from '@angular/forms';
import { ContactInfoModel } from '@domain/lib/base-data';

export type ContactInfoForm = {
  [field in keyof Partial<ContactInfoModel>]: FormControl<ContactInfoModel[field] | null>
}
