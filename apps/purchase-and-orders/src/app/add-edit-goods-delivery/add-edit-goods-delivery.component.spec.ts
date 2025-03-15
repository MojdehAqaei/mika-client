import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditGoodsDeliveryComponent } from './add-edit-goods-delivery.component';

describe('AddEditGoodsDeliveryComponent', () => {
  let component: AddEditGoodsDeliveryComponent;
  let fixture: ComponentFixture<AddEditGoodsDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGoodsDeliveryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditGoodsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
