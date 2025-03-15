import { Component, effect, inject, untracked } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { InvoiceReturnItemModel, InvoiceReturnModel, PurchaseInvoiceItemModel } from '@domain/lib/purchase-and-orders';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { ClMessageService } from '@sadad/component-lib/src/services';
import { InvoiceReturnFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { invoiceReturnDetailForm } from '../../../forms/invoice-return-detail.form';
import { InvoiceReturnItemForm } from '../../../forms/invoice-return-item.form';
import { InvoiceReturnItemListComponent } from '../../invoice-return-item-list/invoice-return-item-list.component';
@Component({
  selector: 'purchase-invoice-return-second-step',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClDividerComponent, InvoiceReturnItemListComponent],
  templateUrl: './invoice-return-second-step.component.html',
})
export class InvoiceReturnSecondStepComponent extends BaseComponent<InvoiceReturnModel> {

  readonly invoiceReturnFacade = inject(InvoiceReturnFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);
  readonly invoiceAdd = inject<ClPanelAction>(ADD_BUTTON);
  invoiceItemList: InvoiceReturnItemModel[] = [];

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
    this.formGroup = this.#parentFormGroup.control.controls['invoiceDetail'] as FormGroup<invoiceReturnDetailForm>;
  }


  private createInvoiceItemGroup(): FormGroup {
    return new FormGroup<InvoiceReturnItemForm>({
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
      const invoice = this.invoiceReturnFacade.invoiceReturnStore.state$().selectedInvoiceReturn$();
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

  setSelectedGoods(purchaseInvoiceItem: PurchaseInvoiceItemModel): void {
    if (purchaseInvoiceItem) {
      this.invoiceForm.get('countingUnitTitle')?.setValue(purchaseInvoiceItem.countingUnitTitle);
      this.invoiceForm.get('countingUnitId')?.setValue(purchaseInvoiceItem.countingUnitId);
      this.invoiceForm.get('remainingQuantity')?.setValue(purchaseInvoiceItem.goods?.remainingQuantity);

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
      ...this.invoiceReturnFacade.invoiceReturnStore.state$().selectedInvoiceReturn$(),
      invoiceDetail: {
        additionsAmount: this.formGroup.get('additionsAmount')?.getRawValue(),
        deductionsAmount: this.formGroup.get('deductionsAmount')?.getRawValue(),
        finalAmount: this.formGroup.get('finalAmount')?.getRawValue(),
        invoiceItemList: this.invoiceItemList
      }
    };
    this.invoiceReturnFacade.invoiceReturnStore.updateSelectedInvoiceReturn(updatedInvoice);
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
