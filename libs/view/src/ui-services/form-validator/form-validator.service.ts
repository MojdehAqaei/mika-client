import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  static noWhitespace(control: AbstractControl<any, any>): ValidationErrors | null {
    return control?.value && !control?.value?.toString()?.trim()?.length ?  {'whitespace': true} : null;
  }
}
