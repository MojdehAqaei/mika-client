import { UserModel } from '@domain/lib/user-management';
import { FormControl } from '@angular/forms';

/*
export type UserForm = {
  [field in keyof Omit<UserModel, "id">] : FormControl<UserModel[field]>
}
*/


export type UserForm = {
  [field in keyof Partial<UserModel>] : FormControl<UserModel[field] | null>
}

