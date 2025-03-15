import { FormControl } from '@angular/forms';
import { GoodsDeliveryItemModel } from '@domain/lib/purchase-and-orders';

export type GoodsDeliveryItemForm = {
  [field in keyof Partial<GoodsDeliveryItemModel>]: FormControl<GoodsDeliveryItemModel[field] | null>
}
