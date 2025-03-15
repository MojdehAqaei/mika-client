import { FormControl } from '@angular/forms';
import { AddressModel } from '@domain/lib/base-data';

export type AddressForm = {
  [field in keyof Partial<AddressModel>]: FormControl<AddressModel[field] | null>
}
