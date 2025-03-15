import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferAndReceiptItemListComponent } from './transfer-and-receipt-item-list.component';

describe('TransferItemListComponent', () => {
  let component: TransferAndReceiptItemListComponent;
  let fixture: ComponentFixture<TransferAndReceiptItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferAndReceiptItemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferAndReceiptItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
