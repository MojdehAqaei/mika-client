export enum GoodsSerialTypeEnum {
  INFORMATICS_SERIES = 'INFORMATICS_SERIES',
  SEALS_SERIES = 'SEALS_SERIES',
  PRESS_NUMBER = 'PRESS_NUMBER',
  PRESS_ZERO_SERIES = 'PRESS_ZERO_SERIES',
  NO_SERIAL_NUMBER = 'NO_SERIAL_NUMBER',
}


export type GoodsSerialType = keyof typeof GoodsSerialTypeEnum;


