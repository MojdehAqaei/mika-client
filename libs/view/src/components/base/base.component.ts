import { Component, inject, signal, Signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { Metadata } from '../../models';
import { AppFacade } from '@state/lib/facade';

@Component({
  standalone: true,
  imports: [],
  template: ``
})
export class BaseComponent<T> {

  // list?: WritableSignal<T[]>; //todo
  first$: Signal<number> = signal(0);
  showPaginator$: Signal<boolean> = signal(true);
  formGroup!: FormGroup;

  protected toggleDrawer!: boolean;
  protected searchFilters!: ClFormControlSchema[];
  protected permissionKey!: unknown;

  protected readonly appFacade: AppFacade = inject(AppFacade);
  protected fb: FormBuilder = inject(FormBuilder);
  protected router: Router = inject(Router);
  protected currentRoute: ActivatedRoute = inject(ActivatedRoute);
  protected viewRef: ViewContainerRef = inject(ViewContainerRef);
  public readonly translate: TranslateService = inject(TranslateService);

  constructor() {
    this.destroyObservable(this.currentRoute.data)?.subscribe(data => {
      // @ts-ignore
      this.searchFilters = (data as Metadata).formSchema;
      this.permissionKey = (data as Metadata).permissionKey;
    });

    // this.destroyObservable(this.currentRoute.queryParamMap)?.subscribe(qp => {
      //
    // });

    // this.destroyObservable(this.currentRoute.paramMap)?.subscribe(p => {
      //
    // });
  }

  destroyObservable(fn: Observable<any>): Observable<any> {
    return fn?.pipe(takeUntilDestroyed());
  }

}
