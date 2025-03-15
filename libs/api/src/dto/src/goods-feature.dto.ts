import { FeatureDto } from './feature.dto';

export interface GoodsFeatureDto {
  id?: number;
  value?: {
    id?: number | null;
    title?: string;
  } | null,
  description?: string;
  categoryProperty?: {
    id?: number;
    isMandatory?: boolean;
    displayOrder?: number;
    property?: FeatureDto;
  };
}
