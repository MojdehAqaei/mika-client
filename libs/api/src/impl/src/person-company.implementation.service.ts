import { BaseService } from '../../misc';
import {
  PersonCompanyModel,
  PersonCompanyGateway,
  BaseDataEnum,
  BankAccountInfoModel,
  AddressModel,
  ContactInfoModel
} from '@domain/lib/base-data';
import { EMPTY, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersonCompanyDto } from '../../dto';
import { PersonCompanyMapper } from '../../mapper';
import { HttpParams } from '@angular/common/http';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { EndpointsEnum } from '@view/lib/data-types';

@Injectable({
  providedIn: 'root'
})
export class PersonCompanyImplementationService extends BaseService<PersonCompanyDto> implements PersonCompanyGateway {
  readonly #personCompanyMapper = new PersonCompanyMapper();

  filterAll(searchParams: PersonCompanyModel): Observable<PersonCompanyModel[]> {
    const httpParams = new HttpParams().set('page', searchParams.pageNumber || 0).set('size', searchParams.pageSize || 10);
    return this.post(`prs-corps/${EndpointsEnum.filterAll}`, this.#personCompanyMapper.mapFrom(searchParams), {params: httpParams})
      .pipe(map(res => (res as PersonCompanyDto[])?.map(this.#personCompanyMapper.mapTo)));
  }

  getOwnershipTypes(): Observable<ClSelectItem[]> {
    return this.getAll(`base-infos/get-by-parent-code/${BaseDataEnum.OWNERSHIP_TYPE}`, null, true).pipe(
      map(res => res.map(each => {
        return {
          value: {id: each.id},
          label: each.title
        }
      }))
    );
  }

  getContactInfoTypes(): Observable<ClSelectItem[]> {
    return this.getAll(`base-infos/get-by-parent-code/${BaseDataEnum.PHONE_NUMBER_TYPE}`, null, true).pipe(
      map(res => res.map(each => {
        return {
          value: {id: each.id, title: each.title} as ContactInfoModel,
          label: each.title
        }
      }))
    );
  }

  getAddressInfoTypes(): Observable<ClSelectItem[]> {
    return this.getAll(`base-infos/get-by-parent-code/${BaseDataEnum.ADDRESS_TYPE}`, null, true).pipe(
      map(res => res.map(each => {
        return {
          value: {id: each.id, title: each.title} as AddressModel,
          label: each.title
        }
      }))
    );
  }


  getBanks(): Observable<ClSelectItem[]> {
    return this.getAll(`base-infos/get-by-parent-code/${BaseDataEnum.BANK_NAME}`, null, true).pipe(
      map(res => res.map(each => {
        return {
          value: {id: each.id, title: each.title} as BankAccountInfoModel,
          label: each.title
        }
      }))
    );
  }

  read(id: number): Observable<PersonCompanyModel> {
    // return this.get(`prs-corps/${EndpointsEnum.getById}/${id}`, null, true).pipe( // todo: uncomment
    return this.get(`prs-corps/get/${id}`, null, true).pipe(
      map(this.#personCompanyMapper.mapTo)
    );
  }

  create(params: PersonCompanyModel): Observable<PersonCompanyModel> {
    return this.post(`prs-corps/${EndpointsEnum.create}`, this.#personCompanyMapper.mapFrom(params), null, true).pipe(
      map(res => {
        return this.#personCompanyMapper.mapTo(res as PersonCompanyDto)
      })
    );
  }

  update(params: PersonCompanyModel): Observable<PersonCompanyModel> {
    return this.put(`prs-corps/${EndpointsEnum.update}/${params.id}`, this.#personCompanyMapper.mapFrom(params), null, true).pipe(
      map(res => {
        return this.#personCompanyMapper.mapTo(res as PersonCompanyDto)
      })
    );
  }

  deleteById(id?: number): Observable<null> {
    return this.delete(`prs-corps/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<PersonCompanyModel[]> {
    return EMPTY;
  }

  searchByKey(key: string): Observable<PersonCompanyModel[]> {
    return EMPTY;
  }

}
