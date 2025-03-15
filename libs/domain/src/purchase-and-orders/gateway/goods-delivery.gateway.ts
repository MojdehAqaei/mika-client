import { GoodsDeliveryModel } from '../model/goods-delivery.model';
import { Gateway } from '../../gateway';
import { Observable } from 'rxjs';
import { AttachmentModel } from '@domain/lib/document-management';

export abstract class GoodsDeliveryGateway extends Gateway<GoodsDeliveryModel>{
  abstract updateDeliveryState(params: GoodsDeliveryModel): Observable<GoodsDeliveryModel>;
  abstract exportExcel(filters: GoodsDeliveryModel): Observable<AttachmentModel>;
  abstract exportSerialNumbersExcel(filters: GoodsDeliveryModel): Observable<AttachmentModel>;
}
