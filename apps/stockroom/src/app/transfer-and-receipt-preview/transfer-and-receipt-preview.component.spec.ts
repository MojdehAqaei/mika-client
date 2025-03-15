import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferAndReceiptPreviewComponent } from './transfer-and-receipt-preview.component';

describe('TransferAndReceiptPreviewComponent', () => {
  let component: TransferAndReceiptPreviewComponent;
  let fixture: ComponentFixture<TransferAndReceiptPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferAndReceiptPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferAndReceiptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
