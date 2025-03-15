import { Component, Inject, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { ClFormGeneratorComponent } from "@sadad/component-lib/src/lib/form-generator";
import { ClFormControlSchema, ClPanelAction } from '@sadad/component-lib/src/models';
import { ClFormService } from '@sadad/component-lib/src/services';
import { SEARCH_BUTTON, CLEAR_BUTTON } from '../../values';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'view-search-filters',
  standalone: true,
  imports: [CommonModule, ClButtonComponent, ClFormGeneratorComponent],
  templateUrl: './search-filters.component.html',
  providers: [ClFormService]
})
export class SearchFiltersComponent {
  clFormService = inject(ClFormService);

  @Input() searchFormSchema!: ClFormControlSchema[];
  @Input() submitted!: boolean;
  @Input() lazyValidation: boolean = false;

  @Output() search = new EventEmitter<FormGroup>();
  @Output() clear = new EventEmitter<Event>();

  constructor(@Inject(SEARCH_BUTTON) public searchButton: ClPanelAction,
              @Inject(CLEAR_BUTTON) public clearButton: ClPanelAction) {
    searchButton.command = () => this.filterData();
    clearButton.command = () => this.clearData();
  }

  filterData() {
    this.search.emit(this.clFormService.form);
  }

  clearData() {
    this.clFormService?.clear();
    if (this.clFormService?.form?.valid) {
      // this.filterData();
    }
    this.clear.emit();
  }
}
