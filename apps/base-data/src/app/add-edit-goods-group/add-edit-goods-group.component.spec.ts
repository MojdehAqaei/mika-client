import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditGoodsGroupComponent } from './add-edit-goods-group.component';

describe('AddEditGoodsGroupComponent', () => {
  let component: AddEditGoodsGroupComponent;
  let fixture: ComponentFixture<AddEditGoodsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGoodsGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditGoodsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
