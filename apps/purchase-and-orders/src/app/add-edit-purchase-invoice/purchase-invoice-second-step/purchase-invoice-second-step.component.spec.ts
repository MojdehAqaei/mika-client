import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseInvoiceSecondStepComponent } from './purchase-invoice-second-step.component';

describe('PurchaseInvoiceSecondStepComponent', () => {
  let component: PurchaseInvoiceSecondStepComponent;
  let fixture: ComponentFixture<PurchaseInvoiceSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceSecondStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
