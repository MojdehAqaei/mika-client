import { FormControl } from '@angular/forms';

import { StockroomModel } from '@domain/lib/stockroom';

export type StockroomForm = {
  [field in keyof Partial<StockroomModel>] : FormControl<StockroomModel[field] | null>
}

