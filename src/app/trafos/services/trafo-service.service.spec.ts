import { TestBed } from '@angular/core/testing';

import { TrafoServiceService } from './trafo-service.service';

describe('TrafoServiceService', () => {
  let service: TrafoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
