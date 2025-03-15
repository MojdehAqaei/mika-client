import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehousingCountRoundComponent } from './warehousing-count-round.component';

describe('WarehousingCountRoundComponent', () => {
  let component: WarehousingCountRoundComponent;
  let fixture: ComponentFixture<WarehousingCountRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehousingCountRoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehousingCountRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
