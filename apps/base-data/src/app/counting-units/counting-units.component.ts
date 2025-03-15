import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { CountingUnitFacade } from '@state/lib/facade';
import { ActionInvokeService } from '@view/lib/ui-services';
import {
  CountingUnitGateway,
  CountingUnitModel,
  getCountingUnitsUseCaseProvider,
  getCountingUnitTypesUseCaseProvider,
  deleteCountingUnitUseCaseProvider,
  saveCountingUnitUseCaseProvider,
  updateCountingUnitUseCaseProvider
} from '@domain/lib/base-data';
import { CountingUnitImplementationService } from '@api/lib/impl';
import { AddEditCountingUnitComponent } from '../add-edit-counting-unit/add-edit-counting-unit.component';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { DataTableAction } from '@view/lib/models';
import { cacheClear } from '@sadad/component-lib/src/decorators';

@Component({
  selector: 'base-counting-units',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddEditCountingUnitComponent],
  templateUrl: './counting-units.component.html',
  styleUrl: './counting-units.component.scss',
  providers: [
    { provide: CountingUnitGateway, useClass: CountingUnitImplementationService },
    CountingUnitFacade,
    getCountingUnitsUseCaseProvider,
    getCountingUnitTypesUseCaseProvider,
    saveCountingUnitUseCaseProvider,
    updateCountingUnitUseCaseProvider,
    deleteCountingUnitUseCaseProvider
  ]
})
export class CountingUnitsComponent extends BaseComponent<CountingUnitModel> implements OnInit {
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);
  public readonly countingUnitFacade = inject(CountingUnitFacade);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.countingUnitFacade.updateCountingUnitList({});
    this.countingUnitFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.countingUnitFacade.countingUnitStore.state$().pageNumber$() * this.countingUnitFacade.countingUnitStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.countingUnitFacade.countingUnitStore.state$().total$() > this.countingUnitFacade.countingUnitStore.state$().pageSize$());


    this.cols = [
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.title')
      },
      {
        colSpan: 1,
        value: ['countingUnitType.label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.type')
      },
      {
        colSpan: 1,
        value: ['isActive'],
        type: ClColumnDataType.BOOLEAN,
        header: this.translate.instant('base-data.status')
      }
    ];

    this.actions =  [
      {
        label: this.translate.instant('edit'),
        icon: 'edit',
        command: (event) => this.openEditDialog(event),
        styleClasses: 'blue-text text-darken-2',
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: "delete",
        command: (event) => this.deleteCountingUnit(event),
        styleClasses: 'red-text text-darken-2',
        key: 'Delete'
      },
    ];
  }


  setEditMode() {
    this.countingUnitFacade.toggleDialogVisibility(true);
    this.countingUnitFacade.toggleEditMode(false);
  }

  saveOrUpdateCountingUnit() {
    this.#invokeService.invokeMethod('add or update count unit');
  }

  resetForm() {
    this.countingUnitFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterCountingUnits(event: CountingUnitModel) {
    cacheClear['updateCountingUnitList'].clear();
    this.countingUnitFacade.updatePage(this.countingUnitFacade.countingUnitStore.state$().pageSize$(), 0);
    this.countingUnitFacade.updateCountingUnitList({
      ...event,
      pageNumber: this.countingUnitFacade.countingUnitStore.state$().pageNumber$(),
      pageSize: this.countingUnitFacade.countingUnitStore.state$().pageSize$()
    });
  }

  clearFilters() {
    cacheClear['updateCountingUnitList'].clear();
    this.formGroup?.markAsUntouched();
  }

  openEditDialog(event: { action: ClAction, row: CountingUnitModel }) {
    this.countingUnitFacade.toggleDialogVisibility(true);
    this.countingUnitFacade.toggleEditMode(true);
    this.countingUnitFacade.updateSelectedCountingUnit(event.row);
  }

  deleteCountingUnit(event: { action: ClAction, row: CountingUnitModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.countingUnitFacade.deleteCountingUnit(event.row.id) : ''
    });
  }

  page(event: { rows: number, first: number, page: number } & CountingUnitModel) {
    cacheClear['updateCountingUnitList'].clear();
    this.countingUnitFacade.updatePage(event.rows, event.page - 1);
    this.countingUnitFacade.updateCountingUnitList(
      {
        ...event,
        pageNumber: this.countingUnitFacade.countingUnitStore.state$().pageNumber$(),
        pageSize: this.countingUnitFacade.countingUnitStore.state$().pageSize$()
      });
  }
}
