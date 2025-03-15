export interface OrganizationDto {
  id?: number;
  name?: string;
  code?: number;
  typeName?: string;
  status?: "ACTIVE" | "IN_ACTIVE"
}
