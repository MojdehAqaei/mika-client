import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { CountingUnitState, countingUnitInitialState } from '../../state';
import { CountingUnitModel } from '@domain/lib/base-data';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class CountingUnitStore {
  #store = new Store<CountingUnitState>(countingUnitInitialState);
  public readonly state$: Signal<CountingUnitState> = this.#store.state$.asReadonly();

  updateCountingUnits(countingUnits: CountingUnitModel[]) {
    this.#store.updateField('countingUnits$', countingUnits);
  }

  updateCountingUnitTypes(countingUnitTypes: ClSelectItem[]) {
    this.#store.updateField('countingUnitTypes$', countingUnitTypes);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateSelectedCountingUnit(countingUnit: CountingUnitModel) {
    this.#store.updateField('selectedCountingUnit$', countingUnit)
  }

  updateDialogLoading(dialog: boolean) {
    this.#store.updateField('dialogLoading$', dialog);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }
}
