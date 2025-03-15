import { ViewContainerRef } from '@angular/core';
import { ClConfirmation } from '@sadad/component-lib/src/models';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ExternalInjectorService } from '../../ui-services';

export const Confirmation = (message?: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('target', target.constructor.prototype);

    const originalMethod = descriptor.value;
    const config: ClConfirmation = {
      message: message,
      header: '',
      acceptIcon: 'check',
      rejectIcon: 'clear',
      acceptStyleClasses: 'confirm-dialog-accept-button',
      rejectStyleClasses: 'confirm-dialog-reject-button',
      acceptVisible: false,
      rejectVisible: false,
      closable: false
    };


    descriptor.value = async function (...args: any[]) {

      const confirmationService = ExternalInjectorService.get(ClConfirmationService);
      const viewContainerRef = ExternalInjectorService.get(ViewContainerRef);

      confirmationService.confirm(viewContainerRef, {
        ...config,
        accept: () => {
          return originalMethod.apply(this, args);
        }
      });

    };

    return descriptor;
  };
}
