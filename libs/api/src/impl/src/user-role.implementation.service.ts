import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { UserContentAccessModel, UserRoleGateway, UserRoleModel } from '@domain/lib/user-management';
import { BaseService } from "../../misc";
import { UserContentAccessDto, UserRoleDto } from '../../dto';
import { UserContentAccessMapper, UserRoleMapper } from '../../mapper';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRoleImplementationService extends BaseService<UserRoleDto & UserContentAccessDto> implements UserRoleGateway {

  readonly #userRoleMapper = new UserRoleMapper();
  readonly #userContentAccessMapper = new UserContentAccessMapper();

  constructor() {
    super();
  }

  filterAll(filters: UserRoleModel): Observable<UserRoleModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`users/roles/filter`, this.#userRoleMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as UserRoleDto[])?.map(this.#userRoleMapper.mapTo))
    );
  }

  create(body: UserRoleModel): Observable<UserRoleModel> {
    return this.post(`users/roles`, this.#userRoleMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#userRoleMapper.mapTo(res as UserRoleDto)
      })
    );
  }

  update(body: UserRoleModel): Observable<UserRoleModel> {
    return this.put(`users/roles`, this.#userRoleMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#userRoleMapper.mapTo(res as UserRoleDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`users/roles/${id}`);
  }

  saveUserRoleContentPermissions(body: UserContentAccessModel): Observable<UserContentAccessModel> {
    return this.post(body.saveUrl || '', this.#userContentAccessMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#userContentAccessMapper.mapTo(res as  UserContentAccessModel)
      })
    );
  }

  getUserRoleContentPermissionsById(body: UserContentAccessModel): Observable<UserContentAccessModel> {
    return this.get(`${body.getByUserRoleIdUrl}/${body.userRoleId}`, null, true).pipe(
      map(this.#userContentAccessMapper.mapTo)
    );
  }

  findAll(): Observable<UserRoleModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<UserRoleModel[]> {
    return EMPTY;
  }

  read(id: number): Observable<UserRoleModel> {
    return EMPTY;
  }

}
