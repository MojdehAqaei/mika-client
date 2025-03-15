import { Component, effect, Inject, inject, OnInit, untracked } from '@angular/core';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { FormControl, Validators } from '@angular/forms';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { InventoryTypeModel } from '@domain/lib/stockroom';
import { InventoryTypeFacade } from '@state/lib/facade';
import { ActionInvokeService, ArrayHelperService, FormValidatorService } from '@view/lib/ui-services';
import { InventoryTypeForm } from '../../forms/inventory-type.form';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClColumn, ClColumnDataType, ClPanelAction } from '@sadad/component-lib/src/models';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { GoodsGroupModel } from '@domain/lib/base-data';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';


@Component({
  selector: 'stockroom-add-inventory-type',
  standalone: true,
  imports: [
    CommonModules,
    ClDataTableComponent,
    ClDividerComponent,
    HeadingComponent,
    ClKeyFilterDirective,
    ClAlertMessagesComponent
  ],
  templateUrl: './add-inventory-type.component.html',
  styles: ``,
  providers: [

  ]
})
export class AddInventoryTypeComponent extends BaseComponent<InventoryTypeModel> implements OnInit {
  public readonly inventoryTypeFacade = inject(InventoryTypeFacade);
  readonly #invokeService = inject(ActionInvokeService);

  httpContext = new HttpContext().set(SKIP_LOADING, true);
  goodsGroupCols!: ClColumn[];
  relatedGoodsGroupList: GoodsGroupModel[] = [];

  constructor(@Inject(ADD_BUTTON) public add: ClPanelAction) {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateInventoryType();
    });

    this.formGroup = this.fb.group<InventoryTypeForm>({
      id: new FormControl,
      code: new FormControl(null, { nonNullable: true, validators: [Validators.required, FormValidatorService.noWhitespace, Validators.minLength(2), Validators.maxLength(2)] }),
      title: new FormControl('', { nonNullable: true, validators: [Validators.required, FormValidatorService.noWhitespace] }),
      isActive: new FormControl(true, { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl,
      selectedGoodsGroup: new FormControl
    });

    effect(() => {
      const edit = this.inventoryTypeFacade.inventoryTypeStore.state$().editMode$();
      const selectedInventoryType = this.inventoryTypeFacade.inventoryTypeStore.state$().selectedInventoryType$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedInventoryType);
          this.relatedGoodsGroupList = selectedInventoryType.relatedGoodsGroups || [];
        } else {
          this.formGroup.reset();
          this.relatedGoodsGroupList = [];
        }
      })
    });
  }

  ngOnInit() {
    this.goodsGroupCols = [
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.title')
      },
      {
        colSpan: 1,
        value: ['fullCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.code')
      },
      {
        colSpan: 1,
        value: ['delete'],
        type: ClColumnDataType.ACTION,
        header: this.translate.instant('delete'),
        icon: 'delete',
        command: (event) => this.addRemoveGoodsGroupToTheList(event, 'remove'),
        styleClasses: 'red-text text-darken-2'
      }
    ];
  }

  addRemoveGoodsGroupToTheList(goodsGroup: GoodsGroupModel, type: 'add' | 'remove') {
    let list = this.relatedGoodsGroupList;

    if (type == 'add') {
      if (goodsGroup?.id) {
        list = ArrayHelperService.filterOutDuplicatedItemsByKey((list || []).concat(goodsGroup), 'id');
      }
    } else if (type == 'remove') {
      const index = list.findIndex(i => i.id == goodsGroup.id);
      index > -1 ? list.splice(index,1) : '';
    }

    this.relatedGoodsGroupList = [...list];
  }

  @ErrorLogger()
  saveOrUpdateInventoryType() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const object: InventoryTypeModel = {
        ...this.formGroup.value,
        relatedGoodsGroups: this.relatedGoodsGroupList
      }
      this.inventoryTypeFacade.inventoryTypeStore.state$().editMode$()
        ? this.inventoryTypeFacade.updateInventoryType(object)
        : this.inventoryTypeFacade.saveInventoryType(object);
    }
  }
}
