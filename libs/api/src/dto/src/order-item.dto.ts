import { CountingUnitDto } from './counting-unit.dto';
import { GoodsDto } from './goods.dto';
import { OrganizationDto } from './organization.dto';

export interface OrderItemDto {
  id?: number;
  goodsService?: GoodsDto;
  applicantOrganization?: OrganizationDto;
  quantity?: number;
  remainingQuantity?: number;
  requestLetterNumber?: string;
  requestLetterDate?: Date;
  description?: string;
  measurement?: CountingUnitDto;
}
