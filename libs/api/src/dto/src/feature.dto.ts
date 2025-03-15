import { FeatureTypeEnum } from "@domain/lib/base-data";
import { Pagination } from '@view/lib/models';

export interface FeatureDto extends Pagination {
  id?: number;
  title?: string;
  description?: string;
  type?: FeatureTypeEnum;
  status?: 'ACTIVE' | 'IN_ACTIVE'
  values?: {
    id?: number
    title?: string
  }[];
}
