export interface ContactInfoModel {
  id?: number;
  title?: string;
  typeId?: number;
  typeTitle?: string;
  phoneNumber?: number;
  description?: string;
  isDefault?: boolean;
  list?: ContactInfoModel[];
}
