import { BaseInfoDto } from './base-info.dto';

export interface ContactInfoDto {
  id?: number;
  phoneNumberBaseInfo?: BaseInfoDto;
  phoneNumber?: number;
  title?: string;
  isDefault?: boolean;
  description?: string;
}
