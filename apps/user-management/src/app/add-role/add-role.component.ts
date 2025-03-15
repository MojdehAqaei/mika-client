import { Component, effect, inject, OnInit, untracked, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { RoleModel, RolePermissionModel } from '@domain/lib/user-management';
import { RoleFacade } from '@state/lib/facade';
import { RoleForm } from '../../forms/role.form';
import { ClTreeComponent } from "@sadad/component-lib/src/lib/tree";
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';


@Component({
  selector: 'user-add-role',
  standalone: true,
  imports: [
    CommonModules,
    ClTreeComponent
  ],
  templateUrl: './add-role.component.html',
  styles: ['.tree-actions > * { border: solid 1px #ccc; border-radius: 4px; margin-left: 5px; padding: 0.5rem; font-size: 0.85rem; i {vertical-align: middle}}']
})
export class AddRoleComponent extends BaseComponent<RoleModel> implements OnInit {
  selectedPermissions?: ClTreeNode<RolePermissionModel>[];
  selectedPermissionsIds?: number[] = [];
  public readonly roleFacade = inject(RoleFacade);

  readonly #invokeService = inject(ActionInvokeService);

  @ViewChild(ClTreeComponent) treeComponent?: ClTreeComponent;

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateRole();
    });

    this.formGroup = this.fb.group<RoleForm>({
      id: new FormControl,
      isActive: new FormControl( true, {nonNullable: true}),
      label: new FormControl('', {nonNullable: true, validators: [Validators.required, FormValidatorService.noWhitespace] }),
      permissions: new FormControl([], {nonNullable: true})
    });

    effect(() => {
      const edit = this.roleFacade.roleStore.state$().editMode$();
      const selectedRole = this.roleFacade.roleStore.state$().selectedRole$();

      untracked(() => {
        this.formGroup?.markAsUntouched();
        this.treeComponent?.collapseAll(); // resetting

        if (edit) {
          this.formGroup.patchValue(selectedRole);

          this.selectedPermissions = selectedRole.permissions;
          this.selectedPermissionsIds = [];

          this.selectedPermissions?.forEach(permission => {
            permission.children?.forEach(childPermission => {
              if (childPermission?.data?.id) {
                this.selectedPermissionsIds?.push(childPermission.data.id)
              }
            })
          })
        } else {
          this.formGroup.reset();
          this.selectedPermissionsIds = [];
        }
      });
    });
  }

  ngOnInit() {
    this.getAllPermissions();
  }

  @ErrorLogger()
  saveOrUpdateRole() {
    this.formGroup?.markAllAsTouched();
    this.formGroup.get('permissions')?.setValue(this.selectedPermissionsIds);

    if (this.formGroup.valid) {
      this.roleFacade.roleStore.state$().editMode$()
        ? this.roleFacade.updateRole(this.formGroup.value)
        : this.roleFacade.saveRole(this.formGroup.value);
    }
  }

  getAllPermissions() {
    this.roleFacade.updatePermissions();
  }
}
