import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  model,
  OnInit,
  output,
  untracked
} from '@angular/core';
import {
  GoodsDeliveryItemModel,
  InvoiceReturnItemModel,
  InvoiceReturnModel,
  OrderItemModel
} from '@domain/lib/purchase-and-orders';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { InvoiceReturnFacade } from '@state/lib/facade';
import { BaseComponent } from '@view/lib/components';
import { CommonModules } from '@view/lib/values';
@Component({
  selector: 'purchase-invoice-return-item-list',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent],
  templateUrl: './invoice-return-item-list.component.html',
})
export class InvoiceReturnItemListComponent extends BaseComponent<InvoiceReturnModel> implements OnInit {

  readonly invoiceReturnFacade = inject(InvoiceReturnFacade);

  cols: ClColumn[] = [];
  actions!: ClColumn[];
  serialNumberList!: string[];
  items = model<InvoiceReturnItemModel[]>([]);
  onRemove = output<{ removedItem: InvoiceReturnItemModel, items: InvoiceReturnItemModel[] }>();
  hasAction: InputSignal<boolean> = input<boolean>(false);
  constructor() {
    super();
    effect(() => {
      const hasAction = this.hasAction();
      untracked(() => {
        if (hasAction) {
          this.actions = [
            {
              colSpan: 1,
              value: ['delete'],
              header: this.translate.instant('delete'),
              type: ClColumnDataType.ACTION,
              icon: 'delete',
              styleClasses: 'red-text text-accent-2',
              hidden: false,
              command: (event: GoodsDeliveryItemModel) =>
                this.deleteItem(event),
            },
          ];

          this.cols = this.cols.concat(this.actions);
        }
      });
    });
  }

  ngOnInit() {

    this.cols = [
      {
        colSpan: 1,
        value: ['goods.code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.code'),
      },
      {
        colSpan: 1,
        value: ['goods.label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.'),
      },
      {
        colSpan: 1,
        value: ['countingUnitTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.counting-unit.type'),
      },
      {
        colSpan: 1,
        value: ['quantity'],
        type: ClColumnDataType.TEXT,
        header:
          this.translate.instant('quantity') +
          ' / ' +
          this.translate.instant('value'),
      },
      {
        colSpan: 1,
        value: ['fee'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('unit-price'),
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description'),
      },
      {
        colSpan: 1,
        value: ['totalPriceGrouped'],
        type: ClColumnDataType.TEXT,
        header: `${this.translate.instant('purchase-and-orders.invoice.final-goods-amount')} (${this.translate.instant('currency.rial')})`,
      },
    ];
  }

  deleteItem(event: OrderItemModel) {
    const removedItem = this.items().find(item => item.goods?.id == event.goods?.id)
    if (removedItem) {
      this.items.update((prev) => prev.filter(item => item.goods?.id !== event.goods?.id));
      this.onRemove.emit({ removedItem: removedItem, items: this.items() });
    }
  }

}
