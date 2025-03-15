import { UseCase } from '../../use-case';
import { GoodsGroupModel } from '../model/goods.group.model';
import { inject } from '@angular/core';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';
import { Observable } from 'rxjs';
import { ClTreeNode } from '@sadad/component-lib/src/models';

export class UpdateGoodsGroupUseCase implements UseCase<ClTreeNode<GoodsGroupModel>, ClTreeNode<GoodsGroupModel>>{
  readonly #goodsGroupDataGateway = inject(GoodsGroupGateway);
  execute(param: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>> {
    return this.#goodsGroupDataGateway.update(param);
  }
}
