import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { InvoiceReturnItemForm } from './invoice-return-item.form';

export type invoiceReturnDetailForm = {
  deductionsAmount: FormControl<number | null>;
  additionsAmount: FormControl<number | null>;
  finalAmount: FormControl<number | null>;
  invoiceItemList: FormArray<FormGroup<InvoiceReturnItemForm>>
}
