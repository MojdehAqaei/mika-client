import { FormControl } from '@angular/forms';
import { InvoiceReturnModel } from '@domain/lib/purchase-and-orders';

export type InvoiceReturnForm = {
  [field in keyof Partial<InvoiceReturnModel>]: FormControl<InvoiceReturnModel[field] | null>
}
