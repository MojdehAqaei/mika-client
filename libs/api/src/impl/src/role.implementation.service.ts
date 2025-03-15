import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGateway, RoleModel } from '@domain/lib/user-management';
import { EMPTY, map, Observable } from 'rxjs';
import { RoleDetailDto, RoleDto } from '../../dto';
import { RoleDetailMapper, RoleMapper, RoleMapper2 } from '../../mapper';
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})
export class RoleImplementationService extends BaseService<RoleDto & RoleDetailDto> implements RoleGateway {

  readonly #roleDetailMapper = new RoleDetailMapper();
  readonly #roleMapper = new RoleMapper();
  readonly #roleMapper2 = new RoleMapper2();

  constructor() {
    super();
  }

  read(id: number): Observable<RoleModel> {
    return this.get(`roles/and/permissions/${id}`).pipe(
      map(this.#roleMapper2.mapTo));
  }

  filterAll(filters: RoleModel): Observable<RoleModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`roles/and/permissions/filter`, this.#roleDetailMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as RoleDto[])?.map(this.#roleMapper2.mapTo))
    );
  }

  getUserRolesByNationalNumber(nationalNumber?: string): Observable<RoleModel[]> {
    return this.getAll(`roles/assigned-to-user/${nationalNumber}`).pipe(
      map(res => res.map(each => this.#roleDetailMapper.mapTo(each)))
    );
  }

  create(body: RoleModel): Observable<RoleModel> {
    return this.post(`roles/and/permissions`, this.#roleMapper2.mapFrom(body), null, true)
      .pipe(map(res => {
        return this.#roleMapper2.mapTo(res as RoleDto)
      }));
  }

  update(body: RoleModel): Observable<RoleModel> {
    return this.put(`roles/and/permissions`, this.#roleMapper2.mapFrom(body), null, true)
      .pipe(map(res => {
        return this.#roleMapper2.mapTo(res as RoleDto)
      }));
  }

  deleteById(id?: number): Observable<null> {
    return this.delete(`roles/${id}`);
  }

  findAll(): Observable<RoleModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<RoleModel[]> {
    return EMPTY;
  }

}
