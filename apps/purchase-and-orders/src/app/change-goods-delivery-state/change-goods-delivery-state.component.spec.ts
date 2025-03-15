import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeGoodsDeliveryStateComponent } from './change-goods-delivery-state.component';

describe('ChangeGoodsDeliveryStateComponent', () => {
  let component: ChangeGoodsDeliveryStateComponent;
  let fixture: ComponentFixture<ChangeGoodsDeliveryStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeGoodsDeliveryStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeGoodsDeliveryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
