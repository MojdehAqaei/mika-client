import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderThirdStepComponent } from './order-third-step.component';

describe('OrderThirdStepComponent', () => {
  let component: OrderThirdStepComponent;
  let fixture: ComponentFixture<OrderThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderThirdStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
