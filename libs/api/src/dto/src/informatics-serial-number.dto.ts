import { OrganizationDto } from './organization.dto';
import { InventoryTypeDto } from './inventory-type.dto';

export interface InformaticsSerialNumberDto {
  id?: number;
  serialNumber?: string;
  latestOrganization?: OrganizationDto;
  latestInventory?: InventoryTypeDto;
  available?: boolean;
}
