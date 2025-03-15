export interface BaseInfoDto {
  id?: number;
  parent?: BaseInfoDto;
  title?: string;
  code?: string;
  isVisible?: boolean;
  displayOrder?: number;
}
