import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserContentAccessComponent } from './user-content-access.component';

describe('UserContentAccessComponent', () => {
  let component: UserContentAccessComponent;
  let fixture: ComponentFixture<UserContentAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserContentAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserContentAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
