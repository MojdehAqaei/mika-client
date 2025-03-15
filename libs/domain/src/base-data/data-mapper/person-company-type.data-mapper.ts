import { PersonTypeEnum } from '../enum/person-type.enum';

export const personCompanyTypeDataMapper = new Map<PersonTypeEnum, string>([
  [PersonTypeEnum.NATURAL_PERSON, 'شخص حقیقی'],
  [PersonTypeEnum.LEGAL_PERSON, 'شرکت'],
]);
