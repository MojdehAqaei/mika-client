import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const SAVE_BUTTON = new InjectionToken<ClPanelAction>('save button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('save'),
      icon: 'check',
      type: 'success',
      size: 'sm',
      disabled: false,
      loading: false,
      outlined: false,
      iconPosition: 'right',
      command: (event?: any)=> {}
    }
  },
});
