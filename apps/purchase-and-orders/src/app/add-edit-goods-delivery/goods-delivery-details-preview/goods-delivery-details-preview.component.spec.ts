import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliveryDetailsPreviewComponent } from './goods-delivery-details-preview.component';

describe('GoodsDeliveryThirdStepComponent', () => {
  let component: GoodsDeliveryDetailsPreviewComponent;
  let fixture: ComponentFixture<GoodsDeliveryDetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliveryDetailsPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsDeliveryDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
