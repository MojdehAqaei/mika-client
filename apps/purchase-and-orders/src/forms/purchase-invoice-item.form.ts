import { FormControl } from "@angular/forms";
import { PurchaseInvoiceItemModel } from "@domain/lib/purchase-and-orders";

export type PurchaseInvoiceItemForm = {
    [field in keyof Partial<PurchaseInvoiceItemModel>]: FormControl<PurchaseInvoiceItemModel[field] | null>
  }
