import { UseCase } from '../../use-case';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { inject } from '@angular/core';
import { NEVER, Observable } from 'rxjs';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';
import { GoodsGroupModel } from '../model/goods.group.model';

export class GetGoodsGroupChildrenByIdUseCase implements UseCase<ClTreeNode<GoodsGroupModel>, ClTreeNode<GoodsGroupModel>[]> {
  readonly #goodsGroupGateway = inject(GoodsGroupGateway);
  execute(node: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>[]> {
    if (node.leaf || node.children?.length) {
      return NEVER;
    }
    return this.#goodsGroupGateway.getGoodsGroupChildrenById(node.key || '');
  }
}
