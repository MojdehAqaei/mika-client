import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderInitialStepComponent } from './order-initial-step.component';

describe('OrderInitialStepComponent', () => {
  let component: OrderInitialStepComponent;
  let fixture: ComponentFixture<OrderInitialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderInitialStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderInitialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
