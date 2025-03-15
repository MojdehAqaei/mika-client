import { GoodsGroupDto } from './goods-group.dto';
import { FeatureDto } from './feature.dto';

export interface GoodsGroupFeatureDto {
  id?: number;
  goodsServiceCategory?: GoodsGroupDto;
  property?: FeatureDto;
  isMandatory?: boolean;
  displayOrder?: number;
}
