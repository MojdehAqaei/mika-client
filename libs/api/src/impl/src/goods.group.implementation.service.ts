import { Injectable } from '@angular/core';
import { BaseService } from '../../misc';
import { GoodsGroupDto } from '../../dto';
import { GoodsGroupGateway, GoodsGroupModel } from '@domain/lib/base-data';
import { EMPTY, map, Observable } from 'rxjs';
import { GoodsGroupMapper } from '../../mapper';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class GoodsGroupImplementationService extends BaseService<GoodsGroupDto> implements GoodsGroupGateway {
  readonly #goodsGroupMapper = new GoodsGroupMapper();

  constructor() {
    super();
  }

  /**
   * Get Goods Group
   */
  getGoodsGroupTree(level: string): Observable<ClTreeNode<GoodsGroupModel>> {
    return this.get(`goods-service-categories/load-tree-upto-selected-level/${level}`, {}, true).pipe(
      map(this.#goodsGroupMapper.mapTo)
    ) as Observable<ClTreeNode<GoodsGroupModel>>;
  }

  /**
   * Get Goods Group Children List
   */
  getGoodsGroupChildrenById(parentId: string): Observable<ClTreeNode<GoodsGroupModel>[]> {
    return this.getAll(`goods-service-categories/load-tree-branch/${parentId}`).pipe(
      map(res => res.map(this.#goodsGroupMapper.mapTo))
    ) as Observable<ClTreeNode<GoodsGroupModel>[]>;
  }

  /**
   * Generate Goods Group Code
   * @param parentId
   */
  generateGoodsGroupCode(parentId: string): Observable<string> {
    return this.get(`goods-service-categories/generate-new-code/${parentId}`, null, true) as Observable<string>;
  }

  /**
   * Add Goods Group
   * @param goodsGroup
   */
  create(goodsGroup: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>> {
    return this.post(`goods-service-categories/${EndpointsEnum.create}`, this.#goodsGroupMapper.mapFrom(goodsGroup),  null, true)
      .pipe(map(res => {
        return this.#goodsGroupMapper.mapTo(res as GoodsGroupDto)
      }));
  }

  /**
   * Update Goods Group
   * @param body
   */
  update(body: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>> {
    return this.put(`goods-service-categories/${EndpointsEnum.update}/${body.key}`, this.#goodsGroupMapper.mapFrom(body), null, true)
      .pipe(map(res => {
        return this.#goodsGroupMapper.mapTo(res as GoodsGroupDto)
      }));
  }

  /**
   * Delete Goods Group
   * @param id
   */
  deleteById(id: number): Observable<null> {
    return this.delete(`goods-service-categories/${EndpointsEnum.delete}/${id}`) as unknown as Observable<null>;
  }

  findAll(): Observable<ClTreeNode<GoodsGroupModel>[]> {
    return EMPTY;
  }

  filterAll(filter: ClTreeNode<GoodsGroupModel>): Observable<ClTreeNode<GoodsGroupModel>[]> {
    return EMPTY;
  }

  read(id: number): Observable<ClTreeNode<GoodsGroupModel>> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<ClTreeNode<GoodsGroupModel>[]> {
    return EMPTY;
  }
}
