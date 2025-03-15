import { NEVER, Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { UserModel } from '../model/user.model';
import { UserGateway } from '../gateway/user.gateway';
import { inject } from '@angular/core';

export class SaveUserUseCse implements UseCase<UserModel, UserModel> {
  readonly #userGateway = inject(UserGateway);
  execute(params: UserModel): Observable<UserModel> {
    if (String(params.nationalNumber).length != 10) {
      return NEVER;
    }
    return this.#userGateway.create(params);
  }
}
