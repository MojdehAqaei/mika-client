import { ClPanelAction } from '@sadad/component-lib/src/models';
import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


export const FILTER_BUTTON = new InjectionToken<ClPanelAction>('filter button', {
  factory: () => {
    const translate = inject(TranslateService);
    return {
      label: translate.instant('search'),
      icon: 'tune',
      type: 'info',
      outlined: true,
      size: 'sm',
      iconPosition: 'right',
      command:(event?: any)=> {}
    }
  },
});
