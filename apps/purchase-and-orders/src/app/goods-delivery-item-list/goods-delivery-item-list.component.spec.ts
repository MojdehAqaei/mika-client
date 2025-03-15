import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsDeliveryItemListComponent } from './goods-delivery-item-list.component';

describe('GoodsDeliveryItemListComponent', () => {
  let component: GoodsDeliveryItemListComponent;
  let fixture: ComponentFixture<GoodsDeliveryItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsDeliveryItemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsDeliveryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
