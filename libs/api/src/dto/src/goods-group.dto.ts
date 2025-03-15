export class GoodsGroupDto {
  id?: number;
  parent?: GoodsGroupDto;
  children?: GoodsGroupDto[];
  title?: string;
  code?: string;
  level?: number; // 0 to 4
  status?: 'ACTIVE' | 'IN_ACTIVE';
  expandable?: boolean;
  description?: string;
}
