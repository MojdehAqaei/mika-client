import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StockroomGateway, StockroomModel } from '@domain/lib/stockroom';
import { BaseService } from '../../misc';
import { StockroomDto } from '../../dto';
import { StockroomMapper } from '../../mapper';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class StockroomImplementationService extends BaseService<StockroomDto> implements StockroomGateway {
  readonly #stockroomMapper = new StockroomMapper();

  constructor() {
    super();
  }

  findAll(): Observable<StockroomModel[]> {
    return this.getAll(`inventories/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#stockroomMapper.mapTo(each)))
    );
  }

  filterAll(filters: StockroomModel): Observable<StockroomModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`inventories/${EndpointsEnum.filterAll}`, this.#stockroomMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as StockroomDto[])?.map(each => this.#stockroomMapper.mapTo(each)))
    );
  }

  read(id: number): Observable<StockroomModel> {
    // return this.get(`inventories/${EndpointsEnum.getById}/${id}`).pipe( // todo: uncomment
    return this.get(`inventories/get/${id}`).pipe(
      map(this.#stockroomMapper.mapTo)
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`inventories/${EndpointsEnum.delete}/${id}`);
  }

  create(params: StockroomModel): Observable<StockroomModel> {
    return this.post(`inventories/${EndpointsEnum.create}`, this.#stockroomMapper.mapFrom(params), null, true).pipe(
      map(res => {
        return this.#stockroomMapper.mapTo(res as StockroomDto)
      })
    );
  }

  update(params: StockroomModel): Observable<StockroomModel> {
    return this.put(`inventories/${EndpointsEnum.update}/${params.id}`, this.#stockroomMapper.mapFrom(params), null, true).pipe(
      map(res => {
        return this.#stockroomMapper.mapTo(res as StockroomDto)
      })
    );
  }

  searchByKey(key: string): Observable<StockroomModel[]> {
    const params =  new HttpParams().set('filter', key);
    return this.getAll(`inventories/${EndpointsEnum.findByKeyword}`, {params}, true).pipe(
      map(res => res.map(each => this.#stockroomMapper.mapTo(each)))
    );
  }

  filterByFiscalPeriod(param: {fiscalPeriodId: number, filter: string}): Observable<StockroomModel[]> {
    const params =  new HttpParams().set('filter', param.filter);
    return this.getAll(`inventories/accessible-active-in-fiscalPeriod/${param.fiscalPeriodId}`, {params}).pipe(
      map(res => res?.map(each => this.#stockroomMapper.mapTo(each)))
    );
  }

}
