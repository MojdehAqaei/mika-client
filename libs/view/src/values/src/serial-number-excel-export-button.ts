import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const SERIAL_EXCEL_EXPORT_BUTTON = new InjectionToken<ClPanelAction>('serial number excel export button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('export.serial-number'),
      icon: 'barcode',
      type: 'success',
      size: 'sm',
      iconPosition: 'right',
      styleClass: 'serial-excel-export-button',
      command: (event?: any)=> {}
    }
  },
});
