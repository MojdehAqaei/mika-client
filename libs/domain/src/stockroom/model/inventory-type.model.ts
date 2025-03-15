import { GoodsGroupModel } from '../../base-data';
import { Pagination } from '@view/lib/models';

export interface InventoryTypeModel extends Pagination {
  id?: number;
  title?: string;
  code?: string;
  isActive?: boolean;
  description?: string;
  selectedGoodsGroup?: GoodsGroupModel;
  relatedGoodsGroups?: GoodsGroupModel[];
}

export type InventoryTypeModelFilter = keyof InventoryTypeModel;
