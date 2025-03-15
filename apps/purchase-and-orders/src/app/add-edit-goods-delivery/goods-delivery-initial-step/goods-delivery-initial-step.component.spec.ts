import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliveryInitialStepComponent } from './goods-delivery-initial-step.component';

describe('GoodsDeliveryInitialStepComponent', () => {
  let component: GoodsDeliveryInitialStepComponent;
  let fixture: ComponentFixture<GoodsDeliveryInitialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliveryInitialStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsDeliveryInitialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
