import { signal, WritableSignal } from '@angular/core';
import { RoleModel, RolePermissionModel } from '@domain/lib/user-management';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { Crud } from "@view/lib/data-types";


export interface RoleState {
  readonly roles$: WritableSignal<RoleModel[]>,
  readonly selectedRole$: WritableSignal<RoleModel>,
  readonly permissions$: WritableSignal<ClTreeNode<RolePermissionModel>[]>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const roleInitialState: RoleState = {
  roles$: signal<RoleModel[]>([]),
  selectedRole$: signal<RoleModel>({}),
  permissions$: signal<ClTreeNode<RolePermissionModel>[]>([]),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const;
