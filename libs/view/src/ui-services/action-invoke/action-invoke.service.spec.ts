import { TestBed } from '@angular/core/testing';

import { ActionInvokeService } from './action-invoke.service';

describe('RoleActionInvokeService', () => {
  let service: ActionInvokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionInvokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
