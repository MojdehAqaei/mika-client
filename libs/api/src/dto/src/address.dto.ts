import { BaseInfoDto } from './base-info.dto';
import { GeoDto } from './geo.dto';

export interface AddressDto {
  id?: number;
  addressTypeBaseInfo?: BaseInfoDto;
  geo?: GeoDto;
  postalCode?: number;
  address?: string;
  title?: string;
  isDefault?: boolean;
  description?: string;
}
