import {
  Component,
  effect,
  Inject,
  inject,
  Input,
  OnInit,
  output,
  untracked
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { UserRoleForm } from "../../forms/user-role.form";
import { UserContentAccessForm } from '../../forms/user-content-access.form';
import { ADD_BUTTON, CommonModules, INFO_ALERT } from '@view/lib/values';
import { ArrayHelperService } from '@view/lib/ui-services';
import { BaseComponent } from '@view/lib/components';
import { UserRolesFacade } from '@state/lib/facade';
import { UserContentAccessModel } from '@domain/lib/user-management';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClColumn, ClColumnDataType, ClMessage, ClPanelAction, ClStepItem } from '@sadad/component-lib/src/models';
import { ClDatePickerComponent } from "@sadad/component-lib/src/lib/date-picker";
import { ClStepsComponent } from '@sadad/component-lib/src/lib/steps';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';

@Component({
  selector: 'user-content-access',
  standalone: true,
  imports: [CommonModules, ClDatePickerComponent, ClStepsComponent, ClDataTableComponent, ClAlertMessagesComponent],
  templateUrl: './user-content-access.component.html'
})
export class UserContentAccessComponent extends BaseComponent<UserContentAccessModel> implements OnInit {
  readonly userRolesFacade = inject(UserRolesFacade);

  @Input() activeIndex: number = 0;
  steps!: ClStepItem[];
  httpContext = new HttpContext().set(SKIP_LOADING, true);
  idList: any[][] = [];
  dataCols!: ClColumn[];

  stepChange = output<number>();

  constructor(@Inject(INFO_ALERT) public infoAlert: ClMessage,
              @Inject(ADD_BUTTON) public add: ClPanelAction) {
    super();

    this.formGroup?.markAsUntouched(); // resetting

    infoAlert.summary = this.translate.instant('messages.user-role-content-permission-list');

    this.formGroup = this.fb.group<UserRoleForm>({
      id: new FormControl,
      userId: new FormControl(null, {nonNullable: false, validators: [Validators.required]}),
      roleId: new FormControl(null, {nonNullable: false, validators: [Validators.required]}),
      // expiryDate: new FormControl( null, {validators: [Validators.required]}),
      isActive: new FormControl(true, {nonNullable: true, validators: [Validators.required]}),
      contentAccessLevel: this.fb.array<UserContentAccessForm>([]),
    });


    effect(() => {
      const edit = this.userRolesFacade.userRolesStore.state$().editMode$();
      const selectedUserRole = this.userRolesFacade.userRolesStore.state$().selectedUserRole$();

      untracked(() => {
        this.formGroup?.markAsUntouched();
        this.steps[0].status = false;

        if (edit) {
          // @ts-ignore
          this.formGroup.patchValue(selectedUserRole);
        } else {
          this.formGroup.reset();
          // this.formGroup.get('expiryDate')?.setValue(new Date());
        }

        this.addUserContentAccess(selectedUserRole?.contentAccessLevel ||
          [
            { label: 'goodsServiceCategories', getCategoryUrl: 'goods-service-categories/search/active-leaves', saveUrl: 'category-accesses/define', getByUserRoleIdUrl: 'category-accesses/get/user-role'},
            { label: 'organizations', getCategoryUrl: 'organizations/search/actives', saveUrl: 'organization-accesses/define', getByUserRoleIdUrl: 'organization-accesses/get/user-role'},
            { label: 'inventories', getCategoryUrl: 'inventories/search/actives', saveUrl: 'inventory-accesses/define', getByUserRoleIdUrl: 'inventory-accesses/get/user-role'},
            { label: 'personCompanies', getCategoryUrl: 'prs-corps/search/actives', saveUrl: 'prs-corps-accesses/define', getByUserRoleIdUrl: 'prs-corps-accesses/get/user-role'}
        ]);
      });
    });
  }

  ngOnInit() {
    this.steps = [
      {label: this.translate.instant('user-management.user-roles'), status: false},
      {label: this.translate.instant('user-management.permission-assign.goods-group'), status: true},
      {label: this.translate.instant('user-management.permission-assign.organization'), status: true},
      {label: this.translate.instant('user-management.permission-assign.stockroom'), status: true},
      {label: this.translate.instant('user-management.permission-assign.person-company'), status: true},
    ];

    this.dataCols = [
      {
        colSpan: 1,
        value: ['name', 'title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('title')
      },
      {
        colSpan: 1,
        value: ['code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('code')
      },
      {
        colSpan: 1,
        value: ['delete'],
        header: this.translate.instant('delete'),
        type: ClColumnDataType.ACTION,
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        hidden: false,
        command: (item, index) => this.deleteFromTheList(item, index || 0)
      }
    ];
  }

  get contentAccessLevel() {
    return this.formGroup.controls['contentAccessLevel'] as FormArray;
  }

  addUserContentAccess(content: UserContentAccessModel[]) {
    this.contentAccessLevel.clear();

    content?.forEach((each, index) => {
      const form = this.fb.group<UserContentAccessForm>({
        label: new FormControl(each.label),
        getCategoryUrl: new FormControl(each.getCategoryUrl),
        saveUrl: new FormControl(each.saveUrl),
        getByUserRoleIdUrl: new FormControl(each.getByUserRoleIdUrl),
        userRoleId: new FormControl(each.userRoleId || this.userRolesFacade.userRolesStore.state$().selectedUserRole$()?.id),
        selectionMode: new FormControl(each.selectionMode || 'none'),
        selectableCategory: new FormControl({value: null, disabled: each.selectionMode != 'some'}),
        idList: new FormControl(each.idList)
      });

      this.contentAccessLevel.push(form);

      this.idList[index] = each.idList || [];
    });
  }

  resetIdList(form: AbstractControl) {
    form.get('selectableCategory')?.reset();

    if (form.get('selectionMode')?.value == "some") {
      form.get('selectableCategory')?.enable();
    } else {
      form.get('selectableCategory')?.disable();
      this.idList[this.activeIndex - 1] = [];
    }
  }

  addToTheList(object: any, index: number) {
    if (object?.hasOwnProperty('id')) {
      this.idList[index] = ArrayHelperService.filterOutDuplicatedItemsByKey((this.idList[index] || []).concat(object), 'id');
    }
  }

  deleteFromTheList(item: any, index: number) {
   const list = ArrayHelperService.deleteItemFromArray(this.idList[this.activeIndex - 1], item);
    this.idList[this.activeIndex - 1] = [...list];
  }

  setStepOneValues() {
    if (this.activeIndex == 1 && this.userRolesFacade.userRolesStore.state$().selectedUserRole$() != null) {
      // @ts-ignore
      this.formGroup.patchValue(this.userRolesFacade.userRolesStore.state$().selectedUserRole$());
    }
  }

  @ErrorLogger()
  saveOrUpdateUserRoles() {
    this.formGroup?.markAllAsTouched();
    switch (this.activeIndex) {
      case 0:
        if (this.formGroup.get('userId')?.valid &&
            this.formGroup.get('roleId')?.valid &&
            // this.formGroup.get('expiryDate')?.valid &&
            this.formGroup.get('isActive')?.valid
        ) {
          this.steps[this.activeIndex].status = true;
          this.userRolesFacade.userRolesStore.state$().editMode$() || this.formGroup.get('id')?.value
            ? this.userRolesFacade.updateUserRole(this.formGroup.value)
            : this.userRolesFacade.saveUserRole(this.formGroup.value);
        }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        if (this.contentAccessLevel.controls[this.activeIndex - 1]?.get('selectionMode')?.value != 'some' || this.idList[this.activeIndex - 1]?.length) {
          this.steps[this.activeIndex].status = true;

          if (this.contentAccessLevel.controls[this.activeIndex - 1]?.get('selectionMode')?.value != 'none'
          ) {
            this.contentAccessLevel.controls[this.activeIndex - 1]?.get('idList')?.setValue(this.idList[this.activeIndex - 1].map(e => { return {id: e.id}}))
            this.userRolesFacade.saveUserRoleContentPermissions(this.contentAccessLevel.controls[this.activeIndex - 1]?.value, this.activeIndex < this.steps.length - 1);
          }
        } else {
          this.steps[this.activeIndex].status = false;
        }
        break;
    }
  }

  closeTheDialog() {
    if (this.contentAccessLevel.controls[this.activeIndex - 1]?.get('selectionMode')?.value == 'none') {
      this.userRolesFacade.toggleDialogVisibility(false);
    }
  }
}
