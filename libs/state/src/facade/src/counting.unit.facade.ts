import { inject, Injectable } from '@angular/core';
import { CountingUnitStore } from '@state/lib/store';
import {
  CountingUnitModel,
  SaveCountingUnitUseCase,
  GetCountingUnitsUseCase,
  DeleteCountingUnitUseCase,
  UpdateCountingUnitUseCase,
  GetCountingUnitTypesUseCase,
  CountingUnitModelFilter,
  countingUnitFilterDataMapper
} from '@domain/lib/base-data';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Cache } from '@sadad/component-lib/src/decorators';
import { Crud } from "@view/lib/data-types";


@Injectable({
  providedIn: 'root'
})
export class CountingUnitFacade {
  public countingUnitStore = inject(CountingUnitStore);

  #saveCountingUnitUseCase = inject(SaveCountingUnitUseCase);
  #updateCountingUnitUseCase = inject(UpdateCountingUnitUseCase);
  #deleteCountingUnitUseCase = inject(DeleteCountingUnitUseCase);
  #getCountingUnitsUseCase = inject(GetCountingUnitsUseCase);
  #getCountingUnitTypesUseCase = inject(GetCountingUnitTypesUseCase);

  constructor() {
    this.countingUnitStore.updatePageNumber(0);
    this.updateCountingUnitTypeList();
  }

  @Cache()
  updateCountingUnitList(filters: CountingUnitModel) {
    this.#getCountingUnitsUseCase.execute(filters).subscribe((data: CountingUnitModel[]) => {
      this.countingUnitStore.updateCountingUnits(data);
      data?.length && data[0].totalElements ? this.countingUnitStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as CountingUnitModelFilter] != undefined && countingUnitFilterDataMapper.has(each as CountingUnitModelFilter)) {
          tmp.push(countingUnitFilterDataMapper.get(each as CountingUnitModelFilter)|| '');
        }
      })
      this.countingUnitStore.updateSearchFilterLabels(tmp);
    });
  }

  @Cache()
  updateCountingUnitTypeList() {
    this.#getCountingUnitTypesUseCase.execute().subscribe((data: ClSelectItem[]) => {
      this.countingUnitStore.updateCountingUnitTypes(data);
    });
  }

  toggleEditMode(editMode: boolean) {
    this.countingUnitStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.countingUnitStore.updateDialogVisibility(visible);
  }

  updateSelectedCountingUnit(countingUnit: CountingUnitModel) {
    this.countingUnitStore.updateSelectedCountingUnit(countingUnit);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.countingUnitStore.updateAllowedActions(actions);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.countingUnitStore.updatePageSize(pageSize);
    this.countingUnitStore.updatePageNumber(pageNumber);
  }

  saveCountingUnit(countingUnit: CountingUnitModel) {
    this.countingUnitStore.updateDialogLoading(true);
    this.#saveCountingUnitUseCase.execute(countingUnit).subscribe({
      next: (res) => {
        // adding the new counting unit to the list
        const total = this.countingUnitStore.state$().total$();
        const list = this.countingUnitStore.state$().countingUnits$();
        list.push(res);
        this.countingUnitStore.updateCountingUnits([...list]);

        this.countingUnitStore.updateDialogLoading(false);
        this.countingUnitStore.updateDialogVisibility(false);
        this.countingUnitStore.updateTotal(total + 1);
      },
      error: () => {
        this.countingUnitStore.updateDialogLoading(false);
      }
    })
  }

  updateCountingUnit(countingUnit: CountingUnitModel) {
    this.countingUnitStore.updateDialogLoading(true);
    this.#updateCountingUnitUseCase.execute(countingUnit).subscribe({
      next: (res) => {

        // updating the selected counting unit in the list
        const list = this.countingUnitStore.state$().countingUnits$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.countingUnitStore.updateCountingUnits([...list]);

        this.countingUnitStore.updateDialogLoading(false);
        this.countingUnitStore.updateDialogVisibility(false);
      },
      error: () => {
        this.countingUnitStore.updateDialogLoading(false);
      }
    })
  }

  deleteCountingUnit(id: number) {
    this.#deleteCountingUnitUseCase.execute(id).subscribe(() => {
      // removing the deleted counting unit from the list
      const total = this.countingUnitStore.state$().total$();
      const list = this.countingUnitStore.state$().countingUnits$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.countingUnitStore.updateCountingUnits([...list]);
      this.countingUnitStore.updateTotal(total - 1);
    })
  }
}
