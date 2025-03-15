import { GeoEnum } from '@domain/lib/base-data';

export interface GeoDto {
  id?: number;
  name?: string;
  code?: string;
  type?: GeoEnum;
  statisticalCode?: string;
}
