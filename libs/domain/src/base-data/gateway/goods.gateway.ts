import { Observable } from 'rxjs';
import { GoodsModel } from '../model/goods.model';
import { Gateway } from '../../gateway';

export abstract class GoodsGateway extends Gateway<GoodsModel>{
}
