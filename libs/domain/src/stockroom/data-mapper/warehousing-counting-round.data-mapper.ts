import { InjectionToken } from '@angular/core';
import { ClSelectButtonOption } from '@sadad/component-lib/src/models';
import { WarehousingCountingRoundEnum } from '../enum/warehousing-counting-round.enum';

export const warehousingCountingRoundDataMapper = new Map<WarehousingCountingRoundEnum, string>([
  [WarehousingCountingRoundEnum.FIRST, 'شمارش اول'],
  [WarehousingCountingRoundEnum.SECOND, 'شمارش دوم'],
  [WarehousingCountingRoundEnum.FINAL, 'شمارش نهایی'],
]);


export const WAREHOUSING_ROUND = new InjectionToken<ClSelectButtonOption[]>('warehousing round');

export const warehousingCountingRoundOptions: ClSelectButtonOption[] = Object.keys(WarehousingCountingRoundEnum)
  .filter(i => warehousingCountingRoundDataMapper.has(Number(i) as WarehousingCountingRoundEnum))
  .map(each => {
    return  {value: each, content: warehousingCountingRoundDataMapper.get(Number(each) as WarehousingCountingRoundEnum)};
  });
