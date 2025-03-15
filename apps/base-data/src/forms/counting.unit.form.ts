import { FormControl } from '@angular/forms';
import { CountingUnitModel } from '@domain/lib/base-data';

export type CountingUnitForm = {
  [field in keyof Partial<CountingUnitModel>]: FormControl<CountingUnitModel[field] | null>
}
