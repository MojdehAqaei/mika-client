import { ClMessage } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';


export const WARNING_ALERT = new InjectionToken<ClMessage>('warning alert', {
  factory: () => {
    return {
      icon: 'warning',
      type: 'warning',
      closeable: true,
      detail: '',
      summary: ''
    } as ClMessage;
  },
});
