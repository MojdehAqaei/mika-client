import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from '@angular/forms';
import { ContentWrapperComponent } from '@view/lib/components';
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button"
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template"
import { ClValidatorErrorsDirective } from "@sadad/component-lib/src/lib/validator-errors";
import { ClInputNumberComponent } from '@sadad/component-lib/src/lib/input-number';
import { ClInputTextComponent } from '@sadad/component-lib/src/lib/input-text';
import { ClInputSwitchComponent } from '@sadad/component-lib/src/lib/input-switch';
import { ClTextAreaComponent } from "@sadad/component-lib/src/lib/text-area";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { ClCheckboxComponent } from '@sadad/component-lib/src/lib/checkbox';
import { ClRadioButtonComponent } from '@sadad/component-lib/src/lib/radio-button';
import { ClObjectToStringPipe } from '@sadad/component-lib/src/pipes';

export const CommonModules = [
  CommonModule,
  TranslateModule,
  ClObjectToStringPipe,
  ClButtonComponent,
  ClRadioButtonComponent,
  ContentWrapperComponent,
  ClTemplateDirective,
  ReactiveFormsModule,
  ClValidatorErrorsDirective,
  ClInputNumberComponent,
  ClInputTextComponent,
  ClInputSwitchComponent,
  ClTextAreaComponent,
  ClSelectComponent,
  ClCheckboxComponent
];
