import { HttpClient } from "@angular/common/http";
import { defer, interval, lastValueFrom, repeat, Subject, take, takeUntil } from 'rxjs';
import { APP_INITIALIZER, inject, Injectable, Injector } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { FiscalYearDto, UserRoleDto } from '@api/lib/dto';
import { ExternalInjectorService } from '@view/lib/ui-services';
import { UserRoleMapper } from '@api/lib/mapper';



@Injectable({
  providedIn: 'root'
})
class AppService {
  #injector = inject(Injector);
  #http = inject(HttpClient);
  #appStore = inject(AppStore);
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    ExternalInjectorService.injector = this.#injector;
  }

  async getUserInfo() {
    try {
      await lastValueFrom(this.#http.get<UserRoleDto>('users/logged-in', {withCredentials: true})).then(user => {
        if (user?.user) {
          const userModel = new UserRoleMapper().mapTo(user);
          this.#appStore.updateLoggedInUser(userModel);
          this.#appStore.updateMenu(userModel.permissions);

          lastValueFrom(this.#http.post<FiscalYearDto[]>(`fiscal-periods/search?page=0&size=10&sort=endDate,desc`, {}, {withCredentials: true})).then(fiscalYears => {
            this.#appStore.updateFiscalPeriodsList(fiscalYears);
            this.#appStore.updateActiveFiscalPeriod(fiscalYears?.length ? fiscalYears[0] : null)
          });
        }
      });
    } catch (err) {
      return console.log(err);
    }
  }

  getUserInfoByNationalNumber() {
    defer(() => interval(1000)).pipe(
      take(1),
      repeat(),
      takeUntil(this.destroy$)
    ).subscribe(async () => {
      try {
        const res = await lastValueFrom(this.#http.get<{ NationalId?: string; }>('protected/user/ssn', {withCredentials: true}));
        if (res.NationalId) {
          this.destroy$.next(true);
          this.destroy$.unsubscribe();
          lastValueFrom(this.#http.get<UserRoleDto>(`users/logged-in/${res.NationalId}`, {withCredentials: true})).then(user => {
            if (user?.user) {
              const userModel = new UserRoleMapper().mapTo(user);
              this.#appStore.updateLoggedInUser(userModel);
              this.#appStore.updateMenu(userModel.permissions);
            }
          });
        }
      } catch (error) {
        if (error) {
          location.replace('/');
        }
      }
    });
  }
}

export const initializeAppFactory = (appService: AppService) => {
  return () => {
    return appService.getUserInfo();
  }
}

export const APP_INITIALIZE = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    multi: true,
    deps: [AppService],
  }
]
