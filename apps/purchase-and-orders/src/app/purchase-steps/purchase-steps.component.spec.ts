import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseStepsComponent } from './purchase-steps.component';

describe('PurchaseStepsComponent', () => {
  let component: PurchaseStepsComponent;
  let fixture: ComponentFixture<PurchaseStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
