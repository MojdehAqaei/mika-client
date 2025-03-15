import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayHelperService {

  constructor() { }

  public static deleteItemFromArray(arr: any[], item: any) {
    const index = arr?.indexOf(item);
    arr?.splice(index, 1);
    return arr;
  }

  public static filterOutDuplicatedItemsByKey<T>(arr: T[], key: any): T[] {
    return Array.isArray(arr)
      // @ts-ignore
      ? arr?.filter((item, index, array) => array?.findIndex(t => (t[key] === item[key])) === index)
      : arr;
  }

  public static deepCopy<T>(source: T): T {
    return Array.isArray(source)
      ? source?.map(item => this.deepCopy(item))
      : source instanceof Date
        ? new Date(source.getTime())
        : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
            // @ts-ignore
            Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
            // @ts-ignore
            o[prop] = this.deepCopy(source[prop]);
            return o;
          }, Object.create(Object.getPrototypeOf(source)))
          : source as T;
  }

  public static objectsEqual(o1: object, o2: object): boolean {
    // @ts-ignore
    return o1 && o2 && Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every((p: any) => o1[p] === o2[p]);
  }

  public static arraysEqual(a1: any[], a2: any[]): boolean {
    return a1 && a2 && Array.isArray(a1) && Array.isArray(a2) && a1.length === a2.length && a1.every((o, index) => this.objectsEqual(o, a2[index]));
  }
}
