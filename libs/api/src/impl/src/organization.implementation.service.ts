import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { OrganizationGateway, OrganizationModel, OrganizationTypeEnum } from '@domain/lib/organization';
import { OrganizationMapper } from '../../mapper';
import { OrganizationDto } from '../../dto';
import { HttpParams } from '@angular/common/http';
import { ClSelectItem } from '@sadad/component-lib/src/models';

@Injectable({
  providedIn: 'root'
})

export class OrganizationImplementationService extends BaseService<OrganizationDto> implements OrganizationGateway {
  readonly #organizationMapper = new OrganizationMapper();

  constructor() {
    super();
  }

  getActiveOrganizations(search: string, orgTypes?: OrganizationTypeEnum[]): Observable<ClSelectItem[]> {
    const param =  new HttpParams().set('filter', search);
    const typesList = orgTypes?.join(',');
    return this.getAll(`organizations/search/actives/${typesList}/`, {params: param}, true).pipe(
      map(res => res.map(each => {
        return {
          value: {id: each.id},
          label: `${each.typeName} ${each.name}`
        }
      }))
    );
  }

  getOrganizations(search: string): Observable<OrganizationModel[]> {
    const param =  new HttpParams().set('filter', search);
    return this.getAll(`organizations/search/all`, {params: param}).pipe(
      map(res => res.map(each => this.#organizationMapper.mapTo(each)))
    );
  }


}
