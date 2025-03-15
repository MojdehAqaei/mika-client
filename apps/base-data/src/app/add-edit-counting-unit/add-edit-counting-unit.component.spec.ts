import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditCountingUnitComponent } from './add-edit-counting-unit.component';

describe('AddEditCountingUnitComponent', () => {
  let component: AddEditCountingUnitComponent;
  let fixture: ComponentFixture<AddEditCountingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCountingUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditCountingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
