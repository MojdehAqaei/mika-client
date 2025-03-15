import { HttpContext } from '@angular/common/http';
import { Component, effect, Inject, inject, OnInit, untracked } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AddressModel, GeoEnum } from '@domain/lib/base-data';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClColumn, ClColumnDataType, ClPanelAction } from '@sadad/component-lib/src/models';
import { ClMessageService } from '@sadad/component-lib/src/services';
import { PersonCompanyFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { FormValidatorService } from '@view/lib/ui-services';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { AddressForm } from '../../forms/address.form';

@Component({
  selector: 'base-address',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent, HeadingComponent, ClDividerComponent, ClKeyFilterDirective],
  templateUrl: './address.component.html',
})
export class AddressComponent extends BaseComponent<AddressModel> implements OnInit {
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);

  public readonly personCompanyFacade = inject(PersonCompanyFacade);

  cols!: ClColumn[];
  geoType: typeof GeoEnum = GeoEnum;
  httpContext = new HttpContext().set(SKIP_LOADING, true);

  constructor(@Inject(ADD_BUTTON) public addressAdd: ClPanelAction) {
    super();

    effect(() => {
      const edit = this.personCompanyFacade.personCompanyStore.state$().editMode$();
      const selectedPersonCompany = this.personCompanyFacade.personCompanyStore.state$().selectedPersonCompany$();

      untracked(() => {
        this.list.clear();
        if (edit) {
          selectedPersonCompany.address?.list?.forEach(each => {
            delete each.list;
            // @ts-ignore
            const form = this.fb.nonNullable.group<AddressForm>({ ...each });
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
        header: this.translate.instant('base-data.person-company.address-title')
      },
      {
        colSpan: 1,
        value: ['typeTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.address-type')
      },
      {
        colSpan: 1,
        value: ['postalCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.postal-code')
      },
      {
        colSpan: 1,
        value: ['address'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.address')
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
        command: (event) => this.deleteAddress(event)
      }
    ];

    this.formGroup = this.#parentFormGroup.control.get("address") as FormGroup<AddressForm>;
    this.formGroup.addControl('id', new FormControl);
    this.formGroup.addControl('isDefault', new FormControl(true, {nonNullable: true}));
    this.formGroup.addControl('title', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    this.formGroup.addControl('typeId', new FormControl(null, {validators: [Validators.required]}));
    this.formGroup.addControl('typeTitle', new FormControl);
    this.formGroup.addControl('provinceId', new FormControl(null, {validators: [Validators.required]}));
    this.formGroup.addControl('postalCode', new FormControl(null, {validators: [Validators.minLength(10), Validators.maxLength(10)]}));
    this.formGroup.addControl('address', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    this.formGroup.addControl('description', new FormControl(null, {validators: [Validators.maxLength(200)]}));
    this.formGroup.addControl('list', new FormArray([]));

    this.personCompanyFacade.updateAddressInfoTypeList();
  }

  get list() {
    return this.formGroup.controls['list'] as FormArray;
  }

  setAddressTypeTitle(event: AddressModel) {
    this.formGroup.get('typeTitle')?.setValue(event.title);
  }

  addAddressToList() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const hasDefault = this.list.value?.some((i: AddressModel) => i.isDefault);
      if (this.formGroup.value.isDefault && hasDefault) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.has-default'),
          closeable: true,
          lifeTime: 3000
        });
        return;
      }
      const isDuplicated = this.list.value?.some((i: AddressModel) => i?.postalCode == this.formGroup.value?.postalCode);
      if (isDuplicated) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.duplicated', {value: this.translate.instant('base-data.person-company.postal-code')}),
          closeable: true,
          lifeTime: 3000
        });

        return;
      } else {
        const row = this.formGroup.value;
        delete row.list;

        /** set to nonNullable to avoid resetting the list when formGroup.reset() is called a few lines below */
        const form = this.fb.nonNullable.group<AddressForm>({
          ...row
        });
        this.list.push(form);
      }

      this.formGroup?.markAsUntouched();
      this.formGroup.reset();
    }
  }

  deleteAddress(address: AddressModel) {
    const tmp = this.list.value;
    const index = tmp.findIndex((i: AddressModel) => i.id == address.id);
    if (index != undefined && index > -1) {
      this.list.controls.splice(index, 1);
      tmp.splice(index, 1);
      this.list.patchValue(tmp);
    }
  }
}
