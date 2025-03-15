import { FormControl } from '@angular/forms';
import { PurchaseStepsItemModel } from '@domain/lib/purchase-and-orders';

export type PurchaseStepsItemForm = {
  [field in keyof Partial<PurchaseStepsItemModel>]: FormControl<PurchaseStepsItemModel[field] | null>
}
