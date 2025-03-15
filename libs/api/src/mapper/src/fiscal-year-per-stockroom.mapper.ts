import { FiscalYearPerStockroomModel, fiscalYearStatusDataMapper } from '@domain/lib/stockroom';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { FiscalYearPerStockroomDto } from '../../dto';
import { Mapper } from '../../misc';

export class FiscalYearPerStockroomMapper implements Mapper<FiscalYearPerStockroomModel, FiscalYearPerStockroomDto> {
    mapFrom(param: FiscalYearPerStockroomModel): FiscalYearPerStockroomDto {
        return {
            id: param.id,
            fiscalPeriod: {
                id: param.fiscalYearId
            },
            inventory: {
                id: param.stockroomId
            },
            determineDate: param.date,
            determineStatus: param.state
        };
    }

    mapTo(param: FiscalYearPerStockroomDto): FiscalYearPerStockroomModel {
        return {
            id: param.id,
            stockroomId: param.inventory?.id,
            stockroomTitle: param.inventory?.title,
            fiscalYearId: param.fiscalPeriod?.id,
            fiscalYearTitle: param.fiscalPeriod?.title,
            date: param.determineDate,
            datePersian: param.determineDate ? formatDate(param.determineDate, 'YYYY/MM/DD') : '',
            state: param.determineStatus,
            stateString: param.determineStatus && fiscalYearStatusDataMapper.has(param.determineStatus) ? fiscalYearStatusDataMapper.get(param.determineStatus) : '',
            totalElements: param.totalElements
        };
    }
}
