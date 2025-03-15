import {
  Component,
  EventEmitter,
  Inject,
  input,
  Input,
  InputSignal,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { ClDialogComponent } from "@sadad/component-lib/src/lib/dialog";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { DISMISS_BUTTON, SAVE_BUTTON, UPDATE_BUTTON } from '../../values';
import { ClSpinnerComponent } from '@sadad/component-lib/src/lib/spinner';

@Component({
  selector: 'view-dialog',
  standalone: true,
  imports: [CommonModule, ClDialogComponent, ClTemplateDirective, ClButtonComponent, ClSpinnerComponent],
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnChanges {

  visible: InputSignal<boolean> = input(false);
  hasFooter: InputSignal<boolean> = input(true);

  @Input() editMode: boolean = false;
  @Input() dismissible: boolean = true;
  @Input() resizeable: boolean = true;
  @Input({required: true}) loading: boolean = false;
  @Input() width: string = '50vw';
  @Input() minHeight?: number;
  @Input() header: string = '';

  @Output() actionCall = new EventEmitter<Event>();
  @Output() show = new EventEmitter<null>();
  @Output() dismiss = new EventEmitter<null>();

  constructor(@Inject(SAVE_BUTTON) public saveButton: ClPanelAction,
              @Inject(UPDATE_BUTTON) public updateButton: ClPanelAction,
              @Inject(DISMISS_BUTTON) public dismissButton: ClPanelAction) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loading']) {
      this.saveButton.loading = this.updateButton.loading = this.dismissButton.disabled = this.loading;
    }

    if (changes['editMode']) {
      if (this.editMode) {
        this.updateButton.command = ($event) => this.saveOrUpdate($event);
      } else {
        this.saveButton.command = ($event) => this.saveOrUpdate($event);
      }
    }
  }

  saveOrUpdate(event: Event) {
    this.actionCall.emit(event);
  }
}
