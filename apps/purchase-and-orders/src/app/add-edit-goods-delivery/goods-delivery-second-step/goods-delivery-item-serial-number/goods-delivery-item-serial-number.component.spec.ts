import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliveryItemSerialNumberComponent } from './goods-delivery-item-serial-number.component';

describe('AddEditGoodsDeliveryItemSerialNumberComponent', () => {
  let component: GoodsDeliveryItemSerialNumberComponent;
  let fixture: ComponentFixture<GoodsDeliveryItemSerialNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliveryItemSerialNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      GoodsDeliveryItemSerialNumberComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
