import { Observable } from 'rxjs';
import { CountingUnitModel } from '@domain/lib/base-data';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Gateway } from '../../gateway';

export abstract class CountingUnitGateway extends Gateway<CountingUnitModel>{
  abstract getCountingUnitTypes(): Observable<ClSelectItem[]>;
}
