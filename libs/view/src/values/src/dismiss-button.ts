import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const DISMISS_BUTTON = new InjectionToken<ClPanelAction>('dismiss button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('dismiss'),
      icon: 'clear',
      type: 'default',
      size: 'sm',
      disabled: false,
      loading: false,
      outlined: true,
      iconPosition: 'right',
      command: (event?: any)=> {}
    }
  },
});
