import { FormControl } from '@angular/forms';
import { GoodsGroupFeatureModel } from '@domain/lib/base-data';

export type GoodsGroupFeatureForm = {
  [field in keyof Partial<GoodsGroupFeatureModel>]: FormControl<GoodsGroupFeatureModel[field] | null>
}
