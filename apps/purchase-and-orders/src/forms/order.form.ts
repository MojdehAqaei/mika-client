import { FormControl } from '@angular/forms';
import { OrderModel } from '@domain/lib/purchase-and-orders';

export type OrderForm = {
  [field in keyof Partial<OrderModel>]: FormControl<OrderModel[field] | null>
}
