import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditInvoiceReturnComponent } from './add-edit-invoice-return.component';

describe('AddEditInvoiceReturnComponent', () => {
  let component: AddEditInvoiceReturnComponent;
  let fixture: ComponentFixture<AddEditInvoiceReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditInvoiceReturnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditInvoiceReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
