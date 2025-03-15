import { ClMessage } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';


export const HELP_ALERT = new InjectionToken<ClMessage>('help alert', {
  factory: () => {
    return {
      icon: 'help',
      type: 'help',
      closeable: true,
      detail: '',
      summary: ''
    } as ClMessage;
  },
});
