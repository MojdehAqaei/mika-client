import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const PDF_EXPORT_BUTTON = new InjectionToken<ClPanelAction>('pdf export button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('export.pdf'),
      icon: 'picture_as_pdf',
      type: 'danger',
      size: 'sm',
      iconPosition: 'right',
      styleClass: 'pdf-export-button',
      command: (event?: any)=> {}
    }
  },
});
