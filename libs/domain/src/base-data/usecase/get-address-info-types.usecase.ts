import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { PersonCompanyGateway } from '@domain/lib/base-data';
import { inject } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export class GetAddressInfoTypesUseCase implements UseCase<null, ClSelectItem[]> {
  readonly #personCompanyGateway = inject(PersonCompanyGateway);

  execute(): Observable<ClSelectItem[]> {
    return this.#personCompanyGateway.getAddressInfoTypes();
  }
}
