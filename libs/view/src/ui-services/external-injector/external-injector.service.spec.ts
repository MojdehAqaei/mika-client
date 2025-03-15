import { TestBed } from '@angular/core/testing';

import { ExternalInjectorService } from './external-injector.service';

describe('ExternalInjectorService', () => {
  let service: ExternalInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
