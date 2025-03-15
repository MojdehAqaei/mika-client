import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const UPDATE_BUTTON = new InjectionToken<ClPanelAction>('update button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('update'),
      icon: 'update',
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
