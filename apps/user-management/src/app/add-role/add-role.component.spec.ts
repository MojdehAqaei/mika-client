import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRoleComponent } from './add-role.component';

describe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let fixture: ComponentFixture<AddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
