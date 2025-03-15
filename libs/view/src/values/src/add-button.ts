import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const ADD_BUTTON = new InjectionToken<ClPanelAction>('add button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('add'),
      icon: 'add',
      type: 'secondary',
      size: 'sm',
      iconPosition: 'right',
      styleClass: 'add-button',
      command: (event?: any)=> {}
    }
  },
});
