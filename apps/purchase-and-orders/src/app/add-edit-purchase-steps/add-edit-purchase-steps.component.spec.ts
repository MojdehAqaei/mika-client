import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditInvoiceStepsComponent } from './add-edit-purchase-steps.component';

describe('AddEditInvoiceStepsComponent', () => {
  let component: AddEditInvoiceStepsComponent;
  let fixture: ComponentFixture<AddEditInvoiceStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditInvoiceStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditInvoiceStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
