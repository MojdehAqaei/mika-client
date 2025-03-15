import { Component, effect, Inject, inject, OnInit, untracked, ViewEncapsulation } from '@angular/core';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { BankAccountInfoModel } from '@domain/lib/base-data';
import { BankAccountInfoForm } from '../../forms/bank-account-info.form';
import { PersonCompanyFacade } from '@state/lib/facade';
import { ClColumn, ClColumnDataType, ClPanelAction } from '@sadad/component-lib/src/models';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { FormValidatorService } from '@view/lib/ui-services';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClInputGroupComponent } from '@sadad/component-lib/src/lib/input-group';
import { ClInputMaskComponent } from '@sadad/component-lib/src/lib/input-mask';
import { ClMessageService } from '@sadad/component-lib/src/services';

@Component({
  selector: 'base-bank-account-info',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent, ClDividerComponent, HeadingComponent, ClKeyFilterDirective, ClInputGroupComponent, ClInputMaskComponent],
  templateUrl: './bank-account-info.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: ['.iban input { text-align: left } .card-number { width: 100% }']
})
export class BankAccountInfoComponent extends BaseComponent<BankAccountInfoModel> implements OnInit {
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);

  public readonly personCompanyFacade = inject(PersonCompanyFacade);

  cols!: ClColumn[];

  constructor(@Inject(ADD_BUTTON) public accountAdd: ClPanelAction) {
    super();

    effect(() => {
      const edit = this.personCompanyFacade.personCompanyStore.state$().editMode$();
      const selectedPersonCompany = this.personCompanyFacade.personCompanyStore.state$().selectedPersonCompany$();

      untracked(() => {
        this.list.clear();
        if (edit) {
          selectedPersonCompany.bankAccountInfo?.list?.forEach(each => {
            delete each.list;
            // @ts-ignore
            const form = this.fb.nonNullable.group<BankAccountInfoForm>({ ...each });
            this.list.push(form);
          })
        }
      })
    });
  }

  ngOnInit() {
    this.cols =  [
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.bank-account-title')
      },
      {
        colSpan: 1,
        value: ['bankName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.bank-name')
      },
      {
        colSpan: 1,
        value: ['accountNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.bank-account-number')
      },
      {
        colSpan: 1,
        value: ['cardNumber'],
        styleClasses: 'ltr',
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.card-number')
      },
      {
        colSpan: 1,
        value: ['isDefault'],
        type: ClColumnDataType.BOOLEAN,
        header: this.translate.instant('default')
      },
      {
        colSpan: 1,
        value: ['delete'],
        type: ClColumnDataType.ACTION,
        header: this.translate.instant('delete'),
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.deleteBankAccount(event)
      }
    ];

    this.formGroup = this.#parentFormGroup.control.get("bankAccountInfo") as FormGroup<BankAccountInfoForm>;
    this.formGroup.addControl('id', new FormControl);
    this.formGroup.addControl('isDefault', new FormControl(true, {nonNullable: true}));
    this.formGroup.addControl('title', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    this.formGroup.addControl('bankId', new FormControl(null, {validators: [Validators.required]}));
    this.formGroup.addControl('bankName', new FormControl)
    this.formGroup.addControl('accountNumber', new FormControl)
    this.formGroup.addControl('iban', new FormControl(null, {validators: [Validators.maxLength(24), Validators.minLength(24)]}))
    this.formGroup.addControl('cardNumber', new FormControl(null, {validators: [Validators.maxLength(16), Validators.minLength(16)]}))
    this.formGroup.addControl('description', new FormControl(null, {validators: [Validators.maxLength(200)]}));
    this.formGroup.addControl('list', new FormArray([]));

    this.personCompanyFacade.updateBankList();
  }

  get list() {
    return this.formGroup.controls['list'] as FormArray;
  }

  setBankName(event: BankAccountInfoModel) {
    this.formGroup.get('bankName')?.setValue(event.title);
  }

  addBankAccountToList() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const hasDefault = this.list.value?.some((i: BankAccountInfoModel) => i.isDefault);
      if (this.formGroup.value.isDefault && hasDefault) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.has-default'),
          closeable: true,
          lifeTime: 3000
        });
        return;
      }

      const isDuplicated = this.list.value?.some((i: BankAccountInfoModel) => i?.iban == this.formGroup.value?.iban);
      if (isDuplicated) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.duplicated', {value: this.translate.instant('base-data.person-company.iban')}),
          closeable: true,
          lifeTime: 3000
        });

        return;
      } else {
        const row = this.formGroup.value;
        delete row.list;

        /** set to nonNullable to avoid resetting the list when formGroup.reset() is called a few lines below */
        const form = this.fb.nonNullable.group<BankAccountInfoForm>({
          ...row
        });
        this.list.push(form);
      }

      this.formGroup?.markAsUntouched();
      this.formGroup.reset();
    }
  }

  deleteBankAccount(bank: BankAccountInfoModel) {
    const tmp = this.list.value;
    const index = tmp.findIndex((i: BankAccountInfoModel) => i.id == bank.id);
    if (index != undefined && index > -1) {
      this.list.controls.splice(index, 1);
      tmp.splice(index, 1);
      this.list.patchValue(tmp);
    }
  }
}
