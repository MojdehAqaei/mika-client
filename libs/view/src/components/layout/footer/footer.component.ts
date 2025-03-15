import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ClFooterComponent } from "@sadad/component-lib/src/lib/footer";
import { ClLinkComponent } from "@sadad/component-lib/src/lib/link";
import { TranslateModule } from "@ngx-translate/core";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template"


@Component({
  selector: 'view-footer',
  standalone: true,
  imports: [
    CommonModule,
    ClTemplateDirective,
    ClFooterComponent,
    ClLinkComponent,
    TranslateModule
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {}
