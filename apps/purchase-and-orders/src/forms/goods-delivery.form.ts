import { FormControl } from '@angular/forms';
import { GoodsDeliveryModel } from '@domain/lib/purchase-and-orders';

export type GoodsDeliveryForm = {
  [field in keyof Partial<GoodsDeliveryModel>]: FormControl<GoodsDeliveryModel[field] | null>
}
