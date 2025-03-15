import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { TranslateModule } from '@ngx-translate/core';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { OrderItemListComponent } from '../../order-item-list/order-item-list.component';
import { OrderFacade } from '@state/lib/facade';
import { OrderModel, orderTypeDataMapper, supplyMethodDataMapper } from '@domain/lib/purchase-and-orders';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { OrderForm } from '../../../forms/order.form';
import { ClObjectToStringPipe } from '@sadad/component-lib/src/pipes';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';

@Component({
  selector: 'purchase-order-third-step',
  standalone: true,
  imports: [CommonModule, HeadingComponent, TranslateModule, ClDividerComponent, OrderItemListComponent, ClObjectToStringPipe],
  templateUrl: './order-third-step.component.html',
})
export class OrderThirdStepComponent extends BaseComponent<OrderModel> {
  protected readonly orderFacade = inject(OrderFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);

  protected readonly formatDate = formatDate;

  orderTypeDataMapper: typeof  orderTypeDataMapper = orderTypeDataMapper;
  supplyMethodDataMapper: typeof supplyMethodDataMapper = supplyMethodDataMapper;

  constructor() {
    super();
    this.formGroup = this.#parentFormGroup.form as FormGroup<OrderForm>;
  }
}
