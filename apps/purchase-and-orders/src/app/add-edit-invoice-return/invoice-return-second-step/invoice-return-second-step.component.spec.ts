import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceReturnSecondStepComponent } from './invoice-return-second-step.component';

describe('InvoiceReturnSecondStepComponent', () => {
  let component: InvoiceReturnSecondStepComponent;
  let fixture: ComponentFixture<InvoiceReturnSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReturnSecondStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReturnSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
