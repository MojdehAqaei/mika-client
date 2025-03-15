import { signal, WritableSignal } from '@angular/core';
import { UserRoleModel } from '@domain/lib/user-management';
import { Crud } from "@view/lib/data-types";


export interface UserRolesState {
  readonly userRoles$: WritableSignal<UserRoleModel[]>
  readonly selectedUserRole$: WritableSignal<UserRoleModel | null>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const userRolesInitialState: UserRolesState = {
  userRoles$: signal<UserRoleModel[]>([]),
  selectedUserRole$: signal<UserRoleModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const;
