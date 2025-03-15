import { ClMessage } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';


export const INFO_ALERT = new InjectionToken<ClMessage>('info alert', {
  factory: () => {
    return {
      icon: 'info',
      type: 'info',
      closeable: true,
      detail: '',
      summary: ''
    } as ClMessage;
  },
});
