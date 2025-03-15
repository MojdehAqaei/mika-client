import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSecondStepComponent } from './order-second-step.component';

describe('OrderSecondStepComponent', () => {
  let component: OrderSecondStepComponent;
  let fixture: ComponentFixture<OrderSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSecondStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
