export interface AddressModel {
  id?: number;
  title?: string;
  provinceId?: number;
  typeId?: number;
  typeTitle?: string;
  postalCode?: number;
  address?: string;
  description?: string;
  isDefault?: boolean;
  list?: AddressModel[];
}
