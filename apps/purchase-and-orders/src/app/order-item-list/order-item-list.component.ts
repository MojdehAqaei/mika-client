import { Component, effect, inject, input, InputSignal, OnInit, untracked } from '@angular/core';
import { OrderItemModel } from '@domain/lib/purchase-and-orders';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { OrderFacade } from '@state/lib/facade';
import { BaseComponent } from '@view/lib/components';
import { CommonModules } from '@view/lib/values';

@Component({
  selector: 'purchase-order-item-list',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent],
  templateUrl: './order-item-list.component.html',
  styles: `
  .order-item-wrapper {
    background-color: #f0f7ff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 15px 10px;
    .order-item-inner {
      width: calc((100% / 6) - 10px);
      text-align: right;
      margin-right: 10px;
      text-overflow: ellipsis;
    }
  }`
})
export class OrderItemListComponent extends BaseComponent<OrderItemModel> implements OnInit {
  protected readonly orderFacade = inject(OrderFacade);

  items: InputSignal<OrderItemModel[]> = input<OrderItemModel[]>([]);
  view: InputSignal<'table' | 'simple'> = input<'table' | 'simple'>('table');
  canDelete: InputSignal<boolean> = input<boolean>(false);

  cols: ClColumn[] = [];
  actions: ClAction[] = [];

  constructor() {
    super();

    effect(() => {
      const canDelete = this.canDelete();

      untracked(() => {
        if (canDelete) {

          this.actions = [
            {
              index: 0,
              label: this.translate.instant('delete'),
              icon: 'delete',
              styleClasses: 'red-text text-darken-2',
              command: (event) => this.deleteItem(event)
            }
          ];
        }
      })
    });
  }

  ngOnInit() {
    this.cols = [
      {
        colSpan: 1,
        value: ['goodsCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.code')
      },
      {
        colSpan: 1,
        value: ['goodsLabel'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.')
      },
      {
        colSpan: 1,
        value: ['countingUnitTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.counting-unit.type')
      },
      {
        colSpan: 1,
        value: ['quantity'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('quantity') + ' / ' + this.translate.instant('value')
      },
      {
        colSpan: 1,
        value: ['applicantOrganizationLabel'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.applicant-organization')
      },
      {
        colSpan: 1,
        value: ['requestLetterNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.request-letter-number')
      },
      {
        colSpan: 1,
        value: ['requestLetterDatePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.request-letter-date')
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description')
      }
    ];
  }

  deleteItem(event: { action: ClAction, row: OrderItemModel }) {
    this.orderFacade.updateItemsOfSelectedOrder(event.row, 'remove');
  }
}
