import { signal, WritableSignal } from '@angular/core';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { GoodsGroupFeatureModel, GoodsGroupModel } from '@domain/lib/base-data';

export interface GoodsGroupState {
  readonly goodsGroupTreeData$: WritableSignal<ClTreeNode<GoodsGroupModel>[]>;
  readonly selectedGoodsGroup$: WritableSignal<ClTreeNode<GoodsGroupModel>>,
  readonly goodsGroupFeatures$: WritableSignal<GoodsGroupFeatureModel[] | null>;
  readonly goodsSubgroupGeneratedCode$: WritableSignal<string>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly editMode$: WritableSignal<boolean>
}

export const goodsGroupInitialState: GoodsGroupState = {
  goodsGroupTreeData$: signal<ClTreeNode<GoodsGroupModel>[]>([]),
  selectedGoodsGroup$: signal<ClTreeNode<GoodsGroupModel>>({data: {}}),
  goodsGroupFeatures$: signal<GoodsGroupFeatureModel[] | null>(null),
  goodsSubgroupGeneratedCode$: signal<string>(''),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  editMode$: signal<boolean>(false)
} as const
