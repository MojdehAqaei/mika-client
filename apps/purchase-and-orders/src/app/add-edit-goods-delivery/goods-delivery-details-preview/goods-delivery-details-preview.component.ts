import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { GoodsDeliveryModel } from '@domain/lib/purchase-and-orders';
import { TranslateModule } from '@ngx-translate/core';
import { GoodsDeliveryItemListComponent } from '../../goods-delivery-item-list/goods-delivery-item-list.component';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClObjectToStringPipe } from '@sadad/component-lib/src/pipes';

@Component({
  selector: 'purchase-goods-delivery-details-preview',
  standalone: true,
  imports: [CommonModule, TranslateModule, GoodsDeliveryItemListComponent, HeadingComponent, ClDividerComponent, ClObjectToStringPipe],
  templateUrl: './goods-delivery-details-preview.component.html',
})
export class GoodsDeliveryDetailsPreviewComponent extends BaseComponent<GoodsDeliveryModel> {
  readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);

  constructor() {
    super();
  }
}
