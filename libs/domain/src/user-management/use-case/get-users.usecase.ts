import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { UserModel } from '../model/user.model';
import { UserGateway } from '../gateway/user.gateway';
import { inject } from '@angular/core';


export class GetUsersUseCase implements UseCase<UserModel, UserModel[]> {
  readonly #userGateway = inject(UserGateway);
  execute(filters: UserModel): Observable<UserModel[]> {
    return this.#userGateway.filterAll(filters);
  }
}
