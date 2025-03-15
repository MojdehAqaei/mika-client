import { FormControl } from '@angular/forms';
import { PurchaseInvoiceModel } from '@domain/lib/purchase-and-orders';

export type PurchaseInvoiceForm = {
  [field in keyof Partial<PurchaseInvoiceModel>]: FormControl<PurchaseInvoiceModel[field] | null>
}
