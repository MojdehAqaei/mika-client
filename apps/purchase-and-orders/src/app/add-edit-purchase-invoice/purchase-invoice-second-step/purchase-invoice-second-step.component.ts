import { Component, effect, inject, untracked } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { OrderItemModel, PurchaseInvoiceItemModel, PurchaseInvoiceModel } from '@domain/lib/purchase-and-orders';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { ClMessageService } from '@sadad/component-lib/src/services';
import { PurchaseInvoiceFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { PurchaseInvoiceDetailForm } from '../../../forms/purchase-invoice-detail.form';
import { PurchaseInvoiceItemForm } from '../../../forms/purchase-invoice-item.form';
import { PurchaseInvoiceItemListComponent } from "../../purchase-invoice-item-list/purchase-invoice-item-list.component";
@Component({
  selector: 'purchase-purchase-invoice-second-step',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClDividerComponent, PurchaseInvoiceItemListComponent],
  templateUrl: './purchase-invoice-second-step.component.html',
})
export class PurchaseInvoiceSecondStepComponent extends BaseComponent<PurchaseInvoiceModel> {

  readonly purchaseInvoiceFacade = inject(PurchaseInvoiceFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);
  readonly invoiceAdd = inject<ClPanelAction>(ADD_BUTTON);
  invoiceItemList: PurchaseInvoiceItemModel[] = [];

  invoiceForm = this.createInvoiceItemGroup();

  constructor() {
    super();
    this.initializeForm();
    this.setupEffects();
  }

  get filteredInvoiceItems() {
    return this.invoiceItemList.filter(item => !item.isDeleted)
  }

  private initializeForm(): void {
    this.invoiceItemList = [];
    this.formGroup = this.#parentFormGroup.control.controls['invoiceDetail'] as FormGroup<PurchaseInvoiceDetailForm>;
  }

  private createInvoiceItemGroup(): FormGroup {
    return new FormGroup<PurchaseInvoiceItemForm>({
      id: new FormControl(null),
      goods: new FormControl(null, [Validators.required]),
      countingUnitTitle: new FormControl({ value: '', disabled: true }),
      countingUnitId: new FormControl(null),
      remainingQuantity: new FormControl({ value: null, disabled: true }),
      quantity: new FormControl(null, [Validators.required]),
      fee: new FormControl(null, [Validators.required]),
      discountAmount: new FormControl(null),
      taxAmount: new FormControl(null),
      additionsAmount: new FormControl(null),
      deductionsAmount: new FormControl(null),
      description: new FormControl(''),
      totalPrice: new FormControl({ value: 0, disabled: true }),
      isGoodsFloat: new FormControl(false)
    });
  }

  private setupEffects(): void {
    effect(() => {
      const invoice = this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().selectedPurchaseInvoice$();
      untracked(() => {
        if (invoice) {
          this.invoiceItemList = invoice.invoiceDetail?.invoiceItemList || [];
          this.formGroup.get('additionsAmount')?.setValue(invoice.invoiceDetail?.additionsAmount);
          this.formGroup.get('deductionsAmount')?.setValue(invoice.invoiceDetail?.deductionsAmount);
          this.formGroup.get('finalAmount')?.setValue(invoice.invoiceDetail?.finalAmount);
        }
      })
    })
  }

  addInvoiceToList(): void {
    if (this.checkForDuplicateItems()) return;
    this.invoiceForm.markAllAsTouched();
    if (this.invoiceForm.valid) this.addInvoiceDetailToStore();
  }

  private checkForDuplicateItems(): boolean {
    const newItem = this.invoiceForm.getRawValue();
    const isDuplicate = this.filteredInvoiceItems.some(item => newItem.goods?.id === item.goods?.id);
    if (isDuplicate) {
      this.showDuplicateMessage(newItem.goods?.label || '');
    }
    return isDuplicate;
  }

  private showDuplicateMessage(itemLabel: string): void {
    this.#messageService.add({
      type: 'error',
      detail: this.translate.instant('messages.duplicated', { value: itemLabel }),
      closeable: true,
      lifeTime: 3000
    });
  }

  calculateTotalPrice(): void {
    const totalPrice = this.computeTotalPrice(this.invoiceForm);
    this.invoiceForm.get('totalPrice')?.setValue(totalPrice);
  }

  private computeTotalPrice(item: AbstractControl): number {
    const quantity = item.get('quantity')?.value || 0;
    const fee = item.get('fee')?.value || 0;
    const discount = item.get('discountAmount')?.value || 0;
    const tax = item.get('taxAmount')?.value || 0;
    const additions = item.get('additionsAmount')?.value || 0;
    const deductions = item.get('deductionsAmount')?.value || 0;
    return quantity * fee - discount + tax + additions - deductions;
  }

  setSelectedGoods(orderItem: OrderItemModel): void {
    if (orderItem) {
      this.invoiceForm.get('countingUnitTitle')?.setValue(orderItem.countingUnitTitle);
      this.invoiceForm.get('countingUnitId')?.setValue(orderItem.countingUnitId);
      this.invoiceForm.get('remainingQuantity')?.setValue(orderItem.goods?.remainingQuantity);


      this.invoiceForm.controls['quantity'].setValidators([Validators.max(this.invoiceForm.get('remainingQuantity')?.value)]);
      this.invoiceForm.controls['quantity'].updateValueAndValidity();
    }
  }

  removeInvoiceItem(event: { removedItem: PurchaseInvoiceItemModel, items: PurchaseInvoiceItemModel[] }): void {
    const index = this.invoiceItemList.findIndex(item => item.goods?.id === event.removedItem.goods?.id);
    if (index !== -1) {
      this.invoiceItemList[index].isDeleted = true;
    }
    this.calculateFinalAmount();
    this.updateInvoiceDetail();
  }

  private addInvoiceDetailToStore(): void {
    this.invoiceItemList = [...this.invoiceItemList, this.invoiceForm.getRawValue()];
    this.calculateFinalAmount();
    this.updateInvoiceDetail();
    this.invoiceForm.reset();
  }

  private updateInvoiceDetail(): void {
    const updatedInvoice = {
      ...this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().selectedPurchaseInvoice$(),
      invoiceDetail: {
        additionsAmount: this.formGroup.get('additionsAmount')?.getRawValue(),
        deductionsAmount: this.formGroup.get('deductionsAmount')?.getRawValue(),
        finalAmount: this.formGroup.get('finalAmount')?.getRawValue(),
        invoiceItemList: this.invoiceItemList
      }
    };
    this.purchaseInvoiceFacade.purchaseInvoiceStore.updateSelectedPurchaseInvoice(updatedInvoice);
  }

  calculateFinalAmount(): void {
    const totalPrice = this.computeFinalAmount();
    this.formGroup.get('finalAmount')?.setValue(totalPrice);
  }

  private computeFinalAmount(): number {
    const itemTotal = this.invoiceItemList.reduce(
      (acc: number, item: PurchaseInvoiceItemModel) => acc + Number(item.totalPrice || 0),
      0
    );
    const additions = this.formGroup.get('additionsAmount')?.value || 0;
    const deductions = this.formGroup.get('deductionsAmount')?.value || 0;
    return itemTotal + additions - deductions;
  }
}
