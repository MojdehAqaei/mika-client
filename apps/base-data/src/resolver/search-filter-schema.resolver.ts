import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationRoutes } from '@view/lib/data-types';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import {
  BaseDataEnum,
  FeatureTypeEnum,
  featureFilterDataMapper,
  countingUnitFilterDataMapper,
  goodsFilterDataMapper,
  personCompanyFilterDataMapper
} from '@domain/lib/base-data';
import { HttpContext, HttpParams } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';

export const SearchFilterSchemaResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClFormControlSchema[] => {
  let filterScheme: ClFormControlSchema[] = [];
  const url = state.url.split('/').reverse()[0];

  const translate = inject(TranslateService);

  switch (url) {
    case ApplicationRoutes.goodsAndServicesFeatures:
      featureFilterDataMapper
        .set('id', translate.instant('base-data.feature-code'))
        .set('label', translate.instant('base-data.title'))
        .set('type', translate.instant('base-data.type'))
        .set('isActive', translate.instant('status'));

      filterScheme = [{
        order: 1,
        inputTextType: 'text',
        name: 'id',
        label: translate.instant('base-data.feature-code'),
        controlType: 'INPUT_TEXT',
        styleClasses: 'col s12 l6'
      }, {
        order: 2,
        inputTextType: 'text',
        name: 'label',
        label: translate.instant('base-data.title'),
        controlType: 'INPUT_TEXT',
        styleClasses: 'col s12 l6'
      }, {
        order: 3,
        name: 'type',
        label: translate.instant('base-data.type'),
        controlType: 'SELECT',
        options: [
          { label: translate.instant('list'), value: FeatureTypeEnum.LIST },
          { label: translate.instant('number'), value: FeatureTypeEnum.NUMBER }
        ],
        styleClasses: 'col s12 l6'
      }, {
        order: 4,
        name: 'isActive',
        label: translate.instant('status'),
        controlType: 'SELECT',
        options: [
          { label: translate.instant('active'), value: true },
          { label: translate.instant('inactive'), value: false }
        ],
        styleClasses: 'col s12 l6'
      }];
      break;
    case ApplicationRoutes.unitOfMeasure:
      countingUnitFilterDataMapper
        .set('title', translate.instant('base-data.counting-unit.title'))
        .set('countingUnitTypeId', translate.instant('base-data.counting-unit.type'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          inputTextType: 'text',
          name: 'title',
          label: translate.instant('base-data.counting-unit.title'),
          controlType: 'INPUT_TEXT',
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          name: 'countingUnitTypeId',
          label: translate.instant('base-data.counting-unit.type'),
          controlType: 'SELECT',
          keyFilter: 'pint',
          url: `base-infos/get-by-parent-code/${BaseDataEnum.MEASUREMENT_TYPE}`,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          optionLabel: ['title'],
          optionValue: 'id',
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          name: 'isActive',
          label: translate.instant('status'),
          controlType: 'SELECT',
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l4'
        }];
      break;
    case ApplicationRoutes.goodsAndServices:
      goodsFilterDataMapper
        .set('code', translate.instant('base-data.goods.code'))
        .set('label', translate.instant('base-data.title'))
        .set('goodsGroupId', translate.instant('base-data.goods-group'))
        .set('accessTypeId', translate.instant('base-data.goods.access-type'))
        .set('isActive', translate.instant('status'));


      filterScheme = [
        {
          order: 1,
          inputTextType: 'text',
          name: 'code',
          label: translate.instant('base-data.goods.code'),
          controlType: 'INPUT_TEXT',
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          inputTextType: 'text',
          name: 'label',
          label: translate.instant('base-data.title'),
          controlType: 'INPUT_TEXT',
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          name: 'goodsGroupId',
          label: translate.instant('base-data.goods-group'),
          controlType: 'SELECT',
          lazyFilter: true,
          filterable: true,
          url: 'goods-service-categories/search/active-leaves',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title', 'code'],
          optionValue: 'id',
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          name: 'accessTypeId',
          label: translate.instant('base-data.goods.access-type'),
          url: 'goods-service-acc-types/get-all',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          controlType: 'SELECT',
          optionLabel: ['title'],
          optionValue: 'id',
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          name: 'isActive',
          label: translate.instant('status'),
          controlType: 'SELECT',
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    case ApplicationRoutes.personAndCompany:
      personCompanyFilterDataMapper
        .set('name', translate.instant('base-data.person-company.name'))
        .set('nationalNumber', translate.instant('base-data.person-company.national-number'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          inputTextType: 'text',
          name: 'name',
          label: translate.instant('base-data.person-company.name'),
          controlType: 'INPUT_TEXT',
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          inputTextType: 'text',
          name: 'nationalNumber',
          label: translate.instant('base-data.person-company.national-number'),
          controlType: 'INPUT_TEXT',
          maxLength: 10,
          keyFilter: 'num',
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          name: 'isActive',
          label: translate.instant('status'),
          controlType: 'SELECT',
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
