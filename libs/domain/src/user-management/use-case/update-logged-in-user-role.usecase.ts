import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserGateway } from '../gateway/user.gateway';
import { UserRoleModel } from '../model/user-role.model';

export class UpdateLoggedInUserRoleUseCase implements UseCase<number, UserRoleModel | null> {
  readonly #userGateway = inject(UserGateway);

  execute(id: number): Observable<(UserRoleModel | null)[]> {
    /*return new Observable((observer) => {
      this.#userGateway.changeUserSelectedRole(id).pipe(
        tap(res => {
          observer.next(res);
        }),
        switchMap(() => this.#userGateway.refreshToken())
      )
    });*/

    const services = [
      this.#userGateway.changeUserSelectedRole(id),
      this.#userGateway.refreshToken()
    ];

    return forkJoin(services);
  }
}
