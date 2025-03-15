export interface GoodsGroupModel {
  id?: number;
  title?: string;
  code?: string;
  fullCode?: string;
  codeLength?: number;
  childCodeLength?: number;
  level?: number; // 0 to 4
  isActive?: boolean;
  isRoot?: boolean;
  description?: string;
  parentId?: number;
}
