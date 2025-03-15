import { Component, Inject, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { ClTreeComponent } from '@sadad/component-lib/src/lib/tree';
import {
  GoodsGroupGateway,
  GoodsGroupModel,
  GetGoodsGroupChildrenByIdUseCaseProvider,
  GetGoodsGroupTreeUseCaseProvider,
  GenerateGoodsGroupCodeUseCaseProvider,
  SaveGoodsGroupUseCaseProvider,
  UpdateGoodsGroupUseCaseProvider,
  DeleteGoodsGroupUseCaseProvider,
  SaveGoodsGroupFeaturesUseCaseProvider,
  GetGoodsGroupFeaturesByIdUseCaseProvider,
  GoodsGroupFeatureGateway
} from '@domain/lib/base-data';
import { GoodsGroupFeatureImplementationService, GoodsGroupImplementationService } from '@api/lib/impl';
import { GoodsGroupFacade, GoodsGroupFeatureFacade } from '@state/lib/facade';
import { BaseComponent, DialogComponent } from '@view/lib/components';
import { ClConfirmation, ClMenuItem, ClTreeNode } from '@sadad/component-lib/src/models';
import { ClContextMenuComponent } from '@sadad/component-lib/src/lib/context-menu';
import { AddEditGoodsGroupComponent } from '../add-edit-goods-group/add-edit-goods-group.component';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { SetGoodsGroupFeatureComponent } from '../set-goods-group-feature/set-goods-group-feature.component';

@Component({
  selector: 'base-goods-group',
  standalone: true,
  imports: [CommonModules, ClTreeComponent, DialogComponent, ClContextMenuComponent, AddEditGoodsGroupComponent, SetGoodsGroupFeatureComponent],
  templateUrl: './goods-group.component.html',
  styleUrl: './goods-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: GoodsGroupGateway, useClass: GoodsGroupImplementationService },
    { provide: GoodsGroupFeatureGateway, useClass: GoodsGroupFeatureImplementationService },
    GetGoodsGroupTreeUseCaseProvider,
    GetGoodsGroupChildrenByIdUseCaseProvider,
    GenerateGoodsGroupCodeUseCaseProvider,
    SaveGoodsGroupUseCaseProvider,
    UpdateGoodsGroupUseCaseProvider,
    DeleteGoodsGroupUseCaseProvider,
    SaveGoodsGroupFeaturesUseCaseProvider,
    SaveGoodsGroupFeaturesUseCaseProvider,
    GetGoodsGroupFeaturesByIdUseCaseProvider,
    GoodsGroupFacade,
    GoodsGroupFeatureFacade
  ]
})
export class GoodsGroupComponent extends BaseComponent<GoodsGroupModel> implements OnInit {

  public readonly goodsGroupFacade = inject(GoodsGroupFacade);
  public readonly goodsGroupFeatureFacade = inject(GoodsGroupFeatureFacade);

  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  dialogHeader = '';
  mode!: 'edit' | 'add' | 'setFeature';
  contextMenuList!: ClMenuItem[];
  addButton!: ClMenuItem;
  editButton!: ClMenuItem;
  setFeatureButton!: ClMenuItem;
  deleteButton!: ClMenuItem;

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit() {
    this.addButton = {
      label: this.translate.instant('add'),
      icon: 'add',
      command: () => this.setCommonConfig('add', this.translate.instant('base-data.add-sub-group'), false)
    };

    this.editButton = {
      label: this.translate.instant('edit'),
      icon: 'edit',
      command: () => this.setCommonConfig('edit', this.translate.instant('base-data.edit-group'), true)
    };

    this.setFeatureButton = {
      label: this.translate.instant('set-feature'),
      icon: 'settings',
      command: () => this.setCommonConfig('setFeature', this.translate.instant('base-data.set-feature.'), false)
    };

    this.deleteButton = {
      label: this.translate.instant('delete'),
      icon: 'delete',
      command: () => this.deleteGoodsGroup()
    }
  }

  /**
   * Get Context Menu List
   */
  setContextMenu() {
    switch (this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$()?.data?.level) {
      case 1:
      case 2:
      case 3:
        this.contextMenuList = [this.addButton, this.deleteButton, this.editButton];
        break;
      case 4:
        this.contextMenuList = [this.editButton, this.deleteButton, this.setFeatureButton];
        break;
    }
  }

  /**
   * Set Common Configs
   * @param mode
   * @param dialogHeader
   * @param edit
   */
  setCommonConfig(mode: 'edit' | 'add' | 'setFeature', dialogHeader: string, edit: boolean) {
    this.goodsGroupFacade.toggleDialogVisibility(true);
    this.dialogHeader = dialogHeader;
    this.mode = mode;
    this.goodsGroupFacade.toggleEditMode(edit);

    if(mode == 'add') {
      this.goodsGroupFacade.generateGoodsGroupCodeByParentId(this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$().key || '');
    } else if (mode == 'setFeature') {
      this.goodsGroupFeatureFacade.getGoodsGroupFeaturesById(this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$().data.id || 1);
    }
  }

  /**
   * Delete Goods Group
   */
  deleteGoodsGroup() {
    const id = this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$()?.data?.id;
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => id
        ? this.goodsGroupFacade.deleteGoodsGroup(id,
          this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$()?.parent?.data?.id)
        : ''
    });
  }


  /**
   * Submit Form To Server
   */
  saveOrUpdateGoodsGroupForms() {
    this.#invokeService.invokeMethod('add or update goods group');
  }

  /**
   * Expand Goods Group
   * @param event
   */
  onNodeExpand(event: ClTreeNode<GoodsGroupModel>) {
    if (event.key) this.goodsGroupFacade.getGoodsGroupChildren(event);
  }
}
