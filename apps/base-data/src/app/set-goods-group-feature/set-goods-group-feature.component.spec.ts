import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetGoodsGroupFeatureComponent } from './set-goods-group-feature.component';

describe('SetGoodsGroupFeatureComponent', () => {
  let component: SetGoodsGroupFeatureComponent;
  let fixture: ComponentFixture<SetGoodsGroupFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetGoodsGroupFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetGoodsGroupFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
