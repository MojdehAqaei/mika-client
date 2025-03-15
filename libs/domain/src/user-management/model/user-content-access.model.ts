export interface UserContentAccessModel {
  userRoleId?: number;
  label?: string; // 'goodsServiceCategories' | 'organizations' | 'inventories' | 'personCompanies';
  getByUserRoleIdUrl?: string;
  saveUrl?: string;
  getCategoryUrl?: string;
  selectionMode?: 'all' | 'some' | 'none';
  selectableCategory?: any;
  idList?: any[];
}
