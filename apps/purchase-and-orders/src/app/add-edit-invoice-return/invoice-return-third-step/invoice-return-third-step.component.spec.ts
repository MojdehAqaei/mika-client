import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceReturnThirdStepComponent } from './invoice-return-third-step.component';

describe('InvoiceReturnThirdStepComponent', () => {
  let component: InvoiceReturnThirdStepComponent;
  let fixture: ComponentFixture<InvoiceReturnThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReturnThirdStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReturnThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
