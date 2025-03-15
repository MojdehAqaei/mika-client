import { FormControl } from '@angular/forms';

import { WarehousingModel } from '@domain/lib/stockroom';

export type WarehousingForm = {
  [field in keyof Partial<WarehousingModel>] : FormControl<WarehousingModel[field] | null>
}

