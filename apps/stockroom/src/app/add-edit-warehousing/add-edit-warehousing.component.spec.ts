import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditWarehousingComponent } from './add-edit-warehousing.component';

describe('AddEditWarehousingComponent', () => {
  let component: AddEditWarehousingComponent;
  let fixture: ComponentFixture<AddEditWarehousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditWarehousingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditWarehousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
