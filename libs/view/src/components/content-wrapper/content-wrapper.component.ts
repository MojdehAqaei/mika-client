import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClPanelComponent } from '@sadad/component-lib/src/lib/panel';
import { ClDrawerComponent } from '@sadad/component-lib/src/lib/drawer';
import { ClTemplateDirective } from '@sadad/component-lib/src/lib/template';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { ClSpinnerComponent } from '@sadad/component-lib/src/lib/spinner';
import { FitToContentDirective } from '../../directives';
import { Metadata } from '../../models';

@Component({
  selector: 'view-content-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    ClTemplateDirective,
    ClPanelComponent,
    ClButtonComponent,
    ClDrawerComponent,
    ClSpinnerComponent,
    FitToContentDirective
  ],
  template: `
      <div class="content-wrapper" #cwRef
           [style]="{'--right': '-450', 'position': metaData?.hasDrawer ? 'relative' : 'static', 'overflow': metaData?.hasDrawer ? 'hidden' : 'visible'}">
          @if (metaData?.hasDrawer) {
<!--              <div class="drawer-toggle">-->
<!--                  <cl-button [icon]="toggleDrawer ? 'arrow_circle_right' : 'arrow_circle_left'" styleClasses="toggle-button" (onClick)="toggleDrawer = !toggleDrawer"/>-->
<!--              </div>-->
              <cl-drawer [(visible)]="toggleDrawer"
                         [headerTitle]="metaData?.drawerTitle"
                         [headerIcon]="metaData?.drawerIcon"
                         [width]="'450px'"
                         [appendTo]="cwRef">
                  <ng-content select="[drawer]"/>
              </cl-drawer>
          }


          <cl-panel [header]="metaData?.pageTitle"
                    [subHeader]="metaData?.pageSubTitle"
                    [icon]="metaData?.pageIcon"
                    [actionList]="actionList"
                    styleClasses="custom-panel">

              <ng-template clTemplate="header">
                  @for (button of headerButtons; track button.label) {
                      <cl-button [label]="button.label"
                                 [disabled]="button?.disabled!"
                                 [loading]="button?.loading!"
                                 [outlined]="button?.outlined!"
                                 [icon]="button?.icon"
                                 [iconPosition]="button.iconPosition"
                                 [size]="button?.size"
                                 [styleClasses]="button?.styleClass!"
                                 [type]="button?.type"
                                 (onClick)="button?.command($event)"/>
                  }
              </ng-template>

              <div class="content-wrapper-inner" #cwiRef viewFitToContent [contentHeight]="cwiRef.getBoundingClientRect().height">
                  @defer (on timer(1000)) {
                    <ng-content select="[content-body]"/>
                  } @loading {
                    <ng-container [ngTemplateOutlet]="loading"/>
                  } @placeholder {
                    <ng-container [ngTemplateOutlet]="loading"/>
                  }

              </div>

          </cl-panel>
      </div>

      <!-- loading template -->
      <ng-template #loading>
          <div class="center-position">
              <cl-spinner [show]="true" size="md" [colorList]="['#01161e', '#2563eb', '#e6e6fa', '#ffffff']"/>
          </div>
      </ng-template>
  `
})
export class ContentWrapperComponent {
  @Input() toggleDrawer: boolean = false;
  @Input() metaData?: Metadata;
  @Input() actionList: ClPanelAction[] = [];
  @Input() headerButtons?: ClPanelAction[] = [];
}
