import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { WarehousingStateEnum } from '../enum/warehousing-state.enum';

export const warehousingStateDataMapper = new Map<WarehousingStateEnum, string>([
  [WarehousingStateEnum.INITIAL_SUBMIT, 'ثبت اولیه'],
  [WarehousingStateEnum.COUNTING_STARTED, 'شروع شمارش'],
  [WarehousingStateEnum.FIRST_ROUND, 'شمارش اول'],
  [WarehousingStateEnum.SECOND_ROUND, 'شمارش دوم'],
  [WarehousingStateEnum.END_OF_COUNTING, 'پایان شمارش'],
  [WarehousingStateEnum.MODIFIED_DOCUMENT_ISSUED, 'صدور سند اصلاحی'],
  [WarehousingStateEnum.DOCUMENT_ISSUED, 'صدور سند'],
]);


export const WAREHOUSING_STATE = new InjectionToken<ClSelectItem[]>('warehousing state');

export const warehousingStateOptions: ClSelectItem[] = Object.keys(WarehousingStateEnum)
  .filter(i => warehousingStateDataMapper.has(i as WarehousingStateEnum))
  .map(each => {
    return  {value: each, label: warehousingStateDataMapper.get(each as WarehousingStateEnum)};
  });
