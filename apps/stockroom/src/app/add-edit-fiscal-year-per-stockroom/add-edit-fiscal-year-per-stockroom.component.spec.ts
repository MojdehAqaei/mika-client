import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditFiscalYearPerStockroomComponent } from './add-edit-fiscal-year-per-stockroom.component';

describe('AddEditFiscalYearPerStockroomComponent', () => {
  let component: AddEditFiscalYearPerStockroomComponent;
  let fixture: ComponentFixture<AddEditFiscalYearPerStockroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFiscalYearPerStockroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditFiscalYearPerStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
