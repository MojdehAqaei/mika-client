import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { UserDto, UserRoleDto } from '../../dto';
import { UserMapper, UserRoleMapper } from '../../mapper';
import { BaseService } from "../../misc";
import { UserGateway, UserModel, UserRoleModel } from '@domain/lib/user-management';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserImplementationService extends BaseService<UserDto> implements UserGateway {

  readonly #userMapper = new UserMapper();
  readonly #userRoleMapper = new UserRoleMapper();

  constructor() {
    super();
  }

  read(id: number): Observable<UserModel> {
    return this.get(`users/${id}`).pipe(
      map(this.#userMapper.mapTo));
  }

  changeUserSelectedRole(id: number): Observable<UserRoleModel> {
    return this.put(`users/logged-in/change-login-role`, {id}).pipe(
      map(res => {
        return this.#userRoleMapper.mapTo(res as UserRoleDto)
      })
    );
  }

  logout(): Observable<any> {
    return this.get(`logout`);
  }

  deleteById(id?: number): Observable<null> {
    return this.delete(`users/${id}`);
  }

  filterAll(filters: UserModel): Observable<UserModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`users/filter`, this.#userMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as UserDto[])?.map(this.#userMapper.mapTo))
    );
  }

  create(params: UserModel): Observable<UserModel> {
    return this.post(`users`, this.#userMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#userMapper.mapTo(res as UserDto)
      }));
  }

  update(params: UserModel): Observable<UserModel> {
    return this.put(`users`, this.#userMapper.mapFrom(params), null, true)
      .pipe(map(res => {
        return this.#userMapper.mapTo(res as UserDto)
      }));
  }

  findAll(): Observable<UserModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<UserModel[]> {
    return EMPTY;
  }

  refreshToken(): Observable<any> {
    return this.post(`protected/user/change-token`, {});
  }
}
