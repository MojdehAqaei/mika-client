import { TestBed } from '@angular/core/testing';

import { SerialNumberService } from './serial-number.service';

describe('SerialNumberService', () => {
  let service: SerialNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerialNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
