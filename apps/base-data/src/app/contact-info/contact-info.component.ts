import { Component, effect, Inject, inject, OnInit, untracked } from '@angular/core';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ContactInfoModel } from '@domain/lib/base-data';
import { ContactInfoForm } from '../../forms/contact-info.form';
import { FormValidatorService } from '@view/lib/ui-services';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { PersonCompanyFacade } from '@state/lib/facade';
import { ClColumn, ClColumnDataType, ClPanelAction } from '@sadad/component-lib/src/models';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClMessageService } from '@sadad/component-lib/src/services';


@Component({
  selector: 'base-contact-info',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClKeyFilterDirective, ClDividerComponent, ClDataTableComponent],
  templateUrl: './contact-info.component.html',
})
export class ContactInfoComponent extends BaseComponent<ContactInfoModel> implements OnInit {
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);

  public readonly personCompanyFacade = inject(PersonCompanyFacade);

  cols!: ClColumn[];

  constructor(@Inject(ADD_BUTTON) public contactAdd: ClPanelAction) {
    super();

    effect(() => {
      const edit = this.personCompanyFacade.personCompanyStore.state$().editMode$();
      const selectedPersonCompany = this.personCompanyFacade.personCompanyStore.state$().selectedPersonCompany$();

      untracked(() => {
        this.list.clear();
        if (edit) {
          selectedPersonCompany.contactInfo?.list?.forEach(each => {
            delete each.list;
            // @ts-ignore
            const form = this.fb.nonNullable.group<ContactInfoForm>({ ...each });
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
        header: this.translate.instant('base-data.person-company.contact-title')
      },
      {
        colSpan: 1,
        value: ['typeTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.contact-type')
      },
      {
        colSpan: 1,
        value: ['phoneNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.phone-number')
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
        command: (event) => this.deleteContact(event)
      }
    ];

    this.formGroup = this.#parentFormGroup.control.get("contactInfo") as FormGroup<ContactInfoForm>;
    this.formGroup.addControl('id', new FormControl);
    this.formGroup.addControl('isDefault', new FormControl(true, {nonNullable: true}));
    this.formGroup.addControl('title', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    this.formGroup.addControl('typeId', new FormControl(null, {validators: [Validators.required]}));
    this.formGroup.addControl('typeTitle', new FormControl);
    this.formGroup.addControl('phoneNumber', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    this.formGroup.addControl('description', new FormControl(null, {validators: [Validators.maxLength(200)]}));
    this.formGroup.addControl('list', new FormArray([]));

    this.personCompanyFacade.updateContactInfoTypeList();
  }

  get list() {
    return this.formGroup.controls['list'] as FormArray;
  }

  setContactTypeTitle(event: ContactInfoModel) {
    this.formGroup.get('typeTitle')?.setValue(event.title);
  }


  addContactToList() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const hasDefault = this.list.value?.some((i: ContactInfoModel) => i.isDefault);
      if (this.formGroup.value.isDefault && hasDefault) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.has-default'),
          closeable: true,
          lifeTime: 3000
        });
        return;
      }

      const isDuplicated = this.list.value?.some((i: ContactInfoModel) => i?.phoneNumber == this.formGroup.value?.phoneNumber);
      if (isDuplicated) {
        this.#messageService.add({
          type: 'error' ,
          detail: this.translate.instant('messages.duplicated', {value: this.translate.instant('base-data.person-company.phone-number')}),
          closeable: true,
          lifeTime: 3000
        });

        return;
      } else {
        const row = this.formGroup.value;
        delete row.list;

        /** set to nonNullable to avoid resetting the list when formGroup.reset() is called a few lines below */
        const form = this.fb.nonNullable.group<ContactInfoForm>({
          ...row
        });
        this.list.push(form);
      }

      this.formGroup?.markAsUntouched();
      this.formGroup.reset();
    }
  }

  deleteContact(contact: ContactInfoModel) {
    const tmp = this.list.value;
    const index = tmp.findIndex((i: ContactInfoModel) => i.id == contact.id);
    if (index != undefined && index > -1) {
      this.list.controls.splice(index, 1);
      tmp.splice(index, 1);
      this.list.patchValue(tmp);
    }
  }

}
