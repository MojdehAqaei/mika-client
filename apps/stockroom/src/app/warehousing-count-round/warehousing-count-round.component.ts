import { Component, effect, inject, Inject, OnInit, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ClSelectButtonComponent } from '@sadad/component-lib/src/lib/select-button';
import {
  WAREHOUSING_ROUND,
  WarehousingCountingRoundEnum,
  warehousingCountingRoundOptions,
  WarehousingItemModel
} from '@domain/lib/stockroom';
import { WarehousingItemForm } from '../../forms/warehousing-item.form';
import { FormArray, FormControl } from '@angular/forms';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClColumn, ClColumnDataType, ClSelectButtonOption } from '@sadad/component-lib/src/models';
import { WarehousingFacade } from '@state/lib/facade';

@Component({
  selector: 'stockroom-warehousing-count-round',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClSelectButtonComponent, ClDataTableComponent],
  providers: [
    {provide: WAREHOUSING_ROUND, useValue: warehousingCountingRoundOptions}
  ],
  templateUrl: './warehousing-count-round.component.html',
  styleUrl: './warehousing-count-round.component.scss',
})

export class WarehousingCountRoundComponent extends BaseComponent<WarehousingItemModel> implements OnInit {
  readonly warehousingFacade = inject(WarehousingFacade);

  cols: ClColumn[] = [];

  constructor(@Inject(WAREHOUSING_ROUND) public warehousingCountingRoundOptions: ClSelectButtonOption[]) {
    super();

    this.formGroup = this.fb.group({
      countingRound: new FormControl(warehousingCountingRoundOptions[0]),
      list: this.fb.array<WarehousingItemForm>([])
    });

    this.warehousingFacade.updateWarehousingItemsByRound(WarehousingCountingRoundEnum.FIRST);

    effect(() => {
      const warehousingItems = this.warehousingFacade.warehousingStore.state$().warehousingItems$();

      untracked(() => {

      });
    });
  }

  ngOnInit() {
    this.cols = [
      {
        colSpan: 1,
        value: ['goods.code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.code')
      },
      {
        colSpan: 1,
        value: ['goods.label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.')
      },
      {
        colSpan: 1,
        value: ['stock'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.stock')
      },
      {
        colSpan: 1,
        value: ['quantity'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('quantity')
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description')
      }
    ];
  }

  get list() {
    return this.formGroup.controls['list'] as FormArray;
  }

  addToList() {
    const form = this.fb.group<WarehousingItemForm>({
      description: new FormControl
    });

    this.list.push(form);

  }
}
