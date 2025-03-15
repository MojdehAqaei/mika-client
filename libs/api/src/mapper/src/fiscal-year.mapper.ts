import { FiscalYearModel } from '@domain/lib/stockroom';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { FiscalYearDto } from '../../dto';
import { Mapper } from '../../misc';

export class FiscalYearMapper implements Mapper<FiscalYearModel, FiscalYearDto> {
    mapFrom(param: FiscalYearModel): FiscalYearDto {
        return {
            id: param.id,
            startDate: param.startDate,
            endDate: param.endDate,
            title: param.title,
            description: param.description,
        };
    }

    mapTo(param: FiscalYearDto): FiscalYearModel {
        return {
            id: param.id,
            // @ts-ignore
            startDate: new Date(param.startDate),
            // @ts-ignore
            endDate: new Date(param.endDate),
            startDatePersian: param.startDate ? formatDate(param.startDate, 'YYYY/MM/DD') : '',
            endDatePersian: param.endDate ? formatDate(param.endDate, 'YYYY/MM/DD') : '',
            title: param.title,
            description: param.description,
            totalElements: param.totalElements
        };
    }
}
