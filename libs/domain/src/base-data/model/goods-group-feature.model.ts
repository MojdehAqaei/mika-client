import { ClSelectItem } from '@sadad/component-lib/src/models';
import { FeatureTypeEnum } from '../enum/feature-type.enum';

export interface GoodsGroupFeatureModel {
  id?: number;
  required?: boolean;
  description?: string;
  featureId?: number;
  featureLabel?: string;
  featureValues?: ClSelectItem[];
  featureType?: FeatureTypeEnum;
  order?: number;
  goodsGroupId?: number;
  isSelected?: boolean;
}
