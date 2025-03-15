import {
  Component,
  effect, Inject,
  inject,
  input,
  InputSignal,
  OnInit,
  untracked
} from '@angular/core';
import { CommonModules, INFO_ALERT } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { GoodsDeliveryItemModel } from '@domain/lib/purchase-and-orders';
import {
  ClAction,
  ClColumn,
  ClColumnDataType,
  ClMessage,
  ClTableData
} from '@sadad/component-lib/src/models';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { GoodsDeliveryItemSerialNumberComponent } from '../add-edit-goods-delivery/goods-delivery-second-step/goods-delivery-item-serial-number/goods-delivery-item-serial-number.component';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { SerialTypeDataMapper } from '@domain/lib/base-data';

@Component({
  selector: 'purchase-goods-delivery-item-list',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent, GoodsDeliveryItemSerialNumberComponent, ClAlertMessagesComponent],
  templateUrl: './goods-delivery-item-list.component.html',
  styles: `
  .goods-delivery-item-wrapper {
    background-color: #f0f7ff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 15px 10px;
    .goods-delivery-item-inner {
      width: calc((100% / 6) - 10px);
      text-align: right;
      margin-right: 10px;
      text-overflow: ellipsis;
    }
  }`
})
export class GoodsDeliveryItemListComponent extends BaseComponent<GoodsDeliveryItemModel> implements OnInit {
  readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);

  cols: ClColumn[] = [];
  actions: ClAction[] = [];

  items: InputSignal<GoodsDeliveryItemModel[]> = input<GoodsDeliveryItemModel[]>([]);
  view: InputSignal<'table' | 'simple'> = input<'table' | 'simple'>('table');
  tableExpandable: InputSignal<boolean> = input<boolean>(true);
  canDelete: InputSignal<boolean> = input<boolean>(false);
  canEditSerialNumbers: InputSignal<boolean> = input<boolean>(false);

  constructor(@Inject(INFO_ALERT) public infoAlert: ClMessage) {
    super();
    infoAlert.summary = this.translate.instant('messages.view-goods-delivery-item-serial-numbers');

    effect(() => {
      const canDelete = this.canDelete();
      const selectedGoodsDelivery = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$();

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

        if (selectedGoodsDelivery.id && !selectedGoodsDelivery.ifDeliveryItemsLoaded) {
          this.goodsDeliveryFacade.updateSelectedGoodsDeliveryItemsListByDeliveryId(selectedGoodsDelivery.id);
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
        value: ['serialType'],
        valueMapper: [SerialTypeDataMapper],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.serial-type')
      },
      {
        colSpan: 1,
        value: ['quantity'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('quantity') + ' / ' + this.translate.instant('value')
      },
      {
        colSpan: 1,
        value: ['price'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('unit-price')
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description')
      }
    ];
  }

  deleteItem(event: { action: ClAction, row: GoodsDeliveryItemModel }) {
    this.goodsDeliveryFacade.updateItemsOfSelectedGoodsDelivery(event.row, 'remove');
  }

  setSerialNumbers(event: ClTableData) {
    const deliveryItem = (event.data as GoodsDeliveryItemModel);

    switch (deliveryItem?.serialType) {
      case 'INFORMATICS_SERIES':
        // this.serialNumberList = [...new Array<ClSelectItem>((event.data as GoodsDeliveryItemModel).quantity || 0)]
        break;
      case 'PRESS_NUMBER':
        break;
      default:
        break;
    }
  }

  updateItems(event: GoodsDeliveryItemModel) {
    const list = this.items();
    const index = list?.findIndex(i => i.id == event.id);
    list.splice(index, 1, event);
    this.goodsDeliveryFacade.updateInformaticsSerialListByDeliveryId(list);
  }
}
