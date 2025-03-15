import { BaseService } from '../../misc';
import { FeatureGateway, FeatureModel } from '@domain/lib/base-data';
import { EMPTY, map, Observable } from 'rxjs';
import { FeatureMapper } from '../../mapper';
import { Injectable } from '@angular/core';
import { FeatureDto } from '../../dto';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class FeatureImplementationService extends BaseService<FeatureDto> implements FeatureGateway {
  readonly #goodsFeatureMapper = new FeatureMapper();

  filterAll(filters: FeatureModel): Observable<FeatureModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`properties/${EndpointsEnum.filterAll}`, this.#goodsFeatureMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as FeatureDto[])?.map(this.#goodsFeatureMapper.mapTo))
    ) as Observable<FeatureModel[]>;
  }

  read(id: number): Observable<FeatureModel> {
    // return this.get(`properties/${EndpointsEnum.getById}/${id}`, null, true).pipe( // todo: uncomment
    return this.get(`properties/get/${id}`, null, true).pipe(
      map(this.#goodsFeatureMapper.mapTo));
  }

  create(params: FeatureModel): Observable<FeatureModel> {
    return this.post(`properties/${EndpointsEnum.create}`, this.#goodsFeatureMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#goodsFeatureMapper.mapTo(res as FeatureDto)
      }));
  }

  update(params: FeatureModel): Observable<FeatureModel> {
    return this.put(`properties/${EndpointsEnum.update}/${params.id}`, this.#goodsFeatureMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#goodsFeatureMapper.mapTo(res as FeatureDto)
      }));
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`properties/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<FeatureModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<FeatureModel[]> {
    return EMPTY;
  }

}
