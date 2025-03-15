import { Component, effect, inject, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { UserModel } from '@domain/lib/user-management';
import { UserForm } from '../../forms/user.form';
import { FormControl, Validators } from '@angular/forms';
import { ClSelectComponent } from '@sadad/component-lib/src/lib/select';
import { UserFacade } from '@state/lib/facade';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';


@Component({
  selector: 'user-add-user',
  standalone: true,
  imports: [CommonModules, ClSelectComponent, ClKeyFilterDirective],
  templateUrl: './add-user.component.html'
})
export class AddUserComponent extends BaseComponent<UserModel> {
  public readonly userFacade = inject(UserFacade);

  readonly #invokeService = inject(ActionInvokeService);

  httpContext = new HttpContext().set(SKIP_LOADING, true);

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateUser();
    });

    this.formGroup = this.fb.group<UserForm>({
      id: new FormControl,
      name: new FormControl(null, {nonNullable: true, validators: [Validators.required, FormValidatorService.noWhitespace]}),
      lName: new FormControl(null, {nonNullable: true, validators: Validators.compose([Validators.required, FormValidatorService.noWhitespace])}),
      nationalNumber: new FormControl(null, {nonNullable: true, validators: Validators.compose([
          FormValidatorService.noWhitespace,
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])}),
      employeeNumber: new FormControl(null),
      organizationId: new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
      organizationName: new FormControl,
      isActive: new FormControl( true, {nonNullable: true}),
      description: new FormControl(null, {validators: [Validators.maxLength(500)]})
    });

    effect(() => {
      const edit = this.userFacade.userStore.state$().editMode$();
      const selectedUser = this.userFacade.userStore.state$().selectedUser$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedUser);
        } else {
          this.formGroup.reset();
        }
      });
    });
  }

  setOrganizationName(event: any) {
    this.formGroup.get('organizationName')?.setValue(event.title);
  }

  @ErrorLogger()
  saveOrUpdateUser() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userFacade.userStore.state$().editMode$()
        ? this.userFacade.updateUser(this.formGroup.value)
        : this.userFacade.saveUser(this.formGroup.value);
    }
  }

}
