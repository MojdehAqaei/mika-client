import { UserContentAccessModel } from '@domain/lib/user-management';
import { FormControl } from '@angular/forms';

/*
export type UserContentAccessForm = {
  [field in keyof Omit<UserContentAccessModel, "id">] : FormControl<UserContentAccessModel[field]>
}
*/


export type UserContentAccessForm = {
  [field in keyof Partial<UserContentAccessModel>] : FormControl<UserContentAccessModel[field] | null>
}

