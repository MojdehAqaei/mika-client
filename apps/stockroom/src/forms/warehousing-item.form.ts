import { FormControl } from '@angular/forms';

import { WarehousingItemModel } from '@domain/lib/stockroom';

export type WarehousingItemForm = {
  [field in keyof Partial<WarehousingItemModel>] : FormControl<WarehousingItemModel[field] | null>
}

