import { Pagination } from '@view/lib/models';

export interface StockroomModel extends Pagination {
  id?: number;
  isActive?: boolean;
  title?: string;
  code?: string;
  organizationId?: number;
  organizationName?: string;
  inventoryTypeId?: number;
  inventoryTypeTitle?: string;
  description?: string;
}

export type StockroomModelFilter = keyof StockroomModel;
