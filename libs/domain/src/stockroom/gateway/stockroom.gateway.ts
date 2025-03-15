import { StockroomModel } from '../model/stockroom.model';
import { Gateway } from '../../gateway';
import { Observable } from 'rxjs';

export abstract class StockroomGateway extends Gateway<StockroomModel>{
  abstract filterByFiscalPeriod(param: {fiscalPeriodId: number, filter: string}): Observable<StockroomModel[]>;
}
