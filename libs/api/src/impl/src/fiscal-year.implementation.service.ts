import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FiscalYearGateway, FiscalYearModel } from '@domain/lib/stockroom'
import { BaseService } from '../../misc';
import { FiscalYearMapper } from '../../mapper';
import { FiscalYearDto } from '../../dto';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearImplementationService extends BaseService<FiscalYearDto> implements FiscalYearGateway {
  readonly #fiscalYearMapper = new FiscalYearMapper();

  constructor() {
    super();
  }

  findAll(): Observable<FiscalYearModel[]> {
    return this.getAll(`fiscal-periods/${EndpointsEnum.findAll}`).pipe(
     map(res => res.map(each => this.#fiscalYearMapper.mapTo(each)))
    );
  }

  filterAll(filters: FiscalYearModel): Observable<FiscalYearModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`fiscal-periods/${EndpointsEnum.filterAll}`, this.#fiscalYearMapper.mapFrom(filters), {params: httpParams})
      .pipe(map(res => (res as FiscalYearDto[])?.map(this.#fiscalYearMapper.mapTo)));
  }

  read(id: number): Observable<FiscalYearModel> {
    return this.get(`fiscal-periods/${EndpointsEnum.getById}/${id}`, null, true).pipe(
      map(this.#fiscalYearMapper.mapTo)
    );
  }

  create(params: FiscalYearModel): Observable<FiscalYearModel> {
    return this.post(`fiscal-periods/${EndpointsEnum.create}`, this.#fiscalYearMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#fiscalYearMapper.mapTo(res as FiscalYearDto)
      }));
  }

  update(params: FiscalYearModel): Observable<FiscalYearModel> {
    return this.put(`fiscal-periods/${EndpointsEnum.update}/${params.id}`, this.#fiscalYearMapper.mapFrom(params), null, true)
      .pipe(map( res => {
        return this.#fiscalYearMapper.mapTo(res as FiscalYearDto)
      }));
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`fiscal-periods/${EndpointsEnum.delete}/${id}`);
  }

  searchByKey(key: string): Observable<FiscalYearModel[]> {
    const param =  new HttpParams().set('filter', key);
    return this.getAll(`fiscal-periods/${EndpointsEnum.findByKeyword}`, {params: param}, true).pipe(
      map(res => res.map(each => this.#fiscalYearMapper.mapTo(each)))
    );
  }

}
