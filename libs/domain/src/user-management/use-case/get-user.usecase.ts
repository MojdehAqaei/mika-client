import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { UserModel } from '../model/user.model';
import { UserGateway } from '../gateway/user.gateway';
import { inject } from '@angular/core';


export class GetUserUseCase implements UseCase<number, UserModel> {
  readonly #userGateway = inject(UserGateway);
  execute(id: number): Observable<UserModel> {
    return this.#userGateway.read(id);
  }
}
