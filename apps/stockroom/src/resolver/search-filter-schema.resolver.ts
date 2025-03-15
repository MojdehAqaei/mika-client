import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClFormControlTypes } from '@sadad/component-lib/src/enums';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';

import { HttpContext, HttpParams } from '@angular/common/http';
import { Validators } from '@angular/forms';
import {
  fiscalYearFilterDataMapper,
  fiscalYearPerStockroomFilterDataMapper,
  inventoryTypeFilterDataMapper,
  stockroomFilterDataMapper,
  receiptFilterDataMapper,
  transferFilterDataMapper,
  transferAndReceiptStateOptions,
  warehousingFilterDataMapper,
  warehousingStateOptions,
  TransferAndReceiptTypeEnum
} from '@domain/lib/stockroom';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ApplicationRoutes, EndpointsEnum } from '@view/lib/data-types';


export const searchFilterSchemaResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClFormControlSchema[] => {
  let filterScheme: ClFormControlSchema[] = [];
  const url = state.url.split('/').reverse()[0];

  const translate = inject(TranslateService);

  switch (url){
    case ApplicationRoutes.stockroomManagement:
      stockroomFilterDataMapper
        .set('code', translate.instant('stockroom.code'))
        .set('title', translate.instant('stockroom.title'))
        .set('organizationId', translate.instant('organization'))
        .set('inventoryTypeId', translate.instant('stockroom.inventory-type.'))
        .set('isActive', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.code'),
          name: 'code',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('stockroom.title'),
          name: 'title',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
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
          order: 4,
          label: translate.instant('stockroom.inventory-type.'),
          name: 'inventoryTypeId',
          controlType: ClFormControlTypes.SELECT,
          optionValue: "id",
          optionLabel: ['title' , '/' , 'code'],
          url: "inventory-type/search/actives",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('search-with-name-or-code'),
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
        },
      ];
      break;
    case ApplicationRoutes.inventoryType:
      inventoryTypeFilterDataMapper
        .set('code', translate.instant('stockroom.inventory-type.code'))
        .set('title', translate.instant('stockroom.inventory-type.title'))
        .set('isActive', translate.instant('stockroom.inventory-type.status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.inventory-type.code'),
          name: 'code',
          controlType: ClFormControlTypes.INPUT_NUMBER,
          maxLength: 2,
          keyFilter: 'num',
          validators: [Validators.minLength(2), Validators.maxLength(2)],
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('stockroom.inventory-type.title'),
          name: 'title',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('stockroom.inventory-type.status'),
          name: 'isActive',
          controlType: ClFormControlTypes.SELECT,
          options: [
            { label: translate.instant('active'), value: true },
            { label: translate.instant('inactive'), value: false }
          ],
          styleClasses: 'col s12 l4'
        },
      ];
      break;
    case ApplicationRoutes.fiscalYear:
      fiscalYearFilterDataMapper.set('title', translate.instant('stockroom.fiscal-year.title'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.fiscal-year.title'),
          name: 'title',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l6'
        }
      ];
      break;
    case ApplicationRoutes.fiscalYearPerStockroom:
      fiscalYearPerStockroomFilterDataMapper
        .set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('stockroomId', translate.instant('stockroom.title'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.fiscal-year.'),
          name: 'fiscalYearId',
          controlType: ClFormControlTypes.SELECT,
          optionValue: "id",
          optionLabel: ['title'],
          url: `fiscal-periods/${EndpointsEnum.findByKeyword}`,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('search'),
          styleClasses: 'col s12 l6'
        },
        {
          order: 2,
          label: translate.instant('stockroom.title'),
          name: 'stockroomId',
          controlType: ClFormControlTypes.SELECT,
          optionValue: "id",
          optionLabel: ['title', 'code'],
          url: "inventories/search/actives",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('search'),
          styleClasses: 'col s12 l6'
        }
      ];
      break;
    case ApplicationRoutes.receipt:
      receiptFilterDataMapper.set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('autoGeneratedCode', translate.instant('stockroom.receipt.code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('stockroomId', translate.instant('stockroom.'))
        .set('state', translate.instant('status'))

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.receipt.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          hasClear: true,
          controlType: ClFormControlTypes.DATEPICKER,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('stockroom.'),
          name: 'stockroomId',
          filterable: true,
          lazyFilter: true,
          url: 'inventories/search/actives',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title', 'code'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('stockroom.document.'),
          name: 'typeId',
          url: `inventory-document-types/find-by-parent/${TransferAndReceiptTypeEnum.RECEIPT}`,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('status'),
          name: 'state',
          options: transferAndReceiptStateOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    case ApplicationRoutes.transfer:
      transferFilterDataMapper.set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('autoGeneratedCode', translate.instant('stockroom.transfer.code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('stockroomId', translate.instant('stockroom.'))
        .set('state', translate.instant('status'))

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.transfer.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          hasClear: true,
          controlType: ClFormControlTypes.DATEPICKER,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('stockroom.'),
          name: 'stockroomId',
          filterable: true,
          lazyFilter: true,
          url: 'inventories/search/actives',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title', 'code'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('stockroom.document.'),
          name: 'typeId',
          url: `inventory-document-types/find-by-parent/${TransferAndReceiptTypeEnum.TRANSFER}`,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('status'),
          name: 'state',
          options: transferAndReceiptStateOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    case ApplicationRoutes.warehousing:
      warehousingFilterDataMapper.set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))

      filterScheme = [
        {
          order: 1,
          label: translate.instant('stockroom.warehousing.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('stockroom.fiscal-year.'),
          name: 'fiscalYearId',
          filterable: true,
          lazyFilter: true,
          url: `fiscal-periods/${EndpointsEnum.findByKeyword}`,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('stockroom.'),
          name: 'stockroomId',
          filterable: true,
          lazyFilter: true,
          url: 'inventories/search/actives',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['title', 'code'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('from-date'),
          name: 'startDate',
          hasClear: true,
          controlType: ClFormControlTypes.DATEPICKER,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('to-date'),
          name: 'endDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('status'),
          name: 'state',
          options: warehousingStateOptions,
          controlType: ClFormControlTypes.SELECT,
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
