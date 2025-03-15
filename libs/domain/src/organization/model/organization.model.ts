import { OrganizationTypeEnum } from '../enum/organization-type.enum';

export interface OrganizationModel {
  id?: number;
  label?: string;
  code?: number;
  type?: string;
  typeCode?: OrganizationTypeEnum;
  isActive?: boolean;
}
