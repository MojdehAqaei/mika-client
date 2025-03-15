import { FormControl } from '@angular/forms';

import { InventoryTypeModel } from '@domain/lib/stockroom';

export type InventoryTypeForm = {
  [field in keyof Partial<InventoryTypeModel>] : FormControl<InventoryTypeModel[field] | null>
}

