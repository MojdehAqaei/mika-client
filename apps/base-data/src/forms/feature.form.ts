import { FormControl } from '@angular/forms';
import { FeatureModel } from '@domain/lib/base-data';

export type FeatureForm = {
  [field in keyof Partial<FeatureModel>]: FormControl<FeatureModel[field] | null>
}
