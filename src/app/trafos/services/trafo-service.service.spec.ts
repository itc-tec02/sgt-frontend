import { TestBed } from '@angular/core/testing';

import { TrafoService } from './trafo-service.service';

describe('TrafoServiceService', () => {
  let service: TrafoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
