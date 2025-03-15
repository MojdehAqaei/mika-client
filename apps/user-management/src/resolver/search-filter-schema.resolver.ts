import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ApplicationRoutes } from '@view/lib/data-types';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { ClFormControlTypes } from '@sadad/component-lib/src/enums';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpContext, HttpParams } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import {
  rolesFilterDataMapper,
  userRolesFilterDataMapper,
  usersFilterDataMapper
} from '@domain/lib/user-management';


export const searchFilterSchemaResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClFormControlSchema[] => {
  let filterScheme: ClFormControlSchema[] = [];
  const url = state.url.split('/').reverse()[0]?.split('?')[0];


  const translate = inject(TranslateService);

  switch (url){
    case ApplicationRoutes.users:
      usersFilterDataMapper
        .set('name', translate.instant('name'))
        .set('lName', translate.instant('last-name'))
        .set('nationalNumber', translate.instant('user-management.national-number'))
        .set('employeeNumber', translate.instant('user-management.employee-number'))
        .set('organizationId', translate.instant('organization'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('name'),
          name: 'name',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('last-name'),
          name: 'lName',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('user-management.national-number'),
          name: 'nationalNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          maxLength: 10,
          keyFilter: 'num',
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('user-management.employee-number'),
          name: 'employeeNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('organization'),
          name: 'organizationId',
          controlType: ClFormControlTypes.SELECT,
          optionValue: "id",
          optionLabel: ['typeName' , 'name' , '/' , 'code'],
          url: "organizations/search/actives",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('search-with-name-or-code'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('status'),
          name: 'isActive',
          controlType: ClFormControlTypes.SELECT,
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    case ApplicationRoutes.roles:
      rolesFilterDataMapper
        .set('label', translate.instant('user-management.role.label'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('user-management.role.label'),
          name: 'label',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l6'
        },
        // {
        //   order: 2,
        //   label: translate.instant('date'),
        //   name: 'createDate',
        //   controlType: ClFormControlTypes.DATEPICKER,
        //   hasClear: true,
        //   styleClasses: 'col s12'
        // },
        {
          order: 3,
          label: translate.instant('status'),
          name: 'isActive',
          controlType: ClFormControlTypes.SELECT,
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l6'
        }
      ];
      break;
    case ApplicationRoutes.userContentAccess:
      userRolesFilterDataMapper
        .set('userName', translate.instant('name'))
        .set('userLName', translate.instant('last-name'))
        .set('userNationalNumber', translate.instant('user-management.national-number'))
        .set('roleId', translate.instant('user-management.role.'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('name'),
          name: 'userName',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('last-name'),
          name: 'userLName',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('user-management.national-number'),
          name: 'userNationalNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          maxLength: 10,
          keyFilter: 'num',
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('user-management.role.'),
          name: 'roleId',
          controlType: ClFormControlTypes.SELECT,
          url: "roles",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: false,
          optionLabel: ['title'],
          optionValue: 'id',
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('status'),
          name: 'isActive',
          controlType: ClFormControlTypes.SELECT,
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    default:
      //
      break;
  }

  return filterScheme;
};
