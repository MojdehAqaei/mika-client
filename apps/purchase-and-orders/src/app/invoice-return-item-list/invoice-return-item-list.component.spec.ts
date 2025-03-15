import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceReturnItemListComponent } from './invoice-return-item-list.component';

describe('InvoiceReturnItemListComponent', () => {
  let component: InvoiceReturnItemListComponent;
  let fixture: ComponentFixture<InvoiceReturnItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReturnItemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceReturnItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
