import { ClAction } from '@sadad/component-lib/src/models';
import { Crud } from '../../data-types';

export interface DataTableAction extends ClAction {
  key?: Crud;
}
