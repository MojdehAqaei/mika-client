import { Component, effect, inject, OnInit, untracked, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { GoodsGroupModel } from '@domain/lib/base-data';
import { GoodsGroupForm } from '../../forms/goods-group.form';
import { GoodsGroupFacade } from '@state/lib/facade';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClAction, ClTreeNode } from '@sadad/component-lib/src/models';
import { ClInputGroupComponent } from '@sadad/component-lib/src/lib/input-group';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';

@Component({
  selector: 'base-add-edit-goods-group',
  standalone: true,
  imports: [CommonModules, ClInputGroupComponent, ClKeyFilterDirective],
  templateUrl: './add-edit-goods-group.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: ['.goods-group-code input { text-align: left }']
})
export class AddEditGoodsGroupComponent extends BaseComponent<GoodsGroupModel> implements OnInit {
  public readonly goodsGroupFacade = inject(GoodsGroupFacade);
  readonly #invokeService = inject(ActionInvokeService);
  addons!: ClAction[];

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateGoodsGroup();
    });

    this.formGroup = this.fb.group<GoodsGroupForm>({
      title: new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}),
      code: new FormControl(null, {nonNullable: true}),
      description: new FormControl(null, {validators: [Validators.maxLength(500)]}),
      isActive: new FormControl(true, {nonNullable: true}),
      parentId: new FormControl(this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$().data?.id)
    });

    effect(() => {
      const edit = this.goodsGroupFacade.goodsGroupStore.state$().editMode$();
      const selectedGoodsGroup = this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$();
      const code = this.goodsGroupFacade.goodsGroupStore.state$().goodsSubgroupGeneratedCode$();

      untracked(() => {
        this.formGroup?.markAsUntouched();

        if (edit) {
          this.formGroup.patchValue(selectedGoodsGroup.data);
          this.formGroup.get('code')?.setValidators([
            Validators.required,
            FormValidatorService.noWhitespace,
            Validators.maxLength(selectedGoodsGroup.data.codeLength || 3),
            Validators.minLength(selectedGoodsGroup.data.codeLength || 1)
          ]);
          this.formGroup.get('code')?.updateValueAndValidity();
          this.addons = [{label: selectedGoodsGroup.parent?.data.fullCode, position: 'end'}];
        } else {
          this.formGroup.reset();
          this.formGroup.get('code')?.setValue(code);
          this.formGroup.get('code')?.setValidators([
            Validators.required,
            FormValidatorService.noWhitespace,
            Validators.maxLength(selectedGoodsGroup.data.childCodeLength || 3),
            Validators.minLength(selectedGoodsGroup.data.childCodeLength || 1)
          ]);
          this.formGroup.get('code')?.updateValueAndValidity();
          this.formGroup.get('parentId')?.setValue(selectedGoodsGroup.key);
          // this.formGroup.get('isActive')?.setValue(true);
          this.addons = [{label: selectedGoodsGroup?.data.fullCode, position: 'end'}];
        }
      });
    });
  }

  ngOnInit() {
    this.formGroup?.markAsUntouched();
  }


  @ErrorLogger()
  saveOrUpdateGoodsGroup() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const goodsGroup: ClTreeNode<GoodsGroupModel> = {data: {...this.formGroup.value}, key: this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$().key};
      this.goodsGroupFacade.goodsGroupStore.state$().editMode$()
        ? this.goodsGroupFacade.updateGoodsGroup(goodsGroup)
        : this.goodsGroupFacade.saveGoodsGroup(goodsGroup);
    }
  }
}
