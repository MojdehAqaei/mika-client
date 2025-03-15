import { FiscalYearStatusEnum } from '../enum/fiscal-year-status.enum';
import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export const fiscalYearStatusDataMapper = new Map<FiscalYearStatusEnum, string>([
  [FiscalYearStatusEnum.ACTIVE, 'فعال'],
  [FiscalYearStatusEnum.COUNTING, 'در حال انبارگردانی'],
  [FiscalYearStatusEnum.INACTIVITY, 'عدم فعالیت'],
  [FiscalYearStatusEnum.FINANCIAL_PERIOD_END, 'پایان دوره مالی'],
  [FiscalYearStatusEnum.INVENTORY_PERIOD_END, 'پایان دوره انبار'],
]);


export const FISCAL_YEAR_STATUS = new InjectionToken<ClSelectItem[]>('fiscal year status');

export const fiscalYearStatusOptions: ClSelectItem[] = Object.keys(FiscalYearStatusEnum)
  .map(each => {
    return  {value: each, label: fiscalYearStatusDataMapper.get(each as FiscalYearStatusEnum)};
  });
