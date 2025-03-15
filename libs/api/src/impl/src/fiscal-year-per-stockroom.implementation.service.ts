import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FiscalYearPerStockroomGateway, FiscalYearPerStockroomModel } from '@domain/lib/stockroom';
import { BaseService } from '../../misc';
import { FiscalYearPerStockroomMapper } from '../../mapper';
import { FiscalYearPerStockroomDto } from '../../dto';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearPerStockroomImplementationService extends BaseService<FiscalYearPerStockroomDto> implements FiscalYearPerStockroomGateway {
  readonly #fiscalYearPerStockroomMapper = new FiscalYearPerStockroomMapper();

  constructor() {
    super();
  }

  findAll(): Observable<FiscalYearPerStockroomModel[]> {
    return this.getAll(`fiscal-period-status/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#fiscalYearPerStockroomMapper.mapTo(each)))
    );
  }

  filterAll(filters: FiscalYearPerStockroomModel): Observable<FiscalYearPerStockroomModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`fiscal-period-status/${EndpointsEnum.filterAll}`, this.#fiscalYearPerStockroomMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as FiscalYearPerStockroomDto[])?.map(each => this.#fiscalYearPerStockroomMapper.mapTo(each)))
    );
  }

  read(id: number): Observable<FiscalYearPerStockroomModel> {
    // return this.get(`fiscal-period-status/${EndpointsEnum.getById}/${id}`).pipe( // todo: uncomment
    return this.get(`fiscal-period-status/get/${id}`).pipe(
      map(this.#fiscalYearPerStockroomMapper.mapTo)
    );
  }

  create(params: FiscalYearPerStockroomModel): Observable<FiscalYearPerStockroomModel> {
    return this.post(`fiscal-period-status/${EndpointsEnum.create}`, this.#fiscalYearPerStockroomMapper.mapFrom(params), null, true).pipe(
      map(res => {
        return this.#fiscalYearPerStockroomMapper.mapTo(res as FiscalYearPerStockroomDto)
      })
    );
  }

  update(params: FiscalYearPerStockroomModel): Observable<FiscalYearPerStockroomModel> {
    return this.put(`fiscal-period-status/${EndpointsEnum.update}/${params.id}`, this.#fiscalYearPerStockroomMapper.mapFrom(params)).pipe(
      map(res => {
        return this.#fiscalYearPerStockroomMapper.mapTo(res as FiscalYearPerStockroomDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`fiscal-period-status/${EndpointsEnum.delete}/${id}`);
  }

  searchByKey(key: string): Observable<FiscalYearPerStockroomModel[]> {
    const param =  new HttpParams().set('filter', key);
    return this.getAll(`fiscal-period-status/${EndpointsEnum.findByKeyword}`, {params: param}, true).pipe(
      map(res => res.map(each => this.#fiscalYearPerStockroomMapper.mapTo(each)))
    );
  }

}
