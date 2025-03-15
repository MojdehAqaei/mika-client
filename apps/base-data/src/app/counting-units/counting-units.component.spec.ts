import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountingUnitsComponent } from './counting-units.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { UserGateway } from '@domain/lib/user-management';
import { UserImplementationService } from '@api/lib/impl';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SetCountingUnitComponent', () => {
  let component: CountingUnitsComponent;
  let fixture: ComponentFixture<CountingUnitsComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountingUnitsComponent, TranslateModule.forChild(),HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UserGateway, useClass: UserImplementationService },
        TranslateService,
        TranslateStore,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountingUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save or update goods group forms', () => {
    // const updateFormSubmissionSpy = jest.spyOn(component.appFacade, 'updateFormSubmission');
    // component.saveOrUpdateCountingUnit();
    // expect(updateFormSubmissionSpy).toHaveBeenCalled();
  });
});
