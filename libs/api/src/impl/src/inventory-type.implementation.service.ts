import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { InventoryTypeDto } from '../../dto';
import { InventoryTypeGateway, InventoryTypeModel } from '@domain/lib/stockroom';
import { InventoryTypeMapper } from '../../mapper';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class InventoryTypeImplementationService extends BaseService<InventoryTypeDto> implements InventoryTypeGateway {
  readonly #inventoryTypeMapper = new InventoryTypeMapper();

  constructor() {
    super();
  }

  filterAll(filters: InventoryTypeModel): Observable<InventoryTypeModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`inventory-type/${EndpointsEnum.filterAll}`, this.#inventoryTypeMapper.mapFrom(filters), {params: httpParams})
      .pipe(map(res => (res as InventoryTypeDto[])?.map(this.#inventoryTypeMapper.mapTo)));
  }

  read(id: number): Observable<InventoryTypeModel> {
    // return this.get(`inventory-type/${EndpointsEnum.getById}/${id}`, null, true).pipe( // todo: uncomment
    return this.get(`inventory-type/get/${id}`, null, true).pipe(
      map(this.#inventoryTypeMapper.mapTo)
    );
  }

  create(params: InventoryTypeModel): Observable<InventoryTypeModel> {
    return this.post(`inventory-type/${EndpointsEnum.create}`, this.#inventoryTypeMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#inventoryTypeMapper.mapTo(res as InventoryTypeDto)
      }));
  }

  update(params: InventoryTypeModel): Observable<InventoryTypeModel> {
    return this.put(`inventory-type/${EndpointsEnum.update}/${params.id}`, this.#inventoryTypeMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#inventoryTypeMapper.mapTo(res as InventoryTypeDto)
      }));
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`inventory-type/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<InventoryTypeModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<InventoryTypeModel[]> {
    return EMPTY;
  }


}
