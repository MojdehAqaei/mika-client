import { FormControl } from "@angular/forms";
import { InvoiceReturnItemModel } from "@domain/lib/purchase-and-orders";

export type InvoiceReturnItemForm = {
  [field in keyof Partial<InvoiceReturnItemModel>]: FormControl<InvoiceReturnItemModel[field] | null>
}
