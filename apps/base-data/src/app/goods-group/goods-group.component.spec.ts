import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsGroupComponent } from './goods-group.component';
import { GoodsGroupGateway } from '@domain/lib/base-data';
import { GoodsGroupImplementationService, UserImplementationService } from '@api/lib/impl';
import { AppFacade, GoodsGroupFacade } from '@state/lib/facade';
import { ClFormService } from '@sadad/component-lib/src/services';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserGateway } from '@domain/lib/user-management';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoodsGroupStore } from '@state/lib/store';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GoodsGroupComponent', () => {
  let component: GoodsGroupComponent;
  let fixture: ComponentFixture<GoodsGroupComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsGroupComponent, TranslateModule.forChild(), RouterModule.forRoot([]), HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule.withConfig({ disableAnimations: true })],
      providers: [
        { provide: GoodsGroupGateway, useClass: GoodsGroupImplementationService },
        { provide: UserGateway, useClass: UserImplementationService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        AppFacade,
        GoodsGroupFacade,
        ClFormService,
        TranslateService,
        TranslateStore,
        GoodsGroupStore
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GoodsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set common configs', () => {
    component.dialogHeader = '';
    component.setCommonConfig('add', 'MOCK_DIALOG_HEADER', false);
    expect(component.dialogHeader).toEqual('MOCK_DIALOG_HEADER');
  });

  it('should set common configs', () => {
    component.mode = 'add';
    component.setCommonConfig('edit', 'MOCK_DIALOG_HEADER', false);
    expect(component.mode).toEqual('edit');
  });

  it('should save or update goods group forms', () => {
    // const updateFormSubmissionSpy = jest.spyOn(component.appFacade, 'updateFormSubmission');
    // component.saveOrUpdateGoodsGroupForms();
    // expect(updateFormSubmissionSpy).toHaveBeenCalled();
  });

  it('should save or update goods group forms', () => {
    // @ts-ignore
    const sendRelatedFormSpy = jest.spyOn(component, 'sendRelatedForm');
    component.saveOrUpdateGoodsGroupForms();
    expect(sendRelatedFormSpy).toHaveBeenCalled();
  });



});
