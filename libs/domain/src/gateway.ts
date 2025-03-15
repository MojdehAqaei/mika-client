import { Observable } from 'rxjs';

export abstract class Gateway<T>  {
  abstract findAll(): Observable<T[]>;
  abstract filterAll(filter: T): Observable<T[]>;
  abstract searchByKey(key: string): Observable<T[]>;
  abstract read(id: number): Observable<T>;
  abstract create(t: T): Observable<T>;
  abstract update(t: T): Observable<T>;
  abstract deleteById(id: number): Observable<null>;
}
