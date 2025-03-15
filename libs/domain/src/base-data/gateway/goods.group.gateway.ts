import { Observable } from 'rxjs';
import { GoodsGroupModel } from '@domain/lib/base-data';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { Gateway } from '../../gateway';

export abstract class GoodsGroupGateway extends Gateway<ClTreeNode<GoodsGroupModel>>{
  abstract getGoodsGroupTree(level: string): Observable<ClTreeNode<GoodsGroupModel>>;
  abstract getGoodsGroupChildrenById(parentId: string): Observable<ClTreeNode<GoodsGroupModel>[]>;
  abstract generateGoodsGroupCode(parentId: string): Observable<string>;
}
