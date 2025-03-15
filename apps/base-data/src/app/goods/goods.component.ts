import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { GoodsFacade, GoodsGroupFeatureFacade } from '@state/lib/facade';
import {
  GoodsGateway,
  GoodsGroupFeatureGateway,
  GoodsModel,
  GetGoodsUseCaseProvider,
  GetGoodsByIdUseCaseProvider,
  SaveGoodsUseCaseProvider,
  UpdateGoodsUseCaseProvider,
  DeleteGoodsUseCaseProvider,
  GetGoodsGroupFeaturesByIdUseCaseProvider,
  SaveGoodsGroupFeaturesUseCaseProvider,
  GoodsGroupGateway
} from '@domain/lib/base-data';
import {
  GoodsGroupFeatureImplementationService, GoodsGroupImplementationService,
  GoodsImplementationService
} from '@api/lib/impl';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { ActionInvokeService } from '@view/lib/ui-services';
import { cacheClear, ErrorLogger } from '@sadad/component-lib/src/decorators';
import { AddEditGoodsComponent } from '../add-edit-goods/add-edit-goods.component';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'base-goods',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddEditGoodsComponent],
  templateUrl: './goods.component.html',
  providers: [
    {provide: GoodsGateway, useClass: GoodsImplementationService},
    {provide: GoodsGroupFeatureGateway, useClass: GoodsGroupFeatureImplementationService},
    {provide: GoodsGroupGateway, useClass: GoodsGroupImplementationService},
    GetGoodsGroupFeaturesByIdUseCaseProvider,
    SaveGoodsGroupFeaturesUseCaseProvider,
    GetGoodsUseCaseProvider,
    GetGoodsByIdUseCaseProvider,
    SaveGoodsUseCaseProvider,
    UpdateGoodsUseCaseProvider,
    DeleteGoodsUseCaseProvider,
    GoodsFacade,
    GoodsGroupFeatureFacade
  ]
})
export class GoodsComponent extends BaseComponent<GoodsModel> implements OnInit {

  protected readonly goodsFacade = inject(GoodsFacade);
  protected readonly goodsGroupFeatureFacade = inject(GoodsGroupFeatureFacade);

  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];


  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.goodsFacade.updateGoodsTableData({});
    this.goodsFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.goodsFacade.goodsStore.state$().pageNumber$() * this.goodsFacade.goodsStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.goodsFacade.goodsStore.state$().total$() > this.goodsFacade.goodsStore.state$().pageSize$());

    this.cols = [
      {
        colSpan: 1,
        value: ['code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.code')
      },
      {
        colSpan: 1,
        value: ['label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.title')
      },
      {
        colSpan: 1,
        value: ['countingUnitTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.counting-unit.type')
      },
      {
        colSpan: 1,
        value: ['goodsGroupLabel'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods-group')
      },
      {
        colSpan: 1,
        value: ['accessTypeTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.access-type')
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
        styleClasses: 'blue-text text-darken-2',
        command: (event) => this.openEditDialog(event),
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.deleteGoods(event),
        key: 'Delete'
      }
    ]
  }

  openEditDialog(event: { action: ClAction, row: GoodsModel }) {
    if (event.row.id) {
      this.goodsFacade.toggleDialogVisibility(true);
      this.goodsFacade.toggleEditMode(true);
      this.goodsFacade.updateSelectedGoods(event.row.id);
    }
  }

  /**
   * Save Or Update Goods
   */
  @ErrorLogger()
  saveOrUpdateGoods() {
    this.#invokeService.invokeMethod('add or update goods');
  }

  /**
   * Reset Form
   */
  resetForm() {
    this.goodsGroupFeatureFacade.updateGoodsGroupFeatures(null);
    this.goodsFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  /**
   * Filter Goods
   */
  filterGoods(event: GoodsModel) {
    cacheClear['updateGoodsTableData'].clear();
    this.goodsFacade.updatePage(this.goodsFacade.goodsStore.state$().pageSize$(), 0);
    this.goodsFacade.updateGoodsTableData({
      ...event,
      pageNumber: this.goodsFacade.goodsStore.state$().pageNumber$(),
      pageSize: this.goodsFacade.goodsStore.state$().pageSize$()
    });
  }

  /**
   * Clear Filters
   */
  clearFilters() {
    cacheClear['updateGoodsTableData'].clear();
    this.formGroup?.markAsUntouched();
  }

  /**
   * Set Edit Mode
   */
  seEditMode() {
    this.goodsGroupFeatureFacade.updateGoodsGroupFeatures(null);
    this.goodsFacade.toggleEditMode(false);
    this.goodsFacade.toggleDialogVisibility(true);
  }

  /**
   * Delete Goods
   * @param event
   */
  deleteGoods(event: { action: ClAction, row: GoodsModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.goodsFacade.deleteGoodsById(event.row.id) : ''
    });
  }

  page(event: { rows: number, first: number, page: number } & GoodsModel) {
    cacheClear['updateGoodsTableData'].clear();
    this.goodsFacade.updatePage(event.rows, event.page - 1);
    this.goodsFacade.updateGoodsTableData(
      {
        ...event,
        pageNumber: this.goodsFacade.goodsStore.state$().pageNumber$(),
        pageSize: this.goodsFacade.goodsStore.state$().pageSize$()
      });
  }
}
