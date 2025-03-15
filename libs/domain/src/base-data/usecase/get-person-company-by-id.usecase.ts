import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonCompanyModel } from '../model/person-company.model';
import { PersonCompanyGateway } from '../gateway/person-company.gateway';

export class GetPersonCompanyByIdUseCase implements UseCase<number, PersonCompanyModel> {
  readonly #personCompanyGateway = inject(PersonCompanyGateway);

  execute(id: number): Observable<PersonCompanyModel> {
    return this.#personCompanyGateway.read(id);
  }
}
