import { FormControl } from '@angular/forms';
import { FiscalYearPerStockroomModel } from '@domain/lib/stockroom';

export type FiscalYearPerStockroomForm = {
  [field in keyof Partial<FiscalYearPerStockroomModel>] : FormControl<FiscalYearPerStockroomModel[field] | null>
}

