import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { PersonCompanyGateway } from '../gateway/person-company.gateway';

export class DeletePersonCompanyUseCase implements UseCase<number, null> {
  readonly #personCompanyGateway = inject(PersonCompanyGateway);

  execute(id: number): Observable<null> {
    return this.#personCompanyGateway.deleteById(id);
  }
}
