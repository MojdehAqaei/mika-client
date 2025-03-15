import { inject, Injectable } from '@angular/core';
import { GoodsGroupStore } from '../../store';
import {
  GetGoodsGroupChildrenByIdUseCase,
  GetGoodsGroupTreeUseCase,
  SaveGoodsGroupUseCase,
  GoodsGroupModel,
  GenerateGoodsGroupCodeUseCase,
  DeleteGoodsGroupUseCase,
  UpdateGoodsGroupUseCase,
} from '@domain/lib/base-data';
import { TreeService } from '@view/lib/ui-services';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';

@Injectable()
export class GoodsGroupFacade {
  public goodsGroupStore = inject(GoodsGroupStore);

  readonly #getGoodsGroupTreeUseCase = inject(GetGoodsGroupTreeUseCase);
  readonly #getGoodsGroupChildrenByIdUseCase = inject(GetGoodsGroupChildrenByIdUseCase);
  readonly #generateGoodsGroupCodeUseCase = inject(GenerateGoodsGroupCodeUseCase);
  readonly #saveGoodsGroupUseCase = inject(SaveGoodsGroupUseCase);
  readonly #updateGoodsGroupUseCase = inject(UpdateGoodsGroupUseCase);
  readonly #deleteGoodsGroupUseCase = inject(DeleteGoodsGroupUseCase);

  constructor() {
    this.goodsGroupTreeData('1');
  }

  /**
   * Get Goods Group Tree Data
   */
  @Cache()
  goodsGroupTreeData(level: string) {
    this.goodsGroupStore.updateDialogLoading(true);
    this.#getGoodsGroupTreeUseCase.execute(level).subscribe({
      next: (data: ClTreeNode<GoodsGroupModel>) => {
        this.goodsGroupStore.updateDialogLoading(false);
        this.goodsGroupStore.updateGoodsGroupTree([data]);
      },
      error: () => {
        this.goodsGroupStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Expand Goods Group Children
   * @param goodsGroup
   */
  getGoodsGroupChildren(goodsGroup: ClTreeNode<GoodsGroupModel>) {
    this.#getGoodsGroupChildrenByIdUseCase.execute(goodsGroup).subscribe((data: ClTreeNode<GoodsGroupModel>[]) => {
      const tree = this.goodsGroupStore.state$().goodsGroupTreeData$();
      const node = new TreeService<GoodsGroupModel>(tree[0], goodsGroup.key).node;
      node ? node.children = data : '';

      this.goodsGroupStore.updateGoodsGroupTree(tree);
    });
  }

  generateGoodsGroupCodeByParentId(parentId: string) {
    this.goodsGroupStore.updateDialogLoading(true);
    this.#generateGoodsGroupCodeUseCase.execute(parentId).subscribe( {
      next: (code) => {
        this.goodsGroupStore.updateSubgroupCode(code);
        this.goodsGroupStore.updateDialogLoading(false);
      },
      error: () => {
        this.goodsGroupStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Set Goods Group Edit Mode
   * @param editMode
   */
  toggleEditMode(editMode: boolean) {
    this.goodsGroupStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.goodsGroupStore.updateDialogVisibility(visible);
  }

  updateSelectedGoodsGroup(goodsGroup: ClTreeNode<GoodsGroupModel>) {
    this.goodsGroupStore.updateSelectedGoodsGroup(goodsGroup);
  }

  /**
   * Add Goods Group
   * @param goodsGroup
   */
  @ErrorLogger()
  saveGoodsGroup(goodsGroup: ClTreeNode<GoodsGroupModel>) {
    this.goodsGroupStore.updateDialogLoading(true);
    this.#saveGoodsGroupUseCase.execute(goodsGroup).subscribe({
      next: (data) => {
        const tree = this.goodsGroupStore.state$().goodsGroupTreeData$();
        const parent = new TreeService<GoodsGroupModel>(tree[0], goodsGroup.data?.parentId?.toString()).node;
        parent.children = (parent.children || []).concat(data);

        this.goodsGroupStore.updateDialogLoading(false);
        this.goodsGroupStore.updateDialogVisibility(false);
      },
      error: () => {
        this.goodsGroupStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Update Goods Group
   * @param goodsGroup
   */
  @ErrorLogger()
  updateGoodsGroup(goodsGroup: ClTreeNode<GoodsGroupModel>) {
    this.goodsGroupStore.updateDialogLoading(true);
    this.#updateGoodsGroupUseCase.execute(goodsGroup).subscribe({
      next: (res) => {
        const tree = this.goodsGroupStore.state$().goodsGroupTreeData$();
        const parent = new TreeService<GoodsGroupModel>(tree[0], goodsGroup.data?.parentId?.toString()).node;
        const nodeIndex = parent.children?.findIndex( c => c.data.id == res.data.id);
        if (nodeIndex != undefined && nodeIndex > -1 && parent.children?.length) {
          parent.children.splice(nodeIndex, 1, { ...parent?.children[nodeIndex], label: res.label, data: {...res.data} });
        }

        this.goodsGroupStore.updateDialogLoading(false);
        this.goodsGroupStore.updateDialogVisibility(false);
      },
      error: () => {
        this.goodsGroupStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Delete Goods Group
   * @param goodsGroupId
   * @param goodsGroupParentId
   */
  @ErrorLogger()
  deleteGoodsGroup(goodsGroupId: number, goodsGroupParentId?: number) {
    this.#deleteGoodsGroupUseCase.execute(goodsGroupId).subscribe(() => {
      const tree = this.goodsGroupStore.state$().goodsGroupTreeData$();
      const parent = new TreeService<GoodsGroupModel>(tree[0], goodsGroupParentId?.toString()).node;
      const nodeIndex = parent?.children?.findIndex( c => c.data.id == goodsGroupId);

      if (nodeIndex != undefined && nodeIndex > -1) {
        parent.children?.splice(nodeIndex, 1)
      }

      if (!parent.children?.length) {
        parent.leaf = true;
      }

    });
  }

}
