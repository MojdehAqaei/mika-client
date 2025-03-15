import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceItemListComponent } from './purchase-invoice-item-list.component';

describe('PurchaseInvoiceItemListComponent', () => {
  let component: PurchaseInvoiceItemListComponent;
  let fixture: ComponentFixture<PurchaseInvoiceItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
