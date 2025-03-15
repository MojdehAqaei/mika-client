import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPersonCompanyComponent } from './add-edit-person-company.component';

describe('AddEditPersonCompanyComponent', () => {
  let component: AddEditPersonCompanyComponent;
  let fixture: ComponentFixture<AddEditPersonCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPersonCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditPersonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
