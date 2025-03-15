import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { GoodsSerialType, GoodsSerialTypeEnum } from '../enum/goods-serial-type.enum';

export const SerialTypeDataMapper = new Map<GoodsSerialType, string>()
  .set('INFORMATICS_SERIES', 'سریال انفورماتیک')
  .set('SEALS_SERIES', 'سریال مهرها')
  .set('PRESS_NUMBER', 'شماره مطبوعات')
  .set('PRESS_ZERO_SERIES', 'سری صفر مطبوعات')
  .set('NO_SERIAL_NUMBER', 'بدون شماره/سریال');


export const SERIAL_TYPE = new InjectionToken<ClSelectItem[]>('Serial Type');

export const serialTypeOptions: ClSelectItem[] = Object.keys(GoodsSerialTypeEnum)
  .map(each => {
    return  {value: each, label: SerialTypeDataMapper.get(each as GoodsSerialTypeEnum)};
  });
