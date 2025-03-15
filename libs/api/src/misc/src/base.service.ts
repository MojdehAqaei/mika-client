import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from "@angular/common/http";
import { Observable } from "rxjs";
import { SKIP_LOADING, LOAD_MODE } from "@sadad/component-lib/src/interceptors";
import { LoadingMode } from "@sadad/component-lib/src/models";
import { SingleOrMultiple } from "@view/lib/data-types";
// import { takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  readonly #http = inject(HttpClient);

  post(url: string, i: SingleOrMultiple<T>, options?: any, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<SingleOrMultiple<T>> {
    return this.#http.post<SingleOrMultiple<T>>(url, i, {
      ...options,
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode),
    })/*.pipe(takeUntilDestroyed())*/ as Observable<SingleOrMultiple<T>>;
  }

  put(url: string, i: SingleOrMultiple<T>, options?: any, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<SingleOrMultiple<T>> {
    return this.#http.put<SingleOrMultiple<T>>(url, i, {
      ...options,
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode),
    })/*.pipe(takeUntilDestroyed()) */as Observable<SingleOrMultiple<T>>;
  }

  patch(url: string, i: SingleOrMultiple<T>, options?: any, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<SingleOrMultiple<T>> {
    return this.#http.patch<SingleOrMultiple<T>>(url, i, {
      ...options,
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode),
    })/*.pipe(takeUntilDestroyed())*/ as Observable<SingleOrMultiple<T>>;
  }

  get(url: string, options?: any, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<T> {
    return this.#http.get<T>(url, {
      ...options,
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode),
    })/*.pipe(takeUntilDestroyed())*/ as Observable<T>;
  }

  getAll(url: string, options?: any, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<T[]> {
    return this.#http.get<T[]>(url, {
      ...options,
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode)
    })/*.pipe(takeUntilDestroyed())*/ as unknown as Observable<T[]>;
  }

  delete(url: string, ifSkipLoading: boolean = false, loadMode: LoadingMode = 'indeterminate'): Observable<null> {
    return this.#http.delete(url, {
      context: new HttpContext().set(SKIP_LOADING, ifSkipLoading).set(LOAD_MODE, loadMode),
    })/*.pipe(takeUntilDestroyed())*/ as unknown as Observable<null>;
  }
}
