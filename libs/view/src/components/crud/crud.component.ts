import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  input,
  Input,
  InputSignal,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {
  CommonModules,
  ADD_BUTTON,
  PDF_EXPORT_BUTTON,
  EXCEL_EXPORT_BUTTON,
  SERIAL_EXCEL_EXPORT_BUTTON
} from '@view/lib/values';
import { ClAction, ClColumn, ClFormControlSchema, ClPanelAction, ClTableData } from '@sadad/component-lib/src/models';
import { ClDataTableComponent } from "@sadad/component-lib/src/lib/data-table";
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DataTableAction, Metadata } from '../../models';
import { Crud } from '../../data-types';
import { ClPanelComponent } from '@sadad/component-lib/src/lib/panel';

@Component({
  selector: 'view-crud',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent, SearchFiltersComponent, DialogComponent, ClPanelComponent],
  templateUrl: './crud.component.html'
})
export class CrudComponent implements OnChanges {
  searchValue!: { };
  headerActions!: ClPanelAction[];

  dialogVisible: InputSignal<boolean> = input(false);
  hasDialogFooter: InputSignal<boolean> = input(true);

  @Input({required: true}) metaData!: Metadata;
  @Input() data!: any[];
  @Input() searchFilters!: ClFormControlSchema[];
  @Input() filtersLabels!: string[];
  @Input() allowedActions?: (Crud | undefined)[];
  @Input() cols!: ClColumn[];
  @Input() tableActions?: DataTableAction[];
  @Input() totalRecords!: number;
  @Input() first: number = 0;
  @Input() rows: number = 10;
  @Input() dialogWidth: string = '60vw';
  @Input() dialogMinHeight?: number;
  @Input() toggleSearch: boolean = false;
  @Input() toggleDrawer: boolean = false;
  @Input() showPaginator: boolean = false;
  @Input() hasRowExpansion: boolean = false;
  @Input() dialogHeader!: string;
  @Input() editMode: boolean = false;
  @Input() submitted: boolean = false;
  @Input() dialogLoading: boolean = false;

  @ContentChild('drawer') drawer!: TemplateRef<any>;
  @ContentChild('tableRowExpansion') tableRowExpansion!: TemplateRef<any>;
  @ContentChild('addEditDialog') addEditDialog!: TemplateRef<any>;

  @Output() add = new EventEmitter<any>();
  @Output() pdf = new EventEmitter<any>();
  @Output() excel = new EventEmitter<any>();
  @Output() secondExcel = new EventEmitter<any>();
  @Output() search = new EventEmitter<{}>();
  @Output() clear = new EventEmitter<any>();
  @Output() saveOrUpdate = new EventEmitter<any>();
  @Output() dismiss = new EventEmitter<any>();
  @Output() page = new EventEmitter<{ first: number, rows: number, page: number }>();
  @Output() rowExpand = new EventEmitter<ClTableData>();
  @Output() tableRowAction = new EventEmitter<{ action: ClAction; row: any }>();

  constructor(@Inject(ADD_BUTTON) public addButton: ClPanelAction,
              @Inject(PDF_EXPORT_BUTTON) public pdfButton: ClPanelAction,
              @Inject(EXCEL_EXPORT_BUTTON) public excelButton: ClPanelAction,
              @Inject(SERIAL_EXCEL_EXPORT_BUTTON) public serialExcelButton: ClPanelAction) {

    addButton.command = () => this.add.emit();
    pdfButton.command = () => this.pdf.emit(this.searchValue);
    excelButton.command = () => this.excel.emit(this.searchValue);
    serialExcelButton.command = () => this.secondExcel.emit(this.searchValue);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allowedActions']?.currentValue) {
      this.headerActions = [];
      this.allowedActions?.includes('ExportPDF') ? this.headerActions.push(this.pdfButton) : '';
      this.allowedActions?.includes('ExportExcel') ? this.headerActions.push(this.excelButton) : '';
      this.allowedActions?.includes('ExportExcelwithSerial') ? this.headerActions.push(this.serialExcelButton) : '';

      this.tableActions = this.tableActions?.filter(a => this.allowedActions?.includes(a.key));
    }
  }

  paginate(event: { first: number, rows: number, page: number }) {
    const data = {
      ...this.searchValue,
      ...event
    };
    this.page.emit(data);
  }
}
