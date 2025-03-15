import { Component, effect, inject, Input, input, InputSignal, model, OnChanges, OnInit, output, SimpleChanges, untracked } from '@angular/core';
import { PurchaseStepsItemModel } from '@domain/lib/purchase-and-orders';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { AttachmentFacade } from '@state/lib/facade';
import { BaseComponent } from '@view/lib/components';
import { CommonModules } from '@view/lib/values';

@Component({
  selector: 'purchase-purchase-steps-item-list',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent],
  templateUrl: './purchase-steps-item-list.component.html',
})
export class PurchaseStepsItemListComponent extends BaseComponent<PurchaseStepsItemModel> implements OnInit, OnChanges {
  attachmentFacade = inject(AttachmentFacade);
  cols: ClColumn[] = [];
  zipFileName = model<string>();
  actions: ClColumn[] = [];

  @Input()
  items: PurchaseStepsItemModel[] = [];
  onRemove = output<PurchaseStepsItemModel>();
  hasAction: InputSignal<boolean> = input<boolean>(false);

  get tableColumns() {
    return this.cols.concat(this.actions);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  constructor() {
    super();
    effect(() => {
      const hasAction = this.hasAction();
      untracked(() => {
        if (hasAction) {
          this.actions = [
            {
              colSpan: 1,
              value: ['delete'],
              header: this.translate.instant('delete'),
              type: ClColumnDataType.ACTION,
              icon: 'delete',
              styleClasses: 'red-text text-accent-2',
              hidden: false,
              command: (event: PurchaseStepsItemModel) =>
                this.deleteItem(event),
            },
          ];
        }
      });
    });

    // effect(() => {
    //   const files = this.attachmentFacade.attachmentStore.state$().files$();
    //   untracked(() => {
    //     if (files.length) {
    //       const zip = new ZipFileService();
    //       zip.createZip(files, this.zipFileName());
    //     }
    //   })
    // })
  }

  ngOnInit() {

    this.cols = [
      {
        colSpan: 1,
        value: ['purchaseStepType.title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.purchase-steps.step-title'),
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description'),
      },
      // {
      //   colSpan: 1,
      //   value: ['attachedFiles'],
      //   header: this.translate.instant('attachments.download'),
      //   type: ClColumnDataType.ACTION,
      //   icon: 'download',
      //   styleClasses: 'blue-text text-accent-2',
      //   command: (event: PurchaseStepsItemModel) => {
      //     if (event.attachedFiles?.length) {
      //       const ids = event.attachedFiles.map(file => file.id) as string[];
      //       const files: attachmentListModel = {
      //         list: ids,
      //         fileTypeEnum: 'PURCHASE_REFERENCE',
      //       };
      //       this.attachmentFacade.downloadAllFiles(files);
      //     }
      //   }

      // },
    ];
  }

  deleteItem(event: PurchaseStepsItemModel) {
    // const removedItem = this.items().find(item => item.id == event.id)
    // if (removedItem) {
    //   this.items.update((prev) => prev.filter(item => item.id !== event.id));
    //   this.onRemove.emit(removedItem);
    // }
  }
}
