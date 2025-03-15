import { FormArray, FormControl } from '@angular/forms';
import { GoodsModel } from '@domain/lib/base-data';

export type GoodsForm = {
  [field in keyof Partial<GoodsModel>]: FormControl<GoodsModel[field] | null> | FormArray<any>
}
