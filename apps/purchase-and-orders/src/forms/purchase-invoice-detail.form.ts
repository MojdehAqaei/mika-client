import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PurchaseInvoiceItemForm } from './purchase-invoice-item.form';

export type PurchaseInvoiceDetailForm = {
  deductionsAmount: FormControl<number | null>;
  additionsAmount: FormControl<number | null>;
  finalAmount: FormControl<number | null>;
  invoiceItemList: FormArray<FormGroup<PurchaseInvoiceItemForm>>
}
