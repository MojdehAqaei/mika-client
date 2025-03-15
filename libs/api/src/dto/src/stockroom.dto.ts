import { InventoryTypeDto } from './inventory-type.dto';
import { Pagination } from '@view/lib/models';
import { OrganizationDto } from './organization.dto';

export interface StockroomDto extends Pagination {
  id?: number;
  title?: string;
  code?: string;
  organization?: OrganizationDto;
  description?: string;
  status?: 'ACTIVE' | 'IN_ACTIVE';
  inventoryType?: InventoryTypeDto;
}
