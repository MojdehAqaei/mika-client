import { FeatureTypeEnum } from '../enum/feature-type.enum';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export interface GoodsFeatureModel {
  id?: number;
  value?: number | null;
  label?: string;
  description?: string;
  featureId?: number;
  featureValues?: ClSelectItem[];
  featureType?: FeatureTypeEnum;
  featureLabel?: string;
  goodsGroupFeatureId?: number;
  goodsGroupFeatureRequired?: boolean;
  goodsGroupFeatureOrder?: number;
}
