import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { UserGateway } from '@domain/lib/user-management';
import { UserImplementationService } from '@api/lib/impl';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SetFeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureComponent, TranslateModule.forChild(), HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule.withConfig({disableAnimations: true})],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UserGateway, useClass: UserImplementationService },
        TranslateService,
        TranslateStore,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save or update goods group forms', () => {
    // const updateFormSubmissionSpy = jest.spyOn(component.appFacade, 'updateFormSubmission');
    // component.saveOrUpdateGoodsGroupForms();
    // expect(updateFormSubmissionSpy).toHaveBeenCalled();
  });
});
