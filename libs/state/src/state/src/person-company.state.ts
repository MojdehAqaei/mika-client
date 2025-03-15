import { signal, WritableSignal } from '@angular/core';
import { Crud } from "@view/lib/data-types";
import { PersonCompanyModel } from '@domain/lib/base-data';
import { ClSelectItem } from '@sadad/component-lib/src/models';


export interface PersonCompanyState {
  readonly personCompanyList$: WritableSignal<PersonCompanyModel[]>,
  readonly selectedPersonCompany$: WritableSignal<PersonCompanyModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly ownershipTypes$: WritableSignal<ClSelectItem[]>,
  readonly contactInfoTypes$: WritableSignal<ClSelectItem[]>,
  readonly addressInfoTypes$: WritableSignal<ClSelectItem[]>,
  readonly banks$: WritableSignal<ClSelectItem[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const personCompanyInitialState: PersonCompanyState = {
  personCompanyList$: signal<PersonCompanyModel[]>([]),
  selectedPersonCompany$: signal<PersonCompanyModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  ownershipTypes$: signal<ClSelectItem[]>([]),
  contactInfoTypes$: signal<ClSelectItem[]>([]),
  addressInfoTypes$: signal<ClSelectItem[]>([]),
  banks$: signal<ClSelectItem[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const;
