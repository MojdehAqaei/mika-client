import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';
import { GoodsGroupModel } from '../model/goods.group.model';
import { ClTreeNode } from '@sadad/component-lib/src/models';

export class SaveGoodsGroupUseCase implements UseCase<ClTreeNode<GoodsGroupModel>, ClTreeNode<GoodsGroupModel>> {
  readonly #goodsGroupDataGateway = inject(GoodsGroupGateway);
  execute(goodsGroup: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>> {
    // switch (goodsGroup.data.level) {
    //   case 1:
    //     // if (goodsGroup.data?.code?.length > 1) {
    //     //
    //     // }
    //     break;
    //   case 2:
    //     break;
    //   case 3:
    //     break;
    //   case 4:
    //     break;
    // }
    return this.#goodsGroupDataGateway.create(goodsGroup);
  }
}
