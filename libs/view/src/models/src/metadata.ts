import { Data } from "@angular/router";
import { ClFormControlSchema } from '@sadad/component-lib/src/models';

export interface Metadata extends Data {
  title?: string; // shown on the browser tab
  pageTitle?: string;
  pageSubTitle?: string;
  pageIcon?: string;
  hasDrawer?: boolean;
  isMenuExpanded?: boolean;
  drawerTitle?: string;
  drawerIcon?: string;
  breadcrumb?: string;
  formSchema?: ClFormControlSchema[];
  type?: 'error' | 'not found' | 'access denied' | 'loading' | 'empty';
  permissionKey?: string;
}
