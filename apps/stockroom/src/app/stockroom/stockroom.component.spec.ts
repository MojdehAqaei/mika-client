import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockroomComponent } from './stockroom.component';

describe('StockroomComponent', () => {
  let component: StockroomComponent;
  let fixture: ComponentFixture<StockroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
