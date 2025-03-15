import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliverySecondStepComponent } from './goods-delivery-second-step.component';

describe('AddGoodsListToDeliveryComponent', () => {
  let component: GoodsDeliverySecondStepComponent;
  let fixture: ComponentFixture<GoodsDeliverySecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliverySecondStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsDeliverySecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
