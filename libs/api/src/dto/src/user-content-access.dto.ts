export interface UserContentAccessDto {
  userRoleId?: number;
  accessScope?: 'ALL' | 'INCLUDE';
  goodsServiceCategories?: number[];
  organizations?: number[];
  inventories?: number[];
  personCompanies?: number[];
}
