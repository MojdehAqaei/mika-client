import { ClSelectItem } from "@sadad/component-lib/src/models";

export interface SelectItem<T = any> extends ClSelectItem {
  icon?: string;
  imgSrc?: string;
  link?: string;
  name?: string;
  value?: T;
}
