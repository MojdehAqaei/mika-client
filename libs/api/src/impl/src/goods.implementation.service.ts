import { Injectable } from '@angular/core';
import { BaseService } from '../../misc';
import { GoodsDto, GoodsGroupDto } from '../../dto';
import { GoodsGateway, GoodsModel } from '@domain/lib/base-data';
import { GoodsMapper } from '../../mapper';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class GoodsImplementationService extends BaseService<GoodsGroupDto> implements GoodsGateway {
  readonly #goodsMapper = new GoodsMapper();

  /**
   * Get Goods
   * @param filters
   */
  filterAll(filters: GoodsModel): Observable<GoodsModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`goods-services/${EndpointsEnum.filterAll}`, this.#goodsMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as GoodsDto[])?.map(this.#goodsMapper.mapTo))
    ) as Observable<GoodsModel[]>;
  }


  /**
   * Get Goods By Id
   * @param id
   */
  read(id: number): Observable<GoodsModel> {
    return this.get(`goods-services/${EndpointsEnum.getById}/${id}`, null, true)
      .pipe(map(this.#goodsMapper.mapTo));
  }


  /**
   * Get Active Goods By Search Key
   * @param key
   */
  searchByKey(key: string): Observable<GoodsModel[]> {
    const param =  new HttpParams().set('filter', key);
    return this.getAll(`goods-services/${EndpointsEnum.findByKeyword}`, {params: param}, true).pipe(
      map(res => res.map(each => this.#goodsMapper.mapTo(each)))
    );
  }


  /**
   * Save New Goods
   * @param body
   */
  create(body: GoodsModel): Observable<GoodsModel> {
    return this.post(`goods-services/${EndpointsEnum.create}`, this.#goodsMapper.mapFrom(body), null, true)
      .pipe(map(res => {
        return this.#goodsMapper.mapTo(res as GoodsDto)
      }));
  }

  /**
   * Update Goods
   * @param body
   */
  update(body: GoodsModel): Observable<GoodsModel> {
    return this.put(`goods-services/${EndpointsEnum.update}/${body.id}`, this.#goodsMapper.mapFrom(body), null, true)
      .pipe(map(res => {
        return this.#goodsMapper.mapTo(res as GoodsDto)
      }));
  }

  /**
   * Delete Goods
   * @param id
   */
  deleteById(id?: number): Observable<null> {
    return this.delete(`goods-services/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<GoodsModel[]> {
    return this.getAll(`goods-services/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#goodsMapper.mapTo(each)))
    );
  }
}
