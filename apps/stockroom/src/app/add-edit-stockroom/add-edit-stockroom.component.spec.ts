import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditStockroomComponent } from './add-edit-stockroom.component';

describe('AddEditStockroomComponent', () => {
  let component: AddEditStockroomComponent;
  let fixture: ComponentFixture<AddEditStockroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStockroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
