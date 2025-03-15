import { GoodsGroupDto } from './goods-group.dto';
import { Pagination } from '@view/lib/models';

export interface InventoryTypeDto extends Pagination {
  id?: number;
  title?: string;
  code?: string;
  description?: string;
  status?: 'ACTIVE' | 'IN_ACTIVE';
  categoryListRequestDTO?: {
    inventoryTypeCategoryList?: (number | undefined)[];
  }
  categoryResponseListDTO?: {
    goodsServiceExposedDTOS?: GoodsGroupDto[];
  }
  // goodsServiceCategory?: GoodsGroupDto[];
}
