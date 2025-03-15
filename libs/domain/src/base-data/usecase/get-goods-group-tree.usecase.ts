import { UseCase } from '../../use-case';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';
import { GoodsGroupModel } from '../model/goods.group.model';

export class GetGoodsGroupTreeUseCase implements UseCase<string, ClTreeNode<GoodsGroupModel>> {
  readonly #goodsGroupDataGateway = inject(GoodsGroupGateway);
  execute(level: string): Observable<ClTreeNode<GoodsGroupModel>> {
    return this.#goodsGroupDataGateway.getGoodsGroupTree(level);
  }
}
