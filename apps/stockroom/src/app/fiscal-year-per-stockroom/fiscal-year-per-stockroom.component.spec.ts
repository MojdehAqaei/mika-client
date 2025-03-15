import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiscalYearPerStockroomComponent } from './fiscal-year-per-stockroom.component';

describe('FiscalYearPerStockroomComponent', () => {
  let component: FiscalYearPerStockroomComponent;
  let fixture: ComponentFixture<FiscalYearPerStockroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalYearPerStockroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiscalYearPerStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
