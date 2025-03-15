import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliveryComponent } from './goods-delivery.component';

describe('GoodsDeliveryComponent', () => {
  let component: GoodsDeliveryComponent;
  let fixture: ComponentFixture<GoodsDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliveryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
