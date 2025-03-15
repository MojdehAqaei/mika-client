import { Component, effect, inject, OnInit, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { BaseComponent } from '@view/lib/components';
import { PersonCompanyModel, PersonTypeEnum } from '@domain/lib/base-data';
import { PersonCompanyFacade } from '@state/lib/facade';
import { PersonCompanyForm } from '../../forms/person-company.form';
import { FormControl, Validators } from '@angular/forms';
import { ContactInfoForm } from '../../forms/contact-info.form';
import { BankAccountInfoForm } from '../../forms/bank-account-info.form';
import { AddressForm } from '../../forms/address.form';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClTabItemComponent, TabComponent } from '@sadad/component-lib/src/lib/tab';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { AddressComponent } from '../address/address.component';
import { BankAccountInfoComponent } from '../bank-account-info/bank-account-info.component';
import { ClMessageService } from '@sadad/component-lib/src/services';

@Component({
  selector: 'base-add-edit-person-company',
  standalone: true,
  imports: [CommonModules, ClKeyFilterDirective, TabComponent, ClTabItemComponent, ContactInfoComponent, AddressComponent, BankAccountInfoComponent],
  templateUrl: './add-edit-person-company.component.html',
})
export class AddEditPersonCompanyComponent extends BaseComponent<PersonCompanyModel> implements OnInit {
  public readonly personCompanyFacade = inject(PersonCompanyFacade);
  readonly #messageService = inject(ClMessageService);

  readonly #invokeService = inject(ActionInvokeService);
  personTypeEnum: typeof PersonTypeEnum = PersonTypeEnum;

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdatePersonCompany();
    });

    this.formGroup = this.fb.group<PersonCompanyForm>({
      id: new FormControl,
      type: new FormControl(PersonTypeEnum.NATURAL_PERSON, {nonNullable: true, validators: [Validators.required]}),
      name: new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}),
      nationalNumber: new FormControl(null, {validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        FormValidatorService.noWhitespace
        ]}),
      ownershipTypeId: new FormControl,
      isActive: new FormControl(true, {nonNullable: true, validators: [Validators.required]}),
      ceoName: new FormControl,
      ceoNationalNumber: new FormControl(null, {validators: [Validators.minLength(10), Validators.maxLength(10)]}),
      economicNumber: new FormControl,
      email: new FormControl(null, {validators: [Validators.pattern('\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*')]}),
      description: new FormControl,
      contactInfo: this.fb.group<ContactInfoForm>({}),
      address: this.fb.group<AddressForm>({}),
      bankAccountInfo: this.fb.group<BankAccountInfoForm>({}),
    });

    effect(() => {
      const edit = this.personCompanyFacade.personCompanyStore.state$().editMode$();
      const selectedPersonCompany = this.personCompanyFacade.personCompanyStore.state$().selectedPersonCompany$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedPersonCompany);
        } else {
          this.formGroup.reset();
        }
      });
    });
  }

  ngOnInit() {
    this.personCompanyFacade.updateOwnershipTypeList();
  }

  saveOrUpdatePersonCompany() {
    this.formGroup?.markAllAsTouched();
    /*if (!this.formGroup.value.contactInfo?.list?.length ||
        !this.formGroup.value.address?.list?.length ||
        !this.formGroup.value.bankAccountInfo?.list?.length
    ) {
      const txt = `${this.translate.instant('base-data.person-company.contact-info')} / ${this.translate.instant('base-data.person-company.address-info')} / ${this.translate.instant('base-data.person-company.bank-account-info')}`;
      this.#messageService.add({
        type: 'error' ,
        detail: this.translate.instant('messages.empty-list', {value: txt}),
        closeable: true,
        lifeTime: 3000
      });

      return;
    }*/

    /** disabling these formGroups in order to exclude them from validation  */
    this.formGroup.get('contactInfo')?.disable();
    this.formGroup.get('address')?.disable();
    this.formGroup.get('bankAccountInfo')?.disable();

    if (this.formGroup.valid) {
      this.formGroup.enable();
      this.formGroup?.markAsUntouched(); // resetting
      this.personCompanyFacade.personCompanyStore.state$().editMode$()
        ? this.personCompanyFacade.updatePersonCompany(this.formGroup.getRawValue())
        : this.personCompanyFacade.savePersonCompany(this.formGroup.getRawValue());
    } else {
      this.formGroup.enable();
      this.formGroup.get('contactInfo')?.markAsUntouched();
      this.formGroup.get('address')?.markAsUntouched();
      this.formGroup.get('bankAccountInfo')?.markAsUntouched();
    }
  }
}
