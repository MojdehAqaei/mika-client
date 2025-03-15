import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { UserContentAccessGateway, UserContentAccessModel } from '@domain/lib/user-management';
import { BaseService } from "../../misc";
import { UserContentAccessDto } from '../../dto';
import { UserContentAccessMapper } from '../../mapper';

@Injectable({
  providedIn: 'root'
})
export class UserContentAccessImplementationService extends BaseService<UserContentAccessDto> implements UserContentAccessGateway {

  readonly #userContentAccessMapper = new UserContentAccessMapper();

  constructor() {
    super();
  }

  read(id: number): Observable<UserContentAccessModel> {
    return this.get(`category-accesses/get/user-role/${id}`).pipe(
      map(res => {
        return this.#userContentAccessMapper.mapTo(res as UserContentAccessDto)
      })
    );
  }

  create(body: UserContentAccessModel): Observable<UserContentAccessModel> {
    return this.post(`category-accesses/define`, body).pipe(
      map(res => {
        return this.#userContentAccessMapper.mapTo(res as UserContentAccessDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`category-accesses/delete/user-role/${id}`);
  }

  filterAll(filter: UserContentAccessModel): Observable<UserContentAccessModel[]> {
    return EMPTY;
  }

  update(t: UserContentAccessModel): Observable<UserContentAccessModel> {
    return EMPTY;
  }

  findAll(): Observable<UserContentAccessModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<UserContentAccessModel[]> {
    return EMPTY;
  }

}
