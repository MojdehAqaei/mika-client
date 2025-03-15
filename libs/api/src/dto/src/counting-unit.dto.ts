import { Pagination } from '@view/lib/models';
import { BaseInfoDto } from './base-info.dto';

export interface CountingUnitDto extends Pagination {
  id?: number;
  title?: string;
  status?: 'ACTIVE' | 'IN_ACTIVE';
  measurementType?: BaseInfoDto;
}
