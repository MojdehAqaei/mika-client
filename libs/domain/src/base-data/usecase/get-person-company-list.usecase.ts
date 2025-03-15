import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonCompanyModel } from '../model/person-company.model';
import { PersonCompanyGateway } from '../gateway/person-company.gateway';

export class GetPersonCompanyListUseCase implements UseCase<PersonCompanyModel, PersonCompanyModel[]> {
  readonly #personCompanyGateway = inject(PersonCompanyGateway);

  execute(filters: PersonCompanyModel): Observable<PersonCompanyModel[]> {
    return this.#personCompanyGateway.filterAll(filters);
  }
}
