import { FormControl } from '@angular/forms';
import { FiscalYearModel } from '@domain/lib/stockroom';

export type FiscalYearForm = {
  // [field in keyof Omit<FiscalYearModel, "id">] : FormControl<FiscalYearModel[field]>
  [field in keyof Partial<FiscalYearModel>] : FormControl<FiscalYearModel[field] | null>
}

