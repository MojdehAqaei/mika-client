import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditInvoiceStepsItemComponent } from './add-edit-purchase-steps-item.component';

describe('AddEditInvoiceStepsItemComponent', () => {
  let component: AddEditInvoiceStepsItemComponent;
  let fixture: ComponentFixture<AddEditInvoiceStepsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditInvoiceStepsItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditInvoiceStepsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
