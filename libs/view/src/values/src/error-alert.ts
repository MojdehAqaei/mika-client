import { ClMessage } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';


export const ERROR_ALERT = new InjectionToken<ClMessage>('error alert', {
  factory: () => {
    return {
      icon: 'error',
      type: 'error',
      closeable: true,
      detail: '',
      summary: ''
    } as ClMessage;
  },
});
