import { signal, WritableSignal } from '@angular/core';
import { UserModel } from '@domain/lib/user-management';
import { Crud } from "@view/lib/data-types";


export interface UserState {
  readonly users$: WritableSignal<UserModel[]>
  readonly selectedUser$: WritableSignal<UserModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const userInitialState: UserState = {
  users$: signal<UserModel[]>([]),
  selectedUser$: signal<UserModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const;
