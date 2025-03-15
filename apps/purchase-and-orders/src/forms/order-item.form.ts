import { FormControl } from '@angular/forms';
import { OrderItemModel } from '@domain/lib/purchase-and-orders';

export type OrderItemForm = {
  [field in keyof Partial<OrderItemModel>]: FormControl<OrderItemModel[field] | null>
}
