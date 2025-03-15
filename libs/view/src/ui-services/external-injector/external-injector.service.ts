import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalInjectorService {
  static injector: Injector;

  public static get(token: any) {
    if (ExternalInjectorService.injector) {
      return this.injector.get(token);
    }
  }

}
