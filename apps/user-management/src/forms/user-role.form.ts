import { UserRoleModel } from '@domain/lib/user-management';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

/*
export type UserRoleForm = {
  [field in keyof Omit<UserRoleModel, "id">] : FormControl<UserRoleModel[field]>
}
*/


export type UserRoleForm = {
  [field in keyof Partial<UserRoleModel>] : FormControl<UserRoleModel[field] | null> | FormArray<any>
}

