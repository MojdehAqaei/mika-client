import { RoleModel } from '@domain/lib/user-management';
import { FormControl } from '@angular/forms';

/*
export type RoleForm = {
  [field in keyof Omit<RoleModel, "id">] : FormControl<RoleModel[field]>
}
*/


export type RoleForm = {
  [field in keyof Partial<RoleModel>] : FormControl<RoleModel[field] | null>
}

