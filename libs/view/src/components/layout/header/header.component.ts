import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClHeaderComponent } from '@sadad/component-lib/src/lib/header';
import { TranslateModule } from '@ngx-translate/core';
import { ClAction } from '@sadad/component-lib/src/models';
import { ClDialogComponent } from '@sadad/component-lib/src/lib/dialog';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { ClTemplateDirective } from '@sadad/component-lib/src/lib/template';
import { ClListBoxComponent } from '@sadad/component-lib/src/lib/list-box';
import { ClSelectComponent } from '@sadad/component-lib/src/lib/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'view-header',
  standalone: true,
  imports: [
    ClHeaderComponent,
    TranslateModule,
    ClDialogComponent,
    ClButtonComponent,
    ClTemplateDirective,
    ClListBoxComponent,
    ClSelectComponent,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  selectedUserRoleId!: any;  // RoleModel
  selectedFiscalPeriodId!: any;  // FiscalYearModel
  @Input() user!: any;  // UserRoleModel
  @Input() fiscalPeriod!: any;  // FiscalYearModel
  @Input() selectableUserRoles!: any[];  // RoleModel
  @Input() selectableFiscalPeriods!: any[];  // FiscalYearModel

  @Output() changeActiveFiscalPeriod = new EventEmitter<number>();
  @Output() changeUserRole = new EventEmitter<number>();

  @ViewChild('dialogRef') dialogRef?: ClDialogComponent;

  dialogType?: 'user-role-detail' | 'fiscal-year' | 'notification' | 'help';

  headerIcons: ClAction[] = [
    // {type:'icon' , icon:'mode_comment', styleClasses:'help-icon', command: (event) => this.toggleDialog(true, 'help', event) },
  ];

  toggleDialog(show: boolean, type: 'user-role-detail' | 'fiscal-year' | 'notification' | 'help', event: any) {
    this.dialogType = type;
    if (show) {
      this.dialogRef?.show(event);
    } else {
      this.dialogRef?.hide();
    }
  }
}
