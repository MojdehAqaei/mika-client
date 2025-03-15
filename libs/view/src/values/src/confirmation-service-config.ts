import { ClConfirmation } from '@sadad/component-lib/src/models';
import { InjectionToken } from '@angular/core';

export const CONFIRMATION_SERVICE_CONFIG = new InjectionToken<ClConfirmation>('config', {
  factory: () => {
    return {
      message: '',
      header: '',
      acceptIcon: 'check',
      rejectIcon: 'clear',
      acceptStyleClasses: 'confirm-dialog-accept-button',
      rejectStyleClasses: 'confirm-dialog-reject-button',
      acceptVisible: true,
      rejectVisible: true,
      closable: false,
      accept: () => {}
    }
  }
});
