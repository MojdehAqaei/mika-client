import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { BaseDataEnum, CountingUnitGateway, CountingUnitModel } from '@domain/lib/base-data';
import { CountingUnitMapper } from '../../mapper';
import { CountingUnitDto } from '../../dto';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})

export class CountingUnitImplementationService extends BaseService<CountingUnitDto> implements CountingUnitGateway {
  readonly #countingUnitMapper = new CountingUnitMapper();

  constructor() {
    super();
  }

  getCountingUnitTypes(): Observable<ClSelectItem[]> {
    return this.getAll(`base-infos/get-by-parent-code/${BaseDataEnum.MEASUREMENT_TYPE}`, null, true).pipe(
      map(res => res.map(each => {
        return {
          value: {value: {id: each.id}},
          label: each.title
        }
      }))
    );
  }

  findAll(): Observable<CountingUnitModel[]> {
    return this.getAll(`measurements/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#countingUnitMapper.mapTo(each)))
    );
  }

  filterAll(filters: CountingUnitModel): Observable<CountingUnitModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`measurements/${EndpointsEnum.filterAll}`, this.#countingUnitMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as CountingUnitModel[])?.map(this.#countingUnitMapper.mapTo))
    ) as Observable<CountingUnitModel[]>;
  }

  read(id: number): Observable<CountingUnitModel> {
    return this.get(`measurements/${EndpointsEnum.getById}/${id}`, null, true).pipe(
      map(this.#countingUnitMapper.mapTo)
    );
  }

  update(params: CountingUnitModel): Observable<CountingUnitModel> {
    return this.put(`measurements/${EndpointsEnum.update}/${params.id}`, this.#countingUnitMapper.mapFrom(params), { }, true)
      .pipe(map(res => {
        return this.#countingUnitMapper.mapTo(res as CountingUnitDto)
      }));
  }

  create(params: CountingUnitModel): Observable<CountingUnitModel> {
    return this.post(`measurements/${EndpointsEnum.create}`, this.#countingUnitMapper.mapFrom(params), {}, true)
      .pipe(map(res => {
        return this.#countingUnitMapper.mapTo(res as CountingUnitDto)
      }));
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`measurements/${EndpointsEnum.delete}/${id}`);
  }

  searchByKey(key: string): Observable<CountingUnitModel[]> {
    const param =  new HttpParams().set('filter', key);
    return this.getAll(`measurements/${EndpointsEnum.findByKeyword}`, {params: param}, true).pipe(
      map(res => res.map(each => this.#countingUnitMapper.mapTo(each)))
    );
  }

}
