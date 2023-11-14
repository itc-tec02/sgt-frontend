import { TestBed } from '@angular/core/testing';

import { CrsService } from './crs.service';

describe('CrsService', () => {
  let service: CrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
