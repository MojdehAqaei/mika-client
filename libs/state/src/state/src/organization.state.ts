import { signal, WritableSignal } from '@angular/core';
import { OrganizationModel } from '@domain/lib/organization';
import { ClSelectItem } from '@sadad/component-lib/src/models';



export interface OrganizationState {
  readonly filteredActiveOrganizations$: WritableSignal<ClSelectItem[]>,
}

export const organizationInitialState: OrganizationState = {
  filteredActiveOrganizations$: signal<ClSelectItem[]>([]),
} as const
