import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionInvokeService {

  readonly #methodSubject = new Subject<any>();

  invokeMethod(data: any) {
    this.#methodSubject.next(data);
  }

  getMethodInvocation() {
    return this.#methodSubject.asObservable();
  }
}
