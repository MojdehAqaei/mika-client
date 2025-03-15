import { inject, Injectable } from '@angular/core';
import { AppStore } from '../../store';
import { Metadata } from '@view/lib/models';
import {
  GetUserRolesByNationalNumberUseCase,
  UpdateLoggedInUserRoleUseCase,
  UserLogoutUseCase
} from '@domain/lib/user-management';
import { Cache } from '@sadad/component-lib/src/decorators';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  /** -------- first call the api -------- **/
  /** -------- then update the state -------- **/
  public appStore = inject(AppStore); //todo they need to be PRIVATE

  readonly #userLogoutUseCase = inject(UserLogoutUseCase);
  readonly #updateLoggedInUserRoleUseCase = inject(UpdateLoggedInUserRoleUseCase);
  readonly #getUserRolesByNationalNumberUseCase = inject(GetUserRolesByNationalNumberUseCase);


  // public readonly user = this._appStoreGateway.state$().loggedInUser$.asReadonly();
  // public readonly menu = this._appStoreGateway.menuItems$();

  constructor() {}

  updateLoggedInUserRole(id: number) {
    this.#updateLoggedInUserRoleUseCase.execute(id).subscribe(res => {
      const userRole = res[0];
      this.appStore.updateLoggedInUser(userRole);
      this.appStore.updateMenu(userRole?.permissions);
    });
  }

  @Cache()
  getLoggedInUserRoles(nationalNumber?: string) {
    this.#getUserRolesByNationalNumberUseCase.execute(nationalNumber).subscribe(res => {
      this.appStore.updateLoggedInUserRoles(res);
    })
  }

  logout() {
    this.#userLogoutUseCase.execute().subscribe(res => {
      location.replace('/logout');
    });
  }

  updateMetaData(data: Metadata) {
    this.appStore.updatePageMetadata(data);
  }

  updateIdleState(isIdle: boolean) {
    this.appStore.updateIdle(isIdle);
  }

  updateActiveFiscalPeriod(id: number) {
    const list = this.appStore.state$().fiscalPeriodsList$();
    const item = list?.find(i => i.id == id);
    item ? this.appStore.updateActiveFiscalPeriod(item) : '';
  }
}
