import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { UserGateway } from '../gateway/user.gateway';
import { UserModel } from '../model/user.model';
import { inject } from '@angular/core';

export class UpdateUserUseCase implements UseCase<UserModel, UserModel> {
  readonly #userGateway = inject(UserGateway);
  execute(params: UserModel): Observable<UserModel> {
    return this.#userGateway.update(params);
  }
}
