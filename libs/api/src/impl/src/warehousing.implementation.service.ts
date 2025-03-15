import { Injectable } from '@angular/core';
import { map, NEVER, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { WarehousingMapper } from '../../mapper';
import { WarehousingDto } from '../../dto';
import { WarehousingModel, WarehousingGateway } from '@domain/lib/stockroom';
import { EndpointsEnum } from '@view/lib/data-types';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class WarehousingImplementationService extends BaseService<WarehousingDto> implements WarehousingGateway {
  readonly #warehousingMapper = new WarehousingMapper();

  constructor() {
    super();
  }

  filterAll(filters: WarehousingModel): Observable<WarehousingModel[]> {
    const params = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`inventory-count-documents/${EndpointsEnum.filterAll}`, this.#warehousingMapper.mapFrom(filters), {params}).pipe(
      map(res => (res as WarehousingDto[])?.map(this.#warehousingMapper.mapTo))
    ) as Observable<WarehousingModel[]>;
  }

  create(t: WarehousingModel): Observable<WarehousingModel> {
    return this.post(`inventory-count-documents/${EndpointsEnum.create}`, this.#warehousingMapper.mapFrom(t), null, true)
      .pipe(map(res => {
        return this.#warehousingMapper.mapTo(res as WarehousingDto)
    }));
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`inventory-count-documents/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<WarehousingModel[]> {
    return this.getAll(`inventory-count-documents/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#warehousingMapper.mapTo(each)))
    );
  }

  read(id: number): Observable<WarehousingModel> {
    return NEVER;
  }

  searchByKey(key: string): Observable<WarehousingModel[]> {
    return NEVER;
  }

  update(t: WarehousingModel): Observable<WarehousingModel> {
    return this.put(`inventory-count-documents/${EndpointsEnum.update}/${t.id}`, this.#warehousingMapper.mapFrom(t), null, true)
      .pipe(map(res => {
        return this.#warehousingMapper.mapTo(res as WarehousingDto)
    }));
  }


}
