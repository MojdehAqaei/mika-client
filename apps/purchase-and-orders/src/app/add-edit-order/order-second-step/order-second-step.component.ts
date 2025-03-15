import { HttpContext } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { OrganizationTypeEnum } from '@domain/lib/organization';
import { OrderItemModel } from '@domain/lib/purchase-and-orders';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClDatePickerComponent, formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { OrderFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { OrderItemForm } from '../../../forms/order-item.form';
import { GoodsDeliveryItemListComponent } from '../../goods-delivery-item-list/goods-delivery-item-list.component';
import { OrderItemListComponent } from '../../order-item-list/order-item-list.component';

@Component({
  selector: 'purchase-order-second-step',
  standalone: true,
  imports: [CommonModules, OrderItemListComponent, HeadingComponent, ClDividerComponent, ClDatePickerComponent, GoodsDeliveryItemListComponent],
  templateUrl: './order-second-step.component.html',
})
export class OrderSecondStepComponent extends BaseComponent<OrderItemModel> {
  protected readonly orderFacade = inject(OrderFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);

  protected readonly formatDate = formatDate;

  httpContext = new HttpContext().set(SKIP_LOADING, true);
  organizationTypes = `${OrganizationTypeEnum.EDARE_OMOOR},${OrganizationTypeEnum.EDARE_KOL},${OrganizationTypeEnum.AZMAYESHGAH},${OrganizationTypeEnum.BANK_KARGOSHAEI},${OrganizationTypeEnum.BIMARESTAN},${OrganizationTypeEnum.DAROUKHANEH},${OrganizationTypeEnum.DANESHKADE},${OrganizationTypeEnum.DARMANGAH},${OrganizationTypeEnum.AZMAYESHGAH},${OrganizationTypeEnum.SARPARASTY},${OrganizationTypeEnum.SHOBE_SHOBE},${OrganizationTypeEnum.SHOBE_SANDOGH},${OrganizationTypeEnum.SHOBE_KARGOSHAEI},${OrganizationTypeEnum.SHOBE_MOSTAGHEL},${OrganizationTypeEnum.SANDOGH},${OrganizationTypeEnum.HEIAT_AAMEL},${OrganizationTypeEnum.MODIRIAT_OMOOR},${OrganizationTypeEnum.MARKAZ},${OrganizationTypeEnum.MOAVENAT},${OrganizationTypeEnum.MOAVENAT_MODIR_AAMEL},${OrganizationTypeEnum.VAHEDHAYE_KHAREJ}`;

  constructor(@Inject(ADD_BUTTON) public goodsAdd: ClPanelAction) {
    super();
    this.formGroup = this.#parentFormGroup.control.get("orderItems") as FormGroup<OrderItemForm>;
  }

  setSelectedGoods(event: any) {
    this.formGroup.get('goodsLabel')?.setValue(event['title']);
    this.formGroup.get('goodsCode')?.setValue(event['code']);
    this.formGroup.get('isGoodsFloat')?.setValue(event['isDecimal']);
    this.formGroup.get('countingUnitId')?.setValue(event['measurement']['id']);
    this.formGroup.get('countingUnitTitle')?.setValue(event['measurement']['title']);
  }

  addGoodsToOrderList() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.orderFacade.updateItemsOfSelectedOrder(this.formGroup.getRawValue(), 'add');
      this.formGroup?.markAsUntouched();
      this.formGroup.reset();
    }
  }

  setApplicantLabel(event: any) {
    this.formGroup.get('applicantOrganizationLabel')?.setValue(event['typeName'] + ' ' + event['name']);
  }
}
