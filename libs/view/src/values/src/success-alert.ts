import { ClMessage } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';


export const SUCCESS_ALERT = new InjectionToken<ClMessage>('success alert', {
  factory: () => {
    return {
      icon: 'check',
      type: 'success',
      closeable: true,
      detail: '',
      summary: ''
    } as ClMessage;
  },
});
