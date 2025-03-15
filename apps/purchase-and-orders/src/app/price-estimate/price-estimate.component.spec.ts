import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceEstimateComponent } from './price-estimate.component';

describe('PriceEstimateComponent', () => {
  let component: PriceEstimateComponent;
  let fixture: ComponentFixture<PriceEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceEstimateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
