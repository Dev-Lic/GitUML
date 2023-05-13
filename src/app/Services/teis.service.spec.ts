import { TestBed } from '@angular/core/testing';

import { TEISService } from './teis.service';

describe('TEISService', () => {
  let service: TEISService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TEISService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
