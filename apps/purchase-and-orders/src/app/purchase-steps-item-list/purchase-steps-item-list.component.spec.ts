import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceStepsItemListComponent } from './invoice-steps-item-list.component';

describe('InvoiceStepsItemListComponent', () => {
  let component: InvoiceStepsItemListComponent;
  let fixture: ComponentFixture<InvoiceStepsItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceStepsItemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceStepsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
