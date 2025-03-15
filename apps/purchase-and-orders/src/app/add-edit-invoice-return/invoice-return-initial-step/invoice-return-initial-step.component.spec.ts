import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceReturnInitialStepComponent } from './invoice-return-initial-step.component';

describe('InvoiceReturnInitialStepComponent', () => {
  let component: InvoiceReturnInitialStepComponent;
  let fixture: ComponentFixture<InvoiceReturnInitialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReturnInitialStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReturnInitialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
