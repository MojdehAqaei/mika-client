import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditGoodsComponent } from './add-edit-goods.component';

describe('AddEditGoodsComponent', () => {
  let component: AddEditGoodsComponent;
  let fixture: ComponentFixture<AddEditGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGoodsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
