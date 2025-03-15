import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseInvoiceInitialStepComponent } from './purchase-invoice-initial-step.component';

describe('PurchaseInvoiceInitialStepComponent', () => {
  let component: PurchaseInvoiceInitialStepComponent;
  let fixture: ComponentFixture<PurchaseInvoiceInitialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceInitialStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceInitialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
