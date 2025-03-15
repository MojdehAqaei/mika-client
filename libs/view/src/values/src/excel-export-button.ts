import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const EXCEL_EXPORT_BUTTON = new InjectionToken<ClPanelAction>('excel export button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('export.excel'),
      icon: 'two_pager',
      type: 'success',
      size: 'sm',
      iconPosition: 'right',
      styleClass: 'excel-export-button',
      command: (event?: any)=> {}
    }
  },
});
