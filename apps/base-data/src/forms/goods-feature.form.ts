import { FormControl } from '@angular/forms';
import { GoodsFeatureModel } from '@domain/lib/base-data';

export type GoodsFeatureForm = {
  [field in keyof Partial<GoodsFeatureModel>]: FormControl<GoodsFeatureModel[field] | null>
}
