import { FeatureTypeEnum } from '../enum/feature-type.enum';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Pagination } from '@view/lib/models';

export interface FeatureModel extends Pagination {
  id?: number;
  label?: string;
  type?: FeatureTypeEnum;
  typeLabel?: string;
  isActive?: boolean;
  description?: string;
  values?: ClSelectItem[];
}


export type FeatureModelFilter = keyof FeatureModel;
