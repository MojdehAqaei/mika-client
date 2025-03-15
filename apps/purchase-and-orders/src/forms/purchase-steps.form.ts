import { FormControl } from '@angular/forms';
import { PurchaseStepsModel } from '@domain/lib/purchase-and-orders';

export type PurchaseStepsForm = {
  [field in keyof Partial<PurchaseStepsModel>]: FormControl<PurchaseStepsModel[field] | null>
}
