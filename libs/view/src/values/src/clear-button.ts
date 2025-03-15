import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const CLEAR_BUTTON = new InjectionToken<ClPanelAction>('clear button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('clear'),
      icon: 'delete_sweep',
      type: 'default',
      size: 'sm',
      disabled: false,
      loading: false,
      outlined: true,
      iconPosition: 'right',
      styleClass: 'left-margin',
      command: (event?: any)=> {}
    }
  },
});
