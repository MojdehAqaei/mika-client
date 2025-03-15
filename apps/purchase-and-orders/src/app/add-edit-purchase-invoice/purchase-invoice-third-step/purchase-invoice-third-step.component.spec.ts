import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseInvoiceThirdStepComponent } from './purchase-invoice-third-step.component';

describe('PurchaseInvoiceThirdStepComponent', () => {
  let component: PurchaseInvoiceThirdStepComponent;
  let fixture: ComponentFixture<PurchaseInvoiceThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceThirdStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
