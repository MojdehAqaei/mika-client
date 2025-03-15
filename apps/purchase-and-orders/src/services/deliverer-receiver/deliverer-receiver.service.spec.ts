import { TestBed } from '@angular/core/testing';

import { DelivererReceiverService } from './deliverer-receiver.service';

describe('DelivererRecieverService', () => {
  let service: DelivererReceiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelivererReceiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
