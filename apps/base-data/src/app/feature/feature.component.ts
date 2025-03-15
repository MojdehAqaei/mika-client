import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { FeatureFacade } from '@state/lib/facade';
import { ClFormGeneratorComponent } from '@sadad/component-lib/src/lib/form-generator';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import {
  FeatureGateway,
  FeatureModel,
  SearchFeaturesUseCaseProvider,
  deleteFeatureUseCaseProvider,
  SaveFeatureUseCaseProvider,
  UpdateFeatureUseCaseProvider,
  getFeatureByIdUseCaseProvider
} from '@domain/lib/base-data';
import { FeatureImplementationService } from '@api/lib/impl';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { AddEditFeatureComponent } from '../add-edit-feature/add-edit-feature.component';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'base-feature',
  standalone: true,
  imports: [
    CommonModules,
    ClFormGeneratorComponent,
    ClChipsComponent,
    CrudComponent,
    AddEditFeatureComponent
  ],
  templateUrl: './feature.component.html',
  providers: [
    { provide: FeatureGateway, useClass: FeatureImplementationService },
    FeatureFacade,
    SearchFeaturesUseCaseProvider,
    getFeatureByIdUseCaseProvider,
    SaveFeatureUseCaseProvider,
    UpdateFeatureUseCaseProvider,
    deleteFeatureUseCaseProvider
  ]
})
export class FeatureComponent extends BaseComponent<FeatureModel> implements OnInit {
  public readonly featureFacade = inject(FeatureFacade);
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.featureFacade.updateFeatureTableData({});
    this.featureFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.featureFacade.featureStore.state$().pageNumber$() * this.featureFacade.featureStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.featureFacade.featureStore.state$().total$() > this.featureFacade.featureStore.state$().pageSize$());

    this.cols = [
      {
        colSpan: 1,
        value: ['id'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.feature-code')
      },
      {
        colSpan: 1,
        value: ['label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.title')
      },
      {
        colSpan: 1,
        value: ['typeLabel'],
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

    this.actions = [
      {
        label: this.translate.instant('edit'),
        icon: 'edit',
        styleClasses: 'blue-text text-darken-2',
        command: (event) => this.openEditDialog(event),
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.deleteGoodsFeature(event),
        key: 'Delete'
      }
    ];

  }
  setEditMode() {
    this.featureFacade.toggleEditMode(false);
    this.featureFacade.toggleDialogVisibility(true);
  }


  /**
   * Submit Form To Server
   */
  saveOrUpdateGoodsFeature() {
    this.#invokeService.invokeMethod('add or update goods feature');
  }

  resetForm() {
    this.featureFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterGoodsFeatures(event: FeatureModel) {
    cacheClear['updateFeatureTableData'].clear();
    this.featureFacade.updatePage(this.featureFacade.featureStore.state$().pageSize$(), 0);
    this.featureFacade.updateFeatureTableData(
      {
        ...event,
        pageNumber: this.featureFacade.featureStore.state$().pageNumber$(),
        pageSize: this.featureFacade.featureStore.state$().pageSize$()
    });
  }

  clearFilters() {
    cacheClear['updateFeatureTableData'].clear();
    this.formGroup?.markAsUntouched();
  }

  openEditDialog(event: { action: ClAction, row: FeatureModel}) {
    this.featureFacade.toggleEditMode(true);``
    event.row.id ? this.featureFacade.updateFeatureDetails(event.row.id) : '';
    this.featureFacade.toggleDialogVisibility(true);``
  }

  deleteGoodsFeature(event: { action: ClAction, row: FeatureModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.featureFacade.deleteFeature(event.row.id) : ''
    });
  }

  page(event: { rows: number, first: number, page: number } & FeatureModel) {
    cacheClear['updateFeatureTableData'].clear();
    this.featureFacade.updatePage(event.rows, event.page - 1);
    this.featureFacade.updateFeatureTableData(
      {
        ...event,
        pageNumber: this.featureFacade.featureStore.state$().pageNumber$(),
        pageSize: this.featureFacade.featureStore.state$().pageSize$()
    });
  }
}
