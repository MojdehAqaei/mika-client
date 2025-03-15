import { GoodsGroupModel } from '@domain/lib/base-data';
import { FormControl } from '@angular/forms';

export type GoodsGroupForm = {
  [field in keyof Partial<GoodsGroupModel>]: FormControl<GoodsGroupModel[field] | null>
}
